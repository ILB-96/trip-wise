// File: /app/api/user/[id]/removeFavorite/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/user";

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

    user.favorites = user.favorites.filter(
      (favoriteId) => favoriteId.toString() !== tripId
    );
    await user.save();

    return NextResponse.json(
      { message: "Trip removed from favorites" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
