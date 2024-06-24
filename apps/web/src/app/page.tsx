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
import axios from 'axios';

interface IDataEvent {
  title: string;
  imageUrl: string;
  description: string;
  startDate: string;
  startTime: string;
  endTime: string;
  organizerId: number;
  endDate: string;
  availableSeats: number;
  isFree: boolean;
  updatedAt: string;
  maxTicket: number;
  cityId: any;
  location: string;
  categoryId: number;
  username: string;
  price: string;
  id: number;
}

export default function Home() {
  const [category, setCategory] = useState(1);
  const [city, setCity] = useState(181);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [dataEvent, setDataEvent] = useState<IDataEvent[]>([]);

  const filterByCategory = dataEvent.filter(
    (val, index) => val.categoryId === category,
  );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filterByCityAndCategory = dataEvent.filter(
    (val, index) => val.cityId === city && val.categoryId === category,
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

  const getAllEvent = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}event/`,
    );
    setDataEvent(response.data);
    console.log('response', response.data);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    getAllEvent();
  }, []);

  console.log('DATA', dataEvent);
  console.log('filter by category', filterByCategory);

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
              category === 1 ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory(1)}
          >
            Music
          </li>
          <li
            className={`cursor-pointer ${
              category === 2 ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory(2)}
          >
            Festival&Bazaar
          </li>
          <li
            className={`cursor-pointer ${
              category === 3 ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory(3)}
          >
            Sports
          </li>
          <li
            className={`cursor-pointer ${
              category === 4 ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory(4)}
          >
            Exhibition&Expo
          </li>
          <li
            className={`cursor-pointer ${
              category === 5 ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setCategory(5)}
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

        {category === 1 && (
          <div
            id="top-trending"
            className="md:flex-row flex-col flex max-w-[1920px] gap-6 md:gap-10 mx-4 md:mx-10 mt-4 md:mt-10 md:ml-40 md:overflow-x-scroll no-scrollbar"
          >
            <Toptrending
              url={filterByCategory[0]?.imageUrl}
              rank={1}
              eventid={filterByCategory[0]?.id}
            ></Toptrending>
            <Toptrending
              url={filterByCategory[1]?.imageUrl}
              rank={2}
              eventid={filterByCategory[1]?.id}
            ></Toptrending>
            <Toptrending
              url={filterByCategory[2]?.imageUrl}
              rank={3}
              eventid={filterByCategory[2]?.id}
            ></Toptrending>
            <div className="hidden gap-10 md:flex">
              <Toptrending
                url={filterByCategory[3]?.imageUrl}
                rank={4}
                eventid={filterByCategory[3]?.id}
              ></Toptrending>
              <Toptrending
                url={filterByCategory[4]?.imageUrl}
                rank={5}
                eventid={filterByCategory[4]?.id}
              ></Toptrending>
            </div>
          </div>
        )}

        {/* top trending festival */}

        {category === 2 && (
          <div
            id="top-trending"
            className="md:flex-row flex-col flex max-w-[1920px] gap-6 md:gap-10 mx-4 md:mx-10 mt-4 md:mt-10 md:ml-40 md:overflow-x-scroll no-scrollbar"
          >
            <Toptrending
              url={filterByCategory[0]?.imageUrl}
              rank={1}
              eventid={filterByCategory[0]?.id}
            ></Toptrending>
            <Toptrending
              url={filterByCategory[1]?.imageUrl}
              rank={2}
              eventid={filterByCategory[1]?.id}
            ></Toptrending>
            <Toptrending
              url={filterByCategory[2]?.imageUrl}
              rank={3}
              eventid={filterByCategory[2]?.id}
            ></Toptrending>
            <div className="hidden gap-10 md:flex">
              <Toptrending
                url={filterByCategory[3]?.imageUrl}
                rank={4}
                eventid={filterByCategory[3]?.id}
              ></Toptrending>
              <Toptrending
                url={filterByCategory[4]?.imageUrl}
                rank={5}
                eventid={filterByCategory[4]?.id}
              ></Toptrending>
            </div>
          </div>
        )}
      </div>

      {/* event card for desktop (with pagination) */}

      <div className="hidden overflow-x-scroll no-scrollbar md:grid md:grid-cols-4 md:auto-rows-auto gap-10 mx-4 md:mx-20 mt-20">
        {paginationCategory.length ? (
          paginationCategory.map((val, idx) => (
            <Card
              key={idx}
              url={val.imageUrl}
              title={val.title}
              date={formatDate(val.startDate)}
              price={val.price}
              username={val.username}
              eventid={val.id}
            />
          ))
        ) : (
          <div>No More Event</div>
        )}
      </div>

      <div className="hidden md:flex justify-between px-16 pt-10">
        <div className="items-center flex">
          <h1 className="text-white mr-4">Show Events</h1>
          <select
            id="pagination"
            className=" text-xl  border-none h-10"
            value={postsPerPage}
            onChange={(e) => setPostsPerPage(parseInt(e.target.value))}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>
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
            url={val.imageUrl}
            title={val.title}
            date={formatDate(val.startDate)}
            price={val.price}
            username={val.username}
            eventid={val.id}
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
          onChange={(e) => setCity(parseInt(e.target.value))}
        >
          <option value={160}>Jakarta</option>
          <option value={'Surabaya'}>Surabaya</option>
          <option value={181}>Bandung</option>
          <option value={270}>Tangerang</option>
          <option value={282}>Bali</option>
        </select>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar md:grid md:grid-cols-4 md:auto-rows-auto gap-10 mx-4 md:mx-20 mt-10  md:mt-20">
        {filterByCityAndCategory.map((val, idx) => (
          <Card
            key={idx}
            url={val.imageUrl}
            title={val.title}
            date={formatDate(val.startDate)}
            username={val.username}
            price={val.price}
            eventid={val.id}
          />
        ))}
      </div>

      <div className="h-32 w-full">.</div>
    </main>
  );
}
