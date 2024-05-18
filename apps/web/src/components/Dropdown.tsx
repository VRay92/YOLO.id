'use client';
import { useState, useEffect } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDebounce } from 'use-debounce';
import React from 'react';
import axios from 'axios';

interface IDropDownProps {
  onSelectLocation: (locationId: number | null) => void;
}

interface Location {
  id: number;
  name: string;
}

const DropDown: React.FunctionComponent<IDropDownProps> = ({
  onSelectLocation,
}) => {
  const [location, setLocation] = React.useState<Location[]>([]);
  const [search, setSearch] = React.useState('');
  const [debouncedValue] = useDebounce(search, 1000);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');

  useEffect(() => {
    if (debouncedValue) {
      getLocationByFilter();
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (selectedLocation !== null) {
      const selectedLoc = location.find((loc) => loc.id === selectedLocation);
      if (selectedLoc) {
        setSelectedLocationName(selectedLoc.name);
      }
    }
  }, [selectedLocation, location]);

  const getLocationByFilter = async () => {
    try {
      const query = debouncedValue;
      console.log('query', query);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}location/filter?title=${query}`,
      );
      console.log('getEvent response:', response.data);

      setLocation(response.data.data);
      console.log(location);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleRadioChange = (id: number) => {
    setSelectedLocation(id);
  };

  console.log(selectedLocation);

  return (
    <div className="relative">
      <button
        id="dropdownSearchButton"
        data-dropdown-toggle="dropdownSearch"
        data-dropdown-placement="bottom"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={toggleDropdown}
      >
        {selectedLocationName ? selectedLocationName : 'Choose city location'}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownVisible && (
        <div
          id="dropdownSearch"
          className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700 absolute mt-2"
        >
          <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={
                  selectedLocationName
                    ? selectedLocationName
                    : 'input city location'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <ul
            className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownSearchButton"
          >
            {location.map((loc) => (
              <li key={loc.id}>
                <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={`radio-item-${loc.id}`}
                    type="radio"
                    value={loc.id}
                    checked={selectedLocation === loc.id}
                    onChange={() => {
                      handleRadioChange(loc.id);
                      onSelectLocation(loc.id);
                    }}
                    name="location-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`radio-item-${loc.id}`}
                    className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {loc.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
