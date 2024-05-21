import Trip, { ITrip } from "@models/trip";
import { ITripAttraction } from "@models/tripAttraction";
import { connectToDB } from "@utils/database";
import TripAttraction from '@/models/tripAttraction';
import Attraction from "@models/attraction";

export interface ITripAttractionGet {
    attractions: ITripAttraction[];
    attractionTime: Date;
}
export const getTripAttractionForTrip = async (tripId: string): Promise<{ success: boolean, error?: string, attractions?: ITripAttraction[][] }> => {
    try {
        await connectToDB();
        if (!await Trip.exists({ _id: tripId })) {
            return { success: false, error: "Trip not found" };
        }
        if(!await TripAttraction.exists({ tripId })){
            return { success: true, attractions: [] };
        }
        let desiredTrip: ITrip = (await Trip.findOne({ _id: tripId }))!;
        desiredTrip = await desiredTrip.populate("tripAttractionId");
        let tripAttractions: ITripAttraction[] | undefined = desiredTrip.tripAttractionId;
        if (!tripAttractions) {
            tripAttractions = [];
        }
        const attractions = await Promise.all(tripAttractions.map(async (tripAttraction) => {
            const populatedAttraction = await Attraction.populate(tripAttraction, { path: "attractionId" });
            return populatedAttraction;
        }));
        const groupedAttractions = attractions.reduce((acc, attraction) => {
            const day = attraction.day.toISOString().split('T')[0];
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push(attraction);
            return acc;
        }, {});
        const attractionsByDay = Object.entries(groupedAttractions)
        .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
        .map(([date, attractions]) => (attractions as ITripAttraction[]).sort((a, b) => a.day.getTime() - b.day.getTime()));
        return { success: true, attractions: attractionsByDay };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}