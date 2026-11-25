import { ArrowUpRight } from "lucide-react";
import { getCertifications } from "@/lib/data";
import { formatMonthYear } from "@/lib/format";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function CertificationsSection() {
  const certifications = getCertifications();

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

        <div className="mt-10 divide-y divide-border border-y border-border">
          {certifications.map((certification, index) => (
            <Reveal key={certification.name} delay={index * 0.03}>
              <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-baseline gap-4">
                  <span className="w-20 shrink-0 font-mono text-xs text-muted-foreground">
                    {formatMonthYear(certification.issued_at)}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{certification.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {certification.issuer}
                    </p>
                  </div>
                </div>
                {certification.credential_url ? (
                  <a
                    href={certification.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline sm:shrink-0"
                  >
                    Verifikasi
                    <ArrowUpRight className="size-3" />
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
