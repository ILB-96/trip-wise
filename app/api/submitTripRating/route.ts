import { NextResponse } from 'next/server';
import TripRating from '@/models/tripRating';
import { connectToDB } from "@utils/database";
import { calculateTripAverageRating } from '@helpers/starsCalc';

export async function POST(request: Request) {
    await connectToDB();

    const { tripId, rating, userId } = await request.json();

    if (!tripId || !rating || !userId) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const existingRating = await TripRating.findOne({ tripId, author: userId });

        if (existingRating) {
            // Update the existing rating
            existingRating.rating = rating;
            await existingRating.save();
        } else {
            const newRating = new TripRating({ tripId, rating, author: userId });
            await newRating.save();
        }
        const { averageRating, ratingCount } = await calculateTripAverageRating(tripId);
        return NextResponse.json({
            message: 'Rating submitted successfully',
            newAverageRating: averageRating,
            newRatingCount: ratingCount
        });
    } catch (error) {
        console.error("Error submitting rating:", error);
        return NextResponse.json({ error: 'Error submitting rating' }, { status: 500 });
    }
}
