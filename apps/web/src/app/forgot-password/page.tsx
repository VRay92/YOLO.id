'use client';
import * as React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface IForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = (
  props,
) => {
  const [email, setEmail] = React.useState('');
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/forgot-password`,
        { email }
      );
  
      if (response.data.success) {
        toast.success('Password reset email sent', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEmail('');
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
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          'url("https://images5.alphacoders.com/442/thumb-1920-442188.jpg")',
      }}
    >
      <div className="w-full max-w-md p-6 bg-blue-500 bg-opacity-50 rounded-lg shadow-md relative">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="absolute top-5 left-5 text-white cursor-pointer transition-all hover:scale-110"
          onClick={() => router.push('/signin')}
        />
        <div className="flex justify-center mb-6">
          <Image src="/logo_white.png" alt="Logo" width={150} height={150} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Forgot Your Password?
        </h2>
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
          <button
            type="submit"
            className="w-full px-3 py-2 mb-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onClick={handleSubmit}
          >
            Request New Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
