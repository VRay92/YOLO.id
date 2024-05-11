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

interface ICreateEventProps {}

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
  const [value, setValue] = useState(0);
  const [file, setFile] = React.useState<File | null>(null);
  const [counter, setCounter] = useState(0);
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

  console.log(dataEvent);
  console.log('value', counter);
  console.log(typeof counter);
  console.log(dataEvent.description);
  return (
    <OrganizerRoute>
      <div className="flex bg-[#282828] min-h-screen">
        <div className="mx-12 mt-28 hidden md:block">
          <SideBarEO />
        </div>
        <section className=" m-8 bg-white w-full rounded-lg p-8">
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

          <div className="flex-col md:flex space-y-4 mt-4 ">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="w-full border-gray-300"
              onChange={(element: any) => {
                const newData = { ...dataEvent, title: element.target.value };
                setDataEvent(newData);
              }}
            />
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
            <div className="flex flex-col mr-10 ">
              <label htmlFor="location">City</label>
              <select
                id="location"
                className="border-gray-300"
                onChange={(element: any) => {
                  const newData = {
                    ...dataEvent,
                    location: element.target.value,
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

            <label htmlFor="description">Description</label>
            <div className="mt-8  ">
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
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col mt-10 md:mt-0">
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
              <div className="flex flex-col md:mx-10">
                <h1>EndDate</h1>
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
              <div className="flex flex-col mr-10">
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
              <div className="flex flex-col mr-10">
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
              <div className="flex flex-col mr-10">
                <label htmlFor="maxTicket">
                  Max Ticket Buy per Transaction
                </label>
                <select id="maxTicket" className="border-gray-300">
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
                        availableSeats === '' ? 0 : parseInt(availableSeats),
                      );
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
          </div>
        </section>
      </div>
    </OrganizerRoute>
  );
};

export default CreateEvent;
