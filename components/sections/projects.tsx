import { getFeaturedProjects, getOtherProjects } from "@/lib/data";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/shared/project-card";

export function ProjectsSection() {
  const featured = getFeaturedProjects();
  const others = getOtherProjects();

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

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} featured />
            </Reveal>
          ))}
        </div>

        {others.length > 0 ? (
          <div className="mt-14">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-primary">+</span>
              <h3 className="eyebrow">Proyek lainnya</h3>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.04}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
