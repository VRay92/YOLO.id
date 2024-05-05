import * as React from 'react';
import Image from 'next/image';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { BsTicketPerforatedFill } from 'react-icons/bs';

interface ICardEventProps {}

const CardEvent: React.FunctionComponent<ICardEventProps> = (props) => {
  return (
    <div className="border border-gray-200 rounded-xl mx-4 md:mx-16 px-4 md:px-8 py-4 shadow-md bg-white mt-4 flex justify-between">
      <div>
        <div className="flex">
          <div className="bg-[#48c56d] text-white w-[10rem] h-[2rem] text-center pt-1 item mb-4">
            Payment Success
          </div>
        </div>
        <div className="border-gray-300 border-t "></div>
        <div className="w-[300px] md:w-[600px]">
          <h1 className="text-2xl font-bold mb-4 ">
            Sajian Spesial Bilal Indrajaya: Konser Nelangsa Kala Purnama
          </h1>
        </div>
        <div className="flex">
          <div className="flex items-center mb-2">
            <FaCalendar className="mr-2 text-gray-500" />
            <span className="text-gray-500">05 May 2024 |</span>
          </div>
          <div className="flex items-center mb-2 ml-4">
            <BsTicketPerforatedFill className=" text-xl text-gray-500 mr-2"></BsTicketPerforatedFill>
            <span className="text-gray-500">1 Tiket</span>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <FaClock className="mr-2 text-gray-500" />
          <span className="text-gray-500">18:30 - 22:00 WIB</span>
        </div>
        <div className="flex items-center mb-6">
          <FaMapMarkerAlt className="mr-2 text-gray-500" />
          <span className="text-gray-500">Soehanna Hall, DKI Jakarta</span>
        </div>
      </div>
      <div className="relative w-[300px] h-[200px] my-auto md:block hidden">
        <Image
          fill
          sizes="100vw"
          src="https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405063211.jpg"
          alt="hero"
          className="object-cover"
        ></Image>
      </div>
    </div>
  );
};

export default CardEvent;
