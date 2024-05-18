import { fetchUnsplashImage } from "@lib/unsplash";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { query: string } }) {
    try {
        const imgUrl = await fetchUnsplashImage(params.query);
        // console.log({imgUrl});
        return NextResponse.json({ imgUrl }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json(
            { error: "Fetching unsplash image error: "+error.message },
            { status: 500 }
        );
    }
}