'use client';
import * as React from 'react';
import Image from 'next/image';
import { SlMagnifier } from 'react-icons/sl';
import { BsPersonCircle } from 'react-icons/bs';
import { BsFillTicketPerforatedFill } from 'react-icons/bs';
import { IoMenu } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  return (
<<<<<<< HEAD
    <nav className="fixed top-0 z-10 w-full ">
      {/* top navbar */}

      <div className="hidden md:flex justify-end md:pr-16 h-[40px] bg-[#D9D9D9] py-2 ">
=======
    <nav className="w-full ">
      <div className="flex justify-end pr-16 h-[40px] bg-[#D9D9D9] py-2 text-[#2c2c2c]">
>>>>>>> main
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
            className="my-auto ml-20 mr-[121px] hidden md:block cursor-pointer"
            onClick={() => router.push('/')}
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
            <span className="w-[50px] h-[40px] bg-white my-auto rounded-l-md">
              <SlMagnifier className="m-auto my-2 text-2xl" />
            </span>
            <input
              type="text"
              className="flex pl-10 my-auto  rounded-r-md w-[685px] h-[40px] bg-[#d9d9d9]"
              placeholder="search here.."
            />
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
