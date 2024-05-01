"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { useCurrentUser } from '@hooks/use-current-user';
import React, { useRef } from 'react'
import { FaUser } from 'react-icons/fa';


const CommentForm = () => {
    const user = useCurrentUser();
    const ref = useRef<HTMLFormElement>(null);

    const handleCommentAction = async (formData: FormData): Promise<void> => {
        if(!user) {
            throw new Error('User not logged in');
        }
        const fomrDataCopy = formData;
        ref.current?.reset();
        try {
            // backend request
            
        } catch (error) {
            console.error(`Error creating comment: ${error}`);
        }
    }

    return (
        <form
            ref={ref}
            action={(data) => {

                // notification that the comment has been posted
            }}
            className='flex items-center space-x-1 pl-20 pr-20'
        >
            <Avatar>
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className='bg-orange-300'>
                    <FaUser />
                </AvatarFallback>
            </Avatar>
            <div className='flex flex-1 bg-white border rounded-full px-3 py-2'>
                <input
                    type="text"
                    name='commentInput'
                    placeholder='Write your name comment..'
                    className='outline-none flex-1 text-sm bg-transparent'
                />
                <button type="submit" hidden>
                    Post
                </button>
            </div>
        </form>
    )
}

export default CommentForm