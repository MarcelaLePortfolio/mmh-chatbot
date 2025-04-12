import { authMiddleware } from "@auth/core/next/middleware";

export default authMiddleware({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const pathname = request.nextUrl.pathname;

      const isPublic = ["/login", "/register"].some((path) =>
        pathname.startsWith(path)
      );

      if (isLoggedIn && isPublic) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return isPublic || isLoggedIn;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
