import Link from "next/link";
import { ExternalLink, Eye, EyeOff, Pencil, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteProject, toggleProjectFlag } from "@/lib/actions/projects";
import { AdminPageHeader, EmptyState } from "@/components/admin/page-header";
import { DeleteForm } from "@/components/admin/delete-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select(
      "id, title, slug, year, published, featured, sort_order, thumbnail_url",
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader
        title="Proyek"
        description="Tambah, ubah, dan atur urutan proyek yang tampil di portofolio."
        action={{ href: "/admin/projects/new", label: "Proyek baru" }}
      />

      {error ? (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error.message}
        </p>
      ) : null}

      {!projects || projects.length === 0 ? (
        <EmptyState
          title="Belum ada proyek"
          description="Mulai dengan menambahkan proyek pertama, atau salin konten awal dari dashboard."
          action={{ href: "/admin/projects/new", label: "Tambah proyek" }}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Proyek</th>
                  <th className="px-4 py-2.5 font-medium">Tahun</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {projects.map((project) => (
                  <tr key={project.id} className="align-middle">
                    <td className="px-4 py-3">
                      <p className="font-medium">{project.title}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                        /projects/{project.slug}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {project.year ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[0.7rem] font-medium",
                            project.published
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {project.published ? "Tayang" : "Draf"}
                        </span>
                        {project.featured ? (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.7rem] font-medium text-primary">
                            Unggulan
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <form action={toggleProjectFlag}>
                          <input type="hidden" name="id" value={project.id} />
                          <input
                            type="hidden"
                            name="field"
                            value="published"
                          />
                          <input
                            type="hidden"
                            name="slug"
                            value={project.slug}
                          />
                          <input
                            type="hidden"
                            name="value"
                            value={project.published ? "false" : "true"}
                          />
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon-sm"
                            title={
                              project.published
                                ? "Sembunyikan dari situs"
                                : "Tayangkan di situs"
                            }
                            aria-label={
                              project.published
                                ? "Sembunyikan dari situs"
                                : "Tayangkan di situs"
                            }
                            className="text-muted-foreground"
                          >
                            {project.published ? (
                              <Eye className="size-4" />
                            ) : (
                              <EyeOff className="size-4" />
                            )}
                          </Button>
                        </form>

                        <form action={toggleProjectFlag}>
                          <input type="hidden" name="id" value={project.id} />
                          <input type="hidden" name="field" value="featured" />
                          <input type="hidden" name="slug" value={project.slug} />
                          <input
                            type="hidden"
                            name="value"
                            value={project.featured ? "false" : "true"}
                          />
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon-sm"
                            title={
                              project.featured
                                ? "Hapus dari unggulan"
                                : "Jadikan unggulan"
                            }
                            aria-label={
                              project.featured
                                ? "Hapus dari unggulan"
                                : "Jadikan unggulan"
                            }
                            className={cn(
                              project.featured
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          >
                            <Star
                              className={cn(
                                "size-4",
                                project.featured && "fill-current",
                              )}
                            />
                          </Button>
                        </form>

                        <Button
                          asChild
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground"
                          title="Buka halaman proyek"
                        >
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            aria-label="Buka halaman proyek"
                          >
                            <ExternalLink className="size-4" />
                          </Link>
                        </Button>

                        <Button
                          asChild
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground"
                          title="Ubah proyek"
                        >
                          <Link
                            href={`/admin/projects/${project.id}`}
                            aria-label="Ubah proyek"
                          >
                            <Pencil className="size-4" />
                          </Link>
                        </Button>

                        <DeleteForm
                          action={deleteProject}
                          id={project.id}
                          hidden={{ slug: project.slug }}
                          confirmMessage={`Hapus "${project.title}"? Tindakan ini tidak bisa dibatalkan.`}
                          label="Hapus proyek"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
