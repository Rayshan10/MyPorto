import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .url("URL tidak valid.")
  .optional()
  .or(z.literal(""));

export const projectSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter."),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung."),
  summary: z.string().trim().min(10, "Ringkasan minimal 10 karakter."),
  problem: z.string().trim().default(""),
  solution: z.string().trim().default(""),
  outcome: z.string().trim().default(""),
  role: z.string().trim().default(""),
  tech: z.string().trim().default(""),
  repo_url: optionalUrl,
  demo_url: optionalUrl,
  year: z.coerce.number().int().min(2000).max(2100),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  sort_order: z.coerce.number().int().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const experienceSchema = z.object({
  company: z.string().trim().min(2, "Nama instansi wajib diisi."),
  role: z.string().trim().min(2, "Peran wajib diisi."),
  employment_type: z.string().trim().default(""),
  location: z.string().trim().default(""),
  start_date: z.string().trim().min(4, "Tanggal mulai wajib diisi."),
  end_date: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().default(""),
  highlights: z.string().trim().default(""),
  tech: z.string().trim().default(""),
  sort_order: z.coerce.number().int().default(0),
});

export const skillSchema = z.object({
  name: z.string().trim().min(1, "Nama keahlian wajib diisi."),
  category: z.string().trim().min(1, "Kategori wajib diisi."),
  sort_order: z.coerce.number().int().default(0),
});

export const certificationSchema = z.object({
  name: z.string().trim().min(2, "Nama sertifikasi wajib diisi."),
  issuer: z.string().trim().min(2, "Penerbit wajib diisi."),
  issued_at: z.string().trim().optional().or(z.literal("")),
  credential_url: z.string().trim().url("URL tidak valid.").optional().or(z.literal("")),
  sort_order: z.coerce.number().int().default(0),
});

export const profileSchema = z.object({
  full_name: z.string().trim().min(2, "Nama wajib diisi."),
  headline: z.string().trim().default(""),
  bio: z.string().trim().default(""),
  location: z.string().trim().default(""),
  email: z.string().trim().email("Email tidak valid.").or(z.literal("")),
  linkedin_url: z.string().trim().url("URL LinkedIn tidak valid.").or(z.literal("")),
  github_url: z.string().trim().url("URL GitHub tidak valid.").or(z.literal("")),
  availability: z.string().trim().default(""),
});
