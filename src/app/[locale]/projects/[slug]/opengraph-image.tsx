import { ImageResponse } from "next/og";
import { getProjectBySlug, getPublishedProjects } from "@/data/queries";

export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPublishedProjects()).map((p) => ({ slug: p.slug }));
}

// Generated from the project's text rather than its screenshot, so the share
// card still looks right if a cover image is missing or fails to load.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#090e11",
        padding: 72,
        color: "#eaf0f2",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#26d1bf" }}>
        Project
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05 }}>
          {project?.title ?? "Project"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#9aaeb5",
            maxWidth: 960,
          }}
        >
          {project?.shortDescription ?? ""}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {(project?.techStack ?? []).slice(0, 5).map((tech) => (
          <div
            key={tech}
            style={{
              display: "flex",
              padding: "10px 18px",
              borderRadius: 8,
              background: "#202a30",
              color: "#9aaeb5",
              fontSize: 24,
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
