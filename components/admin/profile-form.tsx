"use client";

import { useActionState } from "react";
import { saveProfile } from "@/lib/actions/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/admin/field";
import { FormMessage, SubmitButton } from "@/components/admin/form-parts";

export type ProfileFormValues = {
  id: string;
  full_name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  availability: string;
};

export function ProfileForm({ profile }: { profile: ProfileFormValues }) {
  const [state, formAction] = useActionState(saveProfile, {});

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={profile.id} />

      <FormMessage error={state.error} success={state.success} />

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama lengkap" htmlFor="full_name">
            <Input
              id="full_name"
              name="full_name"
              required
              defaultValue={profile.full_name}
            />
          </Field>

          <Field label="Headline" htmlFor="headline">
            <Input
              id="headline"
              name="headline"
              defaultValue={profile.headline}
              placeholder="Fullstack Web Developer"
            />
          </Field>

          <Field label="Lokasi" htmlFor="location">
            <Input
              id="location"
              name="location"
              defaultValue={profile.location}
            />
          </Field>

          <Field label="Status ketersediaan" htmlFor="availability">
            <Input
              id="availability"
              name="availability"
              defaultValue={profile.availability}
              placeholder="Terbuka untuk peluang full-time"
            />
          </Field>

          <Field label="Email publik" htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={profile.email}
            />
          </Field>

          <Field label="URL LinkedIn" htmlFor="linkedin_url">
            <Input
              id="linkedin_url"
              name="linkedin_url"
              type="url"
              defaultValue={profile.linkedin_url}
            />
          </Field>

          <Field label="URL GitHub" htmlFor="github_url">
            <Input
              id="github_url"
              name="github_url"
              type="url"
              defaultValue={profile.github_url}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field
              label="Bio"
              htmlFor="bio"
              hint="Pisahkan paragraf dengan satu baris kosong."
            >
              <Textarea
                id="bio"
                name="bio"
                rows={8}
                defaultValue={profile.bio}
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton>Simpan profil</SubmitButton>
      </div>
    </form>
  );
}
