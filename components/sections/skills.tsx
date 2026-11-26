import { getSkillGroups } from "@/lib/data";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export async function SkillsSection() {
  const groups = await getSkillGroups();

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

        <div className="mt-10 border-t border-foreground/25">
          {groups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.04}>
              <div className="grid gap-3 border-b border-border py-6 sm:grid-cols-[200px_1fr_32px] sm:gap-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.6rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.18em]">
                    {group.category}
                  </h3>
                  <span className="ml-auto font-mono text-[0.6rem] text-muted-foreground sm:hidden">
                    {group.items.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                  {group.items.map((item, itemIndex) => (
                    <span key={item} className="text-sm text-muted-foreground">
                      {item}
                      {itemIndex < group.items.length - 1 ? (
                        <span className="ml-2 text-border">/</span>
                      ) : null}
                    </span>
                  ))}
                </div>

                <span className="hidden font-mono text-[0.6rem] text-muted-foreground sm:block sm:text-right">
                  {group.items.length}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
