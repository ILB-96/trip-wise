import Chat from "@models/chat";
import Message from "@models/message";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { chatId: string } }) {
    try {
        await connectToDB();
        let chat = await Chat.findById(params.chatId);

        chat.members = await Promise.all(chat.members.map(async (email: string) => {
            return await User.findOne({ email }, 'name email image');
        }));
        if (Message) { }
        chat = await chat.populate('messages');
        chat.messages = await Promise.all(chat.messages.map(async (message: any) => {
            let sender = await User.findOne({ email: message.sender }, 'name email image');
            let seenBy = await Promise.all(message.seenBy.map(async (email: string) => {
                return await User.findOne({ email }, 'name email image');
            }));
            message.sender = sender;
            message.seenBy = seenBy;
            return message;
        }));
        return NextResponse.json(chat, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(
            { error: "Fetching chat details failed error: " + error.message },
            { status: 500 }
        );
    }
}
export async function POST(request: Request, { params }: { params: { chatId: string } }) {
    try {
        await connectToDB();
        const { chatId } = params;
        const body = await request.json();
        const { currentUserEmail, } = body;
        await Message.updateMany(
            { chat: chatId },
            { $addToSet: { seenBy: currentUserEmail } },
            { new: true }
        );
        return NextResponse.json("Seen all the messages in chat", { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Seeing chat messages error: " + error.message },
            { status: 500 }
        );
    }
}