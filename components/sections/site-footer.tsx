import { getProfile } from "@/lib/data";

export function SiteFooter() {
  const profile = getProfile();

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Rayshan Gani Putra</p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Dibangun dengan Next.js + Supabase
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a
            href={profile.github_url}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
