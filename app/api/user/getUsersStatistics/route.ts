import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectToDB();
    const totalUsers = await User.countDocuments();
    NextResponse.json({ totalUsers });
  } catch (error) {
    NextResponse.json(
      { error: "Failed to fetch total users" },
      { status: 500 }
    );
  }
}
