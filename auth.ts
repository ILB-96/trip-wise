import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@lib/db";
import { getUserById } from "@lib/user";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole
  }
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: UserRole;
        } & DefaultSession["user"]
    }
}
 
export const { 
    auth, 
    handlers, 
    signIn, 
    signOut,
} = NextAuth({
        callbacks: {
            async session({ token, session }) { // injecting the ID inside our session
                console.log({tokenSession: token});
                if(token.sub && session.user) {
                    session.user.id = token.sub;
                }
                if(token.role && session.user) {
                    session.user.role = token.role;
                }
                return session;
            },
            async jwt({token}) {
                if(!token.sub) return token; // the user is not logged in
                const existingUser = await getUserById(token.sub);
                if(!existingUser) return token;
                token.role = existingUser.role;
                return token;
            },
        },
        adapter: PrismaAdapter(db),
        session: { strategy: 'jwt'},
    ...authConfig,
})