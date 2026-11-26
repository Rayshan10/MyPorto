"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { saveProject } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage, SubmitButton } from "@/components/admin/form-parts";

export type ProjectFormValues = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  role: string;
  tech: string[];
  repo_url: string;
  demo_url: string;
  year: number;
  featured: boolean;
  published: boolean;
  sort_order: number;
  thumbnail_url: string;
};

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProjectForm({
  project,
}: {
  project?: ProjectFormValues;
}) {
  const [state, formAction] = useActionState(saveProject, {});
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project?.slug));

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm" className="h-8 -ml-2">
          <Link href="/admin/projects">
            <ArrowLeft className="size-4" />
            Kembali
          </Link>
        </Button>
        <SubmitButton>{project ? "Simpan perubahan" : "Tambah proyek"}</SubmitButton>
      </div>

      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <FormMessage error={state.error} success={state.success} />

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold">Informasi utama</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Judul proyek" htmlFor="title">
              <Input
                id="title"
                name="title"
                required
                value={title}
                onChange={(event) => {
                  const next = event.target.value;
                  setTitle(next);
                  if (!slugTouched) setSlug(slugify(next));
                }}
                placeholder="SiAdit — Sistem Informasi Audit Data"
              />
            </Field>
          </div>

          <Field
            label="Slug URL"
            htmlFor="slug"
            hint={`Akan menjadi /projects/${slug || "slug-proyek"}`}
          >
            <Input
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(slugify(event.target.value));
              }}
              placeholder="siadit"
            />
          </Field>

          <Field label="Tahun" htmlFor="year">
            <Input
              id="year"
              name="year"
              type="number"
              min={2000}
              max={2100}
              required
              defaultValue={project?.year ?? new Date().getFullYear()}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Ringkasan" htmlFor="summary" hint="Tampil di kartu proyek.">
              <Textarea
                id="summary"
                name="summary"
                required
                rows={3}
                defaultValue={project?.summary}
                placeholder="Satu sampai dua kalimat tentang proyek ini."
              />
            </Field>
          </div>

          <Field label="Peran" htmlFor="role">
            <Input
              id="role"
              name="role"
              defaultValue={project?.role}
              placeholder="Backend Developer"
            />
          </Field>

          <Field
            label="Teknologi"
            htmlFor="tech"
            hint="Pisahkan dengan koma."
          >
            <Input
              id="tech"
              name="tech"
              defaultValue={project?.tech.join(", ")}
              placeholder="Laravel, MySQL, Tailwind CSS"
            />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold">Studi kasus</h2>

        <div className="space-y-4">
          <Field label="Masalah" htmlFor="problem">
            <Textarea
              id="problem"
              name="problem"
              rows={3}
              defaultValue={project?.problem}
              placeholder="Apa masalah nyata yang diselesaikan?"
            />
          </Field>

          <Field label="Solusi" htmlFor="solution">
            <Textarea
              id="solution"
              name="solution"
              rows={4}
              defaultValue={project?.solution}
              placeholder="Bagaimana kamu membangunnya?"
            />
          </Field>

          <Field label="Hasil" htmlFor="outcome">
            <Textarea
              id="outcome"
              name="outcome"
              rows={3}
              defaultValue={project?.outcome}
              placeholder="Angka atau dampak yang terukur."
            />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold">Tautan & media</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="URL repositori" htmlFor="repo_url">
            <Input
              id="repo_url"
              name="repo_url"
              type="url"
              defaultValue={project?.repo_url}
              placeholder="https://github.com/..."
            />
          </Field>

          <Field label="URL demo" htmlFor="demo_url">
            <Input
              id="demo_url"
              name="demo_url"
              type="url"
              defaultValue={project?.demo_url}
              placeholder="https://..."
            />
          </Field>

          <div className="sm:col-span-2">
            <Field
              label="Gambar sampul"
              htmlFor="thumbnail_file"
              hint="JPG/PNG/WebP, maksimal 2 MB."
            >
              <input
                id="thumbnail_file"
                name="thumbnail_file"
                type="file"
                accept="image/*"
                className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm"
              />
            </Field>

            <input
              type="hidden"
              name="thumbnail_current"
              value={project?.thumbnail_url ?? ""}
            />

            {project?.thumbnail_url ? (
              <div className="mt-3 flex items-center gap-3">
                <div className="relative h-16 w-24 overflow-hidden rounded-md border border-border bg-muted">
                  <Image
                    src={project.thumbnail_url}
                    alt="Sampul saat ini"
                    fill
                    sizes="96px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Sampul saat ini. Unggah berkas baru untuk menggantinya.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold">Pengaturan tampilan</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Urutan" htmlFor="sort_order" hint="Angka kecil tampil lebih dulu.">
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={project?.sort_order ?? 0}
            />
          </Field>

          <div className="flex flex-col justify-center gap-2 pt-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="published"
                defaultChecked={project?.published ?? true}
                className="size-4 accent-[var(--primary)]"
              />
              Tampilkan di situs publik
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={project?.featured ?? false}
                className="size-4 accent-[var(--primary)]"
              />
              Tandai sebagai proyek unggulan
            </label>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <SubmitButton>{project ? "Simpan perubahan" : "Tambah proyek"}</SubmitButton>
      </div>
    </form>
  );
}
