'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';
import Toptrending from '@/components/Toptrending';

export default function Home() {
  const [select, setSelect] = useState('music');
  return (
    <main className="w-full mt-[75px] md:mt-[120px]">
      {/* desktop view hero section */}

      <div
        id="background-web"
        className="relative hidden h-[660px] w-full md:block "
      >
        <Image
          fill
          sizes="100vw"
          src="/hero-section.jpg"
          alt="hero"
          className="object-cover"
        ></Image>
        <div className="w-[960px] h-[480px] absolute left-[25%] bottom-[15%]">
          {' '}
          <Image
            fill
            sizes="100vw"
            src="/anggun.png"
            alt="hero"
            className="object-cover rounded-lg"
          ></Image>
        </div>
      </div>

      {/* mobile view hero section */}

      <div
        id="background-web"
        className="relative block h-[265px] w-full md:hidden "
      >
        <Image
          fill
          sizes="100vw"
          src="/hero-section.jpg"
          alt="hero"
          className="object-cover"
        ></Image>
        <div className="w-[343px] h-[170px] absolute left-[8%] bottom-[15%]">
          {' '}
          <Image
            fill
            sizes="100vw"
            src="/anggun.png"
            alt="hero"
            className="object-cover rounded-lg"
          ></Image>
        </div>
      </div>

      {/* content */}

      <h1 className="text-white text-[40px] font-bold font-poppins ml-5 md:mx-16 mt-4 md:mt-10">
        Events
      </h1>
      <div className="mt-0 ml-5 overflow-x-scroll no-scrollbar md:mt-4 md:mx-16">
        <ul className="flex gap-4 text-lg text-white md:gap-10">
          <li
            className={`cursor-pointer ${
              select === 'music' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setSelect('music')}
          >
            Music
          </li>
          <li
            className={`cursor-pointer ${
              select === 'festival' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setSelect('festival')}
          >
            Festival&Bazaar
          </li>
          <li
            className={`cursor-pointer ${
              select === 'sports' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setSelect('sports')}
          >
            Sports
          </li>
          <li
            className={`cursor-pointer ${
              select === 'expo' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setSelect('expo')}
          >
            Exhibition&Expo
          </li>
          <li
            className={`cursor-pointer ${
              select === 'seminar' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setSelect('seminar')}
          >
            Seminar
          </li>
        </ul>
      </div>
      <div className="h-[380px] w-full bg-[#989898] mt-10 relative">
        {' '}
        <h1 className="absolute text-5xl font-bold origin-right transform -rotate-90 -left-60">
          Top Trending
        </h1>
        <div className="flex ml-40">
          <Toptrending url="/anggun.png"></Toptrending>
          <Toptrending url="/LiSa.jpg"></Toptrending>
          <Toptrending url="/judika.jpg"></Toptrending>
        </div>
      </div>
    </main>
  );
}
