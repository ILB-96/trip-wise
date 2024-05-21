
import { connectToDB } from "@utils/database";
import TripAttraction from '@/models/tripAttraction';
import { NextResponse } from "@node_modules/next/server";
import Trip, { ITrip } from "@models/trip";


export async function POST(request: Request) {
    try {
        await connectToDB();
        const requestJSON = await request.json();
        const tripAttraction = new TripAttraction(requestJSON);
        await tripAttraction.save();
        let trip: ITrip | null = await Trip.findOne({
            _id: requestJSON.tripId,
        });
        if (trip) {
            if (trip.tripAttractionId === null) {
                trip.tripAttractionId = [];
            }
            trip.tripAttractionId!.push(tripAttraction._id);
            await trip.save();
            return NextResponse.json(tripAttraction);
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: "Adding comment error: " + error.message },
            { status: 500 }
        );
    }
}
