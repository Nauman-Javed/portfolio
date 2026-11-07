import Link from "next/link";
import { getAdminCounts } from "@/data/admin-queries";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth";

export default async function AdminHomePage() {
  await requireAdmin();
  const counts = await getAdminCounts();

  const cards = [
    { href: "/manage/projects", label: "Projects", count: counts.projects },
    {
      href: "/manage/experience",
      label: "Experience",
      count: counts.experience,
    },
    { href: "/manage/skills", label: "Skills", count: counts.skills },
    { href: "/manage/education", label: "Education", count: counts.education },
  ];

  return (
    <>
      <PageHeader
        title="Overview"
        description="Changes you save here go live on the public site within seconds."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/manage/profile"
          className="border-border bg-card hover:border-brand rounded-2xl border p-6 transition-colors"
        >
          <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            Profile
          </p>
          <p className="font-display mt-2 text-3xl">Edit details</p>
        </Link>
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border-border bg-card hover:border-brand rounded-2xl border p-6 transition-colors"
          >
            <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              {c.label}
            </p>
            <p className="font-display mt-2 text-5xl">{c.count}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
