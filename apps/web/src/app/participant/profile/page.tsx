'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { GoStarFill } from 'react-icons/go';
import Image from 'next/image';
interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const router = useRouter();
  const [active, setActive] = useState('profile');

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
      <section className="w-[1225px] h-[710px] rounded-lg  my-14 relative">
        <Image
          fill
          sizes="100vw"
          src="/background.jpg"
          alt="hero"
          className="object-cover rounded-lg"
        ></Image>
        <h1 className="relative text-3xl text-black mt-16 ml-16">Profile</h1>
        <div className="relative ml-16 mt-10 flex">
          <div id="left-container" className="border-gray-400">
            <h1>Name</h1>
            <input
              type="text"
              className="w-[350px] h-[50px] rounded-lg border-gray-200"
            />
            <h1>Gender</h1>
            <input
              type="text"
              className="w-[350px] h-[50px] rounded-lg border-gray-200"
            />
            <h1>Birthdate</h1>
            <input
              type="text"
              className="w-[350px] h-[50px] rounded-lg border-gray-200"
            />
          </div>
          <div id="right-container" className="ml-16 w-[400px]">
            <h1>Email address</h1>
            <input
              type="text"
              className="w-[350px] h-[50px] rounded-lg border-gray-200"
            />
            <h1>Password</h1>
            <input
              type="text"
              className="w-[350px] h-[50px] rounded-lg border-gray-200"
            />
            <h1>Confirm password</h1>
            <input
              type="text"
              className="w-[350px] h-[50px] rounded-lg border-gray-200"
            />
            <button className="w-[20rem] h-[3rem] rounded-2xl bg-red-600 text-white mt-10">
              change data
            </button>
          </div>
          <div className="rounded-full h-[220px] w-[220px] relative">
            <Image
              fill
              sizes="100vw"
              src="/profile.webp"
              alt="hero"
              className="object-cover rounded-full"
            ></Image>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
