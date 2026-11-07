import type { Metadata } from "next";
import { AppToaster } from "@/components/admin/app-toaster";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen">
      {children}
      <AppToaster />
    </div>
  );
}
