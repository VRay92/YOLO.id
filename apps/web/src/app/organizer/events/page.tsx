'use client';
import SideBarEO from '@/components/SidebarEO';
import Image from 'next/image';
import * as React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchEvents } from '@/lib/features/eventSlice';
import { useRouter } from 'next/navigation';
import OrganizerRoute from '@/components/OrganizerRoute';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import PaginationEO from '@/components/PaginationEO';

interface IEventsEOProps {}

const EventsEO: React.FunctionComponent<IEventsEOProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { events } = useAppSelector((state) => state.eventReducer);
  const [token, setToken] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const eventsPerPage = 2;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchEvents());
      setToken(token);
    } else {
      router.push('/signin');
    }
  }, [dispatch, router]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <OrganizerRoute>
      <div className="flex bg-[#282828] min-h-screen">
      <div className="mx-12 mt-28 hidden md:block">
          <SideBarEO />
        </div>
        <section className="w-full md:h-[710px] rounded-none md:mr-16 md:rounded-lg md:my-14 relative">
          <Image
            fill
            sizes="100vw"
            src="/background.jpg"
            alt="hero"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col">
            <div className="relative z-10 p-8 flex-grow overflow-y-hidden">
              <h1 className="text-3xl text-black mb-8">List of Events</h1>
              {currentEvents.length > 0 ? (
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    {currentEvents.map((event) => (
                      <div
                        key={event.id}
                        className="border border-gray-200 rounded-xl mx-4 md:mx-16 px-4 md:px-8 py-4 shadow-md bg-white mt-4 flex justify-between"
                      >
                        <div>
                          <div className="flex">
                            <div
                              className={`${
                                event.isFree ? 'bg-[#48c56d]' : 'bg-[#f44336]'
                              } text-white w-[10rem] h-[2rem] text-center pt-1 item mb-4`}
                            >
                              {event.isFree ? 'Free Event' : 'Paid Event'}
                            </div>
                          </div>
                          <div className="border-gray-300 border-t"></div>
                          <div className="w-[300px] md:w-[600px]">
                            <h1 className="text-2xl font-bold mb-4 ">
                              {event.title}
                            </h1>
                          </div>
                          <div className="flex">
                            <div className="flex items-center mb-2">
                              <FaCalendar className="mr-2 text-gray-500" />
                              <span className="text-gray-500">
                                {new Date(event.startDate).toLocaleDateString()}{' '}
                                |
                              </span>
                            </div>
                            <div className="flex items-center mb-2 ml-4">
                              <BsTicketPerforatedFill className="text-xl text-gray-500 mr-2" />
                              <span className="text-gray-500">
                                {event.availableSeats} Tiket
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            <FaClock className="mr-2 text-gray-500" />
                            <span className="text-gray-500">{event.time}</span>
                          </div>
                          <div className="flex items-center mb-6">
                            <FaMapMarkerAlt className="mr-2 text-gray-500" />
                            <span className="text-gray-500">
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <div className="relative w-[300px] h-[200px] my-auto md:block hidden">
                          <img
                            // fill
                            sizes="100vw"
                            src={`http://localhost:8000/assets/${event?.imageUrl}`}
                            alt="hero"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-lg text-gray-500 mb-4">
                    Anda belum memiliki event.
                  </p>
                  <button
                    className="bg-red-600 text-white font-bold py-2 px-6 rounded-2xl"
                    onClick={() =>
                      router.push(`/organizer/${token}/create-event`)
                    }
                  >
                    Buat Event
                  </button>
                </div>
              )}
            </div>
            <div className="mb-5">
              <PaginationEO
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </section>
      </div>
    </OrganizerRoute>
  );
};

export default EventsEO;
