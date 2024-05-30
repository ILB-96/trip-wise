import { pusherServer } from "@lib/pusher";
import Chat from "@models/chat";
import Message from "@models/message";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectToDB();
        const body = await request.json();
        const { chatId, currentUserEmail, text } = body;
        const newMessage = await Message.create({
            chat: chatId,
            sender: currentUserEmail,
            text,
            seenBy: currentUserEmail,
        });
        let updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { messages: newMessage._id },
                $set: { lastMessageAt: newMessage.createdAt }
            },
            { new: true }
        );
        updatedChat = await updatedChat.populate('messages');
        updatedChat.messages = await Promise.all(updatedChat.messages.map(async (message: any) => {
            let sender = await User.findOne({ email: message.sender }, 'name email image');
            let seenBy = await Promise.all(message.seenBy.map(async (email: string) => {
                return await User.findOne({ email }, 'name email image');
            }));
            message.sender = sender;
            message.seenBy = seenBy;
            return message;
        }));
        const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
        await pusherServer.trigger(chatId, "new-message", lastMessage);
        updatedChat.members.forEach(async (memberEmail: any) => {
            try {
                await pusherServer.trigger(memberEmail.toString(), "update-chat", {
                    id: chatId,
                    messages: [lastMessage],
                });
            } catch (error: any) {
                console.error(`Failed to trigger update-chat event for user: ${error}`);
            }
        });
        return NextResponse.json(lastMessage, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Adding message to chat failure error: " + error.message },
            { status: 500 }
        );
    }
}