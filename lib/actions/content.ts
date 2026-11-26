"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  certificationSchema,
  experienceSchema,
  profileSchema,
  skillSchema,
} from "@/lib/validations/project";
import type { FormState } from "@/lib/actions/types";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return supabase;
}

function splitList(value: string, separator: "comma" | "newline") {
  return value
    .split(separator === "comma" ? "," : /\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function revalidateContent() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/experiences");
  revalidatePath("/admin/skills");
  revalidatePath("/admin/certifications");
  revalidatePath("/admin/profile");
}

export async function saveExperience(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "").trim();

  const parsed = experienceSchema.safeParse({
    company: formData.get("company"),
    role: formData.get("role"),
    employment_type: formData.get("employment_type"),
    location: formData.get("location"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    description: formData.get("description"),
    highlights: formData.get("highlights"),
    tech: formData.get("tech"),
    sort_order: formData.get("sort_order") ?? 0,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Periksa kembali isian formulir.",
    };
  }

  const payload = {
    company: parsed.data.company,
    role: parsed.data.role,
    employment_type: parsed.data.employment_type || null,
    location: parsed.data.location || null,
    start_date: parsed.data.start_date,
    end_date: parsed.data.end_date || null,
    description: parsed.data.description || null,
    highlights: splitList(parsed.data.highlights, "newline"),
    tech: splitList(parsed.data.tech, "comma"),
    sort_order: parsed.data.sort_order,
  };

  const { error } = id
    ? await supabase.from("experiences").update(payload).eq("id", id)
    : await supabase.from("experiences").insert(payload);

  if (error) return { error: error.message };

  revalidateContent();
  redirect("/admin/experiences");
}

export async function deleteExperience(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("experiences").delete().eq("id", id);
  revalidateContent();
  redirect("/admin/experiences");
}

export async function saveSkill(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "").trim();

  const parsed = skillSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    sort_order: formData.get("sort_order") ?? 0,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Periksa kembali isian formulir.",
    };
  }

  const { error } = id
    ? await supabase.from("skills").update(parsed.data).eq("id", id)
    : await supabase.from("skills").insert(parsed.data);

  if (error) return { error: error.message };

  revalidateContent();
  redirect("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("skills").delete().eq("id", id);
  revalidateContent();
  redirect("/admin/skills");
}

export async function saveCertification(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "").trim();

  const parsed = certificationSchema.safeParse({
    name: formData.get("name"),
    issuer: formData.get("issuer"),
    issued_at: formData.get("issued_at"),
    credential_url: formData.get("credential_url"),
    sort_order: formData.get("sort_order") ?? 0,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Periksa kembali isian formulir.",
    };
  }

  const payload = {
    name: parsed.data.name,
    issuer: parsed.data.issuer,
    issued_at: parsed.data.issued_at || null,
    credential_url: parsed.data.credential_url || null,
    sort_order: parsed.data.sort_order,
  };

  const { error } = id
    ? await supabase.from("certifications").update(payload).eq("id", id)
    : await supabase.from("certifications").insert(payload);

  if (error) return { error: error.message };

  revalidateContent();
  redirect("/admin/certifications");
}

export async function deleteCertification(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("certifications").delete().eq("id", id);
  revalidateContent();
  redirect("/admin/certifications");
}

export async function saveProfile(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "").trim();

  const parsed = profileSchema.safeParse({
    full_name: formData.get("full_name"),
    headline: formData.get("headline"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    email: formData.get("email"),
    linkedin_url: formData.get("linkedin_url"),
    github_url: formData.get("github_url"),
    availability: formData.get("availability"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Periksa kembali isian formulir.",
    };
  }

  const payload = {
    full_name: parsed.data.full_name,
    headline: parsed.data.headline,
    bio: parsed.data.bio,
    location: parsed.data.location,
    email: parsed.data.email || null,
    linkedin_url: parsed.data.linkedin_url || null,
    github_url: parsed.data.github_url || null,
    availability: parsed.data.availability,
  };

  const { error } = id
    ? await supabase.from("profiles").update(payload).eq("id", id)
    : await supabase.from("profiles").insert(payload);

  if (error) return { error: error.message };

  revalidateContent();
  return { success: "Profil tersimpan." };
}
