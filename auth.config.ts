import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },

  callbacks : {

     authorized({ auth, request: { nextUrl } }) {
        const isLogedIn = !! auth?.user
        const isDashboard = nextUrl.pathname.startsWith('/dashboard')

        if ( isDashboard ) {
            if ( isLogedIn ) {
                return true
            }
            return false; // Redirect unauthenticated users to login page
        } else if (isLogedIn) {
             return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
    },
  },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;