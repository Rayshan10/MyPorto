import Image from "next/image";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { getProfile } from "@/lib/data";
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

export async function Hero() {
  const profile = await getProfile();

  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 72% 30%, var(--hero-glow) 0%, var(--hero-mid) 48%, var(--background) 100%)",
          }}
        />

        <div className="hero-media absolute inset-y-0 right-0 w-full sm:w-[88%] lg:w-[72%]">
          <Image
            src="/images/rayshan.webp"
            alt="Potret hitam putih Rayshan Gani Putra"
            fill
            priority
            sizes="(min-width: 1024px) 72vw, (min-width: 640px) 88vw, 100vw"
            className="object-cover object-[50%_55%] grayscale contrast-[1.08] brightness-[0.9]"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 10%, rgba(0,0,0,0.85) 26%, #000 42%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 10%, rgba(0,0,0,0.85) 26%, #000 42%)",
            }}
          />
          <Image
            src="/images/rayshan.webp"
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 72vw, (min-width: 640px) 88vw, 100vw"
            className="scale-x-[1.06] object-cover object-[50%_55%] opacity-80 blur-[6px] grayscale contrast-[1.08] brightness-[0.88]"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 10%, rgba(0,0,0,0.5) 20%, transparent 38%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 10%, rgba(0,0,0,0.5) 20%, transparent 38%)",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-background/85 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-background via-background/80 to-background/10 sm:block lg:via-background/25 lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="grain absolute inset-0" />
      </div>

      <div className="relative">
        <div className="container-page relative flex min-h-svh flex-col justify-center pt-32 pb-20 sm:pt-40 sm:pb-16 lg:pt-44 lg:pb-12">
          <div className="max-w-[37rem]">
            <Reveal>
              <p className="flex items-center gap-5 text-[1.55rem] text-foreground/80">
                <span className="h-[2px] w-20 bg-brand" aria-hidden />
                Hello, I&apos;m
              </p>
            </Reveal>

            <Reveal delay={0.04}>
              <h1 className="display mt-4 whitespace-nowrap text-[clamp(3.4rem,8.6vw,8rem)]">
                Rayshan
                <br />
                Gani Putra
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 text-[1.9rem] font-bold tracking-tight sm:text-[2.1rem]">
                Fullstack{" "}
                <span className="text-muted-foreground">Developer</span>
              </p>

              <p className="mt-5 max-w-[540px] text-[1.05rem] leading-[1.75] text-muted-foreground sm:text-[1.18rem]">
                An Informatics Engineering student who is passionate about
                building web applications and exploring modern technologies.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#proyek"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 lg:h-16 lg:px-8 lg:text-base"
                >
                  View My Projects
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#tentang"
                  className="inline-flex h-14 items-center rounded-full border border-foreground/30 px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground/5 lg:h-16 lg:px-8 lg:text-base"
                >
                  About Me
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-14 flex items-center gap-6">
                <span className="h-10 w-px bg-border" aria-hidden />
                {[
                  {
                    href: profile.github_url,
                    label: "GitHub",
                    Icon: GithubIcon,
                  },
                  {
                    href: profile.linkedin_url,
                    label: "LinkedIn",
                    Icon: LinkedinIcon,
                  },
                  {
                    href: `mailto:${profile.email}`,
                    label: "Email",
                    Icon: Mail,
                  },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-brand"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <a
            href="#tentang"
            aria-label="Gulir ke bagian tentang"
            className="float-y absolute right-5 bottom-10 hidden h-14 w-9 place-items-center rounded-full border border-foreground/30 text-foreground/80 transition-colors hover:border-foreground hover:text-foreground lg:grid"
          >
            <ArrowDown className="size-4" />
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-border bg-brand py-3 text-brand-foreground">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center"
              aria-hidden={copy === 1}
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.22em]"
                >
                  {item}
                  <span className="mx-5 text-[0.55rem] opacity-60">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
