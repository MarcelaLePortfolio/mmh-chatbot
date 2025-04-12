import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ token }) {
      const pathname = new URL(token?.sub ?? "", "http://localhost").pathname;
      return !!token || ["/login", "/register"].some((path) => pathname.startsWith(path));
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
