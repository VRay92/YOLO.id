'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import Toptrending from '@/components/Toptrending';
import Card from '@/components/Card';
import { Carousel } from 'flowbite-react';
import { initDropdowns } from 'flowbite';
import { initCarousels } from 'flowbite';
import { Dropdown } from 'flowbite';
import { Princess_Sofia } from 'next/font/google';
import { type } from 'os';
import Pagination from '@/components/Pagination';
import { current } from '@reduxjs/toolkit';
import { divide } from 'cypress/types/lodash';
import EventTestingData from './testingdata';

export default function Home() {
  const [category, setCategory] = useState('music');
  const [city, setCity] = useState('Bandung');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const filterByCategory = EventTestingData.filter(
    (val, index) => val.category === category,
  );

  const filterByCityAndCategory = EventTestingData.filter(
    (val, index) => val.location === city && val.category === category,
  );
  console.log('nilai filter', filterByCityAndCategory);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginationCategory = filterByCategory.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );
  const paginationByCityAndCategory = filterByCityAndCategory.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          sizes="100"
          src="/hero-section.jpg"
          alt="hero"
          className="object-cover"
        ></Image>

        <div className="flex justify-center pt-14">
          <div className="w-[960px] h-[500px]">
            <Carousel>
              <img
                src="anggun.png"
                alt="..."
                className="object-cover h-[500px]"
              />
              <img
                src="LiSa.jpg"
                alt="..."
                className="object-cover h-[500px]"
              />
              <img
                src="dewa19.jpg"
                alt="..."
                className="object-cover h-[500px]"
              />
              <img src="gedebagejazz.jpg" alt="..." />
              <img src="ultrabeach.jpg" alt="..." />
            </Carousel>
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
          sizes="100"
          src="/hero-section.jpg"
          alt="hero"
          className="object-cover"
        ></Image>
        <div
          id="main-banner"
          className="w-[343px] h-[200px] absolute left-[8%] bottom-[15%]"
        >
          <Carousel>
            <img
              src="anggun.png"
              alt="..."
              className="object-cover rounded-lg"
            />
            <img src="LiSa.jpg" alt="..." className="object-cover rounded-lg" />
            <img
              src="dewa19.jpg"
              alt="..."
              className="object-cover rounded-lg"
            />
            <img
              src="gedebagejazz.jpg"
              alt="..."
              className="object-cover rounded-lg"
            />
            <img
              src="ultrabeach.jpg"
              alt="..."
              className="object-cover rounded-lg"
            />
          </Carousel>
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
            <Toptrending url={filterByCategory[0].url} rank={1}></Toptrending>
            <Toptrending url={filterByCategory[1].url} rank={2}></Toptrending>
            <Toptrending url={filterByCategory[2].url} rank={3}></Toptrending>
            <div className="hidden gap-10 md:flex">
              <Toptrending url={filterByCategory[3].url} rank={4}></Toptrending>
              <Toptrending url={filterByCategory[4].url} rank={5}></Toptrending>
            </div>
          </div>
        )}

        {/* top trending festival */}

        {category === 'festival' && (
          <div
            id="top-trending"
            className="md:flex-row flex-col flex max-w-[1920px] gap-6 md:gap-10 mx-4 md:mx-10 mt-4 md:mt-10 md:ml-40 md:overflow-x-scroll no-scrollbar"
          >
            <Toptrending url={filterByCategory[0].url} rank={1}></Toptrending>
            <Toptrending url={filterByCategory[1].url} rank={2}></Toptrending>
            <Toptrending url={filterByCategory[2].url} rank={3}></Toptrending>
            <div className="hidden gap-10 md:flex">
              <Toptrending url={filterByCategory[3].url} rank={4}></Toptrending>
              <Toptrending url={filterByCategory[4].url} rank={5}></Toptrending>
            </div>
          </div>
        )}
      </div>

      {/* event card for desktop (with pagination) */}

      <div className="hidden overflow-x-scroll no-scrollbar md:grid md:grid-cols-4 md:grid-rows-2 gap-10 mx-4 md:mx-20 mt-20">
        {paginationCategory.length ? (
          paginationCategory.map((val, idx) => (
            <Card
              key={idx}
              url={val.url}
              title={val.title}
              date={val.date}
              price={val.price}
              username={val.username}
            />
          ))
        ) : (
          <div>No More Event</div>
        )}
      </div>

      <div className="hidden md:flex justify-end pr-16">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filterByCategory.length}
          paginate={paginate}
          currentPage={currentPage}
        ></Pagination>
      </div>

      {/* event card for mobile */}

      <div className="flex overflow-x-scroll no-scrollbar md:hidden gap-10 mx-4 md:mx-20 mt-20">
        {filterByCategory.map((val, idx) => (
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
      {/* FILTER BY CITY */}
      <div className="flex items-center mt-10 md:ml-10">
        <h1 className="text-white text-3xl md:text-[40px] font-bold font-poppins ml-5 mr-5 ">
          Popular in
        </h1>
        <select
          id="city"
          className="bg-[#282828] text-white text-xl  border-none h-[3rem]"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value={'Jakarta'}>Jakarta</option>
          <option value={'Surabaya'}>Surabaya</option>
          <option value={'Bandung'}>Bandung</option>
          <option value={'Tangerang'}>Tangerang</option>
          <option value={'Bali'}>Bali</option>
        </select>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar md:grid md:grid-cols-4 md:grid-rows-2 gap-10 mx-4 md:mx-20 mt-10  md:mt-20">
        {filterByCityAndCategory.map((val, idx) => (
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

      <div className="h-32 w-full">.</div>
    </main>
  );
}
