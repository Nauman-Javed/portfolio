import { CertificationsManager } from "@/components/admin/certifications-manager";
import { PageHeader } from "@/components/admin/page-header";
import { getAdminCertifications } from "@/data/admin-queries";
import { requireAdmin } from "@/lib/auth";

export default async function AdminCertificationsPage() {
  await requireAdmin();
  const items = await getAdminCertifications();

  return (
    <>
      <PageHeader title="Certifications" />
      <div className="max-w-3xl">
        <CertificationsManager items={items} />
      </div>
    </>
  );
}
