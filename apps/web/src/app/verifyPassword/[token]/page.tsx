'use client';
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const VerifyPassword: React.FunctionComponent = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = useParams().token;
  const [isTokenValid, setIsTokenValid] = useState(false);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/verify-password/${token}`,
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success('Password reset successfully. You can now log in.');
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  React.useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/verify-password/${token}`);
        if (response.data.isValid) {
          setIsTokenValid(true);
        } else {
          toast.error('Invalid or expired token');
          setIsTokenValid(false);
          router.push('/signin');
        }
      } catch (error) {
        toast.error('Error while checking token validity');
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
          Reset your password
        </h2>
        <div className='mt-8 flex flex-col justify-center space-y-6'>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />
        <button
          onClick={handleResetPassword}
          className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          Reset Password
        </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyPassword;
