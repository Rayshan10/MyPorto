import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  Database,
  FolderKanban,
  Mail,
  Wrench,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { seedContent } from "@/lib/actions/seed";
import { SubmitButton } from "@/components/admin/form-parts";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [projects, messages, unread, experiences, certifications, recent] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("messages").select("*", { count: "exact", head: true }),
      supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false),
      supabase.from("experiences").select("*", { count: "exact", head: true }),
      supabase
        .from("certifications")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("messages")
        .select("id, name, email, subject, message, created_at, is_read")
        .order("created_at", { ascending: false })
        .limit(4),
    ]);

  const setupError = projects.error?.message;
  const projectCount = projects.count ?? 0;

  const stats = [
    {
      label: "Proyek",
      value: projectCount,
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "Pesan masuk",
      value: messages.count ?? 0,
      href: "/admin/messages",
      icon: Mail,
    },
    {
      label: "Pengalaman",
      value: experiences.count ?? 0,
      href: "/admin/experiences",
      icon: Briefcase,
    },
    {
      label: "Sertifikasi",
      value: certifications.count ?? 0,
      href: "/admin/certifications",
      icon: Award,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola seluruh isi portofolio dari sini.
        </p>
      </div>

      {setupError ? (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="flex items-center gap-2 font-medium">
            <Database className="size-4" />
            Database belum siap
          </p>
          <p className="mt-1">
            Jalankan berkas{" "}
            <code className="rounded bg-amber-100 px-1 py-0.5">
              supabase/migrations/0001_init.sql
            </code>{" "}
            di Supabase SQL Editor, lalu muat ulang halaman ini.
          </p>
          <p className="mt-2 font-mono text-xs opacity-70">{setupError}</p>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-3xl font-semibold tracking-tight">
                {stat.value}
              </p>
              {stat.label === "Pesan masuk" && (unread.count ?? 0) > 0 ? (
                <p className="mt-1 text-xs font-medium text-primary">
                  {unread.count} belum dibaca
                </p>
              ) : null}
            </Link>
          );
        })}
      </div>

      {!setupError && projectCount === 0 ? (
        <div className="mt-6 rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Isi konten awal</h2>
          <p className="mt-1 max-w-lg text-sm text-muted-foreground">
            Salin profil, 8 proyek, pengalaman, keahlian, dan sertifikasi yang
            sudah ada di situs ke database. Jalankan sekali saja.
          </p>
          <form action={seedContent} className="mt-4">
            <SubmitButton pendingLabel="Menyalin...">
              Salin konten awal
            </SubmitButton>
          </form>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold">Pesan terbaru</h2>
            <Link
              href="/admin/messages"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Lihat semua
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recent.data && recent.data.length > 0 ? (
              recent.data.map((message) => (
                <Link
                  key={message.id}
                  href="/admin/messages"
                  className="block px-5 py-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium">
                      {message.name}
                      {!message.is_read ? (
                        <span className="ml-2 inline-block size-1.5 rounded-full bg-primary align-middle" />
                      ) : null}
                    </p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(message.created_at)}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {message.subject || message.message}
                  </p>
                </Link>
              ))
            ) : (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                Belum ada pesan masuk.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Pintasan</h2>
          <div className="mt-3 flex flex-col gap-1">
            <Link
              href="/admin/projects/new"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Tambah proyek
              <FolderKanban className="size-4" />
            </Link>
            <Link
              href="/admin/skills"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Atur keahlian
              <Wrench className="size-4" />
            </Link>
            <Link
              href="/admin/profile"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Ubah profil
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
