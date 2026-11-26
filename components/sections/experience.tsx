import { getExperiences } from "@/lib/data";
import { formatRange } from "@/lib/format";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechBadge } from "@/components/shared/tech-badge";

export async function ExperienceSection() {
  const experiences = await getExperiences();

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

        <div className="mt-10 border-t border-foreground/25">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company} delay={index * 0.05}>
              <article className="group grid gap-5 border-b border-border py-8 transition-colors md:grid-cols-[56px_200px_1fr] md:gap-8">
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {formatRange(experience.start_date, experience.end_date)}
                  </p>
                  <p className="mt-2 inline-flex border border-border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {experience.employment_type}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {experience.location}
                  </p>
                </div>

                <div>
                  <h3 className="display text-2xl sm:text-3xl">
                    {experience.role}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium">
                    {experience.company}
                  </p>
                  <p className="prose-copy mt-3 max-w-2xl">
                    {experience.description}
                  </p>

                  <ul className="mt-5 grid gap-2">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-2 h-px w-3 shrink-0 bg-foreground/40" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
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
