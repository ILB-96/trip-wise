import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import trip from "@models/trip";

async function getLastSevenTrips() {
  return trip.find({ shared: true }).sort({ createdAt: -1 }).limit(7).exec();
}

export async function GET(req: Request) {
  try {
    await connectToDB();
    const trips = await getLastSevenTrips();
    return NextResponse.json({ trips }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}