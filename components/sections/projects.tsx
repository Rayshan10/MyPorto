import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects, getOtherProjects } from "@/lib/data";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/shared/project-card";
import { TechBadge } from "@/components/shared/tech-badge";

export async function ProjectsSection() {
  const featured = await getFeaturedProjects();
  const others = await getOtherProjects();

  return (
    <section id="proyek" className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index="03"
            label="Proyek"
            title="Setiap proyek dimulai dari masalah nyata."
            description="Bukan daftar fitur — ini ringkasan masalah, pendekatan teknis, dan hasil yang bisa diukur."
          />
        </Reveal>

        <div className="mt-10 flex items-center justify-between border-t border-foreground/25 pt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Proyek unggulan</span>
          <span>({String(featured.length).padStart(2, "0")})</span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} featured index={index + 1} />
            </Reveal>
          ))}
        </div>

        {others.length > 0 ? (
          <div className="mt-14">
            <div className="flex items-center justify-between border-t border-foreground/25 pt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Proyek lainnya</span>
              <span>({String(others.length).padStart(2, "0")})</span>
            </div>

            <div className="mt-1">
              {others.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.04}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group grid grid-cols-[28px_1fr_auto] items-center gap-4 border-b border-border py-4 transition-colors hover:bg-card sm:grid-cols-[40px_1fr_170px_90px] sm:gap-6"
                  >
                    <span className="font-mono text-[0.6rem] text-muted-foreground">
                      {String(featured.length + index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">{project.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {project.summary}
                      </p>
                    </div>

                    <div className="hidden flex-wrap gap-1 sm:flex">
                      {project.tech.slice(0, 2).map((tech) => (
                        <TechBadge key={tech}>{tech}</TechBadge>
                      ))}
                    </div>

                    <div className="flex items-center justify-end gap-3 font-mono text-[0.6rem] text-muted-foreground">
                      {project.year}
                      <ArrowUpRight className="size-3.5 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
