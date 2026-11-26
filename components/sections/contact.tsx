import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { getProfile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/shared/contact-form";

export async function ContactSection() {
  const profile = await getProfile();

  const channels = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/rayshannn",
      href: profile.linkedin_url,
      icon: LinkedinIcon,
    },
    {
      label: "GitHub",
      value: "github.com/Rayshan10",
      href: profile.github_url,
      icon: GithubIcon,
    },
  ];

  return (
    <section
      id="kontak"
      className="dark relative overflow-hidden border-t border-border bg-background py-16 text-foreground sm:py-20 lg:py-24"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              index="06"
              label="Kontak"
              title="Mari membangun sesuatu yang berguna."
              description="Terbuka untuk posisi full-time, kontrak, maupun proyek lepas. Saya biasa membalas dalam 24 jam pada hari kerja."
              stacked
            />

            <div className="mt-10 border-t border-border">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={
                      channel.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel="noreferrer"
                    className="group flex items-center gap-4 border-b border-border py-4 transition-colors hover:bg-card"
                  >
                    <span className="grid size-9 shrink-0 place-items-center border border-border text-muted-foreground transition-colors group-hover:border-foreground group-hover:text-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-medium">
                        {channel.value}
                      </span>
                    </span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
              <MapPin className="size-3.5" />
              {profile.location} · WIB (UTC+7)
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-border bg-card p-5 sm:p-6">
              <div className="flex items-baseline justify-between border-b border-border pb-3">
                <h3 className="text-sm font-medium">Kirim pesan</h3>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Formulir / 01
                </span>
              </div>
              <p className="mt-3 mb-5 text-sm text-muted-foreground">
                Isi formulir di bawah — pesan akan masuk ke inbox saya.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
