'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { GoStarFill } from 'react-icons/go';

interface IPurchasedeventProps {}

const Purchasedevent: React.FunctionComponent<IPurchasedeventProps> = (
  props,
) => {
  const router = useRouter();
  const [active, setActive] = useState('purchase');

  return (
    <div className="bg-[#282828] flex">
      <aside className="space-y-5 bg-[#282828] cursor-pointer mx-12 mt-28">
        <div
          className={`flex  text-white w-[380px] h-[75px] ${
            active === 'profile' && 'bg-[#cacaca] text-[#282828]'
          } rounded-lg align-middle items-center`}
          onClick={() => {
            setActive('profile');
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
            active === 'voucher' ? 'bg-[#cacaca] text-[#282828]' : ''
          }
             rounded-lg align-middle items-center`}
          onClick={() => {
            setActive('voucher');
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
            active === 'purchase' ? 'bg-[#cacaca] text-[#282828]' : ''
          } rounded-lg align-middle items-center`}
          onClick={() => {
            setActive('purchase');
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
            active === 'review' && 'bg-[#cacaca] text-[#282828]'
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
      </aside>
      <section className="w-[1225px] h-[710px] rounded-lg bg-white my-14"></section>
    </div>
  );
};

export default Purchasedevent;
