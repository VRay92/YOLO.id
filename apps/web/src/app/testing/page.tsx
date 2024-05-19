'use client';
import { useState, useEffect } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDebounce } from 'use-debounce';
import React from 'react';
import axios from 'axios';
import { data } from 'cypress/types/jquery';

interface IDropDownProps {
  counter: number;
}

interface Location {
  id: number;
  name: string;
}

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

const DropDown: React.FunctionComponent<IDropDownProps> = (props) => {
  const [location, setLocation] = React.useState<Location[]>([]);
  const [search, setSearch] = React.useState('');
  const [debouncedValue] = useDebounce(search, 1000);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');
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

  const resetTime = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const startDateValidation = (element: any) => {
    const startDate = resetTime(new Date(element)).getTime();
    const presentDate = resetTime(new Date()).getTime();
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
    setDataEvent((prevState: any) => ({
      ...prevState,
      endDate: element,
    }));
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

  console.log(dataEvent);

  return (
    <div className="relative">
      <div className="flex md:flex-row flex-col gap-10">
        <div className="flex flex-col w-full">
          <label htmlFor="inputStartDate">Start Date</label>
          <input
            id="inputStartDate"
            name="inputStartDate"
            type="date"
            value={dataEvent.startDate}
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
            value={dataEvent.endDate}
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
    </div>
  );
};

export default DropDown;
