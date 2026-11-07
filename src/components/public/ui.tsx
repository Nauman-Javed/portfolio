import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6", className)}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-fg2 mb-4 text-[11px] leading-[1.4] tracking-[0.14em] uppercase">
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(30px,4vw,44px)] leading-[1.15]">{children}</h2>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-10", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <SectionTitle>{title}</SectionTitle>
    </header>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-[22px] text-[13px] font-medium transition-colors duration-150 ease-out";

/** Class names for link/button CTAs: 48px tall (52px for `large`). */
export function ctaClass(
  variant: "primary" | "secondary",
  size: "default" | "large" = "default",
) {
  return cn(
    base,
    size === "large" ? "h-[52px]" : "h-12",
    variant === "primary"
      ? "bg-teal text-onteal hover:bg-teal-light"
      : "border-hairline bg-surface text-fg hover:bg-raised border",
  );
}
