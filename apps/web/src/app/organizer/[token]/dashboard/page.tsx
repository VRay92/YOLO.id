'use client';
import * as React from 'react';
import Image from 'next/image';
import AreaChart from '@/components/AreaChart';
import BarChart from '@/components/BarChart';
import Donut from '@/components/Donut';
import SideBarEO from '@/components/SidebarEO';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OrganizerRoute from '@/components/OrganizerRoute';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchEvents } from '@/lib/features/eventSlice';

interface IDashboardEOProps {
  label: string;
  value: number;
}

const DashboardEO: React.FunctionComponent<IDashboardEOProps> = (props) => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.eventReducer);
  const [revenueData, setRevenueData] = useState([]);
  const [visitorsData, setVisitorsData] = useState([]);
  const [genderData, setGenderData] = useState<IDashboardEOProps[]>([]);
  const [ageData, setAgeData] = useState<IDashboardEOProps[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchEvents());
    }
  }, [dispatch]);

  const fetchFilteredData = async () => {
    try {
      const params = {
        eventId: selectedEventId,
        startDate: startDate,
        endDate: endDate,
      };

      if (selectedEventId) {
        const revenueResponse = await axios.get('/api/revenue', { params });
        setRevenueData(revenueResponse.data);

        const visitorsResponse = await axios.get('/api/visitors', { params });
        setVisitorsData(visitorsResponse.data);

        const genderResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}events/${selectedEventId}/customers/gender`,
        );
        const genderData: IDashboardEOProps[] = Object.entries(
          genderResponse.data,
        ).map(([label, value]) => ({
          label,
          value: value as number,
        }));
        setGenderData(genderData);

        const ageResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}events/${selectedEventId}/customers/age-group`,
        );
        const ageData: IDashboardEOProps[] = Object.entries(ageResponse.data).map(
          ([label, value]) => ({
            label,
            value: value as number,
          }),
        );
        setAgeData(ageData);
      }
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

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
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-black bg-opacity-35 p-4 rounded-lg shadow">
                  <h2 className="text-xl text-black font-semibold mb-2">
                    Area Chart
                  </h2>
                  <div className="h-80 overflow-hidden">
                    <AreaChart data={revenueData} />
                  </div>
                </div>
                <div className="bg-black bg-opacity-35 p-4 rounded-lg shadow">
                  <h2 className="text-xl text-black font-semibold mb-2">
                    Bar Chart
                  </h2>
                  <div className="h-80 overflow-hidden">
                    <BarChart data={visitorsData} />
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-8">
                  <div className="bg-black bg-opacity-35 p-4 rounded-lg shadow">
                    <h2 className="text-xl text-black font-semibold mb-2">Filter Event</h2>
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
                                e.target.value ? parseInt(e.target.value) : null,
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
                        <div>
                          <button
                            onClick={fetchFilteredData}
                            className="px-4 py-2 bg-red-600 text-white rounded-2xl"
                          >
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black bg-opacity-35 p-4 rounded-lg shadow">
                    <h2 className="text-xl text-black font-semibold mb-6">
                      Donut Chart
                    </h2>
                    <div className="flex justify-center items-center">
                      <div className="w-1/2">
                        <Donut data={genderData} />
                      </div>
                      <div className="w-1/2">
                        <Donut data={ageData} />
                      </div>
                    </div>
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