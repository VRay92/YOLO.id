import * as React from 'react';
import Image from 'next/image';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { BsTicketPerforatedFill } from 'react-icons/bs';

interface ICardEventProps {
  title: string;
  startDate: string;
  imageUrl: string;
  time: string;
  location: string;
  status: string;
}

const CardEvent: React.FunctionComponent<ICardEventProps> = (props) => {
  const date = new Date(props.startDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="border border-gray-200 rounded-xl mx-4 md:mx-16 px-4 md:px-8 py-4 shadow-md bg-white mt-4 flex justify-between">
      <div>
        <div className="flex">
          {props.status === 'success' && (
            <div className="bg-[#48c56d] text-white w-[10rem] h-[2rem] text-center pt-1 item mb-4">
              Payment Success
            </div>
          )}
          {props.status === 'failed' && (
            <div className="bg-[#c92e2e] text-white w-[10rem] h-[2rem] text-center pt-1 item mb-4">
              Payment failed
            </div>
          )}
          {props.status === 'pending' && (
            <div className="bg-[#bfc548] text-white w-[10rem] h-[2rem] text-center pt-1 item mb-4">
              Payment Pending
            </div>
          )}
        </div>
        <div className="border-gray-300 border-t "></div>
        <div className="w-[300px] md:w-[600px]">
          <h1 className="text-2xl font-bold mb-4 ">{props.title}</h1>
        </div>
        <div className="flex items-center mb-2">
          <FaCalendar className="mr-2 text-gray-500" />
          <span className="text-gray-500">{formattedDate}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaClock className="mr-2 text-gray-500" />
          <span className="text-gray-500">{props.time}</span>
        </div>
        <div className="flex items-center mb-6">
          <FaMapMarkerAlt className="mr-2 text-gray-500" />
          <span className="text-gray-500">{props.location}</span>
        </div>
      </div>
      <div className="relative w-[300px] h-[200px] my-auto md:block hidden">
        <img
          sizes="100vw"
          src={`http://localhost:8000/assets/${props.imageUrl}`}
          alt="hero"
          className="object-cover"
        ></img>
      </div>
    </div>
  );
};

export default CardEvent;
