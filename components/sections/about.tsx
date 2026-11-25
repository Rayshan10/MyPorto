import { GraduationCap, Target } from "lucide-react";
import { getProfile } from "@/lib/data";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const focusItems = [
  "Backend Laravel & API yang teruji",
  "Antarmuka React/Next.js yang rapi",
  "Perancangan basis data relasional",
  "Deployment & otomatisasi",
];

export function About() {
  const profile = getProfile();
  const paragraphs = profile.bio.split("\n\n");

  return (
    <section id="tentang" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            index="01"
            label="Tentang"
            title="Kode yang selesai, bukan sekadar jalan."
          />
          <div className="mt-6 space-y-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="prose-copy max-w-xl">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-primary" />
              <h3 className="text-sm font-semibold">Fokus saat ini</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {focusItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-primary" />
              <h3 className="text-sm font-semibold">Pendidikan</h3>
            </div>
            <p className="mt-3 text-sm font-medium">
              Universitas Logistik dan Bisnis Internasional
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              D3 Teknik Informatika · 2023–2026
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              IPK 3.71 / 4.00
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
