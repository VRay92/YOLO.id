'use client';
import axios from 'axios';
import * as React from 'react';

interface IModalProps {
  eventId: number;
  maxSeat: number;
  onEventDataChange: (data: any[]) => void;
  onEventOpenModal: (data: boolean) => void;
}

const Modal: React.FunctionComponent<IModalProps> = ({
  eventId,
  onEventDataChange,
  maxSeat,
}) => {
  const [dataEvent, setDataEvent] = React.useState([
    { id: 1, eventId: eventId, ticketTypeId: 0, price: 0, quantity: 0 },
  ]);

  const addRow = () => {
    const newRow = {
      id: dataEvent.length + 1,
      eventId: eventId,
      ticketTypeId: 0,
      price: 0,
      quantity: 0,
    };
    setDataEvent([...dataEvent, newRow]);
  };

  const removeRow = (id: number) => {
    const updatedData = dataEvent.filter((row) => row.id !== id);
    setDataEvent(updatedData);
    onEventDataChange(updatedData);
  };

  const handleTypeChange = (id: number, value: number): void => {
    const updatedData = dataEvent.map((row: any) =>
      row.id === id ? { ...row, ticketTypeId: value } : row,
    );
    setDataEvent(updatedData);
    onEventDataChange(updatedData);
  };

  const handlePriceChange = (id: number, value: number): void => {
    const updatedData = dataEvent.map((row: any) =>
      row.id === id ? { ...row, price: value } : row,
    );
    setDataEvent(updatedData);
    onEventDataChange(updatedData);
  };

  const handleQuantityChange = (id: number, value: number): void => {
    const updatedData = dataEvent.map((row: any) =>
      row.id === id ? { ...row, quantity: value } : row,
    );
    setDataEvent(updatedData);
    onEventDataChange(updatedData);
  };

  const totalQuantity = dataEvent.reduce(
    (total, row) => total + row.quantity,
    0,
  );

  const validateQuantity = (): void => {
    if (totalQuantity > maxSeat) {
      alert('Error: Seat quantity exceeds the limit');
    }
  };

  React.useEffect(() => {
    validateQuantity();
  }, [dataEvent]);
  console.log(dataEvent);

  return (
    <div className="">
      <div className="w-[1000px]p-10  ">
        {dataEvent.map((row: any) => (
          <div key={row.id}>
            <select
              id="ticket-type"
              className="border-none text-3xl font-semibold mt-10"
              onChange={(e) =>
                handleTypeChange(row.id, parseInt(e.target.value))
              }
            >
              <option value={0}>--</option>
              <option value={1}>Reguler 1</option>
              <option value={2}>Reguler 2</option>
              <option value={3}>Reguler 3</option>
              <option value={4}>Reguler 4</option>
              <option value={5}>Reguler 5</option>
              <option value={6}>VIP 1</option>
              <option value={7}>VIP 2</option>
              <option value={8}>VIP 3</option>
              <option value={9}>VVIP</option>
            </select>
            <article className="flex items-end gap-10">
              <div className="flex flex-col">
                <label htmlFor="price">Price</label>
                <div className="flex">
                  <div className="w-[50px] h-[2.5rem] rounded-l-md bg-gray-300 text-center pt-2">
                    IDR
                  </div>
                  <input
                    id="price"
                    type="number"
                    className="w-[300px] h-[2.5rem] border-gray-300"
                    onChange={(e) =>
                      handlePriceChange(row.id, parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className="flex-col flex">
                <label htmlFor="price">Quantity</label>
                <input
                  id="price"
                  type="number"
                  className="w-[300px] h-[2.5rem] border-gray-300"
                  onChange={(e) =>
                    handleQuantityChange(row.id, parseInt(e.target.value))
                  }
                />
              </div>

              {row.id >= 2 && (
                <button
                  className="w-[10rem] h-[2.5rem] rounded-lg bg-orange-500 text-white"
                  onClick={() => removeRow(row.id)}
                >
                  Delete Row
                </button>
              )}
            </article>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-10">
          <button
            onClick={addRow}
            className="w-[12rem] h-[2.5rem] text-white bg-black rounded-md "
          >
            Add Another Ticket +
          </button>
          <span className="ml-[200px]">
            Maximum quantity = {maxSeat}
            <br />
            <i>(inserting value more than maximum can cause error)</i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
