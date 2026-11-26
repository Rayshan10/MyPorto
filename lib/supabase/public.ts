import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/**
 * Klien anonim tanpa cookie — dipakai halaman publik agar tetap bisa
 * di-render statis. RLS membatasi akses baca ke konten yang published.
 */
export function createPublicClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  if (!cached) {
    cached = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }

  return cached;
}
