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
import Image from 'next/image';


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
                {user?.image ? <Image src={user.image} alt="profile" className="w-10 h-10 rounded-full" width={40} height={40} /> : <FaUser />}
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