"use client";

import { navItems } from "@/constants/index";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";

import Image from "next/image";
import { ModeToggle } from "./ui/toggle-mode";

const NavBar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavBar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <a href="/">
            <div className="flex items-center flex-shrink-0">
              <div className="mx-4">
                <Image
                  src="../assets/NewLogo.svg"
                  alt="Logo image"
                  // className="dark:invert"
                  width={50}
                  height={50}
                  priority
                />
              </div>
              <span className="text-[17px] tracking-tight text-[#c9b7a3] md:text-xl">Ashok Singh - Software Business Strategist</span>
            </div>
          </a>

          <ul className="hidden lg:flex ml-0 space-x-12 text-[#c9b7a3]">
            {" "}
            {/*  ml-14  */}
            {navItems.map((item, index) => (
              <li key={index} className="py-4">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-8 items-center">
            {/* <a href="/auth/login" className="py-2 px-4 border border-red-500">
              Sign In
            </a>
            <a href="#" className="py-2 px-4 border border-red-500">
              Sign Up
            </a> */}
            {/* <a href="/auth/logout" className="py-2 px-4 border border-red-500">
              Sign Out
            </a> */}
            <div className="border border-red-500">
              <ModeToggle />
            </div>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavBar}>
              {mobileDrawerOpen ? <ImCross /> : <GiHamburgerMenu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-02 z-0 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center text-center lg:hidden">
            <ul className="text-[#c9b7a3]">
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a
                href="/auth/login"
                className="text-[#F9FBFD] py-2 px-3 border border-red-500"
              >
                Sign In
              </a>
              <a
                href="#"
                className="text-[#F9FBFD] py-2 px-3 border border-red-500"
              >
                Sign Up
              </a>
              {/* <a href="/auth/logout" className="text-[#F9FBFD] py-2 px-3 border border-red-500">
                Sign Out
              </a> */}
              <div className="border border-red-500">
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
