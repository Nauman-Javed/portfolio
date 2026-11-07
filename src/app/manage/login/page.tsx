import { Suspense } from "react";
import { signInWithGitHub } from "@/actions/auth";

type Props = {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
};

async function LoginCard({ searchParams }: Props) {
  const { error, callbackUrl } = await searchParams;
  // Only allow same-site redirects after login.
  const redirectTo =
    callbackUrl?.startsWith("/manage") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/manage";

  return (
    <div className="border-border bg-card w-full max-w-sm rounded-2xl border p-8">
      <p className="text-brand font-mono text-xs tracking-widest uppercase">
        Admin
      </p>
      <h1 className="font-display mt-2 text-4xl">Sign in</h1>
      <p className="text-muted-foreground mt-3 text-sm">
        This area is private. Only the site owner can sign in.
      </p>
      {error && (
        <p
          role="alert"
          className="bg-destructive/10 text-destructive mt-5 rounded-lg px-3 py-2 text-sm"
        >
          Sign-in failed. This GitHub account isn’t allowed.
        </p>
      )}
      <form className="mt-6" action={signInWithGitHub}>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <button
          type="submit"
          className="bg-teal text-onteal hover:bg-teal-light h-12 w-full rounded-md px-5 text-[13px] font-medium transition-colors duration-150"
        >
          Continue with GitHub
        </button>
      </form>
    </div>
  );
}

export default function LoginPage(props: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <Suspense>
        <LoginCard {...props} />
      </Suspense>
    </main>
  );
}
