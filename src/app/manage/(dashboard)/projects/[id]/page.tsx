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
      <div className="max-w-5xl">
        <ProjectForm
          projectId={project.id}
          initial={{
            slug: project.slug,
            title: project.title,
            shortDescription: project.shortDescription,
            description: project.description,
            title_ar: project.title_ar ?? "",
            shortDescription_ar: project.shortDescription_ar ?? "",
            description_ar: project.description_ar ?? "",
            techStack: project.techStack.join(", "),
            coverImageUrl: project.coverImageUrl,
            coverImageId: project.coverImageId,
            gallery: project.gallery.map((g) => ({
              url: g.url,
              publicId: g.publicId,
            })),
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
