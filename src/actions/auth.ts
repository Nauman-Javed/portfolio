"use server";

import { signIn, signOut } from "@/lib/auth";

// Sign-in and sign-out live here, not inline in the pages. An action defined
// inside a component captures variables, so Next has to encrypt them with a
// random value on every render, which Cache Components flags while prerendering.

export async function signOutAction() {
  await signOut({ redirectTo: "/manage/login" });
}

export async function signInWithGitHub(formData: FormData) {
  const requested = String(formData.get("redirectTo") ?? "");
  // Only send the user somewhere inside the dashboard after signing in.
  const redirectTo =
    requested.startsWith("/manage") && !requested.startsWith("//")
      ? requested
      : "/manage";
  await signIn("github", { redirectTo });
}
