import Trip, { ITrip } from '../models/trip';
import { connectToDB } from '../utils/database';

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
    return Trip.find({ shared: true });  // Only return trips where 'shared' is true
};
export const getTripById = async (id: string): Promise<ITrip | null> => {
    await connectToDB();
    return Trip.findById(id);
};
export const getTripsByEditor = async (editorId: string): Promise<ITrip[]> => {
    await connectToDB();
    return Trip.find({ editor: editorId });
};