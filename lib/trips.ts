import User from '@models/user';
import Trip, { ITrip } from '../models/trip';
import { connectToDB, cachedConnectToDB } from "../utils/database";
import { revalidatePath } from "next/cache";

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
  const desiredTrip = await Trip.findById(id);
  if (!User) {
    // I forced mongoose to load the model if it is not loaded pre-populate, do not remove!>!>!>
  }
  return await desiredTrip.populate("creator", "email name image role");
};
export const getTripsByEditor = async (editorId: string): Promise<ITrip[]> => {
  await connectToDB();
  return Trip.find({ editor: editorId });
};

export const TRIPS_PER_PAGE = 2;
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
      { $unwind: "$creatorDetails" },
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

    trips.forEach((trip) => {
      trip._id = trip._id.toString();
      trip.creator._id = trip.creator._id.toString();
    });

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