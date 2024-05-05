'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
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
      {/* desktop view */}
      <div className="mx-12 mt-28 hidden md:block">
        <Sidebar></Sidebar>
      </div>

      <section className=" w-full md:h-[710px] rounded-none md:mr-16 md:rounded-lg  md:my-14 relative">
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
        <div className="rounded-full h-[220px] w-[220px] relative mt-20 mx-auto block md:hidden">
          <Image
            fill
            sizes="100vw"
            src="/profile.webp"
            alt="hero"
            className="object-cover rounded-full "
          ></Image>
        </div>
        <h1 className="relative font-semibold text-center md:text-left text-3xl text-black mt-16 md:ml-16">
          Profile
        </h1>
        <div className="relative ml-4 mr-4 md:ml-16 md:mr-0 mt-10 flex w-full md:flex-row flex-col ">
          <div id="left-container" className="border-gray-400 flex flex-col">
            <h1>Name</h1>
            <input
              type="text"
              className="mr-8 2xl:w-[350px] h-[50px] rounded-lg border-gray-200 mb-4"
            />
            <h1>Gender</h1>
            <div className="mb-4">
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                className="mr-4"
                checked
              />
              <label htmlFor="male" className="mr-4 md:mr-10">
                Male
              </label>
              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                className="ml-10 mr-4"
              />
              <label htmlFor="female">Female</label>
            </div>

            <h1>Birthdate</h1>
            <input
              type="date"
              className="mr-8  md:w-[350px] h-[50px] rounded-lg border-gray-200"
            />
          </div>
          <div
            id="right-container"
            className=" md:ml-16  mr-8 md:mr-16 flex flex-col"
          >
            <h1>Email address</h1>
            <input
              type="text"
              className="w-auto  md:w-[350px] h-[50px] rounded-lg border-gray-200 mb-2"
            />
            <h1>Password</h1>
            <input
              type="text"
              className="w-auto md:w-[350px] h-[50px] rounded-lg border-gray-200"
            />
            <h1>Confirm password</h1>
            <input
              type="text"
              className="w-auto  md:w-[350px] h-[50px] rounded-lg border-gray-200"
            />
            <div>
              <button className="w-full  md:w-[350px] h-[3rem] rounded-2xl bg-red-600 text-white mt-10">
                change data
              </button>
            </div>
          </div>
          <div className="rounded-full h-[220px] w-[220px] relative">
            <Image
              fill
              sizes="100vw"
              src="/profile.webp"
              alt="hero"
              className="object-cover rounded-full hidden md:block"
            ></Image>
          </div>
        </div>
      </section>

      {/* mobile view */}
    </div>
  );
};

export default Profile;
