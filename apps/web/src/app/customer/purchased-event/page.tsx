'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { GoStarFill } from 'react-icons/go';
import Sidebar from '@/components/Sidebar';
import { Table } from 'flowbite-react';
import Image from 'next/image';
import CardEvent from '@/components/CardEvent';
import CustomerRoute from '@/components/CustomerRoute';
import axios from 'axios';

interface IPurchasedeventProps {}
interface IDataEvent {
  title: string;
  startDate: string;
  time: string;
  location: string;
  imageUrl: string;
}

const Purchasedevent: React.FunctionComponent<IPurchasedeventProps> = (
  props,
) => {
  const router = useRouter();
  const [dataEvent, setDataEvent] = useState<IDataEvent[]>([]);
  const getCustomerPurchasedEvent = async () => {
    const token = localStorage.getItem('token');
    console.log('token from page', token);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}customer/purchasedEvent`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('nilai response', response.data);
    setDataEvent(response.data);
  };

  console.log('data event', dataEvent);
  useEffect(() => {
    getCustomerPurchasedEvent();
  }, []);

  return (
    <CustomerRoute>
      <div className="bg-[#282828] flex">
        <div className="mx-12 mt-28 hidden md:block">
          <Sidebar></Sidebar>
        </div>
        <section className=" w-full md:w-[1225px] md:h-[710px] rounded-none md:rounded-lg  md:my-14 relative">
          <Image
            fill
            sizes="100vw"
            src="/background.jpg"
            alt="hero"
            className="object-cover rounded-none md:rounded-lg hidden md:block"
          ></Image>

          <Image
            fill
            sizes="100vw"
            src="/background2.jpg"
            alt="hero"
            className="rounded-none md:rounded-lg block md:hidden w-fit"
          ></Image>

          <div className="md:flex relative font-semibold text-center md:justify-between md:text-left mt-16 md:ml-16 ">
            <h1 className=" text-3xl text-black ">Purchased Events</h1>
          </div>
          <div className="relative top-0 left-0 md:mr-32 w-full mb-10">
            {dataEvent &&
              dataEvent.map((event: any) => (
                <CardEvent
                  key={event.id}
                  title={event.title}
                  startDate={event.startDate}
                  time={event.time}
                  location={event.location}
                  imageUrl={event.imageUrl}
                  status={event.status}
                />
              ))}
          </div>
        </section>
      </div>
    </CustomerRoute>
  );
};

export default Purchasedevent;
