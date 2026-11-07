import { ArrowUpRight } from "lucide-react";
import type { Profile } from "@/data/types";

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section
      id="contact"
      className="border-border scroll-mt-16 border-t py-24 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <p className="text-brand mb-6 font-mono text-xs tracking-widest uppercase">
          04 — Contact
        </p>
        <h2 className="font-display text-5xl leading-none tracking-tight sm:text-7xl">
          Let&apos;s work <span className="italic">together.</span>
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="group border-foreground hover:border-brand hover:text-brand mt-10 inline-flex items-center gap-2 border-b-2 pb-1 text-xl font-medium transition-colors sm:text-3xl"
        >
          {profile.email}
          <ArrowUpRight className="size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
