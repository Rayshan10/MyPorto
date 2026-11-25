import { getSkillGroups } from "@/lib/data";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function SkillsSection() {
  const groups = getSkillGroups();

  return (
    <section id="keahlian" className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index="04"
            label="Keahlian"
            title="Alat yang dipakai, bukan sekadar dicantumkan."
            description="Dikelompokkan berdasarkan peran — setiap teknologi di bawah ini pernah dipakai di proyek nyata atau magang."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.04}>
              <div className="h-full rounded-xl border border-border bg-card p-5">
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
