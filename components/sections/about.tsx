import Image from "next/image";
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
  const photo = profile.photo_url || "/images/foto-formal.webp";

  return (
    <section id="tentang" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Narasi */}
        <Reveal className="flex flex-col">
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

          <div className="mt-10 max-w-xl">
            <div className="flex items-baseline justify-between border-b border-border pb-2.5">
              <h3 className="eyebrow">Fokus saat ini</h3>
              <span className="font-mono text-[0.6rem] text-muted-foreground">
                A—04
              </span>
            </div>

            <ul className="grid sm:grid-cols-2 sm:gap-x-6">
              {focusItems.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 border-b border-border py-3"
                >
                  <span className="font-mono text-[0.6rem] text-muted-foreground">
                    0{index + 1}
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 max-w-xl border-l-2 border-brand pl-4 text-lg leading-snug text-muted-foreground italic">
            “Menutup pekerjaan dengan pengujian, bukan asumsi.”
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground lg:mt-auto">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand" />
              {profile.availability}
            </span>
            <span>{profile.location}</span>
            <span className="text-foreground">WIB</span>
          </div>
        </Reveal>

        {/* Foto formal */}
        <Reveal delay={0.1}>
          <figure className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="mb-3 flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-6 bg-brand" aria-hidden />
                Foto formal
              </span>
              <span>2026</span>
            </div>

            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-card">
              <Image
                src={photo}
                alt={`Foto formal ${profile.full_name}`}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 448px, 100vw"
                className="object-cover object-[50%_12%] grayscale contrast-[1.05] brightness-[0.96]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/5 to-transparent"
              />
              <div aria-hidden className="grain absolute inset-0" />
            </div>

            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>{profile.full_name}</span>
              <span>{profile.headline}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
