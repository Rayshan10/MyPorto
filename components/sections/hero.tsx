import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { getExperiences, getProfile, getProjects } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { Reveal } from "@/components/shared/reveal";

const marqueeItems = [
  "Fullstack Web Developer",
  "Laravel",
  "React",
  "Node.js",
  "TypeScript",
  "Bandung, Indonesia",
];

const metaRows = [
  { label: "Lokasi", value: "Bandung, ID" },
  { label: "Fokus", value: "Fullstack Web" },
  { label: "Stack", value: "Laravel · React · Node" },
];

export async function Hero() {
  const profile = await getProfile();
  const projects = await getProjects();
  const experiences = await getExperiences();

  const stats = [
    { value: String(projects.length).padStart(2, "0"), label: "Proyek" },
    { value: String(experiences.length).padStart(2, "0"), label: "Pengalaman" },
    { value: "47", label: "Pengurus dipimpin" },
    { value: "3.71", label: "IPK" },
  ];

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="container-page">
        <div className="flex items-center justify-between border-b border-border py-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Portfolio — 2026</span>
          <span className="hidden sm:inline">{profile.location}</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-foreground" />
            Open to work
          </span>
        </div>

        <div className="grid gap-10 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
          <div className="flex flex-col lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Fullstack Web Developer</p>
              <h1 className="display mt-4 text-[clamp(3.1rem,10.5vw,7.4rem)]">
                Rayshan
                <br />
                Gani Putra
                <span className="text-muted-foreground">.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.05}>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-4 sm:grid-cols-3">
                {metaRows.map((row) => (
                  <div key={row.label}>
                    <dt className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-sm">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 grid gap-8 sm:grid-cols-[1.1fr_auto] sm:items-end">
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Membangun sistem web yang menyelesaikan masalah operasional
                  nyata — dari audit 47.000 baris data instansi sampai
                  monitoring distribusi berbasis QR Code.
                </p>

                <div className="flex flex-col items-start gap-2">
                  <a
                    href="#proyek"
                    className="inline-flex h-10 items-center gap-2 bg-primary px-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-foreground/80"
                  >
                    Lihat Proyek
                    <ArrowDownRight className="size-3.5" />
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex h-10 items-center gap-2 border border-border px-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors hover:bg-muted"
                  >
                    <Mail className="size-3.5" />
                    Email Saya
                  </a>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-6 border-t border-border pt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <GithubIcon className="size-3.5" />
                  GitHub
                  <ArrowUpRight className="size-3" />
                </a>
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <LinkedinIcon className="size-3.5" />
                  LinkedIn
                  <ArrowUpRight className="size-3" />
                </a>
                <span className="ml-auto hidden sm:inline">
                  {profile.availability}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <figure className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="relative">
                <div className="grain relative aspect-[3/4] overflow-hidden border border-foreground/25 bg-muted">
                  <Image
                    src="/images/rayshan.webp"
                    alt="Potret hitam putih Rayshan Gani Putra"
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
                    className="object-cover object-center grayscale contrast-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />

                  <span
                    aria-hidden
                    className="absolute top-2 left-2 size-3 border-t border-l border-background/70"
                  />
                  <span
                    aria-hidden
                    className="absolute top-2 right-2 size-3 border-t border-r border-background/70"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-2 size-3 border-b border-l border-background/70"
                  />
                  <span
                    aria-hidden
                    className="absolute right-2 bottom-2 size-3 border-b border-r border-background/70"
                  />

                  <span className="absolute top-5 left-5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-background/80">
                    Photocopy — 2026
                  </span>
                  <span className="absolute right-5 bottom-5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-background/80">
                    Bandung, ID
                  </span>
                </div>
              </div>
              <figcaption className="flex items-center justify-between border-x border-b border-border px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                <span>Fig. 01 — Rayshan G.P.</span>
                <span>Fullstack Developer</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-border py-5 pr-4 sm:border-b-0 sm:border-r sm:pl-4 sm:first:pl-0 sm:last:border-r-0"
            >
              <p className="display text-3xl sm:text-4xl">{stat.value}</p>
              <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 overflow-hidden border-y border-foreground/15 bg-foreground py-3 text-background">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.22em]"
                >
                  {item}
                  <span className="mx-5 text-[0.55rem] opacity-50">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
