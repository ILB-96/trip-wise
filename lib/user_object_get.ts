import { connectToDB } from '@utils/database';
import User from "@models/user";
import { Types } from "mongoose";
import { startOfDay, subDays } from "date-fns";
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

export const USERS_PER_PAGE = 5;
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

export const getUsersStatistics = async () => {
  try {
    await connectToDB();

    const totalUsers = await User.countDocuments();

    const oneWeekAgo = subDays(new Date(), 7);
    const newUsersThisWeek = await User.countDocuments({
      _id: {
        $gte: Types.ObjectId.createFromTime(
          Math.floor(oneWeekAgo.getTime() / 1000)
        ),
      },
    });
    let usersChange = 0;
    if (totalUsers !== newUsersThisWeek) {
      usersChange = (newUsersThisWeek / (totalUsers - newUsersThisWeek)) * 100;
    }

    return { totalUsers, usersChange: usersChange.toFixed(2) };
  } catch (error) {
    throw new Error("Failed to fetch users statistics");
  }
};

export const getUsersChart = async () => {
  try {
    await connectToDB();

    const today = startOfDay(new Date());
    const oneWeekAgo = subDays(today, 6);

    const userData = await User.find({
      _id: {
        $gte: Types.ObjectId.createFromTime(
          Math.floor(oneWeekAgo.getTime() / 1000)
        ),
      },
    }).sort({ _id: 1 });

    // Group data by day
    const groupedData = userData.reduce((acc, user) => {
      const date = new Date(user._id.getTimestamp())
        .toISOString()
        .split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

    // Format data for the chart
    const formattedData = Object.keys(groupedData).map((date) => ({
      date,
      count: groupedData[date],
    }));

    return { usersData: formattedData };
  } catch (error) {
    console.error("Failed to fetch users statistics", error);
    throw new Error("Failed to fetch users statistics");
  }
};