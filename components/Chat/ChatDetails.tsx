import ThreeDotsWave from '@components/ThreeDotsLoading';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import Image from 'next/image';
import MessageBox from './MessageBox';
import { pusherClient } from '@lib/pusher';

const ChatDetails = ({ chatId }: { chatId: any }) => {
    const [loading, setLoading] = useState(true);
    const [chat, setChat] = useState<any>(null);
    const [otherMembers, setOtherMembers] = useState<Array<any>>([]);
    const session = useSession();
    const currentUserEmail = session.data?.user?.email;
    const [text, setText] = useState("");
    const getChatDetails = async () => {
        try {
            const res = await fetch(`/api/chats/${chatId}`);
            const data = await res.json();
            setChat(data);
            setOtherMembers(data?.members?.filter((member: any) => member.email !== currentUserEmail));
            setLoading(false);
        } catch (error: any) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (currentUserEmail && chatId)
            getChatDetails();
    }, [currentUserEmail, chatId]);
    const sendText = async () => {
        try {
            const res = await fetch(`/api/chats/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatId,
                    currentUserEmail,
                    text
                })
            });
            setText("");
        } catch (error: any) {
            console.log(error);
        }
    }
    useEffect(() => {
        pusherClient.subscribe(chatId);
        const handleMessage = async (newMessage: any) => {
            setChat((prevChat: any) => {
                return {
                    ...prevChat,
                    messages: [...prevChat.messages, newMessage]
                }
            });
        
        }
        pusherClient.bind("new-message", handleMessage);
        return () => {
            pusherClient.unsubscribe(chatId);
            pusherClient.unbind("new-message", handleMessage);
        }
    }, [chatId]);
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat?.messages]);
    return loading ? (<ThreeDotsWave />) : (
        <div className='h-screen flex flex-col bg-white rounded-2xl'>
            <div className='flex items-center gap-4 px-8 py-3 text-xl font-bold'>
                {
                    chat?.isGroup ? (
                        <Link href={`/chats/${chatId}/groupInfo`}>
                            <FaUserGroup className='w-8 h-8 rounded-full object-cover object-center' />
                            <div className='text-xl'>
                                <p>{chat?.name} &#160; &#183; &#160; {chat?.members?.length} members</p>
                            </div>
                        </Link>
                    ) : (
                        <>
                            <Avatar>
                                <AvatarImage src={otherMembers[0].image || ""} />
                                <AvatarFallback className="bg-orange-300">
                                    <FaUser />
                                </AvatarFallback>
                            </Avatar>
                            <div className='text-xl'>
                                <p>{otherMembers[0].name}</p>
                            </div>
                        </>
                    )
                }
            </div>
            <div className='flex-1 flex flex-col gap-5 bg-gray-200 p-5 overflow-y-scroll custom-scrollbar'>
                {chat?.messages?.map((message: any, index: number) =>

                    <MessageBox key={index} message={message} currentUserEmail={currentUserEmail!} />
                )}
                <div ref={bottomRef} />
            </div>
            <div className='w-full flex items-center justify-between px-7 py-3 rounded-3xl cursor-pointer bg-white'>
                <div className='flex items-center gap-4'>
                    <input
                        className='w-[300px] max-sm:w-full bg-white outline-none'
                        type='text'
                        placeholder='Write a message..'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>
                <div onClick={sendText}>
                    <Image
                        className='w-10 h-10 rounded-full hover:scale-125 ease-in-out duration-300'
                        src={"/assets/icons/send.jpg"}
                        width={50}
                        height={50}
                        alt=''
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatDetails;