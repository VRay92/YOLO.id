'use client';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { GoStarFill } from 'react-icons/go';
interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const router = useRouter();
  const [active, setActive] = useState('');
  
  console.log(active);

  return (
    <section className="2xl:w-[380px] space-y-5">
      <div
        className={`flex 2xl:w-[380px] h-[75px] ${
          usePathname() === `/customer/profile`
            ? 'bg-[#cacaca] text-[#282828]'
            : `text-white`
        } rounded-lg align-middle items-center cursor-pointer hover:bg-[#6e6e6e]`}
        onClick={() => {
          router.push(`/customer/profile`);
        }}
      >
        <span className="mx-4">
          <BsPersonFill size={30}></BsPersonFill>
        </span>
        <h1 className="">Profile</h1>
      </div>
      <div
        className={`flex max-w-[380px] hover:bg-[#6e6e6e] h-[75px] ${
          usePathname() === `/customer/voucher`
            ? 'bg-[#cacaca] text-[#282828]'
            : 'text-white'
        }
         rounded-lg align-middle items-center cursor-pointer`}
        onClick={() => {
          router.push(`/customer/voucher`);
        }}
      >
        <span className="mx-4">
          <h1 className="text-2xl">%</h1>
        </span>
        <h1 className="">Vouchers</h1>
      </div>
      <div
        className={`flex  hover:bg-[#6e6e6e] 2xl:w-[380px] h-[75px] ${
          usePathname() === `/customer/purchased-event`
            ? 'bg-[#cacaca] text-[#282828]'
            : 'text-white'
        } rounded-lg align-middle items-center cursor-pointer`}
        onClick={() => {
          router.push(`/customer/purchased-event`);
        }}
      >
        <span className="mx-4">
          <BsTicketPerforatedFill size={30}></BsTicketPerforatedFill>
        </span>
        <h1 className="">Purchased Events</h1>
      </div>
      <div
        className={`flex hover:bg-[#6e6e6e] 2xl:w-[380px] h-[75px] ${
          usePathname() === `/customer/review`
            ? 'bg-[#cacaca] text-[#282828]'
            : 'text-white'
        } rounded-lg align-middle items-center cursor-pointer`}
        onClick={() => {
          setActive('review');
          router.push(`/customer/review`);
        }}
      >
        <span className="mx-4">
          <GoStarFill size={30}></GoStarFill>
        </span>
        <h1 className="">Review and Rating</h1>
      </div>
    </section>
  );
};

export default Sidebar;
