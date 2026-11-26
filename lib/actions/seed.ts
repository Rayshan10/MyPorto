"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  fallbackCertifications,
  fallbackExperiences,
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
} from "@/lib/data/fallback";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Tidak terautentikasi.");
  return supabase;
}

export async function seedContent() {
  const supabase = await requireUser();

  const { data: existing } = await supabase
    .from("projects")
    .select("id")
    .limit(1);

  if (existing && existing.length > 0) {
    revalidatePath("/admin");
    return;
  }

  await supabase.from("profiles").insert({
    full_name: fallbackProfile.full_name,
    headline: fallbackProfile.headline,
    bio: fallbackProfile.bio,
    location: fallbackProfile.location,
    email: fallbackProfile.email,
    linkedin_url: fallbackProfile.linkedin_url,
    github_url: fallbackProfile.github_url,
    availability: fallbackProfile.availability,
  });

  await supabase.from("projects").insert(
    fallbackProjects.map((project, index) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      problem: project.problem,
      solution: project.solution,
      outcome: project.outcome,
      role: project.role,
      tech: project.tech,
      repo_url: project.repo_url,
      demo_url: project.demo_url,
      year: project.year,
      featured: project.featured,
      published: true,
      sort_order: index,
    })),
  );

  await supabase.from("experiences").insert(
    fallbackExperiences.map((experience, index) => ({
      company: experience.company,
      role: experience.role,
      employment_type: experience.employment_type,
      location: experience.location,
      start_date: experience.start_date,
      end_date: experience.end_date,
      description: experience.description,
      highlights: experience.highlights,
      tech: experience.tech,
      sort_order: index,
    })),
  );

  let skillIndex = 0;
  await supabase.from("skills").insert(
    fallbackSkills.flatMap((group) =>
      group.items.map((name) => ({
        name,
        category: group.category,
        sort_order: skillIndex++,
      })),
    ),
  );

  await supabase.from("certifications").insert(
    fallbackCertifications.map((certification, index) => ({
      name: certification.name,
      issuer: certification.issuer,
      issued_at: certification.issued_at || null,
      credential_url: certification.credential_url,
      sort_order: index,
    })),
  );

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/experiences");
  revalidatePath("/admin/skills");
  revalidatePath("/admin/certifications");
  revalidatePath("/admin/profile");
}
