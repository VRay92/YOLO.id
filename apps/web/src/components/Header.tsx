import * as React from 'react';
import Image from 'next/image';
import { SlMagnifier } from 'react-icons/sl';
import { BsPersonCircle } from 'react-icons/bs';
import { BsFillTicketPerforatedFill } from 'react-icons/bs';

export const Header = () => {
  return (
    <nav className=" w-full ">
      <div className="flex justify-end pr-16 h-[40px] bg-[#D9D9D9] py-2 text-[#2c2c2c]">
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
      <div className="flex h-[100px] bg-[#F40841] justify-between">
        <div className="flex">
          <div className="my-auto ml-20 mr-[121px]">
            <Image
              width={173}
              height={78}
              src="/logo_white.png"
              alt="logo"
            ></Image>
          </div>
          <span className="w-[50px] h-[50px] bg-white my-auto rounded-l-md">
            <SlMagnifier className="m-auto my-3 text-2xl" />
          </span>
          <input
            type="text"
            className="w-[685px] h-[50px] bg-[#d9d9d9] my-auto pl-10 rounded-r-md"
            placeholder="search here.."
          />
        </div>
        <div className="flex mr-20 my-auto font-poppins text-[#2c2c2c]">
          <div className="my-1 text-4xl mr-3">
            <BsFillTicketPerforatedFill></BsFillTicketPerforatedFill>
          </div>
          <span className="text-lg mr-16 my-2">My Tickets</span>
          <div className="text-5xl">
            <BsPersonCircle></BsPersonCircle>
          </div>
        </div>
      </div>
    </nav>
  );
};
