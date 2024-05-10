'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLink,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchEvents } from '@/lib/features/eventSlice';
import { RootState } from '@/lib/store';

interface IEventDetailCustomerProps {}

const EventDetailCustomer: React.FunctionComponent<
  IEventDetailCustomerProps
> = (props) => {
  const [activeTab, setActiveTab] = useState('description');
  const [fixed, setFixed] = useState('hidden');
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { id } = router.query as { id: string };

  const dispatch = useAppDispatch();
  const event = useAppSelector((state: RootState) =>
    state.eventReducer.events.find((event) => event.id === Number(id)),
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchEvents(id));
    }
  }, [dispatch, id]);

  const handleTabClick = (tab: string) => {
    if (tab === 'description') {
    } else if (tab === 'ticket') {
    }
    setActiveTab(tab);
  };

  React.useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 700) {
        setFixed('fixed');
      } else {
        setFixed('hidden');
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      <div
        className={`bg-white shadow-xl w-full pl-40 h-[80px] flex ${fixed} top-0`}
      >
        <button
          className={`text-xl font-semibold h-[80px] w-[180px] text-center  ${
            activeTab === 'description' ? 'border-b-4 border-blue-500' : ''
          }`}
          onClick={() => setActiveTab('description')}
        >
          DESCRIPTION
        </button>
        <button
          className={`text-xl font-semibold h-[80px] w-[180px] text-center  ${
            activeTab === 'ticket' ? 'border-b-4 border-blue-500' : ''
          }`}
          onClick={() => setActiveTab('ticket')}
        >
          TICKET
        </button>
      </div>
      <div className="container hidden lg:block mx-auto py-8 pt-20">
        <div className="flex mb-8">
          <div className="w-2/3">
            <Image
              src={event?.imageUrl || ''}
              alt="Event Banner"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
          <div className="w-1/3 border border-gray-200 rounded-xl ml-8 p-8 shadow-md">
            <h1 className="text-2xl font-bold mb-4">{event?.title}</h1>
            <div className="flex items-center mb-2">
              <FaCalendar className="mr-2 text-gray-500" />
              <span className="text-gray-500">{event?.startDate}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaClock className="mr-2 text-gray-500" />
              <span className="text-gray-500">{event?.time}</span>
            </div>
            <div className="flex items-center mb-6">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span className="text-gray-500">
                {event?.location}, {event?.city?.name}
              </span>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-6">
              <p className="mb-2">Diselenggarakan oleh:</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src={event?.organizer?.imageProfile || ''}
                    alt="Organizer"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <a href="#" className="text-blue-500">
                  {event?.organizer?.username}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-2/3">
            <div className="flex items-center border-b border-gray-300">
              <button
                className={`px-4 py-2 w-1/2 ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('description')}
              >
                Deskripsi
              </button>
              <button
                className={`px-4 py-2 w-1/2 ${
                  activeTab === 'ticket'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('ticket')}
              >
                Tiket
              </button>
            </div>

            {activeTab === 'description' && (
              <div ref={descriptionRef}>{/* Konten deskripsi event */}</div>
            )}
            {activeTab === 'ticket' && (
              <div ref={ticketRef}>{/* Konten tiket event */}</div>
            )}
          </div>
          <div className="w-1/3 pl-8">
            <div className="px-4 -py-4 border border-gray-200 rounded-xl">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded w-full mb-4 mt-4 text-lg border border-gray-400"
                onClick={() => {
                  setActiveTab('ticket');
                }}
              >
                Lihat Tiket
              </button>
            </div>
            <div>
              <h3 className="text-sm my-2">Bagikan Event</h3>
              <div className="flex items-center">
                <a href="#" className="mr-4 text-blue-500">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="mr-4 text-blue-500">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="mr-4 text-blue-500">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="text-blue-500">
                  <FaLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {activeTab === 'description' && (
          <div className="w-2/3">
            <p>{event?.description}</p>
          </div>
        )}
        {activeTab === 'ticket' && (
          <div className="w-2/3">
            {event?.ticketTypes.map((ticketType) => (
              <div
                key={ticketType.ticketTypeId}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    {ticketType.ticketType.name}
                  </h3>
                  <span className="text-blue-500">
                    Tersedia: {ticketType.quantity}
                  </span>
                </div>
                <p className="mb-2">Harga: {ticketType.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* tampilan mobile */}
      <div className="block lg:hidden">
        <div className="container mx-auto py-8">
          <div className="my-14">
            <Image
              src={event?.imageUrl || ''}
              alt="Event Banner"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
          <div className="px-4">
            <h1 className="text-2xl font-bold mb-4">{event?.title}</h1>
            <div className="flex items-center mb-2">
              <FaCalendar className="mr-2 text-gray-500" />
              <span className="text-gray-500">{event?.startDate}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaClock className="mr-2 text-gray-500" />
              <span className="text-gray-500">{event?.time}</span>
            </div>
            <div className="flex items-center mb-6">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              {event?.location}, {event?.city?.name}
            </div>
            <div className="border-t border-dashed border-gray-300 pt-6 mb-8">
              <p className="mb-2">Diselenggarakan oleh:</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="mr-4">
                    <Image
                      src={event?.organizer?.imageProfile || ''}
                      alt="Organizer"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <a href="#" className="text-blue-500">
                    {event?.organizer?.username}
                  </a>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-300 mb-8">
                <button
                  className={`px-4 py-2 w-1/2 ${
                    activeTab === 'description'
                      ? 'border-b-2 border-blue-500 text-blue-500'
                      : 'text-gray-500'
                  }`}
                  onClick={() => handleTabClick('description')}
                >
                  Deskripsi
                </button>
                <button
                  className={`px-4 py-2 w-1/2 ${
                    activeTab === 'ticket'
                      ? 'border-b-2 border-blue-500 text-blue-500'
                      : 'text-gray-500'
                  }`}
                  onClick={() => handleTabClick('ticket')}
                >
                  Tiket
                </button>
              </div>
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Deskripsi</h2>
                  <p>{event?.description}</p>
                </div>
              )}
              {activeTab === 'ticket' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Tiket</h2>
                  {event?.ticketTypes.map((ticketType) => (
                    <div
                      key={ticketType.ticketTypeId}
                      className="bg-white rounded-lg shadow-md p-4 mb-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">
                          {ticketType.ticketType.name}
                        </h3>
                        <span className="text-blue-500">
                          Tersedia: {ticketType.quantity}
                        </span>
                      </div>
                      <p className="mb-2">Harga: {ticketType.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 py-4 px-4">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded w-full text-lg"
              onClick={() => {
                setActiveTab('ticket');
              }}
            >
              Lihat Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailCustomer;
