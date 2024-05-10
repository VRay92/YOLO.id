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

interface IDashboardEOProps {}

const DashboardEO: React.FunctionComponent<IDashboardEOProps> = (props) => {
  const [revenueData, setRevenueData] = useState([]);
  const [visitorsData, setVisitorsData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/revenue')
      .then((response) => {
        setRevenueData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching revenue data:', error);
      });

    axios
      .get('/api/visitors')
      .then((response) => {
        setVisitorsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching visitors data:', error);
      });

    axios
      .get('/api/gender')
      .then((response) => {
        setGenderData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching gender data:', error);
      });

    axios
      .get('/api/age')
      .then((response) => {
        setAgeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching age data:', error);
      });
  }, []);
  return (
    <OrganizerRoute>
      <div className="flex bg-[#282828] min-h-screen">
        <div className="mx-12 mt-28">
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
                    <h2 className="text-xl text-black font-semibold mb-2">
                      Latest Event
                    </h2>
                    <div className="flex justify-center h-40 items-center">
                      <div className="w-auto">
                        {/* Data event terakhir by date */}
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
