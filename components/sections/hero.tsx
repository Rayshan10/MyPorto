import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { getExperiences, getProfile, getProjects } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { Reveal } from "@/components/shared/reveal";

const profileRows = [
  { label: "Lokasi", value: "Bandung, Indonesia" },
  { label: "Fokus", value: "Fullstack Web" },
  { label: "Stack", value: "Laravel · React · Node" },
  { label: "Status", value: "Open to work", highlight: true },
];

export function Hero() {
  const profile = getProfile();
  const projects = getProjects();
  const experiences = getExperiences();

  const stats = [
    { value: String(projects.length).padStart(2, "0"), label: "Proyek" },
    { value: String(experiences.length).padStart(2, "0"), label: "Pengalaman" },
    { value: "47", label: "Pengurus dipimpin" },
    { value: "3.71", label: "IPK" },
  ];

  return (
    <section id="hero" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_70%_0%,#ffedd5_0%,transparent_70%)]"
      />
      <div className="container-page pt-14 pb-16 sm:pt-20 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              {profile.availability}
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Rayshan Gani Putra
              <span className="text-primary">.</span>
            </h1>

            <p className="mt-3 font-mono text-sm text-muted-foreground">
              {profile.headline} · {profile.location}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Membangun sistem web yang menyelesaikan masalah operasional nyata —
              dari audit 47.000 baris data instansi sampai monitoring distribusi
              berbasis QR Code.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#proyek"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Lihat Proyek
                <ArrowDownRight className="size-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Mail className="size-4" />
                Email Saya
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4 text-muted-foreground">
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-foreground"
              >
                <GithubIcon className="size-4" />
                GitHub
                <ArrowUpRight className="size-3" />
              </a>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-foreground"
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="font-mono text-[0.7rem] text-muted-foreground">
                  profil.json
                </span>
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2 rounded-full bg-border" />
                  <span className="size-2 rounded-full bg-border" />
                  <span className="size-2 rounded-full bg-primary/70" />
                </span>
              </div>
              <dl className="divide-y divide-border">
                {profileRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 px-4 py-3.5"
                  >
                    <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="text-right text-sm font-medium">
                      {row.highlight ? (
                        <span className="inline-flex items-center gap-1.5 text-primary">
                          <span className="size-1.5 rounded-full bg-primary" />
                          {row.value}
                        </span>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-border bg-muted/50 px-4 py-3">
                <p className="font-mono text-[0.7rem] text-muted-foreground">
                  &gt; siap untuk tantangan baru
                  <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-primary align-middle" />
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card px-4 py-5">
              <p className="font-mono text-2xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
