"use client";
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import {UserContext} from './UserContext'

const UserProvider = ({ children }: { children: any }) => {
    const session = useSession();
    const currentUser = session.data?.user;
    const [user, setUser] = useState<any>(currentUser);
    const changeUserState = () => {
        if (user) setUser(null);
        else setUser("");
    };
    return (
        <UserContext.Provider value={{ changeUserState }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;