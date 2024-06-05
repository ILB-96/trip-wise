import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import Attraction from "@models/attraction";

export async function GET(req: NextRequest) {
  await connectToDB();

  try {
    const attractions = await Attraction.aggregate([
      {
        $project: {
          title: 1,
          location: 1,
          country: 1,
          price: 1,
          description: 1,
          image: 1,
          types: 1,
          averageRating: { $avg: "$rating" },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 10 },
    ]);

    return NextResponse.json({ attractions });
  } catch (error) {
    console.error("Failed to fetch attractions:", error);
    return NextResponse.json(
      { error: "Failed to fetch attractions" },
      { status: 500 }
    );
  }
}
