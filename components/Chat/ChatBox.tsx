import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaUser } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

export interface ChatBoxProps {
    chat: any;
    currentUserEmail: string;
    currentChatId: any;
}

const ChatBox = ({ chat, currentUserEmail, currentChatId }: ChatBoxProps) => {
    const otherMembers = chat?.members?.filter((member: any) => member.email !== currentUserEmail);
    const lastMessage = chat?.messages.length > 0 && chat?.messages[chat?.messages.length - 1];
    const seen = lastMessage?.seenBy?.find((member: any) => { console.log(member.email); return member.email === currentUserEmail });
    const router = useRouter();
    return (
        <div
            onClick={() => { router.push(`/chats/${chat._id}`) }}
            className={`${chat._id === currentChatId ? "bg-blue-300" : ""} 
            flex items-start justify-between p-2 rounded-2xl cursor-pointer hover:bg-gray-100`}>
            <div className='flex gap-3'>
                {
                    chat?.isGroup ? (
                        <FaUserGroup className='w-8 h-8 rounded-full object-cover object-center' />
                    ) : (
                        <Avatar>
                            <AvatarImage src={otherMembers[0].image || ""} />
                            <AvatarFallback className="bg-orange-300">
                                <FaUser />
                            </AvatarFallback>
                        </Avatar>
                    )
                }
                <div className='flex flex-col gap-1'>
                    {
                        chat?.isGroup ? (
                            <p className='font-bold'>
                                {chat.name}
                            </p>
                        ) : (
                            <p className='font-bold'>
                                {otherMembers[0].name}
                            </p>
                        )
                    }
                    {
                        !lastMessage && (
                            <p className='text-sm font-bold'>
                                Started a chat
                            </p>
                        )
                    }
                    {
                        lastMessage && (
                            <p className={`w-[120px] sm:w-[250px] truncate ${seen ? ('text-sm text-gray-600') : ('text-sm font-bold')}`}>
                                {lastMessage?.text}
                            </p>
                        )
                    }
                </div>
            </div>
            <div>
                <p className='text-sm text-gray-500'>
                    {
                        !lastMessage ?
                            format(new Date(chat?.createdAt), "p") :
                            format(new Date(chat?.lastMessageAt), "p")
                    }
                </p>
            </div>
        </div>
    )
}

export default ChatBox