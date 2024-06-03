import { NextResponse } from "next/server";
import AttractionRating from "@/models/attractionRating";
import { connectToDB } from "@utils/database";
import { calculateAverageRating } from "@helpers/starsCalc";
import Attraction from "@models/attraction";

export async function POST(request: Request) {
  await connectToDB();

  const { attractionId, rating, userId } = await request.json();
  if (!attractionId || !rating || !userId) {
    console.error("Invalid data received:", { attractionId, rating, userId });
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const existingRating = await AttractionRating.findOne({
      attractionId,
      author: userId,
    });
    const existingAtt = await Attraction.findById(attractionId);
    if (existingRating) {
      // Update the existing rating
      const oldRating = existingRating.rating;
      existingRating.rating = rating;
      const ratingIndex = existingAtt.rating.indexOf(oldRating);
      if (ratingIndex > -1) {
        existingAtt.rating.splice(ratingIndex, 1);
      }
      existingAtt.rating.push(rating);
      await existingRating.save();
      await existingAtt.save();
    } else {
      const newRating = new AttractionRating({
        attractionId,
        rating,
        author: userId,
      });
      existingAtt.rating.push(rating);
      await newRating.save();
      await existingAtt.save();
    }
    const { averageRating, ratingCount } = await calculateAverageRating(
      attractionId
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
