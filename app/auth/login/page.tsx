import { CardWrapper } from '@components/Auth/CardWrapper'
import { LoginForm } from '@components/Auth/LoginForm'
import React from 'react'

function LoginPage() {
  return (
    <main className='flex h-screen flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fef3c7] to-[#92400e]'>
        <CardWrapper 
            headerLabel='👏 Pick your preferred way to authenticate yourself!'
            backButtonLabel="😉 Create an account!"
            backButtonHref="/auth/register"
            showSocial
        >
            <LoginForm />
        </CardWrapper>
    </main>
  )
}

export default LoginPage