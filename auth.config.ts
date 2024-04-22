import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@lib/user";
import bcrypt from "bcryptjs";
export default { 
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if(validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null; // covers cases authenticated by Google/Github and try to pass credentials
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if(passwordsMatch) return user;
                }
                return null;
        }}),
    ]
} satisfies NextAuthConfig