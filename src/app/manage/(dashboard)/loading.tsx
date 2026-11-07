export default function ManageLoading() {
  return (
    <div role="status" aria-live="polite" className="animate-pulse">
      <span className="sr-only">Loading…</span>
      <div className="bg-muted h-9 w-48 rounded-md" />
      <div className="mt-8 space-y-2">
        <div className="bg-card border-border h-16 rounded-xl border" />
        <div className="bg-card border-border h-16 rounded-xl border" />
        <div className="bg-card border-border h-16 rounded-xl border" />
      </div>
    </div>
  );
}
