import { EducationManager } from "@/components/admin/education-manager";
import { PageHeader } from "@/components/admin/page-header";
import { getAdminEducation } from "@/data/admin-queries";
import { requireAdmin } from "@/lib/auth";

export default async function AdminEducationPage() {
  await requireAdmin();
  const items = await getAdminEducation();

  return (
    <>
      <PageHeader title="Education" />
      <div className="max-w-3xl">
        <EducationManager items={items} />
      </div>
    </>
  );
}
