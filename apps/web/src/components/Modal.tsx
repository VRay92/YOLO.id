'use client';
import * as React from 'react';

interface IModalProps {
  ticketTypeId: number;
}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
  const [dataEvent, setDataEvent] = React.useState([
    { id: 1, eventId: 0, ticketTypeId: 0, price: 0, quantity: 0 },
  ]);

  const addRow = () => {
    const newRow = {
      id: dataEvent.length + 1,
      eventId: 3,
      ticketTypeId: 0,
      price: 0,
      quantity: 0,
    };
    setDataEvent([...dataEvent, newRow]);
  };

  const removeRow = (id: number) => {
    const updatedData = dataEvent.filter((row) => row.id !== id);
    setDataEvent(updatedData);
  };

  const handleTypeChange = (id: number, value: number): void => {
    const updatedData = dataEvent.map((row: any) =>
      row.id === id ? { ...row, ticketTypeId: value } : row,
    );
    setDataEvent(updatedData);
  };

  const handlePriceChange = (id: number, value: number): void => {
    const updatedData = dataEvent.map((row: any) =>
      row.id === id ? { ...row, price: value } : row,
    );
    setDataEvent(updatedData);
  };

  const handleQuantityChange = (id: number, value: number): void => {
    const updatedData = dataEvent.map((row: any) =>
      row.id === id ? { ...row, quantity: value } : row,
    );
    setDataEvent(updatedData);
  };

  const onHandleSubmit = async () => {
    try {
    } catch (error) {}
  };

  console.log(dataEvent);
  return (
    <div className="fixed  inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm backdrop-filter">
      <div className="w-[1000px]  bg-white rounded-lg absolute left-1/2 top-20 -translate-x-1/2 p-10  ">
        <h1 className="text-3xl font-semibold">Create New Ticket</h1>
        <button className="absolute -top-5 -right-5 size-16 bg-slate-500 text-white font-semibold text-3xl">
          X
        </button>
        {dataEvent.map((row: any) => (
          <div key={row.id}>
            <select
              id="ticket-type"
              className="border-none text-3xl font-semibold mt-10"
              onChange={(e) =>
                handleTypeChange(row.id, parseInt(e.target.value))
              }
            >
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
          <button
            onClick={addRow}
            className="w-[15rem] h-[2.5rem] text-white bg-[#F40841] rounded-md "
          >
            Finish & Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
