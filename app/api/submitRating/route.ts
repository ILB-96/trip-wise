import { NextResponse } from 'next/server';
import AttractionRating from '@/models/attractionRating';
import {connectToDB} from "@utils/database";
import {calculateAverageRating} from "@helpers/starsCalc";

export async function POST(request :Request) {
    await connectToDB();

    const { attractionId, rating, userId } = await request.json();
    console.log('Received data:', { attractionId, rating, userId });
    if (!attractionId || !rating || !userId) {
        console.error('Invalid data received:', { attractionId, rating, userId });
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const existingRating = await AttractionRating.findOne({ attractionId, author: userId });

        if (existingRating) {
            // Update the existing rating
            existingRating.rating = rating;
            await existingRating.save();
        } else {
            const newRating = new AttractionRating({ attractionId, rating, author: userId });
            await newRating.save();
        }
        const { averageRating, ratingCount } = await calculateAverageRating(attractionId);
        console.log('Rating calculation:', { averageRating, ratingCount });
        return NextResponse.json({
            message: 'Rating submitted successfully',
            newAverageRating: averageRating,
            newRatingCount: ratingCount
        });
    } catch (error) {
        console.error("Error submitting rating:", error);
        return NextResponse.json({ error: `Error submitting rating` }, { status: 500 });
    }
}
