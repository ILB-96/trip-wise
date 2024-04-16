import React from 'react';
import Image from 'next/image';

type NavItemProps = {
  children: React.ReactNode;
};

const Logo: React.FC = () => (
  <div className="flex items-center space-x-4">
    <div className="rounded-full overflow-hidden">
      <Image src="/logo.png" alt="logo" height={40} width={40} priority />
    </div>
    <div>
      <h1 className="font-extrabold text-xl md:text-2xl lg:text-3xl tracking-tight">TripWise</h1>
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
      className="bg-gradient-to-r from-gray-700 to-gray-900  
      text-white py-4 px-6 md:px-10 lg:px-16 xl:px-20 flex flex-col md:flex-row justify-between items-center shadow-xl"
    >
      <Logo />
      <nav className="hidden md:flex space-x-6 md:ml-8">
        <NavItem>HOME</NavItem>
        <NavItem>TRIPS</NavItem>
        <NavItem>ATTRACTIONS</NavItem>
        <NavItem>COMMUNITY</NavItem>
      </nav>
      <div className="flex items-center space-x-4">
        <NavItem>REGISTER</NavItem>
        <span className="text-gray-500 mx-2">|</span>
        <NavItem>LOGIN</NavItem>
        <Avatar initial="J" />
      </div>
    </header>
  );
};

export default Header;
