import React from 'react'
import { Poppins } from "next/font/google"
import { cn } from '@lib/utils'
import { Button } from '@components/ui/button'
import { LoginButton } from '@components/Auth/LoginButton'
const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})
function AuthPage() {
    return (
        <main className='flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
            <div className='space-y-6 text-center'>
                <h1 className={cn(
                    'text-6xl font-semibold text-white drop-shadow-md', font.className,
                    )}>
                    👏 Welcome
                </h1>
                <p className='text-white text-lg'>
                    Please use the method you want to authenticate
                </p>
            </div>
            <div>
                <LoginButton>
                    <Button variant="secondary" size="lg">
                        Authenticate
                    </Button>
                </LoginButton>
            </div>
        </main>
    )
}

export default AuthPage