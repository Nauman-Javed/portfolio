import { NotFoundContent } from "@/components/public/not-found-content";

// Shown for URLs that match no route at all (no site header or footer here).
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <NotFoundContent />
    </main>
  );
}
