'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';
import Toptrending from '@/components/Toptrending';
import Card from '@/components/Card';

export default function Home() {
  const [category, setCategory] = useState('music');

  const music = [
    {
      url: '/dewa19.jpg',
      date: '5 Aug 2024',
      title: 'GOPHORIA - Dewa19 Gorontalo',
      price: 'Rp. 677.000,-',
      username: 'Deal Indonesia',
    },

    {
      url: '/LiSa.jpg',
      date: '28 Dec 2024',
      title: 'Live is Smile Always',
      price: 'Rp. 830.000,-',
      username: 'Ultra Beach Bali',
    },
    {
      url: '/anggun.png',
      date: '28 Jul 2024',
      title: 'Enchanting Anggun & Friends',
      price: 'Rp. 677.000,-',
      username: 'FLASHBACK motion',
    },
    {
      url: '/gedebagejazz.jpg',
      date: '1 Jun 2024',
      title: 'Enchanting Anggun & Friends',
      price: 'Rp. 350.000,-',
      username: 'Summarecon Mall Bandung',
    },

    {
      url: '/gedebagejazz.jpg',
      date: '11 May 2024',
      title: 'Gedebage Jazz Festival',
      price: 'Rp. 239.000,-',
      username: 'Summarecon Mall Bandung',
    },
    {
      url: '/ultrabeach.jpg',
      date: '7 Jun 2024',
      title: 'Ultra Beach Bali 2024',
      price: 'Rp. 2.100.000,-',
      username: 'Ultra Beach Bali',
    },
    {
      url: 'anggun.png',
      date: '28 Jul 2024',
      title: 'Enchanting Anggun & Friends',
      price: 'Rp. 677.000,-',
      username: 'FLASHBACK motion',
    },
    {
      url: '/dewa19.jpg',
      date: '5 Aug 2024',
      title: 'GOPHORIA - Dewa19 Gorontalo',
      price: 'Rp. 677.000,-',
      username: 'Deal Indonesia',
    },
  ];

  const festival = [
    {
      url: '/funrun.jpg',
      date: '12 May 2024',
      title: 'Enchanting Anggun & Friends',
      price: 'Rp. 200.000,-',
      username: 'UAG University',
    },
    {
      url: '/alcorfest.jpg',
      date: '01 Aug 2024',
      title: 'Alcor Fest 2024',
      price: 'Rp. 600.000,-',
      username: 'Goodworks',
    },
    {
      url: '/batakfestival.jpg',
      date: '24 May 2024',
      title: 'BATAK FESTIVAL',
      price: 'Rp. 90.000,-',
      username: 'Samarga House',
    },
    {
      url: '/momandbabyexpo.jpg',
      date: '3 May 2024',
      title: 'GOPHORIA - Dewa19 Gorontalo',
      price: 'Rp. 20.000,-',
      username: 'PT. MYExpo Kreasi Indonesia',
    },
    {
      url: '/nebsfestival.jpg',
      date: '1 Jun 2024',
      title: 'NEBS Festival',
      price: 'Rp. 100.000,-',
      username: 'PERMUDHITA',
    },
    {
      url: '/batakfestival.jpg',
      date: '24 May 2024',
      title: 'BATAK FESTIVAL',
      price: 'Rp. 90.000,-',
      username: 'Samarga House',
    },
    {
      url: '/alcorfest.jpg',
      date: '01 Aug 2024',
      title: 'Alcor Fest 2024',
      price: 'Rp. 600.000,-',
      username: 'Goodworks',
    },
    {
      url: '/momandbabyexpo.jpg',
      date: '3 May 2024',
      title: 'GOPHORIA - Dewa19 Gorontalo',
      price: 'Rp. 20.000,-',
      username: 'PT. MYExpo Kreasi Indonesia',
    },
  ];

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
        <div
          id="main-banner"
          className="w-[960px] h-[480px] absolute left-[25%] bottom-[15%]"
        >
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
        <div
          id="main-banner"
          className="w-[343px] h-[200px] absolute left-[8%] bottom-[15%]"
        >
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
              category === 'music' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory('music')}
          >
            Music
          </li>
          <li
            className={`cursor-pointer ${
              category === 'festival' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory('festival')}
          >
            Festival&Bazaar
          </li>
          <li
            className={`cursor-pointer ${
              category === 'sports' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory('sports')}
          >
            Sports
          </li>
          <li
            className={`cursor-pointer ${
              category === 'expo' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory('expo')}
          >
            Exhibition&Expo
          </li>
          <li
            className={`cursor-pointer ${
              category === 'seminar' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory('seminar')}
          >
            Seminar
          </li>
        </ul>
      </div>
      <div className="h-auto md:h-[400px] w-full bg-[#989898] mt-10 pt-4 relative pb-5">
        {/* top trending desktop title */}
        <h1 className="hidden text-5xl font-bold origin-right transform -rotate-90 md:absolute md:block -left-60">
          Top Trending
        </h1>
        {/* top trending mobile title */}
        <h1 className="block ml-4 text-3xl font-bold md:hidden">
          Top Trending
        </h1>

        {/* top trending music */}

        {category === 'music' && (
          <div
            id="top-trending"
            className="md:flex-row flex-col flex max-w-[1920px] gap-6 md:gap-10 mx-4 md:mx-10 mt-4 md:mt-10 md:ml-40 md:overflow-x-scroll no-scrollbar"
          >
            <Toptrending url={music[0].url} rank={1}></Toptrending>
            <Toptrending url={music[1].url} rank={2}></Toptrending>
            <Toptrending url={music[2].url} rank={3}></Toptrending>
            <div className="hidden gap-10 md:flex">
              <Toptrending url={music[3].url} rank={4}></Toptrending>
              <Toptrending url={music[4].url} rank={5}></Toptrending>
            </div>
          </div>
        )}

        {/* top trending festival */}

        {category === 'festival' && (
          <div
            id="top-trending"
            className="md:flex-row flex-col flex max-w-[1920px] gap-6 md:gap-10 mx-4 md:mx-10 mt-4 md:mt-10 md:ml-40 md:overflow-x-scroll no-scrollbar"
          >
            <Toptrending url={festival[0].url} rank={1}></Toptrending>
            <Toptrending url={festival[1].url} rank={2}></Toptrending>
            <Toptrending url={festival[2].url} rank={3}></Toptrending>
            <div className="hidden gap-10 md:flex">
              <Toptrending url={festival[3].url} rank={4}></Toptrending>
              <Toptrending url={festival[4].url} rank={5}></Toptrending>
            </div>
          </div>
        )}
      </div>

      {/* music card */}

      {category === 'music' && (
        <div className="grid grid-cols-4 grid-rows-2 gap-10 mx-20 mt-20">
          {music.map((val, idx) => (
            <Card
              key={idx}
              url={val.url}
              title={val.title}
              date={val.date}
              price={val.price}
              username={val.username}
            />
          ))}
        </div>
      )}

      {/* festival card */}

      {category === 'festival' && (
        <div className="grid grid-cols-4 grid-rows-2 gap-10 mx-20 mt-20">
          {festival.map((val, idx) => (
            <Card
              key={idx}
              url={val.url}
              title={val.title}
              date={val.date}
              price={val.price}
              username={val.username}
            />
          ))}
        </div>
      )}
    </main>
  );
}
