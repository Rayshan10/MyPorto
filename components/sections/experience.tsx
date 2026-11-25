import { getExperiences } from "@/lib/data";
import { formatRange } from "@/lib/format";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechBadge } from "@/components/shared/tech-badge";

export function ExperienceSection() {
  const experiences = getExperiences();

  return (
    <section id="pengalaman" className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index="02"
            label="Pengalaman"
            title="Belajar dari sistem yang berjalan."
            description="Bukan hanya proyek pribadi — ada tanggung jawab nyata pada data dan orang."
          />
        </Reveal>

        <div className="mt-10 space-y-8">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company} delay={index * 0.05}>
              <article className="grid gap-5 border-t border-border pt-8 md:grid-cols-[220px_1fr] md:gap-10">
                <div className="space-y-2">
                  <p className="font-mono text-xs text-muted-foreground">
                    {formatRange(experience.start_date, experience.end_date)}
                  </p>
                  <p className="inline-flex rounded-full border border-border bg-muted px-2.5 py-0.5 text-[0.7rem] text-muted-foreground">
                    {experience.employment_type}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {experience.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-primary">
                    {experience.company}
                  </p>
                  <p className="prose-copy mt-3 max-w-2xl">
                    {experience.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/70" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {experience.tech.map((tech) => (
                      <TechBadge key={tech}>{tech}</TechBadge>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
