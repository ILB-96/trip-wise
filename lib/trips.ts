"use server";

import User from "@models/user";
import Trip, { ITrip } from "../models/trip";
import { connectToDB } from "../utils/database";
import { revalidatePath } from "next/cache";
import { TRIPS_PER_PAGE } from "@app/dashboard/trips/page";
import { startOfDay, subDays } from "date-fns";
import { Types } from "mongoose";
export const addTrip = async (tripData: Partial<ITrip>): Promise<ITrip> => {
  await connectToDB();
  const trip = new Trip(tripData);
  await trip.save();
  return trip;
};

export const getAllTrips = async (): Promise<ITrip[]> => {
  await connectToDB();
  return Trip.find({});
};
export const getAllSharedTrips = async (): Promise<ITrip[]> => {
  await connectToDB();
  return Trip.find({ shared: true }); // Only return trips where 'shared' is true
};
export const getTripById = async (id: string): Promise<any | null> => {
  await connectToDB();
  const objectId = new Types.ObjectId(id);
  const trip = await Trip.aggregate([
    { $match: { _id: objectId } },
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "creatorDetails",
      },
    },
    {
      $addFields: {
        creatorDetails: {
          $ifNull: [
            { $arrayElemAt: ["$creatorDetails", 0] },
            {
              _id: "DELETED",
              name: "DELETED",
              email: "DELETED",
              role: "DELETED",
              image: "/assets/images/noavatar.png",
            },
          ],
        },
      },
    },
    {
      $project: {
        title: 1,
        shared: 1,
        createdAt: 1,
        updatedAt: 1,
        rating: 1,
        views: 1,
        country: 1,
        image: 1,
        startDate: 1,
        endDate: 1,
        tripAttractionId: 1,
        creator: {
          _id: "$creatorDetails._id",
          name: "$creatorDetails.name",
          email: "$creatorDetails.email",
          role: "$creatorDetails.role",
          image: "$creatorDetails.image",
        },
      },
    },
  ]);
  return trip[0] || null;
};
export const getTripsByEditor = async (editorId: string): Promise<ITrip[]> => {
  await connectToDB();
  return Trip.find({ creator: editorId });
};

export const getTrips = async (q: string | RegExp, page: number) => {
  const regex = new RegExp(q, "i");
  try {
    await connectToDB();
    const count = await Trip.find({
      title: { $regex: regex },
    }).countDocuments();

    const trips = await Trip.aggregate([
      { $match: { title: { $regex: regex } } },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creatorDetails",
        },
      },
      {
        $addFields: {
          creatorDetails: {
            $ifNull: [
              { $arrayElemAt: ["$creatorDetails", 0] },
              { _id: null, name: null, email: "DELETED" },
            ],
          },
        },
      },
      { $skip: TRIPS_PER_PAGE * (page - 1) },
      { $limit: TRIPS_PER_PAGE },
      {
        $project: {
          title: 1,
          shared: 1,
          updatedAt: 1,
          creator: {
            _id: "$creatorDetails._id",
            name: "$creatorDetails.name",
            email: "$creatorDetails.email",
          },
        },
      },
    ]);

    return { count, trips };
  } catch (err) {
    console.error("Error fetching trips:", err);
    throw new Error("Failed to fetch trips!");
  }
};

export const deleteTrip = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Trip.findByIdAndDelete(id);
  } catch (err) {
    throw new Error("Failed to delete trip!");
  }

  revalidatePath("/dashboard/trips");
};

export const getTripsStatistics = async () => {
  try {
    await connectToDB();

    const totalTrips = await Trip.countDocuments();

    const oneWeekAgo = subDays(new Date(), 6);
    const newTripsThisWeek = await Trip.countDocuments({
      _id: {
        $gte: Types.ObjectId.createFromTime(
          Math.floor(oneWeekAgo.getTime() / 1000)
        ),
      },
    });
    let tripsChange = 0;
    if (totalTrips !== newTripsThisWeek) {
      tripsChange = (newTripsThisWeek / (totalTrips - newTripsThisWeek)) * 100;
    }

    return { totalTrips, tripsChange: tripsChange.toFixed(2) };
  } catch (error) {
    throw new Error("Failed to fetch trips statistics");
  }
};

export const getTripsChart = async () => {
  try {
    await connectToDB();

    const today = startOfDay(new Date());
    const oneWeekAgo = subDays(today, 7);

    const data = await Trip.find({
      _id: {
        $gte: Types.ObjectId.createFromTime(
          Math.floor(oneWeekAgo.getTime() / 1000)
        ),
      },
    }).sort({ _id: 1 });

    // Group data by day
    const groupedData = data.reduce((acc, item) => {
      const date = new Date(item._id.getTimestamp())
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

    return { tripsData: formattedData };
  } catch (error) {
    console.error("Failed to fetch users statistics", error);
    throw new Error("Failed to fetch users statistics");
  }
};

export const addTripView = async (tripId: string) => {
  try {
    await connectToDB();
    await Trip.updateOne({ _id: tripId }, { $inc: { views: 1 } });
  } catch (error) {
    console.error("Failed to add trip view", error);
    throw new Error("Failed to add trip view");
  }
};
