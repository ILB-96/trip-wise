import { fetchDetails, fetchImage } from "@lib/places";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const placeId: string = searchParams.get("placeId")!;
        const placeName: string = searchParams.get("placeName")!;

        const image = await fetchImage(placeName);
        const description = await fetchDetails(placeId, placeName);
        const result = {image, description};
        if(image && description) {
            return NextResponse.json(result, { status: 200 });
        }
        return NextResponse.json(
            { error: "Could not get image/description for attraction"},
            { status: 500 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: "Fetching a generated attraction failed error: " + error.message },
            { status: 500 }
        );
    }
}