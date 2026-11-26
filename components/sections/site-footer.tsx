import { ArrowUp } from "lucide-react";
import { getProfile } from "@/lib/data";

export async function SiteFooter() {
  const profile = await getProfile();

  return (
    <footer className="dark border-t border-border bg-background text-foreground">
      <div className="container-page py-10 sm:py-12">
        <div className="flex flex-col gap-8 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Terima kasih sudah mampir</p>
            <p className="display mt-3 text-4xl sm:text-5xl">
              {profile.full_name}
            </p>
          </div>

          <a
            href="#hero"
            className="link-underline inline-flex items-center gap-2 self-start font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground sm:self-auto"
          >
            Kembali ke atas
            <ArrowUp className="size-3.5" />
          </a>
        </div>

        <div className="mt-6 flex flex-col gap-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} · Dibangun dengan Next.js + Supabase
          </p>
          <div className="flex items-center gap-5">
            <a
              href={profile.github_url}
              target="_blank"
              rel="noreferrer"
              className="link-underline transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="link-underline transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
