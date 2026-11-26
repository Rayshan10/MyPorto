import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteCertification } from "@/lib/actions/content";
import { AdminPageHeader, EmptyState } from "@/components/admin/page-header";
import { CertificationForm } from "@/components/admin/simple-forms";
import { DeleteForm } from "@/components/admin/delete-form";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminCertificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const supabase = await createClient();
  const { data: certifications, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("issued_at", { ascending: false });

  const editing = certifications?.find((item) => item.id === edit);

  return (
    <div>
      <AdminPageHeader
        title="Sertifikasi"
        description="Daftar sertifikat dan pelatihan yang sudah diselesaikan."
      />

      {error ? (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error.message}
        </p>
      ) : null}

      <section className="mb-6 rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">
            {editing ? "Ubah sertifikasi" : "Tambah sertifikasi"}
          </h2>
          {editing ? (
            <Button asChild variant="ghost" size="sm" className="h-8">
              <Link href="/admin/certifications">Batal</Link>
            </Button>
          ) : null}
        </div>

        <CertificationForm
          key={editing?.id ?? "new"}
          certification={
            editing
              ? {
                  id: editing.id,
                  name: editing.name ?? "",
                  issuer: editing.issuer ?? "",
                  issued_at: editing.issued_at ?? "",
                  credential_url: editing.credential_url ?? "",
                  sort_order: editing.sort_order ?? 0,
                }
              : undefined
          }
        />
      </section>

      {!certifications || certifications.length === 0 ? (
        <EmptyState
          title="Belum ada sertifikasi"
          description="Tambahkan sertifikat pertama lewat formulir di atas."
        />
      ) : (
        <div className="space-y-2">
          {certifications.map((certification) => (
            <div
              key={certification.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{certification.name}</p>
                <p className="text-sm text-muted-foreground">
                  {certification.issuer}
                  {certification.issued_at
                    ? ` · ${formatDate(certification.issued_at)}`
                    : ""}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                {certification.credential_url ? (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground"
                    title="Buka kredensial"
                  >
                    <Link
                      href={certification.credential_url}
                      target="_blank"
                      aria-label="Buka kredensial"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                  </Button>
                ) : null}
                <Button
                  asChild
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                  title="Ubah sertifikasi"
                >
                  <Link
                    href={`/admin/certifications?edit=${certification.id}`}
                    aria-label="Ubah sertifikasi"
                  >
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <DeleteForm
                  action={deleteCertification}
                  id={certification.id}
                  confirmMessage={`Hapus sertifikasi "${certification.name}"?`}
                  label="Hapus sertifikasi"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
