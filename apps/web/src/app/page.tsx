'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import Toptrending from '@/components/Toptrending';
import Card from '@/components/Card';
import { Carousel } from 'flowbite-react';
import { initDropdowns } from 'flowbite';
import { initCarousels } from 'flowbite';

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

  useEffect(() => {
    initCarousels;
  }, []);

  return (
    <main className="w-full bg-[#282828]">
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

        {/* ------------------------------------IMAGE CAROUSEL----------------------------------------------- */}

        <div
          id="main-banner"
          className="w-[960px] h-[480px] absolute left-[18%] 2xl:left-[25%] bottom-[15%] "
        >
          <div
            id="default-carousel"
            className="relative w-[960px]"
            data-carousel="slide"
          >
            {/* <!-- Carousel wrapper --> */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-[480px]">
              {/* <!-- Item 1 --> */}
              <div
                className="hidden duration-700 ease-in-out rounded-lg"
                data-carousel-item
              >
                <img
                  src="anggun.png"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              {/* <!-- Item 2 --> */}
              <div
                className="hidden duration-700 ease-in-out rounded-lg"
                data-carousel-item
              >
                <img
                  src="LiSa.jpg"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              {/* <!-- Item 3 --> */}
              <div
                className="hidden duration-700 ease-in-out rounded-lg"
                data-carousel-item
              >
                <img
                  src="dewa19.jpg"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              {/* <!-- Item 4 --> */}
              <div
                className="hidden duration-700 ease-in-out rounded-lg"
                data-carousel-item
              >
                <img
                  src="gedebagejazz.jpg"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              {/* <!-- Item 5 --> */}
              <div
                className="hidden duration-700 ease-in-out rounded-lg"
                data-carousel-item
              >
                <img
                  src="ultrabeach.jpg"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
            </div>
            {/* <!-- Slider indicators --> */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              <button
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current="true"
                aria-label="Slide 1"
                data-carousel-slide-to="0"
              ></button>
              <button
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 2"
                data-carousel-slide-to="1"
              ></button>
              <button
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 3"
                data-carousel-slide-to="2"
              ></button>
              <button
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 4"
                data-carousel-slide-to="3"
              ></button>
              <button
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 5"
                data-carousel-slide-to="4"
              ></button>
            </div>
            {/* <!-- Slider controls --> */}
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------------- */}

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
      <div className="max-w-[1920px] h-auto md:h-[400px] w-full bg-[#989898] mt-10 pt-4 relative pb-5">
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
      <div className="h-60 w-full">.</div>
    </main>
  );
}
