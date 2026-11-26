"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return supabase;
}

export async function markMessageRead(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  const value = formData.get("value") === "true";
  if (!id) return;

  await supabase.from("messages").update({ is_read: value }).eq("id", id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  redirect("/admin/messages");
}
