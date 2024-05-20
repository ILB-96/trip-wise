"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { useToast } from '@components/ui/use-toast';
import { useCurrentUser } from '@hooks/use-current-user';
import React, { useRef } from 'react'
import { FaUser } from 'react-icons/fa';
import { AiFillCheckCircle, AiFillCloseCircle  } from 'react-icons/ai';

export interface CommentFormProps {
    tripId: string;
    onCommentSubmitted: () => Promise<void>;
}

const CommentForm = ({ tripId, onCommentSubmitted }: CommentFormProps) => {
    const user = useCurrentUser();
    const ref = useRef<HTMLFormElement>(null);
    const { toast } = useToast()

    const handleCommentAction = async (formData: FormData): Promise<any> => {
        if(!user) {
            throw new Error('User not logged in');
        }
        const formDataCopy = formData;
        ref.current?.reset();
        try {
            return await fetch(`/api/trip/addComment`, {
                method: 'POST',
                body: JSON.stringify({
                    author: user.id,
                    tripId: tripId,
                    content: formDataCopy.get('commentInput') as string,
                })
                }
            );
                    
        } catch (error) {
            console.error(`Error creating comment: ${error}`);
        }
    }

    return (
        <form
            ref={ref}
            action={async (data)  => {
                let result = await handleCommentAction(data);
                result = await result.json();
                if(result.success) await onCommentSubmitted();
                console.log(result);
                toast({
                    title: result.success ? 'Success' : 'Failure',
                    description: result.success ? 'Comment posted!' : 'Error posting comment',
                });
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