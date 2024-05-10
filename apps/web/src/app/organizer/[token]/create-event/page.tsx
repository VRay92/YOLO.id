'use client';
import * as React from 'react';
import axios from 'axios';
import OrganizerRoute from '@/components/OrganizerRoute';
import SideBarEO from '@/components/SidebarEO';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

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
  const [value, setValue] = useState('');
  const [file, setFile] = React.useState<File | null>(null);
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
    const x = new Date(element).getTime();
    const y = new Date().getTime();
    console.log('x', x);
    console.log('y', y);
    if (x < y) {
      alert('invalid date, date already in past');
      const cleardate = document.getElementById(
        'inputStartDate',
      ) as HTMLInputElement;
      cleardate.value = '';
      return false;
    }
    return true;
  };

  console.log(dataEvent);
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

          <div className="flex-col md:flex space-y-4 mt-4">
            <h1>Title</h1>
            <input
              type="text"
              className="w-full"
              onChange={(element: any) => {
                const newData = { ...dataEvent, title: element.target.value };
                setDataEvent(newData);
              }}
            />
            <h1>Description</h1>
            <div className="mt-8  ">
              <ReactQuill
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
            <div className="flex flex-col mt-10">
              <h1>StartDate</h1>
              <input
                id="inputStartDate"
                type="date"
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  console.log(selectedDate);
                  if (startDateValidation(selectedDate)) {
                    const newData = {
                      ...dataEvent,
                      startDate: e.target.value, // Using the value directly since it's already in the correct format
                    };
                    setDataEvent(newData);
                  }
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1>EndDate</h1>
              <input
                type="date"
                onChange={(element: any) => {
                  const newData = {
                    ...dataEvent,
                    endDate: element.target.value,
                  };
                  setDataEvent(newData);
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </OrganizerRoute>
  );
};

export default CreateEvent;
