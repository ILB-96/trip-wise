import { format } from 'date-fns';
import React from 'react'

const MessageBox = ({ message, currentUserEmail }: { message: any, currentUserEmail: string }) => {
    return message?.sender?.email !== currentUserEmail ? (
        <div className='flex gap-3 items-start'>
            <img
                src={message?.sender?.image || "/assets/images/noavatar.png"}
                alt='profile photo'
                className='w-8 h-8 rounded-full' />
            <div className='flex flex-col gap-2'>
                <p className='text-sm font-bold'>
                    {message?.sender?.name}  &#160; &#183; &#160; {format((new Date(message?.createdAt)), 'p')}
                </p>
                {message?.text && (
                    <p className='w-fit bg-white p-3 rounded-lg text-base'>
                        {message?.text}
                    </p>
                )}
            </div>
        </div>
    ) : (
        <div className='flex gap-3 items-start justify-end'>
            <div className='flex flex-col gap-2 items-end'>
                <p className='font-bold text-sm'>
                    {format((new Date(message?.createdAt)), 'p')}
                </p>
                {message?.text && (
                    <p className='w-fit bg-purple-800 text-white p-3 rounded-lg text-base'>
                        {message?.text}
                    </p>
                )}
            </div>
        </div>
    );
}

export default MessageBox