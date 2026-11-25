import {
  fallbackCertifications,
  fallbackExperiences,
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  type Certification,
  type Experience,
  type Profile,
  type Project,
  type SkillGroup,
} from "@/lib/data/fallback";

/**
 * Data access layer.
 *
 * Saat ini seluruh halaman publik memakai konten fallback dari
 * `lib/data/fallback.ts` supaya situs bisa dibangun dan dilihat sebelum
 * Supabase terhubung. Ketika environment Supabase tersedia, fungsi-fungsi
 * di bawah akan membaca tabel yang sama (lihat blueprint M1).
 */

export function getProfile(): Profile {
  return fallbackProfile;
}

export function getProjects(): Project[] {
  return fallbackProjects;
}

export function getFeaturedProjects(): Project[] {
  return fallbackProjects.filter((project) => project.featured);
}

export function getOtherProjects(): Project[] {
  return fallbackProjects.filter((project) => !project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return fallbackProjects.find((project) => project.slug === slug);
}

export function getExperiences(): Experience[] {
  return fallbackExperiences;
}

export function getSkillGroups(): SkillGroup[] {
  return fallbackSkills;
}

export function getCertifications(): Certification[] {
  return fallbackCertifications;
}
