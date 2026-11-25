import { Mail, MapPin } from "lucide-react";
import { getProfile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/shared/contact-form";

export function ContactSection() {
  const profile = getProfile();

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
    <section id="kontak" className="section">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            index="06"
            label="Kontak"
            title="Mari membangun sesuatu yang berguna."
            description="Terbuka untuk posisi full-time, kontrak, maupun proyek lepas. Saya biasa membalas dalam 24 jam pada hari kerja."
          />

          <div className="mt-8 space-y-3">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-accent/40"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">
                      {channel.label}
                    </span>
                    <span className="block text-sm font-medium">
                      {channel.value}
                    </span>
                  </span>
                </a>
              );
            })}

            <div className="flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              {profile.location} · WIB (UTC+7)
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h3 className="text-base font-semibold">Kirim pesan</h3>
            <p className="mt-1 mb-5 text-sm text-muted-foreground">
              Isi formulir di bawah — pesan akan masuk ke inbox saya.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
