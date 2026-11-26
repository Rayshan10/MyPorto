import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import {
  ProjectForm,
  type ProjectFormValues,
} from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!project) notFound();

  const values: ProjectFormValues = {
    id: project.id,
    title: project.title ?? "",
    slug: project.slug ?? "",
    summary: project.summary ?? "",
    problem: project.problem ?? "",
    solution: project.solution ?? "",
    outcome: project.outcome ?? "",
    role: project.role ?? "",
    tech: project.tech ?? [],
    repo_url: project.repo_url ?? "",
    demo_url: project.demo_url ?? "",
    year: project.year ?? new Date().getFullYear(),
    featured: Boolean(project.featured),
    published: Boolean(project.published),
    sort_order: project.sort_order ?? 0,
    thumbnail_url: project.thumbnail_url ?? "",
  };

  return (
    <div>
      <AdminPageHeader
        title="Ubah proyek"
        description={project.title}
      />
      <ProjectForm project={values} />
    </div>
  );
}
