import Link from "next/link";
import { ctaClass } from "./ui";

export function NotFoundContent() {
  return (
    <div className="text-center">
      <p className="text-teal text-[11px] tracking-[0.14em] uppercase">404</p>
      <h1 className="mt-4 text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em]">
        Page not found
      </h1>
      <p className="text-fg2 mx-auto mt-4 max-w-md text-[16px] leading-[1.6]">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={ctaClass("primary")}>
          Back home
        </Link>
        <Link href="/projects" className={ctaClass("secondary")}>
          View projects
        </Link>
      </div>
    </div>
  );
}
