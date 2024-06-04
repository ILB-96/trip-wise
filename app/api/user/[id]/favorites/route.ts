// File: /app/api/user/[id]/favorites/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/user";
import Trip from "@/models/trip"; // Ensure Trip model is imported

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const user = await User.findById(id).populate("favorites").exec();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ favorites: user.favorites }, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
