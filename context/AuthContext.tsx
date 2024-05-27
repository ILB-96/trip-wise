"use client";

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useSession } from 'next-auth/react'; // Adjust this import based on your auth provider

interface User {
    _id: string;
    name: string;
    // Add other user properties as needed
}

interface AuthContextType {
    user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const userData: User = {
                _id: session.user.id,
                name: session.user.name || 'kfir41',
                // Add other properties as needed
            };
            setUser(userData);
        } else {
            setUser(null); // No user is authenticated
        }
    }, [session, status]);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
