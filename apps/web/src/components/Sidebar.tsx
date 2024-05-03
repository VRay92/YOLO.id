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
  console.log('path name', usePathname());

  return (
    <section className="w-[380px] space-y-5">
      <div
        className={`flex  text-white w-[380px] h-[75px] ${
          usePathname() === '/participant/profile' &&
          'bg-[#cacaca] text-[#282828]'
        } rounded-lg align-middle items-center`}
        onClick={() => {
          router.push('/participant/profile');
        }}
      >
        <span className="mx-4">
          <BsPersonFill size={30}></BsPersonFill>
        </span>
        <h1 className="">Profile</h1>
      </div>
      <div
        className={`flex  text-white w-[380px] h-[75px] ${
          usePathname() === '/participant/voucher'
            ? 'bg-[#cacaca] text-[#282828]'
            : ''
        }
         rounded-lg align-middle items-center`}
        onClick={() => {
          router.push('/participant/voucher');
        }}
      >
        <span className="mx-4">
          <h1 className="text-2xl">%</h1>
        </span>
        <h1 className="">Vouchers</h1>
      </div>
      <div
        className={`flex  text-white w-[380px] h-[75px] ${
          usePathname() === '/participant/purchased-event'
            ? 'bg-[#cacaca] text-[#282828]'
            : ''
        } rounded-lg align-middle items-center`}
        onClick={() => {
          router.push('/participant/purchased-event');
        }}
      >
        <span className="mx-4">
          <BsTicketPerforatedFill size={30}></BsTicketPerforatedFill>
        </span>
        <h1 className="">Purchased Events</h1>
      </div>
      <div
        className={`flex  text-white w-[380px] h-[75px] ${
          usePathname() === '/participant/review' &&
          'bg-[#cacaca] text-[#282828]'
        } rounded-lg align-middle items-center`}
        onClick={() => {
          setActive('review');
          router.push('/participant/review');
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
