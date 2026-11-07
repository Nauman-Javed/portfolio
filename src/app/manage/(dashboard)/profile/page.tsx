import { PageHeader } from "@/components/admin/page-header";
import { ProfileForm } from "@/components/admin/profile-form";
import { getAdminProfile } from "@/data/admin-queries";
import { requireAdmin } from "@/lib/auth";

export default async function AdminProfilePage() {
  await requireAdmin();
  const profile = await getAdminProfile();

  return (
    <>
      <PageHeader
        title="Profile"
        description="Your name, bio and contact details."
      />
      <div className="max-w-3xl">
        <ProfileForm
          initial={{
            name: profile?.name ?? "",
            headline: profile?.headline ?? "",
            summary: profile?.summary ?? "",
            about: profile?.about ?? "",
            location: profile?.location ?? "",
            email: profile?.email ?? "",
            phone: profile?.phone ?? "",
            resumeUrl: profile?.resumeUrl ?? "",
            availability: profile?.availability ?? "",
            heroLead: profile?.heroLead ?? "I engineer",
            heroPhrases: (profile?.heroPhrases ?? []).join("\n"),
          }}
        />
      </div>
    </>
  );
}
