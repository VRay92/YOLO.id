'use client';
import * as React from 'react';
import axios from 'axios';
import OrganizerRoute from '@/components/OrganizerRoute';
import SideBarEO from '@/components/SidebarEO';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import { start } from 'repl';

import NextButton from '@/components/NextButton';
import PreviousButton from '@/components/PreviousButton';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';


interface ICreateEventProps {}

interface ITemporaryData {}

const CreateEvent: React.FunctionComponent<ICreateEventProps> = (props) => {
  const [dataEvent, setDataEvent] = useState({
    title: '',
    imageUrl: '',
    description: '',
    startDate: '',
    endDate: '',
    time: '',
    availableSeats: 0,
    isFree: true,
    organizerId: 0,
    updatedAt: '',
    maxTicket: 0,
    cityId: 0,
    location: '',
  });

  const router = useRouter();
  const [value, setValue] = useState(0);
  const [file, setFile] = React.useState<File | null>(null);
  const [counter, setCounter] = useState(0);
  const [menu, setMenu] = useState('DETAILS');
  const [endTime, setEndTime] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  const setEvent = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/`);
    } catch (error) {
      console.log(error);
    }
  };
  const onSavePhoto = async (): Promise<void> => {
    const formData = new FormData();
    const token = localStorage.getItem('isLoggedIn');

    // Menyematkan file
    if (file) {
      // formData.append("email","mail.com"): example if you want to send other data
      formData.append('imgProfile', file);
      const updatePhoto = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}profile/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(`${process.env.NEXT_PUBLIC_BASE_API_URL}profile/photo`);
      alert('Update profile success');
    }
  };

  const startDateValidation = (element: any) => {
    const startDate = element.getDate();
    const presentDate = new Date().getDate();
    console.log('startDate', startDate);
    console.log('presentDate', presentDate);
    if (startDate < presentDate) {
      alert('invalid date, date already in past');
      const cleardate = document.getElementById(
        'inputStartDate',
      ) as HTMLInputElement;
      cleardate.value = '';
      return false;
    } else {
      return true;
    }
  };

  function setDefaultEndDate(element: any) {
    const defaultValue = document.getElementById(
      'inputEndDate',
    ) as HTMLInputElement;
    defaultValue.value = element;
  }

  const endDateValidation = (element: any) => {
    const startDate = new Date(dataEvent.startDate).getDate();
    const endDate = new Date(element).getDate();
    console.log('startDate', startDate);
    console.log('presentDate', endDate);
    if (endDate < startDate) {
      alert('invalid date, End Date cannot be before Start Date');
      const cleardate = document.getElementById(
        'inputEndDate',
      ) as HTMLInputElement;
      cleardate.value = dataEvent.startDate;
      return false;
    } else {
      return true;
    }
  };

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const sessionStorage: Storage = window.sessionStorage;
  const storeTemporaryData = (dataEvent: ITemporaryData): void => {
    sessionStorage.setItem('createEvent', JSON.stringify(dataEvent));
  };
  const getTemporaryData = (): ITemporaryData | null => {
    const data = window.sessionStorage.getItem('createEvent');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  useEffect(() => {
    getTemporaryData;
  }, []);

  console.log(dataEvent);
  console.log('value', counter);
  console.log(typeof counter);
  console.log(dataEvent.description);

  console.log('show ticket', showTicket);

  return (
    <OrganizerRoute>
      <div className="flex bg-[#282828] min-h-screen">
        <div className="mx-12 mt-28 hidden md:block">
          <SideBarEO />
        </div>
        <section className=" m-4 md:m-8 bg-white w-full rounded-lg p-4 md:p-8">
          <h1 className="text-3xl text-black mb-8">Create Event</h1>
          <div className="w-full h-[300px] border-2 rounded-lg flex flex-col justify-center items-center">
            <input
              type="file"
              className=" bg-slate-500 md:w-auto w-[100px]"
              onChange={(e) => {
                console.log('Selected files', e.target.files);
                if (e.target.files?.length) setFile(e.target.files[0]);
              }}
            ></input>
            <button
              title="Save"
              onClick={onSavePhoto}
              className={`bg-orange-500 w-[5rem] h-[2rem] mt-4 md:mt-0 md:ml-10 rounded-md ${
                file ? 'block' : 'hidden'
              }`}
            >
              Save
            </button>
          </div>


          {/* SELECT MENU */}
          <div className="border-b border-gray-300 flex justify-between mt-4 mx-0 md:mx-10">
            <button
              className={`h-[4rem] w-1/3 ${
                menu === 'DETAILS' ? 'border-b-[6px] border-blue-500' : ''
              }`}
              onClick={() => setMenu('DETAILS')}
            >
              DETAILS
            </button>
            <button
              className={`h-[4rem] w-1/3 ${
                menu === 'DESCRIPTION' ? 'border-b-[6px] border-blue-500 ' : ''
              }`}
              onClick={() => setMenu('DESCRIPTION')}
            >
              DESCRIPTION
            </button>
            <button
              className={`h-[4rem] w-1/3 ${
                menu === 'TICKETS' ? 'border-b-[6px] border-blue-500' : ''
              }`}
              onClick={() => setMenu('TICKETS')}
            >
              TICKETS & PRICING
            </button>
          </div>
          {/*  DETAILS MENU*/}
          <div className={`${menu === 'DETAILS' ? '' : 'hidden'}`}>
            <div className={`md:flex-row flex flex-col mt-10  md:mx-10`}>
              <article
                id="left-section"
                className="flex-col md:flex md:w-1/2 space-y-4 mt-4 md:pr-10"
              >
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  className="w-full border-gray-300"
                  onChange={(element: any) => {
                    const newData = {
                      ...dataEvent,
                      title: element.target.value,
                    };
                    setDataEvent(newData);
                  }}
                />
                <div className="flex flex-col">
                  <label htmlFor="location">City</label>
                  <select
                    id="location"
                    className="border-gray-300"
                    onChange={(element: any) => {
                      const newData = {
                        ...dataEvent,
                        locationId: element.target.value,
                      };
                      setDataEvent(newData);
                    }}
                  >
                    <option value={156}>Jakarta</option>
                    <option value={264}>Surabaya</option>
                    <option value={181}>Bandung</option>
                    <option value={270}>Tangerang</option>
                  </select>
                </div>
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  className="w-full border-gray-300"
                  onChange={(element: any) => {
                    const newData = {
                      ...dataEvent,
                      location: element.target.value,
                    };
                    setDataEvent(newData);
                  }}
                />
                <div className="flex md:flex-row flex-col">
                  <div className="flex flex-col w-full mr-10">
                    <label htmlFor="start-time">Start Time</label>
                    <input
                      type="time"
                      className="border-gray-300"
                      onChange={(element: any) => {
                        const newData = {
                          ...dataEvent,
                          time: element.target.value,
                        };
                        setDataEvent(newData);
                      }}
                    />
                  </div>
                  <div
                    className={`flex flex-col w-full md:mb-0 mb-10 mr-10 ${
                      endTime ? '' : 'invisible'
                    }`}
                  >
                    <label htmlFor="end-time">End Time</label>
                    <input
                      type="time"
                      id="end-time"
                      className="border-gray-300"
                      onChange={(element: any) => {
                        const newData = {
                          ...dataEvent,
                          time: element.target.value,
                        };
                        setDataEvent(newData);
                      }}
                    />
                  </div>
                  <div className="flex items-center w-full">
                    <input
                      type="checkbox"
                      id="end-time"
                      onClick={() => setEndTime(!endTime)}
                    />
                    <label htmlFor="end-date">Add End Time</label>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col gap-10">
                  <div className="flex flex-col w-full">
                    <label htmlFor="inputStartDate">Start Date</label>
                    <input
                      id="inputStartDate"
                      type="date"
                      className="border-gray-300"
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        console.log(selectedDate);
                        if (startDateValidation(selectedDate)) {
                          const newData = {
                            ...dataEvent,
                            startDate: e.target.value,
                          };
                          setDataEvent(newData);
                          setDefaultEndDate(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="inputEndDate">End Date</label>
                    <input
                      type="date"
                      id="inputEndDate"
                      className="border-gray-300"
                      defaultValue={20}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        console.log(selectedDate);
                        if (endDateValidation(selectedDate)) {
                          const newData = {
                            ...dataEvent,
                            endDate: e.target.value,
                          };
                          setDataEvent(newData);
                        }
                      }}
                    />
                  </div>
                </div>
              </article>
              <article
                id="right-container"
                className="md:w-1/2 md:p-10 md:mt-0 mt-10"
              >
                <div className="bg-gray-100 shadow-lg rounded-xl w-fit p-4 md:p-10 md:ml-20">
                  <h1 className="text-2xl font-bold mb-4">
                    ADDITIONAL SETTING
                  </h1>
                  <div className="flex flex-col mr-10">
                    <label htmlFor="maxTicket">
                      Max Ticket Buy per Transaction
                    </label>
                    <select
                      id="maxTicket"
                      className="border-gray-300 mb-8 w-[250px]"
                      onChange={(element: any) => {
                        const newData = {
                          ...dataEvent,
                          maxTicket: element.target.value,
                        };
                        setDataEvent(newData);
                      }}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <div className=" flex flex-col ">
                    <h1>Set Available Ticket</h1>
                    <div className="items-center space-x-5">
                      <button
                        id="decrement"
                        onClick={decrement}
                        className="text-2xl text-white size-8 bg-orange-500 rounded-full"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={counter}
                        onChange={(e) => {
                          const availableSeats = e.target.value;
                          setCounter(
                            availableSeats === ''
                              ? 0
                              : parseInt(availableSeats),
                          );
                          const newData = {
                            ...dataEvent,
                            availableSeats: parseInt(availableSeats),
                          };
                          setDataEvent(newData);
                        }}
                        className="h-10 w-20 border-gray-300 text-center"
                      />
                      <button
                        id="increment"
                        onClick={increment}
                        className="text-2xl text-white size-8 bg-orange-500 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="flex justify-end md:mx-10 mt-20">
              <NextButton
                name="Next Form"
                onClick={() => {
                  setMenu('DESCRIPTION');
                  storeTemporaryData;
                }}
              ></NextButton>
            </div>
          </div>

          {/* DESCRIPTION MENU */}

          <div className={`${menu === 'DESCRIPTION' ? '' : 'hidden'} `}>

            <div className="mt-8  ">
              <label htmlFor="description">Description</label>
              <ReactQuill
                id="description"
                theme="snow"
                className="h-[300px] mb-10"
                onChange={(element) => {
                  const newData = {
                    ...dataEvent,
                    description: element,
                  };
                  setDataEvent(newData);
                }}
              />
            </div>

            <div className="flex justify-end mt-20 gap-4 md:gap-10">
              <PreviousButton
                name="Previous Form"
                onClick={() => {
                  setMenu('DETAILS');
                  getTemporaryData;
                }}
              ></PreviousButton>
              <NextButton
                name="Next Form"
                onClick={() => {
                  setMenu('TICKETS');
                  storeTemporaryData;
                }}
              ></NextButton>
            </div>
          </div>

          <div className={`${menu === 'TICKETS' ? '' : 'hidden'}`}>
            <label className=" cursor-pointer flex justify-end mr-10 mt-10">
              <h1 className="mr-4 text-lg">Set Event</h1>
              <span className="mr-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                Free
              </span>
              <input
                type="checkbox"
                onChange={() => setShowTicket(!showTicket)}
                className="sr-only peer"
              />
              <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                Paid
              </span>
            </label>
            <div
              className={`w-full md:w-[350px] h-[500px] border-2 border-dashed border-gray-300 rounded-xl mt-10 ${
                showTicket === true ? 'flex flex-col' : 'hidden'
              }`}
            >
              <div className="m-auto flex flex-col justify-center">
                <button
                  className="border-2 border-dashed border-gray-300 size-[5rem] rounded-full mx-auto mb-4"
                  onClick={() => {
                    router.push(`modal`);
                    storeTemporaryData;
                  }}
                >
                  +
                </button>
                <h1>click to add ticket</h1>
              </div>
            </div>
            <div className="flex md:justify-end mt-20 gap-10 mr-10">
              <PreviousButton
                name="Previous Form"
                onClick={() => setMenu('DESCRIPTION')}
              ></PreviousButton>

            </div>
          </div>
        </section>
      </div>
    </OrganizerRoute>
  );
};

export default CreateEvent;
