import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminProject } from "@/data/admin-queries";
import { requireAdmin } from "@/lib/auth";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const project = await getAdminProject(id);
  if (!project) notFound();

  return (
    <>
      <PageHeader title={project.title} description="Edit project" />
      <div className="max-w-3xl">
        <ProjectForm
          projectId={project.id}
          initial={{
            slug: project.slug,
            title: project.title,
            shortDescription: project.shortDescription,
            description: project.description,
            techStack: project.techStack.join(", "),
            coverImageUrl: project.coverImageUrl,
            coverImageId: project.coverImageId,
            liveUrl: project.liveUrl ?? "",
            githubUrl: project.githubUrl ?? "",
            featured: project.featured,
            published: project.published,
          }}
        />
      </div>
    </>
  );
}
