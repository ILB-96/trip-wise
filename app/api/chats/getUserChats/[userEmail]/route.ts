import Chat from "@models/chat";
import Message from "@models/message";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userEmail: string } }) {
    try {
        await connectToDB();
        const allChats = await Chat.find({ members: params.userEmail })
            .sort({ updatedAt: -1 });
        for (let chat of allChats) {
            chat.members = await Promise.all(chat.members.map(async (email: string) => {
                return await User.findOne({ email }, 'name email image');
            }));
            if(Message) {} 
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

        }
        return NextResponse.json(allChats, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(
            { error: "Fetching chats for user failed error: " + error.message },
            { status: 500 }
        );
    }
}