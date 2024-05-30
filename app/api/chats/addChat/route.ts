import { pusherServer } from "@lib/pusher";
import Chat from "@models/chat";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectToDB();
        const body = await request.json();
        const { currentUserEmail, members, isGroup, name } = body;
        const query = isGroup ?
            { members: [currentUserEmail, ...members], isGroup, name } :
            { members: { $all: [currentUserEmail, ...members], $size: 2 } };
        let chat = await Chat.findOne(query);
        if (!chat) {
            chat = await new Chat(
                isGroup ? query : { members: [currentUserEmail, ...members] }
            );
            await chat.save();
            const updateAllMembers = chat.members.map(async (memberEmail: string) => {
                await User.updateOne(
                    { email: memberEmail },
                    { $addToSet: { chats: chat._id } }
                );
            });
            await Promise.all(updateAllMembers);
            chat.members = await Promise.all(chat.members.map(async (email: string) => {
                return await User.findOne({ email }, 'name email image');
            }));
            chat.members.map((member: any) => {
                pusherServer.trigger(member.email.toString(), "new-chat", chat);
            });
        }
        return NextResponse.json(chat, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Adding chat error: " + error.message },
            { status: 500 }
        );
    }
}