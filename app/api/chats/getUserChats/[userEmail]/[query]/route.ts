import Chat from "@models/chat";
import Message from "@models/message";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userEmail: string, query: string } }) {
    try {
        await connectToDB();
        const { userEmail, query } = params;
        const searchedChat = await Chat.find({
            members: userEmail,
            $or: [
            {name: { $regex: query, $options: "i" }},
            {members: {$regex: query, $options: "i"}},
            ]
        });
        for(let chat of searchedChat) {
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
        return NextResponse.json(searchedChat, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json(
            { error: "Fetching chat query for user error: "+error.message },
            { status: 500 }
        );
    }
}