"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { saveExperience } from "@/lib/actions/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/admin/field";
import { FormMessage, SubmitButton } from "@/components/admin/form-parts";

export type ExperienceFormValues = {
  id: string;
  company: string;
  role: string;
  employment_type: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  highlights: string[];
  tech: string[];
  sort_order: number;
};

export function ExperienceForm({
  experience,
}: {
  experience?: ExperienceFormValues;
}) {
  const [state, formAction] = useActionState(saveExperience, {});

  return (
    <form action={formAction} className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm" className="h-8 -ml-2">
          <Link href="/admin/experiences">
            <ArrowLeft className="size-4" />
            Kembali
          </Link>
        </Button>
        <SubmitButton>{experience ? "Simpan perubahan" : "Tambah pengalaman"}</SubmitButton>
      </div>

      {experience ? <input type="hidden" name="id" value={experience.id} /> : null}

      <FormMessage error={state.error} success={state.success} />

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Instansi" htmlFor="company">
            <Input
              id="company"
              name="company"
              required
              defaultValue={experience?.company}
              placeholder="Nama perusahaan / organisasi"
            />
          </Field>

          <Field label="Peran" htmlFor="role">
            <Input
              id="role"
              name="role"
              required
              defaultValue={experience?.role}
              placeholder="Backend Developer"
            />
          </Field>

          <Field label="Jenis" htmlFor="employment_type">
            <Input
              id="employment_type"
              name="employment_type"
              defaultValue={experience?.employment_type}
              placeholder="Magang / Full-time / Organisasi"
            />
          </Field>

          <Field label="Lokasi" htmlFor="location">
            <Input
              id="location"
              name="location"
              defaultValue={experience?.location}
              placeholder="Bandung, Indonesia"
            />
          </Field>

          <Field label="Mulai" htmlFor="start_date">
            <Input
              id="start_date"
              name="start_date"
              type="date"
              required
              defaultValue={experience?.start_date}
            />
          </Field>

          <Field label="Selesai" htmlFor="end_date" hint="Kosongkan bila masih berjalan.">
            <Input
              id="end_date"
              name="end_date"
              type="date"
              defaultValue={experience?.end_date}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Deskripsi" htmlFor="description">
              <Textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={experience?.description}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field
              label="Poin pencapaian"
              htmlFor="highlights"
              hint="Satu poin per baris."
            >
              <Textarea
                id="highlights"
                name="highlights"
                rows={4}
                defaultValue={experience?.highlights.join("\n")}
              />
            </Field>
          </div>

          <Field label="Teknologi / keahlian" htmlFor="tech" hint="Pisahkan dengan koma.">
            <Input
              id="tech"
              name="tech"
              defaultValue={experience?.tech.join(", ")}
            />
          </Field>

          <Field label="Urutan" htmlFor="sort_order" hint="Angka kecil tampil lebih dulu.">
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={experience?.sort_order ?? 0}
            />
          </Field>
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton>{experience ? "Simpan perubahan" : "Tambah pengalaman"}</SubmitButton>
      </div>
    </form>
  );
}
