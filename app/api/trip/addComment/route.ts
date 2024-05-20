import { addComment } from "@lib/comments";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const result = await addComment(await request.json());
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Adding comment error: "+error.message },
            { status: 500 }
        );
    }
}