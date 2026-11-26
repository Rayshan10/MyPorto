"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { projectSchema } from "@/lib/validations/project";
import type { FormState } from "@/lib/actions/types";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return supabase;
}

function revalidateProject(slug: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath(`/projects/${slug}`);
}

export async function saveProject(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "").trim();

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    outcome: formData.get("outcome"),
    role: formData.get("role"),
    tech: formData.get("tech"),
    repo_url: formData.get("repo_url"),
    demo_url: formData.get("demo_url"),
    year: formData.get("year"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sort_order: formData.get("sort_order") ?? 0,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Periksa kembali isian formulir.",
    };
  }

  const tech = parsed.data.tech
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  let thumbnailUrl =
    String(formData.get("thumbnail_current") ?? "").trim() || null;

  const file = formData.get("thumbnail_file");
  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      return { error: "Berkas harus berupa gambar." };
    }
    if (file.size > 2 * 1024 * 1024) {
      return { error: "Ukuran gambar maksimal 2 MB." };
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `projects/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      return { error: `Upload gambar gagal: ${uploadError.message}` };
    }

    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    thumbnailUrl = data.publicUrl;
  }

  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    summary: parsed.data.summary,
    problem: parsed.data.problem,
    solution: parsed.data.solution,
    outcome: parsed.data.outcome,
    role: parsed.data.role,
    tech,
    repo_url: parsed.data.repo_url || null,
    demo_url: parsed.data.demo_url || null,
    year: parsed.data.year,
    featured: parsed.data.featured,
    published: parsed.data.published,
    sort_order: parsed.data.sort_order,
    thumbnail_url: thumbnailUrl,
  };

  const { error } = id
    ? await supabase.from("projects").update(payload).eq("id", id)
    : await supabase.from("projects").insert(payload);

  if (error) {
    return { error: error.message };
  }

  revalidateProject(parsed.data.slug);
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");

  if (!id) return;

  await supabase.from("projects").delete().eq("id", id);
  revalidateProject(slug);
  redirect("/admin/projects");
}

export async function toggleProjectFlag(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  const field = String(formData.get("field") ?? "");
  const value = formData.get("value") === "true";
  const slug = String(formData.get("slug") ?? "");

  if (!id || !["published", "featured"].includes(field)) return;

  await supabase
    .from("projects")
    .update({ [field]: value })
    .eq("id", id);

  revalidateProject(slug);
}
