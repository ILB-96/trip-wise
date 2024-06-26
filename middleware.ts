import authConfig from "@auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    authRoutes,
} from "@routes";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if ((nextUrl.pathname.startsWith('/chats') || nextUrl.pathname.startsWith('/api/chats')) && !isLoggedIn) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    if ((nextUrl.pathname.startsWith('/planTrip') || (nextUrl.pathname.startsWith('/myTrips'))) && !isLoggedIn) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    // if(isApiAuthRoute) {
    //     return ;
    // }
    // if(isAuthRoute) {
    //     if(isLoggedIn) {
    //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //     }
    //     return ;
    // }
    // if(!isLoggedIn && !isPublicRoute) {
    //     return Response.redirect(new URL("/auth/login", nextUrl));
    // }
    return;
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}