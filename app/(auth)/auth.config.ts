import type { NextAuthOptions } from 'next-auth';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnChat = nextUrl.pathname.startsWith('/');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl as unknown as URL));
      }

      if (isOnRegister || isOnLogin) {
        return true;
      }

      if (isOnChat) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl as unknown as URL));
      }

      return true;
    },
  },
};
