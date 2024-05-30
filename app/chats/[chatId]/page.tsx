"use client";

import ChatDetails from '@components/Chat/ChatDetails';
import ChatList from '@components/Chat/ChatList';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

const ChatPage = () => {
  const { chatId } = useParams();
  const { data: session } = useSession();
  const currentUserEmail = session?.user.email;
  const seeMessages = async () => {
    try {
      await fetch(`/api/chats/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentUserEmail })
      });
    } catch (error: any) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (currentUserEmail && chatId) {
      seeMessages();
    }
  }, [currentUserEmail, chatId])
  return (
    <div className='h-screen flex justify-between gap-5 px-10 py-3 max-lg:gap-8'>
      <div className='w-1/3 max-lg:hidden'>
        <ChatList currentChatId={chatId} />
      </div>
      <div className='w-2/3 max-lg:w-full'>
        <ChatDetails chatId={chatId} />
      </div>
    </div>
  )
}

export default ChatPage