"use client";
import { User } from "next-auth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Tooltip } from '@mui/material';

import { navigation } from "@constants/navigation";

import { Button } from "./Header/Button";
import { ButtonGradient } from "./Header/ButtonGradient";
import MenuSvg from "./Header/MenuSvg";
import { ProfileButton } from "./Header/ProfileButton";
import { motion } from "framer-motion";

const Logo: React.FC = () => {
  const router = useRouter();
  const navigateToHomePage = () => {
    router.push("/");
  };
  return (
    <>
      <button className="flex items-center" onClick={navigateToHomePage}>
        <div className="py-1 lg:py-0">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            className="w-20 max-md:w-16 h-auto"
            height={65}
            width={65}
            priority
          />
        </div>
        <div>
          <h1 className="font-extrabold text-xl md:text-2xl lg:text-3xl tracking-tight font-inter max-sm:hidden">
            <span className="text-blue-300">Trip</span>
            <span className="text-green-500">Wise</span>
          </h1>
          <h2 className="text-sm font-light font-inter max-sm:hidden">
            Trip Planner
          </h2>
        </div>
      </button>
    </>
  );
};

interface HeaderProps {
  currentUser: User | undefined;
}

const Header: React.FC<HeaderProps> = ({ currentUser }: HeaderProps) => {
  const currentPath = usePathname(); // to know which page are we in
  const [openNavigation, setOpenNavigation] = React.useState(false);


  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <header
      className={`bg-gradient-to-r from-purple-900 to-gray-900 w-full left-0 right-0 bottom-0
      text-white  px-6 md:px-10 lg:px-16 xl:px-20 flex md:flex-row justify-between items-center shadow-xl
      ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"}`}
    >
      <Logo />
      <nav
        className={`${openNavigation ? "flex" : "hidden"}  
                    fixed md:top-[5rem] sm:top-[4rem] max-sm:top-[4rem] left-0 right-0 bottom-0 bg-purple-600
                    lg:static lg:flex lg:mx-auto lg:bg-transparent z-50`}
        aria-label="Main Navigation"
      >
        <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.url}
              onClick={handleClick}
              className={`block relative font-code text-2xl uppercase 
                transition duration-300 ease-in-out hover:text-blue-400
                px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold
                ${item.url === currentPath
                  ? "z-2 lg:text-n-1"
                  : "lg:text-n-1/50"
                }
                 lg:leading-5 lg:hover:text-n-1 xl:px-12`}
            >
              <div className={`flex flex-row ${openNavigation ? "space-x-5": ""} items-center`}>
              <Tooltip title={item.title} placement="right">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  {item.icon}
                </motion.div>
              </Tooltip>

              {openNavigation && <div className="lg:hidden">{item.title}</div>}
              </div>
            </a>
          ))}
        </div>
      </nav>
      {!currentUser && (
        <>
          <a
            href="/auth/register"
            className="font-code text-xs font-bold uppercase tracking-wider 
           hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
          >
            REGISTER
          </a>
          <Button className="hidden lg:flex" href="/auth/login">
            LOGIN
          </Button>
        </>
      )}
      <ButtonGradient />
      <div className="flex items-center justify-center md:space-x-4 text-sm max-sm:space-x-2 sm:space-x-3">
        {currentUser && (
          <>
            <Button className="mr-4" href="/planTrip">
              <span className="whitespace-nowrap">Plan Trip</span>
            </Button>
            <Button className="mr-4" href="/myTrips">
              <span className="whitespace-nowrap">My Trips</span>
            </Button>
            <ProfileButton />
          </>
        )}
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
          aria-expanded={openNavigation}
          aria-controls="main-navigation"
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
