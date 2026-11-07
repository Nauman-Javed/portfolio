import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { redirect } from "next/navigation";

function isAdminEmail(email: string | null | undefined) {
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return !!admin && !!email && email.trim().toLowerCase() === admin;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt" },
  pages: { signIn: "/manage/login", error: "/manage/login" },
  callbacks: {
    // Only the allowlisted email may sign in; everyone else is rejected here.
    signIn({ user }) {
      return isAdminEmail(user.email);
    },
  },
});

/** The admin session, or null. For route handlers, which should answer 401 rather than redirect. */
export async function getAdminSession() {
  const session = await auth();
  return session?.user && isAdminEmail(session.user.email) ? session : null;
}

/**
 * Returns the admin session or redirects to the login page. Call this at the
 * top of every admin page and Server Action, not just in the proxy.
 */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/manage/login");
  return session;
}
