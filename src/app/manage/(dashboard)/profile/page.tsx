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
      <div className="max-w-5xl">
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
            name_ar: profile?.name_ar ?? "",
            headline_ar: profile?.headline_ar ?? "",
            summary_ar: profile?.summary_ar ?? "",
            about_ar: profile?.about_ar ?? "",
            location_ar: profile?.location_ar ?? "",
            availability_ar: profile?.availability_ar ?? "",
            heroLead_ar: profile?.heroLead_ar ?? "",
            heroPhrases_ar: (profile?.heroPhrases_ar ?? []).join("\n"),
          }}
        />
      </div>
    </>
  );
}
