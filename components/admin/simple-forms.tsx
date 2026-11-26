"use client";

import { useActionState } from "react";
import { saveCertification, saveSkill } from "@/lib/actions/content";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/admin/field";
import { FormMessage, SubmitButton } from "@/components/admin/form-parts";

export function SkillForm({
  skill,
  categories,
}: {
  skill?: { id: string; name: string; category: string; sort_order: number };
  categories: string[];
}) {
  const [state, formAction] = useActionState(saveSkill, {});

  return (
    <form action={formAction} className="space-y-4">
      {skill ? <input type="hidden" name="id" value={skill.id} /> : null}

      <FormMessage error={state.error} success={state.success} />

      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_6rem]">
        <Field label="Keahlian" htmlFor="name">
          <Input
            id="name"
            name="name"
            required
            defaultValue={skill?.name}
            placeholder="TypeScript"
          />
        </Field>

        <Field label="Kategori" htmlFor="category">
          <Input
            id="category"
            name="category"
            required
            list="skill-categories"
            defaultValue={skill?.category}
            placeholder="Bahasa"
          />
          <datalist id="skill-categories">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </Field>

        <Field label="Urutan" htmlFor="sort_order">
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={skill?.sort_order ?? 0}
          />
        </Field>
      </div>

      <SubmitButton className="w-full sm:w-auto">
        {skill ? "Simpan keahlian" : "Tambah keahlian"}
      </SubmitButton>
    </form>
  );
}

export function CertificationForm({
  certification,
}: {
  certification?: {
    id: string;
    name: string;
    issuer: string;
    issued_at: string;
    credential_url: string;
    sort_order: number;
  };
}) {
  const [state, formAction] = useActionState(saveCertification, {});

  return (
    <form action={formAction} className="space-y-4">
      {certification ? (
        <input type="hidden" name="id" value={certification.id} />
      ) : null}

      <FormMessage error={state.error} success={state.success} />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nama sertifikasi" htmlFor="name">
          <Input
            id="name"
            name="name"
            required
            defaultValue={certification?.name}
            placeholder="Belajar Dasar Pemrograman Web"
          />
        </Field>

        <Field label="Penerbit" htmlFor="issuer">
          <Input
            id="issuer"
            name="issuer"
            required
            defaultValue={certification?.issuer}
            placeholder="Dicoding Indonesia"
          />
        </Field>

        <Field label="Tanggal terbit" htmlFor="issued_at">
          <Input
            id="issued_at"
            name="issued_at"
            type="date"
            defaultValue={certification?.issued_at}
          />
        </Field>

        <Field label="Urutan" htmlFor="sort_order">
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={certification?.sort_order ?? 0}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="URL kredensial"
            htmlFor="credential_url"
            hint="Opsional — tautan sertifikat digital."
          >
            <Input
              id="credential_url"
              name="credential_url"
              type="url"
              defaultValue={certification?.credential_url}
              placeholder="https://..."
            />
          </Field>
        </div>
      </div>

      <SubmitButton className="w-full sm:w-auto">
        {certification ? "Simpan sertifikasi" : "Tambah sertifikasi"}
      </SubmitButton>
    </form>
  );
}
