"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { contactSchema } from "@/lib/validations/contact";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_MESSAGES = 3;
const attempts = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_MESSAGES) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  return false;
}

export async function sendContactMessage(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ?? "Periksa kembali isian formulir.",
    };
  }

  // Honeypot: bot mengisi field tersembunyi, balas sukses tanpa menyimpan.
  if (parsed.data.website) {
    return { status: "success", message: "Terima kasih, pesan Anda terkirim." };
  }

  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for") ?? "unknown";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256")
    .update(`${ip}:${process.env.IP_HASH_SECRET ?? "local-dev"}`)
    .digest("hex");

  if (isRateLimited(ipHash)) {
    return {
      status: "error",
      message: "Terlalu banyak pesan. Coba lagi dalam beberapa menit.",
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      status: "error",
      message:
        "Formulir belum aktif. Silakan hubungi saya lewat email atau LinkedIn.",
    };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject || null,
    message: parsed.data.message,
    ip_hash: ipHash,
  });

  if (error) {
    console.error("Gagal menyimpan pesan kontak:", error.message);
    return {
      status: "error",
      message: "Pesan gagal disimpan. Silakan coba lagi atau kirim email.",
    };
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (resendKey && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Portofolio <onboarding@resend.dev>",
        to,
        replyTo: parsed.data.email,
        subject: parsed.data.subject
          ? `[Portofolio] ${parsed.data.subject}`
          : `[Portofolio] Pesan dari ${parsed.data.name}`,
        text: [
          `Nama: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Subjek: ${parsed.data.subject || "-"}`,
          "",
          parsed.data.message,
        ].join("\n"),
      });
    } catch (mailError) {
      console.error("Email notifikasi gagal dikirim:", mailError);
    }
  }

  return {
    status: "success",
    message: "Terima kasih! Pesan Anda sudah masuk. Saya biasanya membalas dalam 24 jam.",
  };
}
