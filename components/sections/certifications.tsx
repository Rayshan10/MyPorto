import { ArrowUpRight } from "lucide-react";
import { getCertifications } from "@/lib/data";
import { formatMonthYear } from "@/lib/format";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export async function CertificationsSection() {
  const certifications = await getCertifications();

  return (
    <section id="sertifikasi" className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index="05"
            label="Sertifikasi"
            title="Bekal yang diuji, bukan hanya diklaim."
          />
        </Reveal>

        <div className="mt-10 border-t border-foreground/25">
          {certifications.map((certification, index) => (
            <Reveal key={certification.name} delay={index * 0.03}>
              <div className="grid grid-cols-[44px_1fr] gap-3 border-b border-border py-4 sm:grid-cols-[56px_140px_1fr_auto] sm:items-center sm:gap-6">
                <span className="font-mono text-[0.6rem] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground sm:block">
                  {formatMonthYear(certification.issued_at)}
                </span>

                <div>
                  <p className="text-sm font-medium leading-snug">
                    {certification.name}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {certification.issuer}
                  </p>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground sm:hidden">
                    {formatMonthYear(certification.issued_at)}
                  </p>
                </div>

                {certification.credential_url ? (
                  <a
                    href={certification.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1 justify-self-start font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground sm:justify-self-end"
                  >
                    Verifikasi
                    <ArrowUpRight className="size-3" />
                  </a>
                ) : (
                  <span className="hidden sm:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
