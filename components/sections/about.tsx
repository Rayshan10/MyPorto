import { getProfile } from "@/lib/data";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const focusItems = [
  "Backend Laravel & API yang teruji",
  "Antarmuka React/Next.js yang rapi",
  "Perancangan basis data relasional",
  "Deployment & otomatisasi",
];

export async function About() {
  const profile = await getProfile();
  const paragraphs = profile.bio.split("\n\n");

  return (
    <section id="tentang" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            index="01"
            label="Tentang"
            title="Kode yang selesai, bukan sekadar jalan."
          />

          <div className="mt-8 max-w-xl space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                className={
                  index === 0
                    ? "text-[1.05rem] leading-relaxed text-foreground"
                    : "prose-copy"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-8 border-l-2 border-brand pl-4 text-lg leading-snug text-muted-foreground italic">
            “Menutup pekerjaan dengan pengujian, bukan asumsi.”
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="border-t border-foreground">
            <div className="flex items-baseline justify-between border-b border-border py-3">
              <h3 className="eyebrow">Fokus saat ini</h3>
              <span className="font-mono text-[0.6rem] text-muted-foreground">
                A—04
              </span>
            </div>

            <ul>
              {focusItems.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-border py-3.5"
                >
                  <span className="font-mono text-[0.6rem] text-muted-foreground">
                    0{index + 1}
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-baseline justify-between border-b border-border py-3">
              <h3 className="eyebrow">Pendidikan</h3>
              <span className="font-mono text-[0.6rem] text-muted-foreground">
                2023—2026
              </span>
            </div>

            <p className="mt-4 text-sm font-medium leading-snug">
              Universitas Logistik dan Bisnis Internasional
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              D3 Teknik Informatika
            </p>

            <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
              <span className="eyebrow">IPK</span>
              <span className="display text-3xl">3.71 / 4.00</span>
            </div>

            <div className="mt-6 flex items-center justify-between border border-border px-3 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em]">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-foreground" />
                {profile.availability}
              </span>
              <span className="text-muted-foreground">WIB</span>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
