import { NextResponse } from 'next/server';
import TripRating from '@/models/tripRating';
import { connectToDB } from "@utils/database";
import { calculateTripAverageRating } from '@helpers/starsCalc';
import Trip from "@models/trip";

export async function POST(request: Request) {
  await connectToDB();

  const { tripId, rating, userId } = await request.json();

  if (!tripId || !rating || !userId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const existingRating = await TripRating.findOne({ tripId, author: userId });
    const existingTrip = await Trip.findById(tripId);
    if (existingRating) {
      // Update the existing rating
      const oldRating = existingRating.rating;
      existingRating.rating = rating;
      const ratingIndex = existingTrip.rating.indexOf(oldRating);
      if (ratingIndex > -1) {
        existingTrip.rating.splice(ratingIndex, 1);
      }
      existingTrip.rating.push(rating);
      await existingRating.save();
      await existingTrip.save();
    } else {
      const newRating = new TripRating({ tripId, rating, author: userId });
      existingTrip.rating.push(rating);
      await newRating.save();
      await existingTrip.save();
    }
    const { averageRating, ratingCount } = await calculateTripAverageRating(
      tripId
    );
    return NextResponse.json({
      message: "Rating submitted successfully",
      newAverageRating: averageRating,
      newRatingCount: ratingCount,
    });
  } catch (error) {
    console.error("Error submitting rating:", error);
    return NextResponse.json(
      { error: "Error submitting rating" },
      { status: 500 }
    );
  }
}
