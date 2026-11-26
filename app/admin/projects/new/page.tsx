import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader
        title="Proyek baru"
        description="Isi detail proyek. Slug dipakai untuk alamat halaman publik."
      />
      <ProjectForm />
    </div>
  );
}
