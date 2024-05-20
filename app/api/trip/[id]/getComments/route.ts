import { getComments } from "@lib/comments";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const comments = await getComments(params.id);
        return NextResponse.json(comments);
        
    } catch (error: any) {
        return NextResponse.json(
            { error: "Fetching comments error: "+error.message },
            { status: 500 }
        );
    }
}