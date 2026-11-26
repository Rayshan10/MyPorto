import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/shared/brand-icons";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { ProjectCard } from "@/components/shared/project-card";
import { TechBadge } from "@/components/shared/tech-badge";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const otherProjects = (await getProjects())
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="container-page py-10 sm:py-14">
          <Link
            href="/#proyek"
            className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Kembali ke proyek
          </Link>

          <header className="mt-8">
            <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>{project.year}</span>
              <span className="h-px w-8 bg-border" aria-hidden />
              <span>{project.role}</span>
            </div>

            <h1 className="display mt-5 max-w-4xl text-4xl text-balance sm:text-6xl lg:text-7xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.repo_url ? (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 border border-border px-3.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors hover:bg-muted"
                >
                  <GithubIcon className="size-3.5" />
                  Repository
                </a>
              ) : null}
              {project.demo_url ? (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 bg-primary px-3.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-foreground/80"
                >
                  Live Demo
                  <ArrowUpRight className="size-3.5" />
                </a>
              ) : null}
            </div>
          </header>

          <div className="grain relative mt-10 aspect-[4/3] overflow-hidden border border-border bg-muted sm:aspect-[16/9]">
            {project.thumbnail_url ? (
              <>
                <Image
                  src={project.thumbnail_url}
                  alt={`Tangkapan layar ${project.title}`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover grayscale contrast-[1.05]"
                />
                <span className="absolute bottom-3 left-4 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {project.slug} · {project.year}
                </span>
              </>
            ) : (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(14,14,12,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,14,12,0.07) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                  }}
                />

                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8">
                  <div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-foreground/45">
                    <span>Fig. 01 — Sampul proyek</span>
                    <span>{project.year}</span>
                  </div>

                  <p className="display max-w-3xl text-3xl text-foreground/70 sm:text-5xl lg:text-6xl">
                    {project.title}
                  </p>

                  <div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-foreground/45">
                    <span>{project.role}</span>
                    <span>{project.slug}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-12 grid gap-8 border-t border-foreground/25 pt-8 md:grid-cols-3 md:gap-10">
            {sections.map((section) => (
              <section key={section.key}>
                <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em]">
                  <span>{section.index}</span>
                  <span className="h-px w-5 bg-border" aria-hidden />
                  <span className="text-muted-foreground">
                    {section.label}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {project[section.key]}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-foreground/25 pt-3">
            <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Proyek lainnya</span>
              <span>({String(otherProjects.length).padStart(2, "0")})</span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((item, index) => (
                <ProjectCard key={item.slug} project={item} index={index + 1} />
              ))}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
