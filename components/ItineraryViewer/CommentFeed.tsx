"use client"
import React from 'react'
import { useCurrentUser } from '@hooks/use-current-user'
import { dummyComments } from '@utils/dummycomments'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { FaUser } from 'react-icons/fa'
import TimeAgo  from 'react-timeago'
import { Separator } from '@components/ui/separator'
import CommentForm from './CommentForm'

function CommentFeed() {
    return (
        <div className='space-y-2 mt-3 pl-20'>
            <div className='font-bold text-2xl'>
                {`${dummyComments.length} Comments`}
                <Separator />
            </div>
            <div className='pt-5 space-y-5 pb-5 pr-5'>
            {
                dummyComments?.map(comment => (
                    <div key={comment.id} className='flex space-x-1'>
                        <Avatar>
                            <AvatarImage src={comment.image || ""} />
                            <AvatarFallback className='bg-orange-300'>
                                <FaUser />
                            </AvatarFallback>
                        </Avatar>
                        <div className='bg-gray-100 px-4 py-2 rounded-md w-full 
                        sm:w-auto md:min-w-[300px]'>
                            <div className='flex justify-between'>
                                <div>
                                    <p className='font-semibold'>
                                        {comment.authorName}
                                    </p>
                                    <p className='text-xs text-gray-400'>
                                        {comment.email}
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