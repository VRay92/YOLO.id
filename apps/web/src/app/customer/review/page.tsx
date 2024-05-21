'use client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { GoStarFill } from 'react-icons/go';
import Sidebar from '@/components/Sidebar';
import CustomerRoute from '@/components/CustomerRoute';
import Image from 'next/image';
import { MdOutlineContentCopy } from 'react-icons/md';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';

interface IReviewProps {}
interface IDataEvent {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  imageUrl: string;
}

const Review: React.FunctionComponent<IReviewProps> = (props) => {
  const router = useRouter();
  const [dataEvent, setDataEvent] = useState<IDataEvent[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [fillForm, setFillForm] = useState({
    rating: 3,
    comment: '',
    userId: 0,
    eventId: 0,
  });

  const getCustomerById = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response1 = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}customer/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userId = response1.data.data.id;
      console.log('API response for customer profile:', userId);

      setFillForm((prevForm) => ({
        ...prevForm,
        userId: userId,
      }));
      console.log('Updated userId:', userId);
    } catch (error) {
      console.error('Error fetching customer profile', error);
    }
  };

  const getCustomerPurchasedEvent = async () => {
    const token = localStorage.getItem('token');
    console.log('token from page', token);
    const response2 = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}customer/purchasedEvent`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('nilai response2', response2.data);
    setDataEvent(response2.data);
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };

  console.log('data event', dataEvent);

  const submitReview = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}review/review`,
        fillForm,
      );
      console.log('Review submitted successfully:', response.data);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error; // Throw the error for handling elsewhere if needed
    }
  };

  useEffect(() => {
    getCustomerPurchasedEvent();
    getCustomerById();
  }, []);

  console.log('fillform', fillForm);
  return (
    <CustomerRoute>
      <div className="bg-[#282828] flex">
        <div className="mx-12 mt-28 hidden md:block">
          <Sidebar></Sidebar>
        </div>
        <section className=" w-full md:w-[1225px] md:h-[710px] rounded-none md:rounded-lg  md:my-14 relative">
          <Image
            fill
            sizes="100vw"
            src="/background.jpg"
            alt="hero"
            className="object-cover rounded-none md:rounded-lg hidden md:block"
          ></Image>

          <Image
            fill
            sizes="100vw"
            src="/background2.jpg"
            alt="hero"
            className="rounded-none md:rounded-lg block md:hidden w-fit"
          ></Image>

          <div className="md:flex flex-col relative font-semibold text-center md:justify-between md:text-left mt-16 md:ml-16 ">
            <h1 className=" text-3xl text-black ">Review and Rating</h1>
            <div className="overflow-x-auto mx-4 md:ml-12 md:mr-16 mt-7 mb-20">
              <table className="relative  w-full">
                <thead className="bg-gray-300 h-10 rounded-t-lg">
                  <tr className="font-semibold text-sm ">
                    <td className="rounded-tl-lg pl-4 md:pl-10">NAME</td>
                    <td className="pl-5">EVENT DATE</td>
                    <td className="rounded-tr-lg"> YOUR RATING</td>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {dataEvent.map((item, index) => (
                    <tr key={index} className="h-10 w-[450px] space-x-10">
                      <td className="border-b-[1px] pl-4 md:pl-10 w-[450px]">
                        {item.title}
                      </td>
                      <td className="border-b-[1px] w-[400px] pl-5">
                        {item.startDate === item.endDate
                          ? formatDateString(item.startDate)
                          : `${formatDateString(
                              item.startDate,
                            )} - ${formatDateString(item.endDate)}`}
                      </td>
                      <td className="border-b-[1px]">
                        <button
                          className="bg-gray-300 w-[5rem] h-[2.5rem] mr-10 rounded-md
                        "
                          onClick={() => {
                            setOpenModal(!openModal),
                              setFillForm((prevForm) => ({
                                ...prevForm,
                                eventId: item.id,
                              }));
                          }}
                        >
                          Review
                        </button>
                        {openModal && (
                          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto h-screen w-screen bg-black bg-opacity-70 ">
                            <div className="bg-white relative rounded-lg shadow-lg max-w-4xl p-14">
                              {' '}
                              <button
                                className="absolute -top-5 -right-5 size-14 rounded-full bg-black border-2 border-white text-white font-semibold text-xl"
                                onClick={() => setOpenModal(false)}
                              >
                                X
                              </button>
                              <h1 className=" text-5xl text-black font-extrabold ">
                                Reviews
                              </h1>
                              <h1>
                                Give us your feedback for our future improvement
                              </h1>
                              <h1 className="mt-14">
                                How was your event experience?
                              </h1>
                              {/* RATING */}
                              <div className="flex flex-col items-center text-xl mt-4">
                                <div className="flex justify-between w-full max-w-md mb-2">
                                  <label className="text-xl font-thin">
                                    Not Satisfied
                                  </label>
                                  <div className="flex space-x-4">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                      <label
                                        key={value}
                                        className="flex flex-col items-center"
                                      >
                                        <input
                                          type="radio"
                                          name="importance"
                                          value={value}
                                          checked={fillForm.rating === value}
                                          onChange={(element) => {
                                            const newData = {
                                              ...fillForm,
                                              rating: value,
                                            };
                                            setFillForm(newData);
                                          }}
                                          className="form-radio text-blue-600 size-5"
                                        />
                                        <span className="mt-1">{value}</span>
                                      </label>
                                    ))}
                                  </div>
                                  <label className="text-xl font-thin">
                                    Satisfied
                                  </label>
                                </div>
                              </div>
                              <h1 className="mt-14">
                                Any suggestion we can improve?
                              </h1>
                              <input
                                type="text"
                                className="w-full"
                                onChange={(element) => {
                                  const newData = {
                                    ...fillForm,
                                    comment: element.target.value,
                                  };
                                  setFillForm(newData);
                                }}
                              />
                              <button
                                className="w-full h-[2.5rem] rounded-md text-white bg-orange-500 mt-4 active:translate-y-[1px]"
                                onClick={submitReview}
                              >
                                Submit Review
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="h-10 w-full">
                    <td className="rounded-bl-lg"></td>
                    <td></td>
                    <td className="rounded-br-lg"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </CustomerRoute>
  );
};

export default Review;
