
import { getTripAttractionForTrip } from "@lib/tripattractions";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const days = await getTripAttractionForTrip(params.id);
        return NextResponse.json(days);
        
    } catch (error: any) {
        return NextResponse.json(
            { error: "Fetching days error: "+error.message },
            { status: 500 }
        );
    }
}