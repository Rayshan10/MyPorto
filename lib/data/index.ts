import { createPublicClient } from "@/lib/supabase/public";
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

type Row = Record<string, unknown>;

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" ? value : fallback;
}

function mapProject(row: Row): Project {
  return {
    slug: asString(row.slug),
    title: asString(row.title),
    summary: asString(row.summary),
    problem: asString(row.problem),
    solution: asString(row.solution),
    outcome: asString(row.outcome),
    role: asString(row.role),
    tech: asStringArray(row.tech),
    repo_url: typeof row.repo_url === "string" ? row.repo_url : null,
    demo_url: typeof row.demo_url === "string" ? row.demo_url : null,
    year: asNumber(row.year),
    featured: Boolean(row.featured),
    thumbnail_url: typeof row.thumbnail_url === "string" ? row.thumbnail_url : null,
  };
}

function mapProfile(row: Row): Profile {
  return {
    full_name: asString(row.full_name, fallbackProfile.full_name),
    headline: asString(row.headline, fallbackProfile.headline),
    bio: asString(row.bio, fallbackProfile.bio),
    location: asString(row.location, fallbackProfile.location),
    email: asString(row.email, fallbackProfile.email),
    linkedin_url: asString(row.linkedin_url, fallbackProfile.linkedin_url),
    github_url: asString(row.github_url, fallbackProfile.github_url),
    photo_url: typeof row.photo_url === "string" ? row.photo_url : null,
    cv_url: typeof row.cv_url === "string" ? row.cv_url : null,
    availability: asString(row.availability, fallbackProfile.availability),
  };
}

function mapExperience(row: Row): Experience {
  return {
    company: asString(row.company),
    role: asString(row.role),
    employment_type: asString(row.employment_type),
    location: asString(row.location),
    start_date: asString(row.start_date),
    end_date: typeof row.end_date === "string" ? row.end_date : null,
    description: asString(row.description),
    highlights: asStringArray(row.highlights),
    tech: asStringArray(row.tech),
  };
}

export async function getProfile(): Promise<Profile> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackProfile;

  try {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (!data) return fallbackProfile;
    return mapProfile(data as Row);
  } catch {
    return fallbackProfile;
  }
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackProjects;

  try {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (!data || data.length === 0) return fallbackProjects;
    return (data as Row[]).map(mapProject);
  } catch {
    return fallbackProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((project) => project.featured);
}

export async function getOtherProjects(): Promise<Project[]> {
  return (await getProjects()).filter((project) => !project.featured);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackExperiences;

  try {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("start_date", { ascending: false });

    if (!data || data.length === 0) return fallbackExperiences;
    return (data as Row[]).map(mapExperience);
  } catch {
    return fallbackExperiences;
  }
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackSkills;

  try {
    const { data } = await supabase
      .from("skills")
      .select("name, category, sort_order")
      .order("sort_order", { ascending: true });

    if (!data || data.length === 0) return fallbackSkills;

    const groups = new Map<string, string[]>();
    for (const row of data as Row[]) {
      const category = asString(row.category, "Lainnya");
      const name = asString(row.name);
      if (!name) continue;
      const items = groups.get(category) ?? [];
      items.push(name);
      groups.set(category, items);
    }

    return Array.from(groups, ([category, items]) => ({ category, items }));
  } catch {
    return fallbackSkills;
  }
}

export async function getCertifications(): Promise<Certification[]> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackCertifications;

  try {
    const { data } = await supabase
      .from("certifications")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("issued_at", { ascending: false });

    if (!data || data.length === 0) return fallbackCertifications;

    return (data as Row[]).map((row) => ({
      name: asString(row.name),
      issuer: asString(row.issuer),
      issued_at: asString(row.issued_at),
      credential_url:
        typeof row.credential_url === "string" ? row.credential_url : null,
    }));
  } catch {
    return fallbackCertifications;
  }
}
