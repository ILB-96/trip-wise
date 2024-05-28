import { NextResponse } from 'next/server';
import { calculateTripAverageRating } from '@/helpers/starsCalc';
import { connectToDB } from "@utils/database";
import Trip from "@models/trip";

export async function GET(request: Request) {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get('tripId');

    if (!tripId) {
        return NextResponse.json({ error: 'Missing tripId' }, { status: 400 });
    }

    try {
        // Fetch specific trip by ID
        const trip = await Trip.findById(tripId).lean();

        if (!trip) {
            return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        }

        // Calculate average rating and rating count for the specific trip
        const { averageRating, ratingCount } = await calculateTripAverageRating(tripId);

        // Add the calculated ratings to the trip object
        const tripWithRatings = { ...trip, averageRating, ratingCount };

        return NextResponse.json(tripWithRatings);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        return NextResponse.json({ error: 'Error fetching ratings' }, { status: 500 });
    }
}
