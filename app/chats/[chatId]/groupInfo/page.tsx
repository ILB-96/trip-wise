"use client";

import ThreeDotsWave from "@components/ThreeDotsLoading";
import { GroupOutlined } from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";

const GroupInfoPage = ({ params }: { params: { chatId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState<any>({});
  const chatId = params.chatId;
  const getChatDetails = async () => {
    try {
      const res = await fetch(`/api/chats/${chatId}`);
      const data = await res.json();
      setChat(data);
      setLoading(false);
      reset({ name: data?.name });
    } catch (error: any) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (chatId)
      getChatDetails();
  }, [chatId]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const updateGroupChat = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/chats/${chatId}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      // window.location.reload();
      if(res.ok) {
        router.push(`/chats/${chatId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <ThreeDotsWave />
  ) : (
    <div className="mt-16 flex flex-col gap-11 items-center justify-center">
      <div className="flex items-center space-x-3">
        <Link href={`/chats/${chatId}`}>
          <IconButton aria-label="Back to Chats" color="primary">
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        </Link>
        <h1 className="text-2xl font-bold">Update group info</h1>
      </div>
      <form className="flex flex-col gap-9" onSubmit={handleSubmit(updateGroupChat)}>
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
          <input
            {...register("name", {
              required: "name is required",
            })}
            type="text"
            placeholder="group name"
            className="w-[300px] max-sm:w-full bg-transparent outline-none"
          />
          <GroupOutlined sx={{ color: "#737373" }} />
        </div>
        {errors?.name && (
          <p className="text-red-500">You must enter a name</p>
        )}
        <div className="flex flex-wrap gap-3">
          {chat?.members?.map((member: any, index: number) => (
            <p key={index} className=" text-base font-bold p-2 bg-pink-500 rounded-lg">{member.name}</p>)
          )
          }
        </div>
        <Button className="flex items-center justify-center rounded-xl p-3 bg-gradient-to-l from-color-sky-200 to-color-sky-800 text-body-bold text-white"
          type="submit"
        >
          Save changes
        </Button>
      </form>
    </div>
  );
};

export default GroupInfoPage;