'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { GoStarFill } from 'react-icons/go';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import { Table } from 'flowbite-react';
import { FaCoins } from 'react-icons/fa6';
import { MdOutlineContentCopy } from 'react-icons/md';

interface IVoucherProps {}

const Voucher: React.FunctionComponent<IVoucherProps> = (props) => {
  const router = useRouter();
  const [active, setActive] = useState('voucher');
  const voucher = [
    { name: ' DISCOUNT20%OFF ENCHANTING ANGGUN', value: '11/5/2024' },
    { name: ' DISCOUNT20%OFF SEMINARWEB', value: '22/8/2024' },
    { name: ' DISCOUNT20%OFF ENCHANTING ANGGUN', value: '2/2/2024' },
  ];

  return (
    <div className="bg-[#282828] flex">
      <div className="mx-12 mt-28 hidden md:block">
        <Sidebar></Sidebar>
      </div>
      <section className=" w-full md:h-[710px] rounded-none md:rounded-lg  md:mr-16 md:my-14 relative">
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
        <div className="flex md:flex-row flex-col relative font-semibold text-center justify-between md:text-left mt-10 md:ml-16 md:mr-16">
          <div className="md:items-end flex md:order-1 order-2 mx-auto md:mx-0 mt-10">
            <h1 className=" text-3xl text-black ">Vouchers</h1>
          </div>

          <div className="flex flex-col md:flex-row rounded-lg md:items-end mx-4 md:mx-0 md:w-30 p-6 md:p-0 md:bg-transparent bg-gray-400 bg-opacity-30 border-2 md:border-none border-gray-500 order-1 md:order-2">
            <div className="flex mx-auto items-end">
              <h1 className="h-6 md:items-end mr-2 md:mr-4">
                Your Refferal Code
              </h1>
              <h1 className="text-3xl md:mr-14">123NMBH</h1>
            </div>

            <div className="flex items-end justify-center mt-4">
              <div className="text-[#f8c34f] text-3xl flex justify-center items-center h-10 w-10">
                <FaCoins></FaCoins>
              </div>
              <h1 className="text-3xl mr-2">30000</h1>
              <h1 className=" h-6">Points</h1>
            </div>
          </div>
        </div>

        {/* TABLE MOBILE */}
        <div className="overflow-x-auto mx-4 md:ml-12 md:mr-16 mt-7 mb-20">
          <table className="relative  w-full">
            <thead className="bg-gray-300 h-10 rounded-t-lg">
              <tr className="font-semibold text-sm ">
                <td className="rounded-tl-lg pl-4 md:pl-10">NAME</td>
                <td className="pl-5">EXPIRY DATE</td>
                <td className="rounded-tr-lg"> </td>
              </tr>
            </thead>
            <tbody className="bg-white">
              {voucher.map((item, index) => (
                <tr key={index} className="h-10 w-[450px] space-x-10">
                  <td className="border-b-[1px] pl-4 md:pl-10 w-[450px]">
                    {item.name}
                  </td>
                  <td className="border-b-[1px] w-[400px] pl-5">
                    {item.value}
                  </td>
                  <td className="border-b-[1px] w-[400px]">
                    <button className="md:hidden block mx-auto">
                      <MdOutlineContentCopy></MdOutlineContentCopy>
                    </button>
                    <button className="font-medium text-cyan-600 md:block hidden">
                      Copy Code
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="h-10">
                <td className="rounded-bl-lg"></td>
                <td></td>
                <td className="rounded-br-lg"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Voucher;
