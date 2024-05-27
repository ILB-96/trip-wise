"use server";

import { NextResponse } from "next/server";
import AttractionRating from "@/models/attractionRating";
import { connectToDB } from "@utils/database";
import { calculateAverageRating } from "@helpers/starsCalc";
import { Types } from "mongoose";

export async function POST(request: Request) {
  await connectToDB();

  const { attractionId, rating, userId } = await request.json();
  console.log("Received data:", { attractionId, rating, userId });
  if (!attractionId || !rating || !userId) {
    console.error("Invalid data received:", { attractionId, rating, userId });
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    console.log("Updating rating");
    const newRating = await AttractionRating.findOneAndUpdate(
      { author: userId, attractionId },
      { $set: { rating } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log("New rating:");
    const { averageRating, ratingCount } = await calculateAverageRating(
      attractionId
    );
    console.log("Rating calculation:", { averageRating, ratingCount });
    return NextResponse.json({
      message: "Rating submitted successfully",
      newAverageRating: averageRating,
      newRatingCount: ratingCount,
    });
  } catch (error) {
    console.error("Error submitting rating:", error);
    return NextResponse.json(
      { error: `Error submitting rating` },
      { status: 500 }
    );
  }
}
