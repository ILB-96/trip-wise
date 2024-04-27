"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react';

function Provider({ children, session }: { children: React.ReactNode, session: any}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider