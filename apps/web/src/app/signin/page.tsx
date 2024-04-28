"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ISignInProps {}

const SignIn: React.FunctionComponent<ISignInProps> = (props) => {
  const [userType, setUserType] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      userType,
      email,
      password,
    });

    // Simulasi proses sign in
    if (userType === 'customer') {
      // Redirect ke dashboard customer
      toast.success('Signed in as customer', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (userType === 'organizer') {
      // Redirect ke dashboard organizer
      toast.success('Signed in as organizer', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images5.alphacoders.com/442/thumb-1920-442188.jpg")',
      }}
    >
      <div className="w-full max-w-md p-6 bg-blue-500 bg-opacity-50 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo_white.png" alt="Logo" width={150} height={150} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Sign In as:</h2>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 text-white ${
              userType === 'customer' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
            } rounded-l-lg focus:outline-none`}
            onClick={() => setUserType('customer')}
          >
            Customer
          </button>
          <button
            className={`px-4 py-2 text-white ${
              userType === 'organizer' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
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
            <label htmlFor="password" className="block mb-2 font-bold text-white">
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
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Sign In
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;