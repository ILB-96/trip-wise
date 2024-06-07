import { CardWrapper } from '@components/Auth/CardWrapper'
import { RegisterForm } from '@components/Auth/RegisterForm'
import React from 'react'

function RegisterPage() {
  return (
    <main className='flex h-screen flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fef3c7] to-purple-900'>
        <CardWrapper 
            headerLabel='😉 Create an account'
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <RegisterForm />
        </CardWrapper>
    </main>
  )
}

export default RegisterPage