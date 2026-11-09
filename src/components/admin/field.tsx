import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error && (
        <p className="text-muted-foreground text-xs">{hint}</p>
      )}
      {error && (
        <p role="alert" className="text-destructive text-xs">
          {error}
        </p>
      )}
    </div>
  );
}

/** Two columns: English on the left, Arabic on the right. */
export function Bilingual({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid items-start gap-x-6 gap-y-4 md:grid-cols-2">
      {children}
    </div>
  );
}

/** Column titles shown once at the top of a bilingual form. */
export function BilingualHeader() {
  return (
    <div className="text-muted-foreground border-border grid gap-x-6 border-b pb-2 font-mono text-xs tracking-widest uppercase md:grid-cols-2">
      <span>English</span>
      <span lang="ar" dir="rtl" className="hidden text-right md:block">
        العربية
      </span>
    </div>
  );
}

/** Props that make an input or textarea behave as right-to-left Arabic text. */
export const arabicInput = { dir: "rtl", lang: "ar" } as const;

export const selectClass =
  "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3";
