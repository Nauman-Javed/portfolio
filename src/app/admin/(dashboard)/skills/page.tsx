import { PageHeader } from "@/components/admin/page-header";
import { SkillsManager } from "@/components/admin/skills-manager";
import { getAdminSkills } from "@/data/admin-queries";
import { requireAdmin } from "@/lib/auth";

export default async function AdminSkillsPage() {
  await requireAdmin();
  const skills = await getAdminSkills();

  return (
    <>
      <PageHeader
        title="Skills"
        description="Grouped by category. Reorder within a category."
      />
      <div className="max-w-3xl">
        <SkillsManager skills={skills} />
      </div>
    </>
  );
}
