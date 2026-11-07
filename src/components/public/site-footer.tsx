import { getProfile } from "@/data/queries";

export async function SiteFooter() {
  const profile = await getProfile();

  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-xs sm:flex-row sm:justify-between sm:px-8">
        <span>© {profile?.name}</span>
        <span>Built with Next.js, Tailwind CSS &amp; shadcn/ui</span>
      </div>
    </footer>
  );
}
