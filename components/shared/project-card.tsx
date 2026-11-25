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
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const visibleTech = project.tech.slice(0, featured ? 4 : 3);
  const remaining = project.tech.length - visibleTech.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-gradient-to-br from-stone-100 via-orange-50 to-stone-50">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={`Tangkapan layar ${project.title}`}
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-mono text-4xl font-semibold tracking-tight text-stone-300">
              {initials(project.title)}
            </span>
            <span className="absolute top-3 right-3 font-mono text-[0.7rem] text-stone-400">
              {project.year}
            </span>
            <span className="absolute bottom-3 left-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-stone-400">
              {project.role}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-balance">
            {project.title}
          </h3>
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {visibleTech.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
          {remaining > 0 ? <TechBadge>{`+${remaining}`}</TechBadge> : null}
        </div>
      </div>
    </Link>
  );
}
