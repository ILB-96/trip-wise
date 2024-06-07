import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import Attraction from "@models/attraction";
import { getRatingForAttraction } from "@helpers/starsCalc";

export async function GET(request: Request) {
    try {
        await connectToDB();
        const allAttractions = await Attraction.find({});
        let result = allAttractions.map((attraction) => {
            const { averageRating, ratingCount } = getRatingForAttraction(attraction.rating);
            return { ...attraction.toObject(), averageRating, ratingCount}
        });
        result = result.sort((a, b) =>{
            if(a.averageRating === b.averageRating) {
                return b.ratingCount - a.ratingCount;
            }
            return b.averageRating - a.averageRating
        })
        .slice(0, 10);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch best rated attractions" },
            { status: 500 }
        );
    }
}
