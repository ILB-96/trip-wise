"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useCurrentUser } from '@hooks/use-current-user'
import { dummyComments } from '@utils/dummycomments'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { FaUser } from 'react-icons/fa'
import TimeAgo from 'react-timeago'
import { Separator } from '@components/ui/separator'
import { CommentSectionProps } from './CommentSection'

function CommentFeed({ comments }: any) {
    return (
        <div className='space-y-2 mt-5 pl-20'>
            <div className='font-bold text-2xl'>
                {`${comments.length} Comments`}
                <Separator />
            </div>
            <div className='pt-5 space-y-5 pb-5 pr-5'>
                {
                    comments &&
                    comments.map((comment: any) => (
                        <div key={comment._id} className='flex space-x-1'>
                            <Avatar>
                                <AvatarImage src={comment.author.image || ""} />
                                <AvatarFallback className='bg-orange-300'>
                                    <FaUser />
                                </AvatarFallback>
                            </Avatar>
                            <div className='bg-gray-100 px-4 py-2 rounded-md w-full 
                        sm:w-auto md:min-w-[300px]'>
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='font-semibold'>
                                            {comment.author.name}
                                        </p>
                                        <p className='text-xs text-gray-400'>
                                            {comment.author.email}
                                        </p>
                                    </div>
                                    <p className='text-xs text-gray-400'>
                                        <TimeAgo date={new Date(comment.createdAt)} />
                                    </p>
                                </div>
                                <p className='mt-3 text-sm'>{comment.content}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CommentFeed