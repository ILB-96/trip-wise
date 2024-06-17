"use client"

import { FaUser } from 'react-icons/fa';
import { IoExitOutline } from "react-icons/io5";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '@context/UserContext';
import { HeartIcon, LayoutDashboardIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


export const ProfileButton = () => {
    const user = useSession().data?.user;
    const { changeUserState } = useContext(UserContext);
    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {user?.image ? <Image src={user.image} alt="profile" className="w-10 h-10 rounded-full" width={40} height={40} /> : <FaUser />}
            </DropdownMenuTrigger>
            <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuItem onClick={
                    () => {
                        router.push('/favorites');
                    }
                }
                >
                    <HeartIcon className='h-4 w-4 mr-2' />
                    Favorites
                </DropdownMenuItem>
                {user?.role == "ADMIN" && <DropdownMenuItem onClick={
                    () => {
                        router.push('/dashboard');
                    }
                }
                >
                    <LayoutDashboardIcon className='h-4 w-4 mr-2' />
                    Dashboard
                </DropdownMenuItem>}
                <DropdownMenuItem onClick={
                    async () => {
                        await signOut({ callbackUrl: "/auth/login" });
                        changeUserState();
                    }
                }
                >
                    <IoExitOutline className='h-4 w-4 mr-2' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}