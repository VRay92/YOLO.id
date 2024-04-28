'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ISignUpProps {}

const SignUp: React.FunctionComponent<ISignUpProps> = (props) => {
  const [userType, setUserType] = useState('customer');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      userType,
      username,
      email,
      age,
      gender,
      companyName,
      password,
      confirmPassword,
      referralCode,
    });

    toast.success('Check your email for verification', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          'url("https://images7.alphacoders.com/133/thumb-1920-1339451.png")',
      }}
    >
      <div className="w-full max-w-md p-6 my-24 bg-blue-500 bg-opacity-50 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo_white.png" alt="Logo" width={150} height={150} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Sign Up as:
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
          {userType === 'customer' && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block mb-2 font-bold text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-white"
                >
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
                  htmlFor="age"
                  className="block mb-2 font-bold text-white"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block mb-2 font-bold text-white"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="referralCode"
                  className="block mb-2 font-bold text-white"
                >
                  Referral Code
                </label>
                <input
                  type="text"
                  id="referralCode"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
              </div>
            </>
          )}
          {userType === 'organizer' && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="block mb-2 font-bold text-white"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-white"
                >
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
            </>
          )}
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
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-bold text-white"
            >
              Confirm Password
            </label>
            <div className="flex">
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
