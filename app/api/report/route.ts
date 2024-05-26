import { addReport } from "@lib/reports";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: { params: { tripCommentid: string; snitchId: string; reason: string } }
) {
  try {
    const result = await addReport(await request.json());
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Adding report error: " + error.message },
      { status: 500 }
    );
  }
}
