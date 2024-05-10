'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUserFromToken } from '@/lib/features/userSlice';

interface ISignInProps {}

const SignIn: React.FunctionComponent<ISignInProps> = (props) => {
  const router = useRouter();
  const [userType, setUserType] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const dispatch = useAppDispatch();

  if (isLoggedIn) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/signin`,
        {
          email,
          password,
          role: userType,
        },
      );

      if (response.data.success) {
        console.log('Login response:', response.data);
        toast.success(`Signed in as ${userType}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem('token', response.data.token);
        dispatch(setUserFromToken(response.data.token));
        router.push('/');
      } else {
        toast.error(response.data.message || 'Unknown error occurred', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      console.error('Error:', error);

      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (err: any) => err.msg,
        );
        const combinedErrorMessage = errorMessages.join(', ');

        toast.error(`Please input all data: ${combinedErrorMessage}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('An error occurred. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          'url("https://images5.alphacoders.com/442/thumb-1920-442188.jpg")',
      }}
    >
      <div className="w-full max-w-md p-6 bg-blue-500 bg-opacity-50 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo_white.png" alt="Logo" width={150} height={150} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Sign In as:
        </h2>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 text-white ${
              userType === 'customer'
                ? 'bg-red-600'
                : 'bg-red-500 hover:bg-red-600'
            } rounded-l-lg focus:outline-none`}
            onClick={() => setUserType('customer')}
          >
            Customer
          </button>
          <button
            className={`px-4 py-2 text-white ${
              userType === 'organizer'
                ? 'bg-red-600'
                : 'bg-red-500 hover:bg-red-600'
            } rounded-r-lg focus:outline-none`}
            onClick={() => setUserType('organizer')}
          >
            Organizer
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-bold text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-white"
            >
              Password
            </label>
            <div className="flex">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-3 py-2 text-gray-700 border rounded-l-lg focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="px-4 py-2 text-white bg-red-500 rounded-r-lg focus:outline-none hover:bg-red-600 focus:bg-red-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-4 flex justify-end">
            <Link
              href="/forgot-password"
              className="text-white hover:underline hover:font-bold"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 mb-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
        <p className="text-white text-center mt-4 font-semibold">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold hover:underline hover:font-bold"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
