import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ProfileForm } from "@/components/admin/profile-form";
import { fallbackProfile } from "@/lib/data/fallback";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();

  const values = {
    id: profile?.id ?? "",
    full_name: profile?.full_name ?? fallbackProfile.full_name,
    headline: profile?.headline ?? fallbackProfile.headline,
    bio: profile?.bio ?? fallbackProfile.bio,
    location: profile?.location ?? fallbackProfile.location,
    email: profile?.email ?? fallbackProfile.email,
    linkedin_url: profile?.linkedin_url ?? fallbackProfile.linkedin_url,
    github_url: profile?.github_url ?? fallbackProfile.github_url,
    availability: profile?.availability ?? fallbackProfile.availability,
  };

  return (
    <div>
      <AdminPageHeader
        title="Profil"
        description="Data ini tampil di hero, bagian tentang, dan bagian kontak."
      />
      <ProfileForm profile={values} />
    </div>
  );
}
