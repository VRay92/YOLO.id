'use client';
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail: React.FunctionComponent = () => {
  const router = useRouter();
  const searchParams = useParams();
  const token = searchParams.token;
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const handleVerifyEmail = async () => {
    setIsVerifying(true);
    console.log(token);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/verify-email/${token}`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Email verification response: ', response.data);
      toast.success('Email verified successfully. You can now log in.');
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error('Invalid verification OTP.');
      setIsVerifying(false);
    }
  };

  React.useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/verify-email/${token}`,
        );
        if (response.data.success) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
          router.push('/signin');
        }
      } catch (error) {
        setIsTokenValid(false);
        router.push('/signin');
      }
    };

    if (token) {
      checkTokenValidity();
    } else {
      router.push('/signin');
    }
  }, [token, router]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          'url("https://wallpapers.com/images/hd/concert-background-dd0syeox7rmi78l0.jpg")',
      }}
    >
      <div className="w-full max-w-md p-6 bg-blue-500 bg-opacity-50 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo_white.png" alt="Logo" width={150} height={150} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Verify your email
        </h2>
        <div className="mt-8 flex flex-col justify-center space-y-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button
            onClick={handleVerifyEmail}
            disabled={isVerifying}
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
