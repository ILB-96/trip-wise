"use client"

import { FaUser } from 'react-icons/fa';
import { IoExitOutline } from "react-icons/io5";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

import { 
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '@components/ui/avatar';
import { logout } from '@actions/logout';
import { useSession } from 'next-auth/react';


interface ProfileButtonProps {
    changeUserState: () => void;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ changeUserState }) => {
    const user = useSession().data?.user;
    const handleClick = async () => {
        await logout();
        changeUserState();
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className='bg-orange-300'>
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleClick}>
                    <IoExitOutline className='h-4 w-4 mr-2' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}