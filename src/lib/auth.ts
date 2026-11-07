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
  pages: { signIn: "/admin/login", error: "/admin/login" },
  callbacks: {
    // Only the allowlisted email may sign in; everyone else is rejected here.
    signIn({ user }) {
      return isAdminEmail(user.email);
    },
  },
});

/**
 * Returns the admin session or redirects to the login page. Call this at the
 * top of every admin page and Server Action, not just in the proxy.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !isAdminEmail(session.user.email)) {
    redirect("/admin/login");
  }
  return session;
}
