import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="text-brand font-mono text-xs tracking-widest uppercase">
        404
      </p>
      <h1 className="font-display text-6xl tracking-tight sm:text-8xl">
        Page not found
      </h1>
      <Link
        href="/"
        className="bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium"
      >
        Back home
      </Link>
    </main>
  );
}
