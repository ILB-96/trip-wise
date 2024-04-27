import { connectToDB } from '@utils/database';
import User from '../models/user';

export const getUserByEmail = async (email: string) => {
    try {
        await connectToDB();
        const user = await User.findOne({ email });

        return user;
    } catch {
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        await connectToDB();
        const user = await User.findOne({ _id: id });

        return user;
    } catch {
        return null;
    }
}

