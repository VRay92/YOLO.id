'use client';
import * as React from 'react';
import Image from 'next/image';
import AreaChart from '@/components/AreaChart';
import BarChart from '@/components/BarChart';
import SideBarEO from '@/components/SidebarEO';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OrganizerRoute from '@/components/OrganizerRoute';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import {
  Transaction,
  fetchCustomerCount,
} from '@/lib/features/transactionSlice';

interface IDashboardEOProps {
  label: string;
  value: number;
}

interface Event {
  id: number;
  title: string;
}

const DashboardEO: React.FunctionComponent<IDashboardEOProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [transactionData, setTransactionData] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [organizerSummary, setOrganizerSummary] = useState({
    totalRevenue: 0,
    completedEvents: 0,
    successfulTransactions: 0,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const { customerCountData } = useAppSelector(
    (state) => state.transactionReducer,
  );

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchEvents(token);
    } else {
      router.push('/signin');
    }
  }, [dispatch, router]);

  const fetchEvents = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchTransactionData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const params = {
          eventId: selectedEventId,
          startDate: startDate,
          endDate: endDate,
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/transactions/filter`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params,
          },
        );
        const transactions = response.data.data;
        const formattedData = transactions.map((transaction: Transaction) => ({
          date: transaction.createdAt,
          revenue: transaction.totalPrice - transaction.discountAmount,
        }));
        setTransactionData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };

  const fetchCustomerCountData = async (eventId?: number) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(fetchCustomerCount(token, eventId, startDate, endDate));
      }
    } catch (error) {
      console.error('Error fetching customer count data:', error);
    }
  };

  const fetchOrganizerSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setOrganizerSummary(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching organizer summary:', error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
    fetchCustomerCountData();
    fetchOrganizerSummary();
  }, [selectedEventId, startDate, endDate]);

  if (events.length === 0) {
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
              <div className="relative z-10 p-8 flex-grow">
                <h1 className="text-3xl text-black mb-8">Dashboard</h1>
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
              </div>
            </div>
          </section>
        </div>
      </OrganizerRoute>
    );
  }

  return (
    <OrganizerRoute>
      <div className="flex bg-[#282828] min-h-screen">
        <div className="mx-12 mt-28 hidden md:block">
          <SideBarEO />
        </div>
        <section className="flex-1 p-8">
          <div className="relative overflow-hiddeshadow-lg">
            <Image
              fill
              sizes="100vw"
              src="/background.jpg"
              alt="hero"
              className="object-cover rounded-lg"
            />
            <div className="absolute inset-0"></div>
            <div className="relative z-10 p-8">
              <h1 className="text-3xl text-black mb-8">Dashboard</h1>
              <div className="hidden md:block">
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-black bg-opacity-35 p-4 rounded-lg shadow">
                    <h2 className="text-xl text-black font-semibold mb-2">
                      Revenue Chart
                    </h2>
                    <div className="h-80 overflow-hidden">
                      <AreaChart data={transactionData} />
                    </div>
                  </div>
                  <div className="bg-black bg-opacity-35 p-4 rounded-lg shadow">
                    <h2 className="text-xl text-black font-semibold mb-2">
                      Customer Buy Ticket
                    </h2>
                    <div className="h-80 overflow-hidden">
                      <BarChart data={customerCountData} />
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-8">
                    <div className="bg-black bg-opacity-35 p-4 rounded-lg shadow">
                      <h2 className="text-xl text-black font-semibold mb-2">
                        Filter Event
                      </h2>
                      <div className="flex justify-center items-center">
                        <div className="w-auto flex flex-col justify-center items-center text-center space-y-4">
                          <div>
                            <label htmlFor="eventFilter" className="block mb-1">
                              Event:
                            </label>
                            <select
                              id="eventFilter"
                              value={selectedEventId || ''}
                              onChange={(e) =>
                                setSelectedEventId(
                                  e.target.value
                                    ? parseInt(e.target.value)
                                    : null,
                                )
                              }
                              className="px-2 py-1 rounded"
                            >
                              <option value="">All Events</option>
                              {events.map((event) => (
                                <option key={event.id} value={event.id}>
                                  {event.title}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="startDate" className="block mb-1">
                              Start Date:
                            </label>
                            <input
                              type="date"
                              id="startDate"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="px-2 py-1 rounded"
                            />
                          </div>
                          <div>
                            <label htmlFor="endDate" className="block mb-1">
                              End Date:
                            </label>
                            <input
                              type="date"
                              id="endDate"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="px-2 py-1 rounded"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black bg-opacity-35 p-4 rounded-lg shadow flex flex-col  space-y-4">
                      <h2 className="text-xl text-black font-semibold mb-2">
                        Organizer Summary
                      </h2>
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="text-center">
                          <p className="text-lg text-black">Total Revenue:</p>
                          <p className="text-2xl text-black font-bold">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(organizerSummary.totalRevenue)}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg text-black">
                            Completed Events:
                          </p>
                          <p className="text-2xl text-black font-bold">
                            {organizerSummary.completedEvents}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg text-black">
                            Successful Transactions:
                          </p>
                          <p className="text-2xl text-black font-bold">
                            {organizerSummary.successfulTransactions}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='block md:hidden'> 
              <div className="bg-black bg-opacity-35 p-4 mb-10 rounded-lg shadow flex flex-col space-y-4">
              <h2 className="text-xl text-black font-semibold mb-2">Organizer Summary</h2>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-center">
                  <p className="text-lg text-black">Total Revenue:</p>
                  <p className="text-2xl text-black font-bold">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(organizerSummary.totalRevenue)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg text-black">Completed Events:</p>
                  <p className="text-2xl text-black font-bold">
                    {organizerSummary.completedEvents}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg text-black">Successful Transactions:</p>
                  <p className="text-2xl text-black font-bold">
                    {organizerSummary.successfulTransactions}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-black bg-opacity-35 mb-10 p-4 rounded-lg shadow">
              <h2 className="text-xl text-black font-semibold mb-2">Filter Event</h2>
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="eventFilter" className="block mb-1">
                    Event:
                  </label>
                  <select
                    id="eventFilter"
                    value={selectedEventId || ''}
                    onChange={(e) =>
                      setSelectedEventId(e.target.value ? parseInt(e.target.value) : null)
                    }
                    className="px-2 py-1 rounded w-full"
                  >
                    <option value="">All Events</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="startDate" className="block mb-1">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-2 py-1 rounded w-full"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block mb-1">
                    End Date:
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-2 py-1 rounded w-full"
                  />
                </div>
              </div>
            </div>
            <div className="bg-black bg-opacity-35 mb-10 p-4 rounded-lg shadow">
              <h2 className="text-xl text-black font-semibold mb-2">Revenue Chart</h2>
              <div className="h-80 overflow-hidden">
                <AreaChart data={transactionData} />
              </div>
            </div>
            <div className="bg-black bg-opacity-35 p-4 rounded-lg shadow">
              <h2 className="text-xl text-black font-semibold mb-2">Customer Buy Ticket</h2>
              <div className="h-80 overflow-hidden">
                <BarChart data={customerCountData} />
              </div>
            </div>
          </div>
        </div>
      </div>
              
        </section>
      </div>
    </OrganizerRoute>
  );
};

export default DashboardEO;
