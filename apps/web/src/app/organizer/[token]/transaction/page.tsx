"use client";
import SideBarEO from '@/components/SidebarEO';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchTransactions } from '@/lib/features/transactionSlice';
import { useRouter } from 'next/navigation';

interface ITransactionEOProps {}

const TransactionEO: React.FunctionComponent<ITransactionEOProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { transactions, loading, error } = useAppSelector((state) => state.transactionReducer);
  const [eventId, setEventId] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchTransactions(token, eventId, startDate, endDate));
    } else {
      router.push('/signin');
    }
  }, [dispatch, router, eventId, startDate, endDate]);

  const handleEventFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEventId = parseInt(e.target.value);
    setEventId(selectedEventId);
  };

  const handleDateFilter = () => {
    dispatch(fetchTransactions(localStorage.getItem('token')!, eventId, startDate, endDate));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex bg-[#282828] min-h-screen">
      <div className="mx-12 mt-28">
        <SideBarEO />
      </div>
      <section className="flex-1 p-8">
        <div className="relative overflow-hidden shadow-lg">
          <Image fill sizes="100vw" src="/background.jpg" alt="hero" className="object-cover rounded-lg" />
          <div className="absolute inset-0"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-3xl text-black mb-8">Transaction</h1>
            <div className="mb-4">
              <label htmlFor="eventFilter" className="mr-2">Filter by Event:</label>
              <select id="eventFilter" onChange={handleEventFilter}>
                <option value="">All Events</option>
                {/* Render event options */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="mr-2">Start Date:</label>
              <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label htmlFor="endDate" className="mr-2 ml-4">End Date:</label>
              <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleDateFilter}>Filter</button>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Event</th>
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Total Price</th>
                  <th className="px-4 py-2">Discount</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="border px-4 py-2">{transaction.eventId}</td>
                    <td className="border px-4 py-2">{transaction.userId}</td>
                    <td className="border px-4 py-2">{transaction.totalPrice}</td>
                    <td className="border px-4 py-2">{transaction.discountAmount}</td>
                    <td className="border px-4 py-2">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransactionEO;