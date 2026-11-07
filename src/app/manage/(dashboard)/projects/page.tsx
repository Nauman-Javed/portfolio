import { Plus } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { Button } from "@/components/ui/button";
import { getAdminProjects } from "@/data/admin-queries";
import { requireAdmin } from "@/lib/auth";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await getAdminProjects();

  return (
    <>
      <PageHeader
        title="Projects"
        description="Order here is the order on your site. Unpublished projects stay hidden."
        action={
          <Button
            nativeButton={false}
            render={<Link href="/manage/projects/new" />}
          >
            <Plus /> New project
          </Button>
        }
      />
      <ProjectsManager projects={projects} />
    </>
  );
}
