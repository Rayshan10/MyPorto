import Link from "next/link";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteExperience } from "@/lib/actions/content";
import { AdminPageHeader, EmptyState } from "@/components/admin/page-header";
import { ExperienceForm } from "@/components/admin/experience-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

function formatMonth(value: string | null) {
  if (!value) return "Sekarang";
  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminExperiencesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const supabase = await createClient();
  const { data: experiences, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("start_date", { ascending: false });

  const editing = experiences?.find((item) => item.id === edit);

  return (
    <div>
      <AdminPageHeader
        title="Pengalaman"
        description="Riwayat pekerjaan dan organisasi yang tampil di bagian pengalaman."
      />

      {error ? (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error.message}
        </p>
      ) : null}

      <section className="mb-6 rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">
            {editing ? "Ubah pengalaman" : "Tambah pengalaman"}
          </h2>
          {editing ? (
            <Button asChild variant="ghost" size="sm" className="h-8">
              <Link href="/admin/experiences">Batal</Link>
            </Button>
          ) : null}
        </div>

        <ExperienceForm
          key={editing?.id ?? "new"}
          experience={
            editing
              ? {
                  id: editing.id,
                  company: editing.company ?? "",
                  role: editing.role ?? "",
                  employment_type: editing.employment_type ?? "",
                  location: editing.location ?? "",
                  start_date: editing.start_date ?? "",
                  end_date: editing.end_date ?? "",
                  description: editing.description ?? "",
                  highlights: editing.highlights ?? [],
                  tech: editing.tech ?? [],
                  sort_order: editing.sort_order ?? 0,
                }
              : undefined
          }
        />
      </section>

      {!experiences || experiences.length === 0 ? (
        <EmptyState
          title="Belum ada pengalaman"
          description="Tambahkan riwayat pekerjaan atau organisasi lewat formulir di atas."
        />
      ) : (
        <div className="space-y-2">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{experience.role}</p>
                <p className="text-sm text-muted-foreground">
                  {experience.company}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatMonth(experience.start_date)} —{" "}
                  {formatMonth(experience.end_date)}
                  {experience.employment_type
                    ? ` · ${experience.employment_type}`
                    : ""}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Button
                  asChild
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                  title="Ubah pengalaman"
                >
                  <Link
                    href={`/admin/experiences?edit=${experience.id}`}
                    aria-label="Ubah pengalaman"
                  >
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <DeleteForm
                  action={deleteExperience}
                  id={experience.id}
                  confirmMessage={`Hapus pengalaman "${experience.role}" di ${experience.company}?`}
                  label="Hapus pengalaman"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
