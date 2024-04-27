import { getUser } from '@actions/getuser'
import Header from '@components/Header';
import React from 'react'

export const HeaderProvider = async () => {
    const user = await getUser();
  return (
    <Header currentUser={user} />
  )
}
