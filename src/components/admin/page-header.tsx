export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-4xl">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2 max-w-xl text-sm">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
