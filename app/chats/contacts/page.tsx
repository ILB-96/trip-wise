import Contacts from '@components/Chat/Contacts'
import TopBar from '@components/Chat/TopBar'
import React from 'react'

const ContactsPage = () => {
  return (
    <div className='h-screen justify-center items-center z-0'>
      <div className='px-10 py-6 mb-20 items-center'>
        <Contacts />
      </div>
    </div>
  )
}

export default ContactsPage