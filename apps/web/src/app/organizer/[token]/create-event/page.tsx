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
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { FaArrowRight } from 'react-icons/fa6';
import DropDown from '@/components/Dropdown';

interface ICreateEventProps {}

interface IDataEvent {
  title: string;
  imageUrl: string;
  description: string;
  startDate: string;
  startTime: string;
  endTime: string;
  organizerId: number;
  endDate: string;
  availableSeats: number;
  isFree: boolean;
  updatedAt: string;
  maxTicket: number;
  cityId: any;
  location: string;
  categoryId: number;
}

const CreateEvent: React.FunctionComponent<ICreateEventProps> = (props) => {
  const [dataEvent, setDataEvent] = useState<IDataEvent>({
    title: '',
    imageUrl: '',
    description: '',
    startDate: '',
    startTime: '',
    endTime: ' ',
    organizerId: 0,
    endDate: '',
    availableSeats: 0,
    isFree: true,
    updatedAt: '',
    maxTicket: 0,
    cityId: 0,
    location: '',
    categoryId: 0,
  });

  const router = useRouter();
  const [eventData, setEventData] = useState([]);
  const [eventId, setEventId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [menu, setMenu] = useState('DETAILS');
  const [endTime, setEndTime] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [organizer, setOrganizer] = useState({
    id: '',
  });
  const user = useAppSelector((state: RootState) => state.userReducer);

  const handleEventDataChange = (data: any) => {
    setEventData(data);
  };

  const handleSelectLocation = (value: number | null) => {
    if (value !== null) {
      setSelectedLocation(value);
      setDataEvent({ ...dataEvent, cityId: value });
      console.log('handleSelect success');
    } else {
      alert('Fill in the blanks');
    }
  };

  const submitEvent = async () => {
    try {
      const formData = new FormData();
      const token = localStorage.getItem('token');
      console.log('location', dataEvent.location);
      const lastEventId = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event/lastId`,
      );
      const timenow = new Date();
      // Menyematkan file
      if (file) {
        console.log('location', dataEvent.location);
        console.log(`${dataEvent.startTime} - ${dataEvent.endTime}`);
        // formData.append("email","mail.com"): example if you want to send other data
        formData.append('imgUrl', file);
        formData.append('title', dataEvent.title);
        formData.append('location', dataEvent.location);
        formData.append('cityId', dataEvent.cityId.toString());
        formData.append('description', dataEvent.description);
        formData.append('startDate', dataEvent.startDate);
        formData.append('endDate', dataEvent.endDate);
        formData.append(
          'time',
          `${dataEvent.startTime} - ${dataEvent.endTime}`,
        );
        formData.append('availableSeats', dataEvent.availableSeats.toString());
        formData.append('isFree', dataEvent.isFree.toString());
        formData.append('maxTicket', dataEvent.maxTicket.toString());
        formData.append('updatedAt', timenow.toString());
        formData.append('categoryId', dataEvent.categoryId.toString());
        formData.append('organizerId', organizer.id.toString());

        // Tambahkan tiket ke FormData
        eventData.forEach((ticket: any, index: number) => {
          formData.append(`tickets[${index}][price]`, ticket.price.toString());

          formData.append(
            `tickets[${index}][ticketTypeId]`,
            ticket.ticketTypeId.toString(),
          );
          formData.append(
            `tickets[${index}][quantity]`,
            ticket.quantity.toString(),
          );
          console.log('ticket.price.toString()', ticket.price.toString());
          console.log(
            'ticket.price.toString()',
            ticket.ticketTypeId.toString(),
          );
          console.log(`ticket.quantity.toString()`, ticket.quantity.toString());
        });

        const submitEvent = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        alert('create event success');
        if (submitEvent.data.success) {
          console.log(`${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/`);
          console.log('Login submitEvent:', submitEvent.data.success);
          console.log('eventId', eventId);

          toast.success('Create event success', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startDateValidation = (element: any) => {
    const startDate = element.getTime();
    const presentDate = new Date().getTime();
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

  const fetchEventId = async () => {
    try {
      console.log(`${process.env.NEXT_PUBLIC_BASE_API_URL}event/by-title`);
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event/fetch/by-title?title=${dataEvent.title}`,
      );
      console.log('fetch event data', data);
      setEventId(data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  function setDefaultEndDate(element: any) {
    const defaultValue = document.getElementById(
      'inputEndDate',
    ) as HTMLInputElement;
    defaultValue.value = element;
  }

  const endDateValidation = (element: any) => {
    const startDate = new Date(dataEvent.startDate).getTime();
    const endDate = new Date(element).getTime();
    console.log('startDate', startDate);
    console.log('endDate', endDate);
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
    const newAvailableSeats = dataEvent.availableSeats + 50;
    const newData = { ...dataEvent, availableSeats: newAvailableSeats };
    setDataEvent(newData);
  };

  const decrement = () => {
    if (dataEvent.availableSeats >= 50) {
      const newAvailableSeats = dataEvent.availableSeats - 50;
      const newData = { ...dataEvent, availableSeats: newAvailableSeats };
      setDataEvent(newData);
    }
  };

  const [imgURL, setImgURL] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgURL(url);
    }
  };

  const handleOpenModal = (value: boolean) => {
    setOpenModal(value);
  };

  const onHandleSubmit = async () => {
    try {
      console.log(dataEvent);
      const submit = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/ticket/`,
      );
    } catch (error) {}
  };

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/profile`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          setOrganizer(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching organizer:', error);
      }
    };
    fetchOrganizer();
    console.log('user', user);
  }, []);

  console.log('file', file);
  console.log('object event', dataEvent);
  console.log('date', `${dataEvent.startTime} - ${dataEvent.endTime}`);
  console.log('nilai location', selectedLocation);

  return (
    <OrganizerRoute>
      <div className="flex bg-[#282828] min-h-screen">
        <div className="mx-12 mt-28 hidden md:block">
          <SideBarEO />
        </div>
        <section className=" m-4 md:m-8 bg-white w-full rounded-lg p-4 md:p-8">
          <div className="flex justify-between">
            <h1 className="text-3xl text-black mb-8">Create Event</h1>
            <input
              id="upload-file"
              type="file"
              className=" bg-slate-500 md:w-auto w-[100px] h-[2.5rem] mb-10 "
              onChange={(e) => {
                console.log('Selected files', e.target.files);
                if (e.target.files?.length) {
                  setFile(e.target.files[0]);
                }
                handleFileChange(e);
              }}
            ></input>
          </div>
          <div className="relative w-full h-[400px] border-2 rounded-lg overflow-hidden">
            <img
              src={imgURL || '/blank.jpg'}
              alt=""
              id="imgPreview"
              className="object-cover object-top w-full h-full"
            />
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
                  name="title"
                  id="title"
                  type="text"
                  defaultValue={dataEvent.title || ''}
                  className="w-full border-gray-300"
                  onChange={(element: any) => {
                    const newData = {
                      ...dataEvent,
                      title: element.target.value,
                    };
                    setDataEvent(newData);
                  }}
                />

                {/* CHOOSE CITY */}
                <div>
                  <div className="flex flex-col">
                    <label htmlFor="city">City</label>
                    <DropDown onSelectLocation={handleSelectLocation} />
                  </div>
                </div>

                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="w-full border-gray-300"
                  defaultValue={dataEvent.location}
                  onChange={(element: any) => {
                    const newData = {
                      ...dataEvent,
                      location: element.target.value,
                    };
                    setDataEvent(newData);
                  }}
                />
                <div className="flex md:flex-row flex-col">
                  {/* START TIME */}

                  <div className="flex flex-col w-full mr-10">
                    <label htmlFor="start-time">Start Time</label>
                    <input
                      type="time"
                      id="start-time"
                      name="start-time"
                      className="border-gray-300"
                      defaultValue={dataEvent.startTime || ''}
                      onChange={(element: any) => {
                        const newData = {
                          ...dataEvent,
                          startTime: element.target.value,
                        };
                        setDataEvent(newData);
                      }}
                    />
                  </div>

                  {/* END TIME */}
                  <div
                    className={`flex flex-col w-full md:mb-0 mb-10 mr-10 ${
                      endTime ? '' : 'invisible'
                    }`}
                  >
                    <label htmlFor="end-time">End Time</label>
                    <input
                      type="time"
                      id="end-time"
                      name="end-time"
                      className="border-gray-300"
                      onChange={(element: any) => {
                        const newData = {
                          ...dataEvent,
                          endTime: element.target.value,
                        };
                        setDataEvent(newData);
                      }}
                    />
                  </div>
                  <div className="flex items-center w-full">
                    <label htmlFor="end-time2">Add End Time</label>
                    <input
                      type="checkbox"
                      id="end-time2"
                      name="end-time2"
                      onClick={() => setEndTime(!endTime)}
                    />
                  </div>
                </div>

                {/* START DATE */}

                <div className="flex md:flex-row flex-col gap-10">
                  <div className="flex flex-col w-full">
                    <label htmlFor="inputStartDate">Start Date</label>
                    <input
                      id="inputStartDate"
                      name="inputStartDate"
                      type="date"
                      defaultValue={dataEvent.startDate || ''}
                      className="border-gray-300"
                      onChange={(e) => {
                        console.log('input date', e.target.value);
                        const selectedDate = new Date(e.target.value);
                        console.log('selected date', selectedDate);
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

                  {/* END DATE */}

                  <div className="flex flex-col w-full">
                    <label htmlFor="inputEndDate">End Date</label>
                    <input
                      type="date"
                      id="inputEndDate"
                      name="inputEndDate"
                      className="border-gray-300"
                      defaultValue={dataEvent.endDate}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        console.log('nilai selected', selectedDate);
                        if (endDateValidation(selectedDate)) {
                          const newData = {
                            ...dataEvent,
                            endDate: e.target.value,
                          };
                          console.log('new data', newData);
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

                  {/* MAX TICKET BUY */}

                  <div className="flex flex-col mr-10">
                    <label htmlFor="maxTicket">
                      Max Ticket Buy per Transaction
                    </label>
                    <select
                      id="maxTicket"
                      name="maxTicket"
                      className="border-gray-300 mb-8 w-[250px]"
                      value={dataEvent.maxTicket || 0}
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

                  {/* AVAILABLE SEAT */}

                  <div className=" flex flex-col ">
                    <h1>Set Available Seats</h1>
                    <div className="items-center space-x-5">
                      <button
                        id="decrement"
                        onClick={decrement}
                        className="text-2xl text-white size-8 bg-orange-500 rounded-full"
                      >
                        -
                      </button>
                      <input
                        id="available-seat"
                        type="number"
                        value={dataEvent.availableSeats}
                        onChange={(e) => {
                          const newData = {
                            ...dataEvent,
                            availableSeats: parseInt(e.target.value),
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

            {/* CHOOSE CATEGORY */}

            <div className="flex justify-between md:mx-10 mt-4 mb-10">
              <div>
                <h1>Category</h1>
                <select
                  id="category"
                  name="category"
                  className="border-gray-300"
                  value={dataEvent.categoryId || 0}
                  onChange={(element: any) => {
                    const newData = {
                      ...dataEvent,
                      categoryId: element.target.value,
                    };
                    setDataEvent(newData);
                  }}
                >
                  <option value={1}>Music</option>
                  <option value={2}>Festival&Bazar</option>
                  <option value={3}>Sports</option>
                  <option value={4}>Exhibition&Expo</option>
                  <option value={5}>Seminar</option>
                </select>
              </div>

              <NextButton
                name="Next Form"
                onClick={() => {
                  setMenu('DESCRIPTION');
                }}
              ></NextButton>
            </div>
          </div>

          {/* DESCRIPTION MENU */}

          <div className={`${menu === 'DESCRIPTION' ? '' : 'hidden'} `}>
            <div className="mt-8  ">
              <h1>Description</h1>
              <ReactQuill
                id="description"
                theme="snow"
                className="h-[300px] mb-10"
                defaultValue={dataEvent.description || ''}
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
                }}
              ></PreviousButton>
              <NextButton
                name="Next Form"
                onClick={() => {
                  setMenu('TICKETS');
                }}
              ></NextButton>
            </div>
          </div>

          <div className={`${menu === 'TICKETS' ? '' : 'hidden'}`}>
            {/* FREE OR PAID */}
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold mt-10 ml-10">
                Create New Ticket
              </h1>

              <div>
                <label className=" cursor-pointer flex justify-end mr-10 mt-10">
                  <h1 className="mr-4 text-lg">Set Event</h1>
                  <span className="mr-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                    Free
                  </span>
                  <input
                    id="free-paid"
                    type="checkbox"
                    onChange={() => setShowTicket(!showTicket)}
                    className="sr-only peer"
                  />
                  <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                    Paid
                  </span>
                </label>
              </div>
            </div>
            <div
              className={` gap-10 mr-10 mx-10 ${
                showTicket ? 'flex' : 'hidden'
              }`}
            >
              <Modal
                eventId={eventId}
                onEventDataChange={handleEventDataChange}
                onEventOpenModal={handleOpenModal}
              ></Modal>
              <ToastContainer />
            </div>
            <div className="flex justify-end mt-20 gap-10">
              <PreviousButton
                name="Previous Form"
                onClick={() => setMenu('DESCRIPTION')}
              ></PreviousButton>
              <button
                onClick={submitEvent}
                className="text-white w-[10rem] h-[2.5rem] bg-orange-500 rounded-lg font-semibold active:translate-y-[1px]"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </section>
      </div>
    </OrganizerRoute>
  );
};

export default CreateEvent;
function getLastEventId() {
  throw new Error('Function not implemented.');
}
