import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/public";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Masuk",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) redirect("/admin");
  }

  return (
    <main className="grid min-h-svh place-items-center bg-muted/40 px-5 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Kembali ke portofolio
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <span className="grid size-9 place-items-center rounded-md bg-foreground font-mono text-xs font-semibold text-background">
              RG
            </span>
            <h1 className="mt-4 text-xl font-semibold tracking-tight">
              Masuk ke dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Hanya untuk pemilik portofolio.
            </p>
          </div>

          {isSupabaseConfigured() ? (
            <LoginForm />
          ) : (
            <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Supabase belum dikonfigurasi. Isi <code>.env.local</code> terlebih
              dahulu.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
