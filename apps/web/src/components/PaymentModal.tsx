'use client';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { Event } from '@/lib/features/eventSlice';
import axios from 'axios';

interface PaymentModalProps {
  event: Event;
  selectedTickets: { [key: string]: number };
  vouchers: Voucher[];
  points: number;
  pointsToUse: number;
  onPointsToUseChange: (points: number) => void;
  onClose: () => void;
}

interface Voucher {
  id: number;
  discount: number;
  expiresAt: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  event,
  selectedTickets,
  vouchers,
  points,
  pointsToUse,
  onPointsToUseChange,
  onClose,
}) => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900);
  const [usePoints, setUsePoints] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onClose();
    }
  }, [timeRemaining, onClose]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute(
      'data-client-key',
      'SB-Mid-server-Bjq9V2ze_hvjg0og3ahhmSMv',
    );
    document.body.appendChild(script);

    script.onload = () => {
      console.log('Snap.js has been loaded successfully');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleVoucherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoucherId = parseInt(e.target.value, 10); // Convert to number
    const voucher = vouchers.find((v) => v.id === selectedVoucherId);
    setSelectedVoucher(voucher || null);
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsePoints(e.target.checked);
    if (!e.target.checked) {
      onPointsToUseChange(0);
    }
  };

  const handlePointsToUseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);

    if (value > points) {
      value = points;
    }

    value = Math.floor(value / 10000) * 10000;

    onPointsToUseChange(value);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  };

  const handlePayment = async () => {
    if (!isTermsChecked) {
      toast.error('Anda harus menyetujui syarat dan ketentuan terlebih dahulu');
      return;
    }

    const ticketTypes = Object.entries(selectedTickets).map(
      ([id, quantity]) => ({
        id: Number(id),
        quantity,
      }),
    );

    const data = {
      eventId: event.id,
      ticketTypes,
      useVoucher: selectedVoucher !== null,
      voucherId: selectedVoucher ? selectedVoucher.id : null,
      usePoints,
      pointsToUse,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}transaction/buy-ticket`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (totalPrice === 0) {
        toast.success('Pemesanan tiket gratis berhasil');
        setTimeout(onClose, 3000); // Menambahkan jeda 3 detik sebelum menutup modal
      } else if (response.data.token) {
        window.snap.pay(response.data.token, {
          onSuccess: (result) => {
            console.log(result);
            toast.success('Pembayaran berhasil');
            localStorage.setItem('transactionStatus', 'success');
            localStorage.setItem('transactionId', response.data.transactionId);
            // Redirect ke halaman status pesanan
            window.location.href = '/order-status';
          },
          onPending: (result) => {
            console.log(result);
            toast.info('Pembayaran pending');
          },
          onError: (result) => {
            console.log(result);
            toast.error('Pembayaran gagal');
          },
          onClose: () => {
            toast.warning('Anda menutup jendela pembayaran');
          },
        });
      } else {
        throw new Error('Token pembayaran tidak diterima');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan saat memproses pembayaran');
    }
  };

  const totalPrice = Object.entries(selectedTickets).reduce(
    (total, [ticketTypeId, quantity]) => {
      const ticketType = event?.ticketTypes.find(
        (tt: { ticketTypeId: number; price: number }) =>
          tt.ticketTypeId === Number(ticketTypeId),
      );
      return total + (ticketType?.price || 0) * quantity;
    },
    0,
  );

  const totalDiscount = selectedVoucher
    ? (totalPrice * selectedVoucher.discount) / 100
    : 0;
  const totalPayment = totalPrice - totalDiscount - pointsToUse;

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto h-screen w-screen bg-black bg-opacity-70 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Detail Pemesanan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <Image
              src={
                `http://localhost:8000/assets/${event?.imageUrl}` ||
                `/blank.jpg`
              }
              alt="Event Banner"
              width={600}
              height={400}
              layout="responsive"
              className="rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">{event?.title}</h3>
            <div className="flex items-center mb-2">
              <FaCalendar className="mr-2 text-gray-500" />
              <span className="text-gray-700">
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
              <span className="text-gray-700">{event?.time}</span>
            </div>
            <div className="flex items-center mb-6">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span className="text-gray-700">
                {event?.location}, {event?.city?.name}
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">Rincian Tiket</h3>
        <div className="bg-gray-100 rounded-lg p-4 mb-8">
          {Object.entries(selectedTickets).map(([ticketTypeId, quantity]) => {
            const ticketType = event?.ticketTypes.find(
              (tt: { ticketTypeId: number; price: number }) =>
                tt.ticketTypeId === Number(ticketTypeId),
            );

            if (!ticketType || quantity === 0) return null;

            return (
              <div key={ticketTypeId} className="flex justify-between mb-2">
                <span>{ticketType.ticketType.name}</span>
                <span>
                  {ticketType.price === 0
                    ? 'Free'
                    : `${quantity} x Rp ${ticketType.price.toLocaleString(
                        'id-ID',
                      )}`}
                </span>
              </div>
            );
          })}
        </div>

        {totalPrice === 0 ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Event Gratis</h3>
            <p className="text-lg text-gray-500 mb-8">
              Anda dapat mengikuti event ini secara gratis.
            </p>
            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                checked={isTermsChecked}
                onChange={handleTermsChange}
                className="mr-2"
              />
              <span>Saya setuju dengan Syarat & Ketentuan</span>
            </div>
            <button
              onClick={handlePayment}
              className="bg-[#d9d9d9] text-black rounded-lg px-6 py-3 w-full font-semibold"
            >
              Pesan Tiket Gratis
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="SB-Mid-server-Bjq9V2ze_hvjg0og3ahhmSMv"
              ></script>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-lg text-gray-500">
                  Selesaikan pembayaran dalam waktu:
                </p>
                <p className="text-4xl font-bold">
                  {formatTime(timeRemaining)}
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold mb-4">
                  Gunakan Point atau Voucher
                </h3>
                <div className="flex items-center">
                  <label className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={usePoints}
                      onChange={handlePointsChange}
                      className="mr-2"
                    />
                    Gunakan Poin
                  </label>
                  {usePoints && (
                    <input
                      type="number"
                      value={pointsToUse}
                      onChange={handlePointsToUseChange}
                      step={10000}
                      min={0}
                      max={points}
                      className="border border-gray-300 rounded-lg px-4 py-2 mr-4"
                    />
                  )}
                  <select
                    value={selectedVoucher?.id || ''}
                    onChange={handleVoucherChange}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Pilih Voucher</option>
                    {vouchers.map((voucher) => (
                      <option key={voucher.id} value={voucher.id}>
                        {voucher.discount}% OFF
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-8">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total Harga Tiket</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Diskon</span>
                  <span>Rp {totalDiscount.toLocaleString('id-ID')}</span>
                </div>
              )}
              {usePoints && pointsToUse > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Potongan Poin</span>
                  <span>Rp {pointsToUse.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Total Bayar</span>
                <span>Rp {totalPayment.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex items-center mb-8">
                <input
                  type="checkbox"
                  checked={isTermsChecked}
                  onChange={handleTermsChange}
                  className="mr-2"
                />
                <span>Saya setuju dengan Syarat & Ketentuan</span>
              </div>

              <button
                onClick={handlePayment}
                className="bg-[#d9d9d9] text-black rounded-lg px-6 py-3 w-full font-semibold"
              >
                Bayar Tiket
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaymentModal;
