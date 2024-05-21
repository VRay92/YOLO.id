'use client';
import SideBarEO from '@/components/SidebarEO';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchTransactions } from '@/lib/features/transactionSlice';
import { useRouter } from 'next/navigation';
import OrganizerRoute from '@/components/OrganizerRoute';
import axios from 'axios';
import PaginationEO from '@/components/PaginationEO';

interface Event {
  id: number;
  title: string;
}

interface ITransactionEOProps {}

const TransactionEO: React.FunctionComponent<ITransactionEOProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { transactions, loading, error } = useAppSelector(
    (state) => state.transactionReducer,
  );
  const [selectedEventId, setSelectedEventId] = useState<number | undefined>(
    undefined,
  );
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 8;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchTransactions(token));
      fetchEvents(token);
    } else {
      router.push('/signin');
    }
  }, [dispatch, router]);

  const fetchEvents = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = e.target.value ? parseInt(e.target.value) : undefined;
    setSelectedEventId(eventId);
  };

  const handleDateFilter = () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchTransactions(token, selectedEventId, startDate, endDate));
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <OrganizerRoute>
      <div className="flex bg-[#282828] min-h-screen">
        <div className="mx-12 mt-28 hidden md:block">
          <SideBarEO />
        </div>
        <section className="w-full md:h-[710px] rounded-none md:mr-16 md:rounded-lg md:my-14 relative">
          <Image
            fill
            sizes="100vw"
            src="/background.jpg"
            alt="hero"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col">
            <div className="relative z-10 p-8 flex-grow overflow-y-auto">
              <h1 className="text-3xl text-black mb-8">Transaction</h1>
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <label htmlFor="eventFilter" className="mr-2">
                  Filter by Event:
                </label>
                <select
                  id="eventFilter"
                  value={selectedEventId}
                  onChange={handleEventFilter}
                  className="mb-4 md:mb-0 md:mr-4 text-center"
                >
                  <option value="">All Events</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </select>
                <label htmlFor="startDate" className="mr-2">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mb-4 md:mb-0 md:mr-4"
                />
                <label htmlFor="endDate" className="mr-2">
                  End Date:
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mb-4 md:mb-0 md:mr-4"
                />
                <button
                  className="px-6 py-2 rounded-2xl bg-red-600 text-white"
                  onClick={handleDateFilter}
                >
                  Filter Transaction
                </button>
              </div>
              {currentTransactions.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white bg-opacity-40 mt-10">
                      <thead className="bg-gray-600 bg-opacity-25">
                        <tr>
                          <th className="px-4 py-2">Event</th>
                          <th className="px-4 py-2">Transaction Code</th>
                          <th className="px-4 py-2">Total Price</th>
                          <th className="px-4 py-2">Discount</th>
                          <th className="px-4 py-2">Date</th>
                          <th className="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTransactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td className="border text-center px-4 py-2">
                              {transaction.event.title}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {transaction.receiptUrl.length > 20
                                ? `${transaction.receiptUrl.slice(0, 20)}...`
                                : transaction.receiptUrl}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {transaction.totalPrice == 0
                                ? 'Free'
                                : new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                  }).format(
                                    Number(
                                      transaction.totalPrice -
                                        transaction.discountAmount,
                                    ),
                                  )}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              }).format(Number(transaction.discountAmount))}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {new Date(
                                transaction.createdAt,
                              ).toLocaleDateString()}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {transaction.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-lg text-gray-500">No data transaction</p>
                </div>
              )}
            </div>
            <div className="md:mb-10">
              <PaginationEO
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </section>
      </div>
    </OrganizerRoute>
  );
};

export default TransactionEO;
