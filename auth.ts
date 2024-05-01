import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import clientPromise from "@lib/db";
import { getUserById } from "@lib/user";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { JWT } from "next-auth/jwt"
import User from "@models/user";
import { DB_NAME, connectToDB } from "@utils/database";
import { Types } from "mongoose";

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER";
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: "ADMIN" | "USER";
        } & DefaultSession["user"]
    }
}

export const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }) {
            console.log("I got here");
            await connectToDB();
            console.log(user.id);
            await User.updateOne({ 
                _id: user.id 
            }, 
            { 
                $set: 
                { 
                    emailVerified: new Date() 
                } 
            });
            const test = await User.findOne({ _id: new Types.ObjectId(user.id) });
            console.log({ test });
        }
    },
    callbacks: {
        async session({ token, session }) { // injecting the ID inside our session
            // console.log({ tokenSession: token });
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            
            if (!token.sub) return token; // the user is not logged in
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        },
    },
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: DB_NAME,
    }),
    session: { strategy: 'jwt' },
    ...authConfig,
})