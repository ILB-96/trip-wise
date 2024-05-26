import { connectToDB } from '@utils/database';
import User from "@models/user";
import { Types } from "mongoose";

export const getUserByEmail = async (email: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ _id: new Types.ObjectId(id) });
    return user;
  } catch {
    return null;
  }
};

export const USERS_PER_PAGE = 2;
export const getUsers = async (q: string | RegExp, page: number) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    const count = await User.find({
      name: { $regex: regex },
    }).countDocuments();
    const users = await User.find({ name: { $regex: regex } })
      .limit(USERS_PER_PAGE)
      .skip(USERS_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    throw new Error("Failed to fetch users!");
  }
};

