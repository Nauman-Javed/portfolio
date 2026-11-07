import Link from "next/link";
import { ArrowDownRight, Mail } from "lucide-react";
import type { Profile } from "@/data/types";

export function Hero({ profile }: { profile: Profile }) {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-brand/20 pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 sm:px-8 sm:pt-32 sm:pb-36">
        {profile.availability && (
          <p className="border-border bg-card mb-8 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </p>
        )}
        <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight">
          {first}
          <br />
          <span className="text-brand italic">{rest.join(" ")}</span>
        </h1>
        <p className="mt-8 font-mono text-sm tracking-wide uppercase">
          {profile.headline}
          {profile.location && (
            <span className="text-muted-foreground"> · {profile.location}</span>
          )}
        </p>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
          {profile.summary}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
          >
            View my work <ArrowDownRight className="size-4" />
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
          >
            <Mail className="size-4" /> Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
