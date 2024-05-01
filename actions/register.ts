"use server";

import * as z from "zod";
import { RegisterSchema } from "@schemas";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "@lib/user";
import User from "@models/user";
import { connectToDB } from "@utils/database";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success) {
        return {error: "Invalid fields"};
    }
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if(existingUser) {
        return {error: "Email already in use."};
    }

    await connectToDB();
    await User.create({
        name,
        email,
        password: hashedPassword,
      });

    // TODO: send verification token email

    return {success: "Successfully registered, please verify your email!"}
}