"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { navigation } from '@constants/navigation';
import { usePathname } from 'next/navigation';
import { Button } from './Header/Button';
import { ButtonGradient } from './Header/ButtonGradient';
import MenuSvg from './Header/MenuSvg';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { ProfileButton } from './Header/ProfileButton';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';


const Logo: React.FC = () => (
  <div className="flex items-center space-x-4">
    <div className="rounded-full overflow-hidden">
      <Image
        src="/assets/icons/logo.png"
        alt="logo"
        height={40}
        width={40}
        priority
      />
    </div>
    <div>
      <h1 className="font-extrabold text-xl md:text-2xl lg:text-3xl tracking-tight">
        TripWise
      </h1>
      <h2 className="text-sm font-light">Itinerary Planner</h2>
    </div>
  </div>
);

const NavItem: React.FC<NavItemProps> = ({ children }) => (
  <a href="#" className="hover:text-blue-400 transition duration-300 ease-in-out">
    {children}
  </a>
);

type AvatarProps = {
  initial: string;
};

const Avatar: React.FC<AvatarProps> = ({ initial }) => (
  <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center">
    <span className="text-white font-bold">{initial}</span>
  </div>
);

const Header: React.FC = () => {
  return (
    <header
      className={`bg-gradient-to-r from-gray-700 to-gray-900 w-full left-0 right-0 bottom-0
      text-white py-4 px-6 md:px-10 lg:px-16 xl:px-20 flex md:flex-row justify-between items-center shadow-xl
       ${openNavigation ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'}`}
    >
      <Logo />
      <nav className={`${openNavigation ? 'flex' : 'hidden'}  
                    fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8
                    lg:static lg:flex lg:mx-auto lg:bg-transparent z-50`}>
        <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
          {
            navigation.map((item) => (
              <a key={item.id} href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase 
                transition duration-300 ease-in-out hover:text-blue-400
                 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold
                 ${item.url === currentPath ? 'z-2 lg:text-n-1' : 'lg:text-n-1/50'}
                  lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))
          }
        </div>
      </nav>
      {!user && (
        <>
          <a href="/auth/register" className='font-code text-xs font-bold uppercase tracking-wider 
           hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block'>
            REGISTER
          </a>
          <Button className="hidden lg:flex" href="/auth/login">
              LOGIN
          </Button>
        </>
      )}
      <ButtonGradient />
      <div className='items-center justify-center space-x-5'>
      {user && (<ProfileButton changeUserState={changeUserState}/>)}
      <Button className='ml-auto lg:hidden' px="px-3"
        onClick={toggleNavigation}
      >
        <MenuSvg openNavigation={openNavigation} />
      </Button>
      </div>
    </header>
);
};

export default Header;