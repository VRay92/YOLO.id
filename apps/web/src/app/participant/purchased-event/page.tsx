'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { GoStarFill } from 'react-icons/go';
import Sidebar from '@/components/Sidebar';

interface IPurchasedeventProps {}

const Purchasedevent: React.FunctionComponent<IPurchasedeventProps> = (
  props,
) => {
  const router = useRouter();
  // const [active, setActive] = useState('purchase');

  return (
    <div className="bg-[#282828] flex">
      <div className="mx-12 mt-28">
        <Sidebar></Sidebar>
      </div>
      <section className="w-[1225px] h-[710px] rounded-lg bg-white my-14"></section>
    </div>
  );
};

export default Purchasedevent;
