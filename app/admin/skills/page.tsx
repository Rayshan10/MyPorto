import Link from "next/link";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteSkill } from "@/lib/actions/content";
import { AdminPageHeader, EmptyState } from "@/components/admin/page-header";
import { SkillForm } from "@/components/admin/simple-forms";
import { DeleteForm } from "@/components/admin/delete-form";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const supabase = await createClient();
  const { data: skills, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  const editing = skills?.find((item) => item.id === edit);
  const categories = Array.from(
    new Set((skills ?? []).map((skill) => skill.category).filter(Boolean)),
  );

  type SkillRow = {
    id: string;
    name: string;
    category: string;
    sort_order: number;
  };

  const grouped = new Map<string, SkillRow[]>();
  for (const skill of (skills ?? []) as SkillRow[]) {
    const key = skill.category || "Lainnya";
    const list = grouped.get(key) ?? [];
    list.push(skill);
    grouped.set(key, list);
  }

  return (
    <div>
      <AdminPageHeader
        title="Keahlian"
        description="Kelompokkan keahlian per kategori. Urutan kategori mengikuti urutan keahlian di dalamnya."
      />

      {error ? (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error.message}
        </p>
      ) : null}

      <section className="mb-6 rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">
            {editing ? "Ubah keahlian" : "Tambah keahlian"}
          </h2>
          {editing ? (
            <Button asChild variant="ghost" size="sm" className="h-8">
              <Link href="/admin/skills">Batal</Link>
            </Button>
          ) : null}
        </div>

        <SkillForm
          key={editing?.id ?? "new"}
          categories={categories}
          skill={
            editing
              ? {
                  id: editing.id,
                  name: editing.name ?? "",
                  category: editing.category ?? "",
                  sort_order: editing.sort_order ?? 0,
                }
              : undefined
          }
        />
      </section>

      {!skills || skills.length === 0 ? (
        <EmptyState
          title="Belum ada keahlian"
          description="Tambahkan keahlian pertama lewat formulir di atas."
        />
      ) : (
        <div className="space-y-4">
          {Array.from(grouped, ([category, items]) => (
            <section
              key={category}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <h3 className="border-b border-border bg-muted/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {category}
              </h3>
              <div className="divide-y divide-border">
                {(items ?? []).map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between gap-3 px-4 py-2"
                  >
                    <span className="text-sm">{skill.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="mr-2 font-mono text-xs text-muted-foreground">
                        {skill.sort_order}
                      </span>
                      <Button
                        asChild
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground"
                        title="Ubah keahlian"
                      >
                        <Link
                          href={`/admin/skills?edit=${skill.id}`}
                          aria-label="Ubah keahlian"
                        >
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <DeleteForm
                        action={deleteSkill}
                        id={skill.id}
                        confirmMessage={`Hapus keahlian "${skill.name}"?`}
                        label="Hapus keahlian"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
