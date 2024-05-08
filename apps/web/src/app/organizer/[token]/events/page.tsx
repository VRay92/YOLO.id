"use client";
import SideBarEO from '@/components/SidebarEO';
import Image from 'next/image';
import * as React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchEvents } from '@/lib/features/eventSlice';
import { useRouter } from 'next/navigation';

interface IEventsEOProps {}

const EventsEO: React.FunctionComponent<IEventsEOProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { events, loading, error } = useAppSelector((state) => state.eventReducer);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchEvents(token));
    } else {
      router.push('/signin');
    }
  }, [dispatch, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex bg-[#282828] min-h-screen">
      <div className="mx-12 mt-28">
        <SideBarEO />
      </div>
      <section className="flex-1 p-8">
        <div className="relative overflow-hidden shadow-lg">
          <Image
            fill
            sizes="100vw"
            src="/background.jpg"
            alt="hero"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-3xl text-black mb-8">List of Events</h1>
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">
                  {event.description.substring(0, 100)}...
                </p>
                <p className="text-gray-500 mb-2">
                  Start Date: {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-500 mb-2">
                  Price: {event.isFree ? 'Free' : 'Paid'}
                </p>
                <p className="text-gray-500">
                  Average Rating: {event.averageRating}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsEO;
