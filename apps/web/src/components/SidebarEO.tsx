'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FaUser, FaChartPie, FaTicketAlt, FaStar, FaPercentage } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

interface ISideBarEOProps {}

const SideBarEO: React.FunctionComponent<ISideBarEOProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: <FaUser size={24} />, label: 'Profile', path: `/organizer/profile` },
    { icon: <FaChartPie size={24} />, label: 'Dashboard', path: `/organizer/dashboard` },
    { icon: <FaPercentage size={24} />, label: 'Create Event', path: `/organizer/create-event` },
    { icon: <FaTicketAlt size={24} />, label: 'Transaction', path: `/organizer/transaction` },
    { icon: <FaStar size={24} />, label: 'List of Events', path: `/organizer/events` },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <section className="w-[380px] space-y-5">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center text-white w-full h-[75px] rounded-lg cursor-pointer transition-colors duration-200 ${
            isActive(item.path) ? 'bg-[#404040] text-white' : 'hover:bg-[#cacaca] hover:text-[#282828]'
          }`}
          onClick={() => {
            router.push(item.path);
          }}
        >
          <span className="mx-4">{item.icon}</span>
          <h1 className="text-lg">{item.label}</h1>
        </div>
      ))}
    </section>
  );
};

export default SideBarEO;