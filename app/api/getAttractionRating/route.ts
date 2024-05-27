import { NextResponse } from 'next/server';
import attractionRating from "@models/attractionRating";
import { calculateAverageRating } from '@/helpers/starsCalc';
import {connectToDB} from "@utils/database";
import attraction from "@models/attraction";
import Attraction from "@models/attraction";

export async function GET(request: Request) {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const attractionId = searchParams.get('attractionId');

    if (!attractionId) {
        return NextResponse.json({ error: 'Missing attractionId' }, { status: 400 });
    }

    try {
        // Fetch specific attraction by ID
        const attraction = await Attraction.findById(attractionId).lean();

        if (!attraction) {
            return NextResponse.json({ error: 'Attraction not found' }, { status: 404 });
        }

        // Calculate average rating and rating count for the specific attraction
        const { averageRating, ratingCount } = await calculateAverageRating(attractionId);

        // Add the calculated ratings to the attraction object
        const attractionWithRatings = { ...attraction, averageRating, ratingCount };

        return NextResponse.json(attractionWithRatings);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        return NextResponse.json({ error: 'Error fetching ratings' }, { status: 500 });
    }
}
