export function ItemRow({
  title,
  subtitle,
  actions,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <li className="border-border bg-card flex items-center justify-between gap-4 rounded-xl border px-4 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium">{title}</p>
        {subtitle && (
          <p className="text-muted-foreground truncate text-sm">{subtitle}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-0.5">{actions}</div>
    </li>
  );
}
