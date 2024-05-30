"use client"

import ThreeDotsWave from '@components/ThreeDotsLoading';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox';
import { pusherClient } from '@lib/pusher';

const ChatList = ({ currentChatId }: { currentChatId: any }) => {
  const session = useSession();
  const currentUserEmail = session.data?.user.email;
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Array<any>>([]);
  const [search, setSearch] = useState("");
  const getAllChats = async () => {
    try {
      const res = await fetch(search !== "" ? `/api/chats/getUserChats/${currentUserEmail}/${search}` :
        `/api/chats/getUserChats/${currentUserEmail}`);
      const data = await res.json();
      setChats(data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (currentUserEmail) {
      getAllChats();
    }
  }, [currentUserEmail, search]);
  useEffect(() => {
    if (currentUserEmail) {
      pusherClient.subscribe(currentUserEmail);
      const handleChatUpdate = (updatedChat: any) => {
        setChats((allChats) => allChats.map((chat: any) => {
          if (chat._id === updatedChat.id) {
            return { ...chat, messages: updatedChat.messages };
          }
          return chat;
        }))
      }
      const handleNewChat = (newChat: any) => {
        setChats((allChats) => [...allChats, newChat]);
      }
      pusherClient.bind("update-chat", handleChatUpdate);
      pusherClient.bind("new-chat", handleNewChat)
      return () => {
        pusherClient.unsubscribe(currentUserEmail);
        pusherClient.unbind("update-chat", handleChatUpdate);
        pusherClient.unbind("new-chat", handleNewChat);

      }
    }
  }, [currentUserEmail])
  return loading ? (<ThreeDotsWave />) : (
    <div className='h-screen flex flex-col gap-5 pb-20'>
      <input
        placeholder='Search chat..'
        className='px-5 py-3 rounded-2xl bg-white outline-none'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='flex-1 flex flex-col bg-white rounded-3xl py-4 px-3 overflow-y-scroll custom-scrollbar'>
        {
          currentUserEmail && chats.map((chat: any, index) => (
            <ChatBox chat={chat} key={index} currentUserEmail={currentUserEmail} currentChatId={currentChatId} />)
          )
        }
      </div>
    </div>
  )
}

export default ChatList