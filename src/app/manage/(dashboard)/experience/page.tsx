import { ExperienceManager } from "@/components/admin/experience-manager";
import { PageHeader } from "@/components/admin/page-header";
import { getAdminExperience } from "@/data/admin-queries";
import { requireAdmin } from "@/lib/auth";

export default async function AdminExperiencePage() {
  await requireAdmin();
  const items = await getAdminExperience();

  return (
    <>
      <PageHeader
        title="Experience"
        description="Your work history, in the order shown on the site."
      />
      <div className="max-w-3xl">
        <ExperienceManager items={items} />
      </div>
    </>
  );
}
