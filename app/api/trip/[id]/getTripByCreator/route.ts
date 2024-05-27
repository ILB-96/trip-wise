import { getTripsByEditor } from "@/lib/trips";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id: editorId } = params;

  console.log("Fetching trips for editorId:", editorId); // Logging to verify the request

  if (!editorId) {
    return NextResponse.json(
      { error: "Editor ID is required" },
      { status: 400 }
    );
  }

  try {
    const trips = await getTripsByEditor(editorId);
    return NextResponse.json({ trips });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Fetching trips error: " + error.message },
      { status: 500 }
    );
  }
}