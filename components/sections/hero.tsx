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

        <div className="hero-media absolute inset-y-0 right-0 w-full sm:w-[72%] lg:w-[52%]">
          <Image
            src="/images/rayshan.webp"
            alt="Potret hitam putih Rayshan Gani Putra"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, (min-width: 640px) 72vw, 100vw"
            className="object-cover object-[50%_72%] grayscale contrast-[1.08] brightness-[0.92]"
          />
        </div>

        <div className="absolute inset-0 bg-background/80 sm:hidden" />
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(90deg, var(--background) 0%, var(--background) 50%, color-mix(in srgb, var(--background) 88%, transparent) 55%, color-mix(in srgb, var(--background) 68%, transparent) 61%, color-mix(in srgb, var(--background) 40%, transparent) 66%, color-mix(in srgb, var(--background) 12%, transparent) 70%, transparent 74%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="grain absolute inset-0" />
      </div>

      <div className="relative">
        <div className="container-page relative flex min-h-svh flex-col justify-center pt-[clamp(6.5rem,20vh,13rem)] pb-[clamp(2rem,4.5vh,3rem)] lg:pt-[clamp(6.5rem,25vh,13rem)]">
          <div className="max-w-[40rem]">
            <Reveal>
              <p className="flex items-center gap-4 text-[clamp(1.1rem,min(1.5vw,2.7vh),1.65rem)] text-foreground/80 sm:gap-5">
                <span className="h-[2px] w-16 bg-brand sm:w-20" aria-hidden />
                Hello, I&apos;m
              </p>
            </Reveal>

            <Reveal delay={0.04}>
              <h1 className="display mt-[clamp(0.5rem,3vh,1.9rem)] whitespace-nowrap text-[clamp(2.9rem,min(6.9vw,12.2vh),7.6rem)] leading-[0.85] tracking-[-0.01em]">
                Rayshan
                <br />
                Gani Putra
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-[clamp(0.75rem,3.9vh,2.4rem)] text-[clamp(1.3rem,min(2vw,3.5vh),2.15rem)] font-bold tracking-tight">
                Fullstack{" "}
                <span className="text-muted-foreground">Developer</span>
              </p>

              <p className="mt-[clamp(0.5rem,4.2vh,2.6rem)] max-w-[545px] text-[clamp(0.95rem,min(1.3vw,2.3vh),1.35rem)] leading-[1.5] text-muted-foreground">
                An Informatics Engineering student who is passionate about
                building web applications and exploring modern technologies.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-[clamp(1rem,4.4vh,2.75rem)] flex flex-wrap items-center gap-5 sm:gap-7">
                <a
                  href="#proyek"
                  className="group inline-flex h-[clamp(3rem,6.6vh,4rem)] items-center gap-2.5 rounded-full bg-brand px-6 text-[0.95rem] font-semibold text-brand-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 lg:px-8 lg:text-[1.05rem]"
                >
                  View My Projects
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#tentang"
                  className="inline-flex h-[clamp(3rem,6.6vh,4rem)] items-center rounded-full border border-foreground/30 px-6 text-[0.95rem] font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground/5 lg:px-8 lg:text-[1.05rem]"
                >
                  About Me
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-[clamp(1.25rem,5.6vh,3.4rem)] flex items-center gap-9">
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
