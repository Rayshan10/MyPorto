import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/fallback";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { TechBadge } from "@/components/shared/tech-badge";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
  index?: number;
};

export function ProjectCard({
  project,
  featured = false,
  index,
}: ProjectCardProps) {
  const visibleTech = project.tech.slice(0, featured ? 4 : 3);
  const remaining = project.tech.length - visibleTech.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-[6px_6px_0_0_var(--brand)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
        {project.thumbnail_url ? (
          <>
            <Image
              src={project.thumbnail_url}
              alt={`Tangkapan layar ${project.title}`}
              fill
              sizes={
                featured
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 1024px) 33vw, 100vw"
              }
              className="object-cover grayscale contrast-[1.05] transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute top-3 right-3 bg-background/90 px-1.5 py-0.5 font-mono text-[0.58rem] tracking-[0.1em] text-foreground">
              {project.year}
            </span>
          </>
        ) : (
          <div className="grain absolute inset-0">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-foreground/10 bg-background/50 px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-foreground/45 backdrop-blur-[1px]">
              <span>{index ? `Fig. ${String(index).padStart(2, "0")}` : "Proyek"}</span>
              <span className="max-w-[55%] truncate">{project.slug}</span>
            </div>

            <div className="absolute inset-0 grid place-items-center">
              <span className="display text-7xl text-foreground/25 transition-transform duration-500 group-hover:scale-[1.04] sm:text-8xl">
                {initials(project.title)}
              </span>
            </div>

            <span className="absolute bottom-3 left-3 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-foreground/45">
              {project.year}
            </span>
            <span className="absolute right-3 bottom-3 max-w-[55%] truncate font-mono text-[0.55rem] uppercase tracking-[0.2em] text-foreground/45">
              {project.role}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              "text-balance font-medium leading-snug tracking-tight",
              featured ? "text-lg sm:text-xl" : "text-base",
            )}
          >
            {project.title}
          </h3>
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {visibleTech.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
          {remaining > 0 ? <TechBadge>{`+${remaining}`}</TechBadge> : null}
        </div>
      </div>
    </Link>
  );
}
