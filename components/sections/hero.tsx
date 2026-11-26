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
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_35%,#2b2c2c_0%,#161717_45%,#0e0f0f_100%)]" />

        <div className="absolute inset-y-0 right-0 w-full sm:w-[82%] lg:w-[64%]">
          <Image
            src="/images/rayshan.webp"
            alt="Potret hitam putih Rayshan Gani Putra"
            fill
            priority
            sizes="(min-width: 1024px) 64vw, (min-width: 640px) 82vw, 100vw"
            className="object-cover object-[62%_center] grayscale contrast-[1.05]"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 16%, #000 38%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 16%, #000 38%)",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-background/80 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-background/80 via-transparent to-transparent sm:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />

        <div className="grain absolute inset-0" />
      </div>

      <div className="relative">
        <div className="container-page flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16 sm:py-20 lg:py-24">
        <div className="max-w-[38rem]">
          <Reveal>
            <p className="flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-12 bg-brand" aria-hidden />
              Halo, saya
            </p>
          </Reveal>

          <Reveal delay={0.04}>
            <h1 className="display mt-5 text-[clamp(3.2rem,8.4vw,7.2rem)]">
              Rayshan
              <br />
              Gani Putra
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
              Fullstack{" "}
              <span className="text-muted-foreground">Developer</span>
            </p>

            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
              Membangun sistem web yang menyelesaikan masalah operasional nyata
              — dari audit 47.000 baris data instansi sampai monitoring
              distribusi berbasis QR Code.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#proyek"
                className="group inline-flex h-12 items-center gap-2 bg-brand px-6 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-85"
              >
                Lihat Proyek
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#tentang"
                className="inline-flex h-12 items-center gap-2 border border-border bg-background/60 px-6 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-foreground"
              >
                Tentang Saya
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex items-center gap-5 border-l border-border pl-5">
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
                  className="text-muted-foreground transition-colors hover:text-brand"
                >
                  <Icon className="size-[1.15rem]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <a
          href="#tentang"
          aria-label="Gulir ke bagian tentang"
          className="absolute right-5 bottom-8 hidden size-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand lg:grid"
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
