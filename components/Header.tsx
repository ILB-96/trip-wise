"use client"
import React from 'react';
import Image from 'next/image';
import { navigation } from '@constants/navigation';
import { usePathname } from 'next/navigation';
import { Button } from './Header/Button';
import { ButtonGradient } from './Header/ButtonGradient';
import MenuSvg from './Header/MenuSvg';
import { MenuBackground } from './Header/MenuBackground';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';


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

const Header: React.FC = () => {
  const currentPath = usePathname(); // to know which page are we in
  const [openNavigation, setOpenNavigation] = React.useState(false);
  const toggleNavigation = () => {
    if(openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };
  const handleClick = () => {
    if(!openNavigation) return ;
    enablePageScroll();
    setOpenNavigation(false);
  };
  return (
    <header
      className={`bg-gradient-to-r from-gray-700 to-gray-900 w-full left-0 right-0 bottom-0
      text-white py-4 px-6 md:px-10 lg:px-16 xl:px-20 flex flex-col md:flex-row justify-between items-center shadow-xl
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
      <a href="/auth/register" className='font-code text-xs font-bold uppercase tracking-wider 
       hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block'>
        REGISTER
      </a>
      <Button className="hidden lg:flex" href="/auth/login">
          LOGIN
      </Button>
      <ButtonGradient />
      <Button className='ml-auto lg:hidden' px="px-3"
        onClick={toggleNavigation}
      >
        <MenuSvg openNavigation={openNavigation} />
      </Button>
    </header>
  );
};

export default Header;
