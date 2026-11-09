import { PageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <>
      <PageHeader title="New project" />
      <div className="max-w-5xl">
        <ProjectForm />
      </div>
    </>
  );
}
