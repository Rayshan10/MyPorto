import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter.")
    .max(80, "Nama terlalu panjang."),
  email: z
    .string()
    .trim()
    .email("Alamat email tidak valid.")
    .max(160, "Email terlalu panjang."),
  subject: z
    .string()
    .trim()
    .max(120, "Subjek terlalu panjang.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Pesan minimal 20 karakter.")
    .max(4000, "Pesan maksimal 4000 karakter."),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
