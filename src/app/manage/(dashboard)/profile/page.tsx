import { PageHeader } from "@/components/admin/page-header";
import { ProfileForm } from "@/components/admin/profile-form";
import { SocialLinksManager } from "@/components/admin/social-links-manager";
import { getAdminProfile, getAdminSocialLinks } from "@/data/admin-queries";
import { requireAdmin } from "@/lib/auth";

export default async function AdminProfilePage() {
  await requireAdmin();
  const [profile, links] = await Promise.all([
    getAdminProfile(),
    getAdminSocialLinks(),
  ]);

  return (
    <>
      <PageHeader
        title="Profile"
        description="Your name, bio and contact details."
      />
      <div className="max-w-3xl space-y-12">
        <ProfileForm
          initial={{
            name: profile?.name ?? "",
            headline: profile?.headline ?? "",
            summary: profile?.summary ?? "",
            about: profile?.about ?? "",
            location: profile?.location ?? "",
            email: profile?.email ?? "",
            phone: profile?.phone ?? "",
            imageUrl: profile?.imageUrl ?? "",
            imagePublicId: profile?.imagePublicId ?? "",
            resumeUrl: profile?.resumeUrl ?? "",
            availability: profile?.availability ?? "",
          }}
        />
        <section>
          <h2 className="font-display mb-4 text-2xl">Social links</h2>
          <SocialLinksManager links={links} />
        </section>
      </div>
    </>
  );
}
