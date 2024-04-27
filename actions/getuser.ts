import { auth } from "@auth"
import { User } from "next-auth";


export const getUser = async (): Promise<User | undefined> => {
    const session = await auth();
    return session?.user;
}