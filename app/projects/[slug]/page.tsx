import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/shared/brand-icons";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { initials } from "@/lib/format";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { ProjectCard } from "@/components/shared/project-card";
import { TechBadge } from "@/components/shared/tech-badge";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Proyek tidak ditemukan" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

const sections = [
  { key: "problem", index: "01", label: "Masalah" },
  { key: "solution", index: "02", label: "Solusi" },
  { key: "outcome", index: "03", label: "Hasil" },
] as const;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const otherProjects = getProjects()
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="container-page py-10 sm:py-14">
          <Link
            href="/#proyek"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Kembali ke proyek
          </Link>

          <header className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] text-muted-foreground">
              <span>{project.year}</span>
              <span aria-hidden>·</span>
              <span>{project.role}</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {project.title}
            </h1>
            <p className="prose-copy mt-4 max-w-2xl">{project.summary}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.repo_url ? (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <GithubIcon className="size-4" />
                  Lihat Repository
                </a>
              ) : null}
              {project.demo_url ? (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Live Demo
                  <ArrowUpRight className="size-4" />
                </a>
              ) : null}
            </div>
          </header>

          <div className="relative mt-10 aspect-[16/7] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-stone-100 via-orange-50 to-stone-50">
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-mono text-6xl font-semibold tracking-tight text-stone-300 sm:text-8xl">
                {initials(project.title)}
              </span>
            </div>
            <span className="absolute bottom-4 left-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-400">
              {project.slug} · {project.year}
            </span>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {sections.map((section) => (
              <section key={section.key}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary">
                    {section.index}
                  </span>
                  <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {section.label}
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project[section.key]}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-primary">+</span>
              <h2 className="eyebrow">Proyek lainnya</h2>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
