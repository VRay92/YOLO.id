'use client';
import { useState } from 'react';

interface ICounterProps {
  counter: number;
}

const Counter: React.FunctionComponent<ICounterProps> = (props) => {
  const [point, setPoint] = useState(0);
  const [counter, setCounter] = useState(0);
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

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const submit = () => {
    const newData = { ...dataEvent, availableSeats: counter };
    setDataEvent(newData);
  };
  console.log(counter);
  console.log(dataEvent);
  return (
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
          id="counter"
          value={counter}
          onChange={(e) => {
            const data = e.target.value;
            setCounter(data === '' ? 0 : parseInt(data));
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
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default Counter;
