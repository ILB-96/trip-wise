"use client"
import { logout } from '@actions/logout';
import { useSession } from 'next-auth/react';

function SettingsPage() {
    const user = useSession().data?.user;
    const handleClick = async () => {
        await logout();
    }
    return (
        <>
        <div>
            {JSON.stringify(user)}
        </div>
        <div>
            <button type="submit" onClick={handleClick}>
                        Signout
            </button>
        </div>
        </>
    )
}

export default SettingsPage