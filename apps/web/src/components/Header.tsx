'use client';
import * as React from 'react';
import Image from 'next/image';
import { SlMagnifier } from 'react-icons/sl';
import { BsPersonCircle } from 'react-icons/bs';
import { BsFillTicketPerforatedFill } from 'react-icons/bs';
import { IoMenu } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { initCarousels } from 'flowbite';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  const blockpages = ['/signin', '/signup'];

  return (
    <nav
      className={`w-full max-w-[1920px] ${
        blockpages.includes(usePathname()) ? 'hidden' : 'block'
      }`}
    >
      {/* top navbar */}

      <div className="hidden md:flex justify-end md:pr-16 h-[40px] bg-[#D9D9D9] py-2 ">
        <span className="px-4">
          <h1>About YOLO</h1>
        </span>
        <span className="px-4">
          <h1>Become Event Creator</h1>
        </span>
        <span className="px-4">
          <h1>Contact Us</h1>
        </span>
      </div>

      {/* red navbar */}

      <div className="flex h-[75px] md:h-[90px] bg-[#F40841]  justify-between">
        <div className="flex">
          <div
            className="my-auto ml-20 mr-[121px] min-w-[160px] hidden md:block cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          >
            <Image
              width={160}
              height={72}
              src="/logo_white.png"
              alt="logo"
            ></Image>
          </div>
          <div className="block my-auto ml-6 md:hidden">
            <Image
              width={119}
              height={54}
              src="/logo_white.png"
              alt="logo"
            ></Image>
          </div>
          {/* search bar */}
          <div className="hidden md:flex">
            <span className="w-[50px] h-[52px] bg-white mt-5 rounded-l-md">
              <SlMagnifier className="m-auto my-3 text-2xl" />
            </span>
            <div className="relative w-[685px] h-[40px] mt-5 mr-20">
              <input
                type="text"
                id="floating_filled"
                className="block rounded-r-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-[#d9d9d9] dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_filled"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                search here..
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 my-auto mr-4 text-3xl text-white md:hidden">
          <SlMagnifier className="" />
          <IoMenu />
        </div>

        <div className="hidden gap-5 my-auto mr-20 text-white md:flex font-poppins">
          <button
            className="rounded-lg w-[7rem] h-[3rem] bg-transparent border-2 border-white text-white hover:bg-orange-500 hover:text-white hover:border-none"
            onClick={() => router.push('/signup')}
          >
            Register
          </button>
          <button
            className="rounded-lg w-[7rem] h-[3rem] bg-white border-2 border-white text-[#F40841] font-bold hover:bg-orange-500 hover:text-white hover:border-none"
            onClick={() => router.push('/signin')}
          >
            Login
          </button>
        </div>

        {/* navbar menu */}
        {/* 
        <button
          id="dropdownAvatarNameButton"
          data-dropdown-toggle="dropdownAvatarName"
          className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 dark:focus:ring-gray-700 dark:text-white"
          type="button"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 me-2 rounded-full"
            src="/28.jpg"
            alt="user photo"
          />
          Bonnie Green
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button> */}

        {/* <div
          id="dropdownAvatarName"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium ">Pro User</div>
            <div className="truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div> */}

        {/* <div className="hidden my-auto mr-20 text-white md:flex font-poppins">
          <div className="my-1 mr-3 text-4xl">
            <BsFillTicketPerforatedFill></BsFillTicketPerforatedFill>
          </div>
          <span className="my-2 mr-16 text-lg">My Tickets</span>
          <div className="text-5xl">
            <BsPersonCircle></BsPersonCircle>
          </div>
        </div> */}
      </div>
    </nav>
  );
};
