'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IOrderStatusProps {}

const OrderStatus: React.FunctionComponent<IOrderStatusProps> = (props) => {
  const router = useRouter();
  const [status, setStatus] = useState('');

  useEffect(() => {
    const transactionStatus = localStorage.getItem('transactionStatus');
    const transactionId = localStorage.getItem('transactionId');

    if (transactionStatus && transactionId) {
      setStatus(transactionStatus);
    } else {
      router.push('/');
    }
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return '✅';
      case 'pending':
        return '➖';
      case 'failed':
        return '❌';
      default:
        return '';
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return 'Order Anda Berhasil';
      case 'pending':
        return 'Order Anda Pending';
      case 'failed':
        return 'Order Anda Gagal';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-8xl mb-4">{getStatusIcon()}</div>
        <h2 className="text-3xl font-bold">{getStatusMessage()}</h2>
      </div>
    </div>
  );
};

export default OrderStatus;