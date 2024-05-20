'use client';
import Sidebar from '@/components/Sidebar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useAppDispatch } from '@/lib/hooks';
import { updateUser } from '@/lib/features/userSlice';
import CustomerRoute from '@/components/CustomerRoute';
import { MdPhotoCamera } from 'react-icons/md';
interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [customer, setCustomer] = useState({
    id: '',
    username: '',
    email: '',
    age: '',
    gender: '',
    imageProfile: '',
  });
  const dispatch = useAppDispatch();

  const fetchCustomer = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('token', token);
      if (token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}customer/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCustomer(response.data.data);
        console.log('testss', response.data.data);
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}customer/profile`,
          customer,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(
          updateUser({
            username: response.data.data.username,
            email: response.data.data.email,
          }),
        );
        alert('Data updated successfully');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const onSavePhoto = async (): Promise<void> => {
    const formData = new FormData();
    const token = localStorage.getItem('token');

    // Menyematkan file
    if (file) {
      // formData.append("email","mail.com"): example if you want to send other data
      formData.append('imgProfile', file);
      const updatePhoto = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}profile/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(`${process.env.NEXT_PUBLIC_BASE_API_URL}profile/photo`);
      alert('Update profile success');
    }
  };

  useEffect(() => {
    fetchCustomer();
    console.log('1111', customer);
  }, [customer.imageProfile]);

  return (
    <CustomerRoute>
      <div className="bg-[#282828] flex relative">
        {/* desktop view */}
        <div className="mx-12 mt-28 hidden md:block">
          <Sidebar></Sidebar>
        </div>
        <section className="w-full md:h-[710px] rounded-none md:mr-16 md:rounded-lg md:my-14 relative">
          <Image
            fill
            sizes="100vw"
            src="/background.jpg"
            alt="hero"
            className="object-cover rounded-none md:rounded-lg hidden md:block"
          ></Image>
          <Image
            fill
            sizes="100vw"
            src="/background2.jpg"
            alt="hero"
            className="rounded-none md:rounded-lg block md:hidden w-fit"
          ></Image>

          <div className="rounded-full h-[220px] w-[220px] relative mt-20 mx-auto block md:hidden">
            <Image
              fill
              sizes="100vw"
              src="/profile.webp"
              alt="hero"
              className="object-cover rounded-full"
            ></Image>
            <div
              className="absolute top-0 right-0 size-14 bg-gray-300 rounded-full"
              onClick={() => setOpenModal(true)}
            >
              <MdPhotoCamera className=" size-8 m-auto mt-3" />
            </div>
          </div>

          <h1 className="relative font-semibold text-center md:text-left text-3xl text-black mt-16 md:ml-16">
            Profile
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="relative ml-4 mr-4 md:ml-16 md:mr-0 mt-10 flex w-full md:flex-row flex-col">
              <div
                id="left-container"
                className="border-gray-400 flex flex-col"
              >
                <h1>Name</h1>
                <input
                  type="text"
                  name="username"
                  value={customer.username}
                  onChange={handleChange}
                  className="mr-8 2xl:w-[350px] h-[50px] rounded-lg border-gray-200 mb-4"
                />
                <h1>Gender</h1>
                <div className="mb-4">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={customer.gender === 'male'}
                    onChange={handleChange}
                    className="mr-4"
                  />
                  <label htmlFor="male" className="mr-4 md:mr-10">
                    Male
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={customer.gender === 'female'}
                    onChange={handleChange}
                    className="ml-10 mr-4"
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <h1>Age</h1>
                <input
                  type="number"
                  name="age"
                  value={customer.age}
                  onChange={handleChange}
                  className="mr-8 md:w-[350px] h-[50px] rounded-lg border-gray-200"
                />
              </div>
              <div
                id="right-container"
                className="md:ml-16 mr-8 md:mr-16 flex flex-col"
              >
                <h1>Email address</h1>
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  className="w-auto md:w-[350px] h-[50px] rounded-lg border-gray-200 mb-2"
                />
                <div>
                  <button
                    type="submit"
                    className="w-full md:w-[350px] h-[3rem] rounded-2xl bg-red-600 text-white mt-10"
                  >
                    Change Data
                  </button>
                </div>
              </div>
              <div
                className="rounded-full h-[220px] w-[220px] relative cursor-pointer "
                onClick={() => {
                  onSavePhoto;
                }}
              >
                <img
                  sizes="100vw"
                  src={`http://localhost:8000/assets/${customer.imageProfile}`}
                  alt="hero"
                  className="object-cover rounded-full w-full h-full "
                />
                <div
                  className="absolute bottom-0 right-0 size-14 bg-gray-300 rounded-full"
                  onClick={() => setOpenModal(true)}
                >
                  <MdPhotoCamera className=" size-8 m-auto mt-3" />
                </div>
              </div>
            </div>
          </form>
        </section>
        {/* mobile view */}
      </div>
      <div
        className={`absolute left-0 top-0 z-[36] h-screen w-screen bg-black bg-opacity-50 backdrop-blur-sm backdrop-filter ${
          openModal ? ' md:block' : 'hidden'
        }`}
      >
        <div className="flex absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2 h-56 w-96 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          {' '}
          <button
            className="absolute -top-5 -right-5 size-14 rounded-full bg-black border-2 border-white text-white font-semibold text-xl"
            onClick={() => setOpenModal(false)}
          >
            X
          </button>
          <div className=" rounded-lg flex flex-col justify-center items-center">
            <input
              type="file"
              className=" bg-slate-500 md:w-auto w-[100px]"
              onChange={(e) => {
                console.log('Selected files', e.target.files);
                if (e.target.files?.length) setFile(e.target.files[0]);
              }}
            ></input>
            <button
              title="Save"
              onClick={() => {
                onSavePhoto();
                setOpenModal(false);
              }}
              className={`bg-orange-500 w-[5rem] h-[2rem] mt-4 rounded-md ${
                file ? 'block' : 'hidden'
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </CustomerRoute>
  );
};

export default Profile;
