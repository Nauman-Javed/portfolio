import { cn } from "@/lib/utils";

export function Section({
  id,
  label,
  title,
  children,
  className,
}: {
  id?: string;
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-border scroll-mt-16 border-t py-20 sm:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-brand mb-4 font-mono text-xs tracking-widest uppercase">
          {label}
        </p>
        <h2 className="font-display mb-12 max-w-2xl text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
