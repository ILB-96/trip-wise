// File: /app/api/user/[id]/addFavorite/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/user";
import Trip from "@/models/trip"; // Ensure Trip model is imported

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { tripId } = await req.json();

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(tripId)
  ) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.favorites.includes(tripId)) {
      user.favorites.push(tripId);
      await user.save();
    }

    return NextResponse.json(
      { message: "Trip added to favorites" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
