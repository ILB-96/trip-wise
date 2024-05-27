import { NextResponse } from 'next/server';
import {connectToDB} from "@utils/database";

import attractionRating from "@models/attractionRating";
import {calculateAverageRating} from "@helpers/starsCalc";


export async function POST(request: Request) {
    await connectToDB()

    try {
        const {attractionId, rating, userId} = await request.json();

        // Check if the user has already rated this attraction
        const existingRating = await attractionRating.findOne({attractionId, author: userId});

        if (existingRating) {
            return NextResponse.json({error: 'You have already rated this attraction.'}, {status: 400});
        }

        // Create a new rating document
        const newRating = new attractionRating({
            author: userId,
            attractionId,
            rating
        });

        await newRating.save();

        const {averageRating, ratingCount} = await calculateAverageRating(attractionId);

        return NextResponse.json({
            message: 'Rating submitted successfully',
            newAverageRating: averageRating,
            newRatingCount: ratingCount
        }, {status: 200});
    } catch (error) {
        return NextResponse.json({error: `Error submitting rating`}, {status: 500});
    }
}
