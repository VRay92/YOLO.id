'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLink,
} from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchEventDetail } from '@/lib/features/eventSlice';
import { RootState } from '@/lib/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentModal from '@/components/PaymentModal';
import { Event } from '@/lib/features/eventSlice';
import { Voucher } from '@/app/customer/[token]/voucher/page';
import CustomerRoute from '@/components/CustomerRoute';
import parse from 'html-react-parser';
import axios from 'axios';

interface IEventDetailCustomerProps {}

const EventDetailCustomer: React.FunctionComponent<
  IEventDetailCustomerProps
> = (props) => {
  const [activeTab, setActiveTab] = useState('description');
  const [fixed, setFixed] = useState('hidden');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const handleSelectLocation = (locationId: number | null) => {
    setSelectedLocation(locationId);
  };
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}customer/voucher`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setVouchers(data.voucher);
          const totalPoints = data.points.reduce(
            (acc: number, point: any) => acc + point.points,
            0,
          );
          setPoints(totalPoints);
        } else {
          console.error('Failed to fetch vouchers');
        }
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    };
    fetchData();
  }, []);

  const { id } = useParams();

  const dispatch = useAppDispatch();
  const event = useAppSelector((state: RootState) =>
    state.eventReducer.events.find((event) => event.id === Number(id)),
  );

  console.log('nilai event', event);

  const user = useAppSelector((state: RootState) => state.userReducer);
  console.log(user.vouchers);
  console.log(user.imageProfile);

  const [selectedTickets, setSelectedTickets] = useState<
    Record<string, number>
  >(
    event?.ticketTypes?.reduce((acc: Record<string, number>, ticketType) => {
      acc[ticketType.ticketTypeId.toString()] = 0;
      return acc;
    }, {}) || {},
  );

  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(fetchEventDetail(id));
    }
    getOrganizerById();
  }, [dispatch, id]);

  const handleTabClick = (tab: string) => {
    if (tab === 'description') {
    } else if (tab === 'ticket') {
    }
    setActiveTab(tab);
  };

  const handleTicketQuantityChange = (
    ticketTypeId: number,
    quantity: number,
  ) => {
    setSelectedTickets((prevSelectedTickets) => ({
      ...prevSelectedTickets,
      [ticketTypeId.toString()]: quantity,
    }));
  };

  React.useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 700) {
        setFixed('md:fixed');
      } else {
        setFixed('hidden');
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBuyTicket = () => {
    const totalQuantity = Object.values(selectedTickets).reduce(
      (sum, quantity) => sum + quantity,
      0,
    );

    // Periksa apakah pengguna sudah login
    if (!localStorage.getItem('token')) {
      // atau periksa menggunakan state Redux atau konteks jika Anda menggunakan salah satunya
      toast.error('Silakan login untuk melanjutkan pembelian');
      return; // Hentikan eksekusi lebih lanjut jika pengguna belum login
    }

    if (totalQuantity === 0) {
      toast.error('Pilih minimal 1 tiket');
      return;
    }

    // Jika sudah login dan ada tiket yang dipilih, tampilkan modal pembayaran
    setShowPaymentModal(true);
  };

  const getOrganizerById = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('11111111111111', token);
      if (token) {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('data11111111111111', data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomerRoute>
      <div className="bg-white">
        <div
          className={`bg-white shadow-xl w-full pl-40 h-[80px] flex ${fixed} top-0 `}
        >
          <button
            className={`hidden md:block text-xl font-semibold h-[80px] w-[180px] text-center  ${
              activeTab === 'description' ? 'border-b-4 border-[#F40841]' : ''
            }`}
            onClick={() => setActiveTab('description')}
          >
            DESCRIPTION
          </button>
          <button
            className={`hidden md:block text-xl font-semibold h-[80px] w-[180px] text-center  ${
              activeTab === 'ticket' ? 'border-b-4 border-[#F40841]' : ''
            }`}
            onClick={() => setActiveTab('ticket')}
          >
            TICKET
          </button>
        </div>
        <div className="container hidden lg:block mx-auto py-8 pt-20">
          <div className="flex mb-8">
            <div className="md:w-2/3 ">
              <img
                src={`http://localhost:8000/assets/${event?.imageUrl}`}
                alt="Event Banner"
                className="md:w-full md:h-full w-[600px] h-[400px]"
              />
            </div>
            <div className="w-1/3 border border-gray-200 rounded-xl ml-8 p-8 shadow-md">
              <h1 className="text-2xl font-semibold mb-14">{event?.title}</h1>
              <div className="flex text-lg items-center mb-2">
                <FaCalendar className="mr-2 text-[#adb6c9]" />
                <span className="text-gray-500">
                  {event?.startDate &&
                    new Date(event.startDate).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                </span>
              </div>
              <div className="flex text-lg items-center mb-2">
                <FaClock className="mr-2 text-[#adb6c9]" />
                <span className="text-gray-500">{event?.time}</span>
              </div>
              <div className="flex text-lg items-center mb-6">
                <FaMapMarkerAlt className="mr-2 text-[#adb6c9]" />
                <span className="text-gray-500">
                  {event?.location}, {event?.city?.name}
                </span>
              </div>
              <div className="border-t border-dashed border-gray-300 mt-24 pt-6">
                <p className="mb-2 text-gray-500 font-medium">
                  Diselenggarakan oleh:
                </p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      src={`http://localhost:8000/assets/${event?.organizer?.imageProfile}`}
                      alt="Organizer"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <a
                    href="#"
                    className="text-black text-xl font-semibold hover:underline"
                  >
                    {event?.organizer?.username}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-2/3">
              <div className="flex items-center border-b border-gray-300">
                <button
                  className={`px-4 py-2 w-1/2 ${
                    activeTab === 'description'
                      ? 'border-b-2 border-[#F40841] text-[#F40841]'
                      : 'text-gray-500'
                  }`}
                  onClick={() => handleTabClick('description')}
                >
                  Deskripsi
                </button>
                <button
                  className={`px-4 py-2 w-1/2 ${
                    activeTab === 'ticket'
                      ? 'border-b-2 border-[#F40841] text-[#F40841]'
                      : 'text-gray-500'
                  }`}
                  onClick={() => handleTabClick('ticket')}
                >
                  Tiket
                </button>
              </div>

              {activeTab === 'description' && (
                <div ref={descriptionRef}>
                  <h2 className="text-4xl font-bold my-6">Deskripsi</h2>
                </div>
              )}
              {activeTab === 'ticket' && (
                <div ref={ticketRef}>
                  <h2 className="text-4xl font-bold my-6">Tiket</h2>
                </div>
              )}
            </div>
            <div className="w-1/3 pl-8">
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  {Object.values(selectedTickets).some(
                    (quantity) => quantity > 0,
                  )
                    ? 'Ringkasan Pembelian :'
                    : 'Silakan pilih tiket di tab Tiket'}
                </h3>
                {Object.entries(selectedTickets).map(
                  ([ticketTypeId, quantity]) => {
                    const ticketType = event?.ticketTypes.find(
                      (tt) => tt.ticketTypeId === Number(ticketTypeId),
                    );
                    if (!ticketType || quantity === 0) return null;

                    return (
                      <div
                        key={ticketTypeId}
                        className="flex justify-between mb-2"
                      >
                        <span>
                          {ticketType.ticketType.name} x {quantity}
                        </span>
                        <span>
                          {(ticketType.price * quantity).toLocaleString(
                            'id-ID',
                            {
                              style: 'currency',
                              currency: 'IDR',
                            },
                          )}
                        </span>
                      </div>
                    );
                  },
                )}
                <button
                  className="px-6 py-3 bg-[#d9d9d9] text-black font-bold rounded w-full mt-4 text-lg border border-gray-400"
                  onClick={handleBuyTicket}
                >
                  Beli Tiket
                </button>
              </div>
              <div>
                <h3 className="text-sm my-2">Bagikan Event</h3>
                <div className="flex items-center">
                  <a href="#" className="mr-4 text-black">
                    <FaFacebook size={18} />
                  </a>
                  <a href="#" className="mr-4 text-black">
                    <FaTwitter size={18} />
                  </a>
                  <a href="#" className="mr-4 text-black">
                    <FaInstagram size={18} />
                  </a>
                  <a href="#" className="text-black">
                    <FaLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {activeTab === 'description' && (
            <div className="w-2/3 -mt-16">
              <p>
                {event?.description
                  ? parse(event?.description)
                  : 'no description'}
              </p>
            </div>
          )}
          {activeTab === 'ticket' && event && event.ticketTypes && (
            <div className="w-2/3 -mt-16">
              {event.ticketTypes.map((ticketType) => {
                const isAvailable = ticketType.quantity > 0;
                const isSoldOut = ticketType.quantity === 0;
                const isExpired = new Date(event.startDate) <= new Date();
                const maxTicketPerPerson = event.maxTicket;
                const selectedQuantity =
                  selectedTickets[ticketType.ticketTypeId.toString()] || 0;
                const totalSelectedQuantity = Object.values(
                  selectedTickets,
                ).reduce((sum, quantity) => sum + quantity, 0);

                return (
                  <div
                    key={ticketType.ticketTypeId}
                    className="bg-white rounded-lg shadow-md p-6 mb-6"
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold mb-2">
                        {ticketType.ticketType.name}
                      </h3>
                      <p className="text-gray-500 text-md mb-4">
                        Berakhir{' '}
                        {event.startDate &&
                          new Date(
                            new Date(event.startDate).getTime() -
                              24 * 60 * 60 * 1000,
                          ).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                      </p>
                      <div className="border-b-2 border-dashed border-gray-300 mb-4"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      {ticketType.price == 0 ? (
                        <p className="text-lg font-bold text-green-500">Free</p>
                      ) : (
                        <p className="text-lg font-bold">
                          Rp{' '}
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(Number(ticketType.price))}
                        </p>
                      )}
                      <div className="flex items-center">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 focus:outline-none"
                          onClick={() =>
                            handleTicketQuantityChange(
                              ticketType.ticketTypeId,
                              selectedQuantity - 1,
                            )
                          }
                          disabled={
                            selectedQuantity === 0 || isSoldOut || isExpired
                          }
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-100">
                          {selectedQuantity}
                        </span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300 focus:outline-none"
                          onClick={() =>
                            handleTicketQuantityChange(
                              ticketType.ticketTypeId,
                              selectedQuantity + 1,
                            )
                          }
                          disabled={
                            totalSelectedQuantity >= maxTicketPerPerson ||
                            isSoldOut ||
                            isExpired
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {isSoldOut && <p className="text-red-500 mt-2">Sold Out</p>}
                    {isExpired && <p className="text-red-500 mt-2">Expired</p>}
                  </div>
                );
              })}
            </div>
          )}
          {showPaymentModal && (
            <PaymentModal
              event={event ?? ({} as Event)}
              selectedTickets={selectedTickets}
              vouchers={vouchers}
              points={points}
              pointsToUse={pointsToUse}
              onPointsToUseChange={setPointsToUse}
              onClose={() => setShowPaymentModal(false)}
            />
          )}
        </div>
        {/* tampilan mobile */}
        <div className="block lg:hidden">
          <div className="container mx-auto py-4">
            <div className="my-4">
              <img
                src={`http://localhost:8000/assets/${event?.imageUrl}`}
                alt="Event Banner"
                width={600}
                height={400}
              />
            </div>
            <div className="px-4">
              <h1 className="text-2xl font-bold mb-4">{event?.title}</h1>
              <div className="flex items-center mb-2">
                <FaCalendar className="mr-2 text-gray-500" />
                <span className="text-gray-500">
                  {event?.startDate &&
                    new Date(event.startDate).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <FaClock className="mr-2 text-gray-500" />
                <span className="text-gray-500">{event?.time}</span>
              </div>
              <div className="flex text-gray-500 items-center mb-6">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                {event?.location}, {event?.city?.name}
              </div>
              <div className="border-t border-dashed border-gray-300 pt-6 mb-8">
                <p className="mb-2 text-gray-500">Diselenggarakan oleh:</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      src={`http://localhost:8000/assets/${event?.imageUrl}`}
                      alt="Organizer"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <a
                    href="#"
                    className="text-black font-semibold hover:underline"
                  >
                    {event?.organizer?.username}
                  </a>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-300 mb-8">
                <button
                  className={`px-4 py-2 w-1/2 ${
                    activeTab === 'description'
                      ? 'border-b-2 border-[#F40841] text-[#F40841]'
                      : 'text-gray-500'
                  }`}
                  onClick={() => handleTabClick('description')}
                >
                  Deskripsi
                </button>
                <button
                  className={`px-4 py-2 w-1/2 ${
                    activeTab === 'ticket'
                      ? 'border-b-2 border-[#F40841] text-[#F40841]'
                      : 'text-gray-500'
                  }`}
                  onClick={() => handleTabClick('ticket')}
                >
                  Tiket
                </button>
              </div>
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Deskripsi</h2>
                  <p>
                    {event?.description
                      ? parse(event?.description)
                      : 'no description'}
                  </p>
                </div>
              )}
              {activeTab === 'ticket' && event && event.ticketTypes && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Tiket</h2>
                  {event.ticketTypes.map((ticketType) => {
                    const isAvailable = ticketType.quantity > 0;
                    const isSoldOut = ticketType.quantity === 0;
                    const isExpired = new Date(event.startDate) <= new Date();
                    const maxTicketPerPerson = event.maxTicket;
                    const selectedQuantity =
                      selectedTickets[ticketType.ticketTypeId.toString()] || 0;
                    const totalSelectedQuantity = Object.values(
                      selectedTickets,
                    ).reduce((sum, quantity) => sum + quantity, 0);

                    return (
                      <div
                        key={ticketType.ticketTypeId}
                        className="bg-white rounded-lg shadow-md p-4 mb-4"
                      >
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-2">
                            {ticketType.ticketType.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-2">
                            Berakhir{' '}
                            {event.startDate &&
                              new Date(
                                new Date(event.startDate).getTime() -
                                  24 * 60 * 60 * 1000,
                              ).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                          </p>
                          <div className="border-b-2 border-dashed border-gray-300 mb-4"></div>
                          <div className="flex justify-between items-center">
                            {ticketType.price == 0 ? (
                              <p className="text-lg font-bold text-green-500">
                                Free
                              </p>
                            ) : (
                              <p className="text-lg font-bold">
                                Rp{' '}
                                {new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                }).format(Number(ticketType.price))}
                              </p>
                            )}
                            <div className="flex items-center">
                              <button
                                className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 focus:outline-none"
                                onClick={() =>
                                  handleTicketQuantityChange(
                                    ticketType.ticketTypeId,
                                    selectedQuantity - 1,
                                  )
                                }
                                disabled={
                                  selectedQuantity === 0 ||
                                  isSoldOut ||
                                  isExpired
                                }
                              >
                                -
                              </button>
                              <span className="px-4 py-1 bg-gray-100">
                                {selectedQuantity}
                              </span>
                              <button
                                className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300 focus:outline-none"
                                onClick={() =>
                                  handleTicketQuantityChange(
                                    ticketType.ticketTypeId,
                                    selectedQuantity + 1,
                                  )
                                }
                                disabled={
                                  totalSelectedQuantity >= maxTicketPerPerson ||
                                  isSoldOut ||
                                  isExpired
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        {isSoldOut && (
                          <p className="text-red-500 mt-2">Sold Out</p>
                        )}
                        {isExpired && (
                          <p className="text-red-500 mt-2">Expired</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 py-4 px-4">
              <div>
                <p className="text-sm text-gray-500">
                  {Object.values(selectedTickets).some(
                    (quantity) => quantity > 0,
                  )
                    ? `Total ${Object.values(selectedTickets).reduce(
                        (sum, quantity) => sum + quantity,
                        0,
                      )} tiket`
                    : `Harga mulai dari Rp ${event?.ticketTypes
                        .reduce(
                          (min, ticketType) => Math.min(min, ticketType.price),
                          Infinity,
                        )
                        .toLocaleString('id-ID')}`}
                </p>
                <p className="text-lg font-bold">
                  {Object.values(selectedTickets).some(
                    (quantity) => quantity > 0,
                  )
                    ? `Rp ${Object.entries(selectedTickets)
                        .reduce((total, [ticketTypeId, quantity]) => {
                          const ticketType = event?.ticketTypes.find(
                            (tt) => tt.ticketTypeId === Number(ticketTypeId),
                          );
                          return total + (ticketType?.price || 0) * quantity;
                        }, 0)
                        .toLocaleString('id-ID')}`
                    : ''}
                </p>
              </div>
              <button
                className="px-6 py-3 bg-[#d9d9d9] text-black rounded w-full text-lg"
                onClick={() => {
                  const totalQuantity = Object.values(selectedTickets).reduce(
                    (sum, quantity) => sum + quantity,
                    0,
                  );
                  if (totalQuantity === 0) {
                    toast.error('Pilih minimal 1 tiket');
                  } else {
                    setShowPaymentModal(true);
                  }
                }}
              >
                Beli Tiket
              </button>
            </div>
          </div>
          {showPaymentModal && (
            <PaymentModal
              event={event ?? ({} as Event)}
              selectedTickets={selectedTickets}
              vouchers={vouchers}
              points={points}
              pointsToUse={pointsToUse}
              onPointsToUseChange={setPointsToUse}
              onClose={() => setShowPaymentModal(false)}
            />
          )}
        </div>
        <ToastContainer />
      </div>
    </CustomerRoute>
  );
};

export default EventDetailCustomer;
