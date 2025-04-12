import type { NextAuthOptions } from 'next-auth';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // Still defined in auth.ts to keep Node compatibility
  ],
  callbacks: {
    // you can keep other supported callbacks like `session`, `jwt`, etc.
  },
};
