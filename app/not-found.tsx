import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6">
      <div className="max-w-md">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
          404 — Tidak ditemukan
        </p>
        <h1 className="display mt-4 text-5xl">
          Halaman ini tidak ada.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Alamat yang Anda buka tidak tersedia atau sudah dipindahkan.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-10 items-center bg-primary px-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-foreground/80"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
