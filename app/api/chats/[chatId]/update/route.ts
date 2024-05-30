import Chat from "@models/chat";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { chatId: string } }) {
    try {
        await connectToDB();
        const body = await request.json();
        const { chatId } = params;
        const { name } = body;
        const updatedGroupChat = await Chat.findByIdAndUpdate(chatId, {
            name
        },
            { new: true }
        );
        return NextResponse.json(updatedGroupChat, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Updating  groupchat error: " + error.message },
            { status: 500 }
        );
    }
}