"use client";
import ThreeDotsWave from '@components/ThreeDotsLoading';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material'
import { useRouter } from 'next/navigation';

const Contacts = () => {
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const session = useSession();
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");

    const getContacts = async () => {
        try {
            const res = await fetch(search !== "" ? `/api/user/getByEmailOrName/${search}` : "/api/user/getAllUsers");
            const data = await res.json();
            setContacts(data.filter((contact: any) => contact.email !== session.data?.user.email));
            setLoading(false);
        } catch (error: any) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (session.data?.user)
            getContacts();
    }, [search]);
    const [selectedContacts, setSelectedContacts] = useState<Array<any>>([]);
    const isGroup = selectedContacts.length > 1;
    const handleSelect = (contact: any) => {
        if (selectedContacts.includes(contact)) {
            setSelectedContacts((prevSelectedContacts) => prevSelectedContacts.filter((item) => item !== contact));
        } else {
            setSelectedContacts((prevSelectedContacts) => [...prevSelectedContacts, contact]);
        }
    }
    const router = useRouter();
    const createChat = async () => {
        const response = await fetch("/api/chats/addChat", {
            method: "POST",
            body: JSON.stringify({
                currentUserEmail: session.data?.user.email,
                members: selectedContacts.map((contact) => contact.email),
                isGroup,
                name,
            })
        });
        const chat = await response.json();
        if(response.ok) {
            router.push(`/chats/${chat._id}`);
        }
    }
    return (loading ? <ThreeDotsWave /> :
        <div className='flex flex-col gap-5'>
            <input placeholder='Search contact..'
                className='px-5 py-3 rounded-2xl bg-white outline-none'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className='h-screen w-1/2 max-lg:w-full flex flex-col gap-5 bg-white rounded-3xl py-5 px-8 mb-20 overflow-y-scroll max-h-[80vh]'>
                <p className='font-bold'>
                    Select or unselect
                </p>
                {
                    contacts.map((user: any, index) => {
                        return (
                            <div key={index} onClick={() => handleSelect(user)} className='flex gap-3 items-center cursor-pointer'>
                                {selectedContacts.find((item) => item === user) ? (
                                    <CheckCircle sx={{ color: "blue" }} />
                                ) : (<RadioButtonUnchecked />)}
                                <Avatar>
                                    <AvatarImage src={user.image || ""} />
                                    <AvatarFallback className="bg-orange-300">
                                        <FaUser />
                                    </AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <p className='font-bold'>{user.name}</p>
                                    <p className='text-gray-400'>{user.email}</p>
                                </div>
                            </div>
                        );
                    })
                }
                <div className='w-1/2 max-lg:w-full flex flex-col gap-7'>
                    {
                        isGroup && (
                            <>
                                <div className='flex flex-col gap-3'>
                                    <p className='font-bold'>
                                        Group chat name
                                    </p>
                                    <input
                                        placeholder='Enter group chat name..'
                                        className='bg-white rounded-2xl px-5 py-3 outline-none'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <p className='font-bold'>
                                        Members
                                    </p>
                                    <div className='flex flex-wrap gap-3'>
                                        {
                                            selectedContacts.map((contact, index) => {
                                                return (<p key={index} className='font-bold p-2 bg-pink-800 rounded-lg text-white'>
                                                    {contact.name}
                                                </p>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    }
                    <Button
                        onClick={createChat}
                        type='submit'
                        className='flex items-center justify-center rounded-xl p-3 bg-gradient-to-l from-color-sky-200 to-color-sky-800 text-body-bold text-white'
                    >
                        Create new chat
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Contacts