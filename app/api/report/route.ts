import { addReport, getReports } from "@lib/reports";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await addReport(data);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Adding report error: " + error.message },
      { status: 500 }
    );
  }
}
