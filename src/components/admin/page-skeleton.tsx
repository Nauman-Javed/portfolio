// Appears only if a page takes a moment (the CSS delay avoids a flash for fast
// loads) and mirrors the real layout: a title, then a list of rows.
export function PageSkeleton() {
  return (
    <div role="status" aria-live="polite" className="page-skeleton">
      <span className="sr-only">Loading…</span>
      <div className="animate-pulse">
        <div className="bg-muted h-9 w-48 rounded-md" />
        <div className="mt-8 space-y-2">
          <div className="bg-card border-border h-[54px] rounded-xl border" />
          <div className="bg-card border-border h-[54px] rounded-xl border" />
          <div className="bg-card border-border h-[54px] rounded-xl border" />
          <div className="bg-card border-border h-[54px] rounded-xl border" />
        </div>
      </div>
    </div>
  );
}
