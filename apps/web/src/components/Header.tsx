'use client';
import * as React from 'react';
import Image from 'next/image';
import { SlMagnifier } from 'react-icons/sl';
import { IoMenu } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUser } from '@/lib/features/userSlice';
import axios from 'axios';
import Searchbar from './Searchbar';
import { logout } from '@/lib/features/userSlice';
import { IoCalendarSharp } from 'react-icons/io5';
import { ToastContainer } from 'react-toastify';
import { IoMdArrowDropleftCircle } from 'react-icons/io';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import Pagination from './Pagination';
import { useDebounce } from 'use-debounce';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner';
import { initDropdowns } from 'flowbite';

interface IEvent {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  startDate: any;
  endDate: any;
  time: string;
  availableSeats: string;
  isFree: boolean;
  organizerId: number;
  createdAt: any;
  updatedAt: any;
  maxTicket: number;
}
export const Header = () => {
  const [data, setData] = React.useState({
    username: '',
    email: '',
    role: '',
    imageProfile: '',
    token: '',
    isLoggedIn: false,
  });
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [event, setEvent] = React.useState<IEvent[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(5);
  const [debouncedValue] = useDebounce(search, 3000);

  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const keepLogin = async () => {
      try {
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        console.log('Token from local storage:', token);
        if (token) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/keeplogin`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          if (response.data.success) {
            console.log('KeepLogin response:', response.data);
            const { username, email, role, imageProfile } = response.data.data;
            localStorage.setItem('role', role);
            dispatch(
              setUser({
                username,
                email,
                role,
                token,
                imageProfile,
                isLoggedIn: true,
              }),
            );
            setData({
              username,
              email,
              role,
              token,
              imageProfile,
              isLoggedIn: true,
            });
            console.log('Dispatched role:', role);
            console.log('imageprofile:', imageProfile);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    keepLogin();
  }, [dispatch, isLoggedIn]);

  const getEventByFilter = async () => {
    try {
      const query = debouncedValue;
      console.log('query', query);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event/filter?title=${query}`,
      );
      console.log('getEvent response:', response.data);

      setEvent(response.data.data);
      console.log('nilai event', event);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    getEventByFilter();
    setLoading(true);
    initDropdowns();
    setTimeout(() => setLoading(false), 1500);
  }, [debouncedValue]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginationCategory = event.slice(indexOfFirstPost, indexOfLastPost);

  console.log('value search', search);
  console.log('image profile:', data.imageProfile);

  return (
    <nav className={`w-full max-w-[1920px] relative z-[30] `}>
      {/* LOADING SCREEN */}

      {loading && (
        <div className="absolute left-0 top-0 z-[36] h-screen w-screen bg-black bg-opacity-50 backdrop-blur-sm backdrop-filter">
          <span className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2  p-0.5 px-2 text-center text-xs font-medium leading-none text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <div className="flex flex-col  items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <div className="mt-28 mx-20">
                <Image
                  width={300}
                  height={300}
                  src="/yoloblack.png"
                  alt="logo"
                  className="animate-pulse"
                ></Image>
              </div>
              <div className="mb-20">
                <ThreeDots
                  visible={true}
                  height="60"
                  width="60"
                  color="#282828"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            </div>
          </span>
        </div>
      )}

      {/* top navbar */}

      <div className="hidden md:flex justify-end md:pr-16 h-[40px] bg-[#D9D9D9] py-2 ">
        <span className="px-4">
          <h1>About YOLO</h1>
        </span>
        <span className="px-4">
          <h1>Become Event Creator</h1>
        </span>
        <span className="px-4">
          <h1>Contact Us</h1>
        </span>
      </div>

      {/* red navbar */}

      <div className="flex h-[75px] md:h-[90px] bg-[#F40841]  justify-between relative">
        <div className="flex">
          <div
            className="my-auto ml-20 mr-[121px] min-w-[160px] hidden md:block cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          >
            <Image
              width={160}
              height={72}
              src="/logo_white.png"
              alt="logo"
            ></Image>
          </div>
          <div
            className="block my-auto ml-6 md:hidden cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          >
            <Image
              width={119}
              height={54}
              src="/logo_white.png"
              alt="logo"
            ></Image>
          </div>
          {/* search bar */}
          <div className="hidden md:flex">
            <span className="w-[50px] h-[52px] bg-white mt-5 rounded-l-md">
              <SlMagnifier className="m-auto my-3 text-2xl" />
            </span>
            <div className="relative w-[685px] h-[40px] mt-5 mr-20 ">
              <input
                type="text"
                id="floating_filled"
                className="block rounded-r-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-[#d9d9d9] dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                onChange={(e) => setSearch(e.target.value)}
              />
              <label
                htmlFor="floating_filled"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                search here..
              </label>

              <div className={`${search ? '' : 'hidden'}`}>
                {paginationCategory.length ? (
                  paginationCategory.map((val, index) => (
                    <div
                      key={index}
                      className="hover:bg-blue-500 bg-white w-[685px] cursor-pointer h-[3rem] pl-10 pt-2 z-30"
                      onClick={() => router.push(`/event-detail/${val.id}`)}
                    >
                      {val.title}
                    </div>
                  ))
                ) : (
                  <div className="bg-white w-[685px] cursor-pointer h-[4rem] pl-10 pt-5 z-30">
                    Search not found
                  </div>
                )}

                {paginationCategory.length > 0 && (
                  <div className="w-[685px] flex justify-end">
                    <IoMdArrowDropleftCircle
                      className="text-white text-3xl cursor-pointer"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    />
                    <IoMdArrowDroprightCircle
                      className="text-white text-3xl cursor-pointer"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-7 left-[410px] flex flex-col"></div>
        </div>

        <div
          className={`hidden gap-5 my-auto mr-20 text-white ${
            isLoggedIn ? '' : 'md:flex'
          } font-poppins`}
        >
          <button
            className="rounded-lg w-[7rem] h-[3rem] bg-transparent border-2 border-white text-white hover:bg-orange-500 hover:text-white hover:border-none"
            onClick={() => router.push('/signup')}
          >
            Register
          </button>
          <button
            className="rounded-lg w-[7rem] h-[3rem] bg-white border-2 border-white text-[#F40841] font-bold hover:bg-orange-500 hover:text-white hover:border-none"
            onClick={() => router.push('/signin')}
          >
            Login
          </button>
        </div>

        <div className="mt-6 gap-2 mr-4 text-3xl text-white md:hidden flex relative">
          <SlMagnifier />
          <IoMenu
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {/* DROP DOWN MENU FOR MOBILE */}

        <div className="md:hidden absolute top-[75px] left-0 w-full">
          <div
            className={`bg-slate-300  pt-2 h-[60px] text-center cursor-pointer hover:bg-blue-500 ${
              !isLoggedIn && menuOpen ? 'block' : 'hidden'
            }`}
          >
            <button
              className="rounded-lg w-[7rem] h-[2.5rem] mr-4 bg-white border-2 border-white text-[#F40841] font-bold hover:bg-orange-500 hover:text-white hover:border-none"
              onClick={() => {
                router.push('/signup');
                setMenuOpen(false);
              }}
            >
              Register
            </button>
            <button
              className="rounded-lg w-[7rem] h-[2.5rem] bg-white border-2 border-white text-[#F40841] font-bold hover:bg-orange-500 hover:text-white hover:border-none"
              onClick={() => {
                router.push('/signin');
                setMenuOpen(false);
              }}
            >
              Login
            </button>
          </div>

          {/*  FOR CUSTOMER */}
          {data.role === 'customer' && (
            <div>
              <div
                className={`bg-slate-300 pt-4 h-[50px] text-center cursor-pointer hover:bg-blue-500 ${
                  isLoggedIn && menuOpen ? 'block' : 'hidden'
                }`}
                onClick={() => {
                  {
                    router.push(`/customer/profile`);
                    setMenuOpen(false);
                  }
                }}
              >
                <h1>Dashboard Customer</h1>
              </div>
              <div
                className={`bg-slate-300 pt-4 h-[50px] text-center cursor-pointer hover:bg-blue-500 ${
                  isLoggedIn && menuOpen ? 'block' : 'hidden'
                }`}
                onClick={() => {
                  {
                    router.push(`/customer/voucher`);
                    setMenuOpen(false);
                  }
                }}
              >
                <h1>Vouchers</h1>
              </div>
              <div
                className={`bg-slate-300 pt-4 h-[50px] text-center cursor-pointer hover:bg-blue-500 ${
                  isLoggedIn && menuOpen ? 'block' : 'hidden'
                }`}
                onClick={() => {
                  {
                    router.push(`/customer/purchased-event`);

                    setMenuOpen(false);
                  }
                }}
              >
                <h1>Purchased Events</h1>
              </div>
              <div
                className={`bg-slate-300 pt-4 h-[50px] text-center cursor-pointer hover:bg-blue-500 ${
                  isLoggedIn && menuOpen ? 'block' : 'hidden'
                }`}
                onClick={() => {
                  {
                    router.push(`/customer/review`);
                    setMenuOpen(false);
                  }
                }}
              >
                <h1>Review & Ratings</h1>
              </div>
            </div>
          )}

          {/* FOR ORGANIZER  */}

          {data.role === 'organizer' && (
            <div>
              <div
                className={`bg-slate-300 pt-4 h-[50px] text-center cursor-pointer hover:bg-blue-500 ${
                  isLoggedIn && menuOpen ? 'block' : 'hidden'
                }`}
                onClick={() => {
                  {
                    router.push(`/organizer/profile`);

                    setMenuOpen(false);
                  }
                }}
              >
                <h1>Dashboard Organizer</h1>
              </div>
              <div
                className={`bg-slate-300 pt-4 h-[50px] text-center cursor-pointer hover:bg-blue-500 ${
                  isLoggedIn && menuOpen ? 'block' : 'hidden'
                }`}
                onClick={() => {
                  {
                    router.push(`/organizer/create-event`);
                    setMenuOpen(false);
                  }
                }}
              >
                <h1>Create Event</h1>
              </div>
              <div
                className={`bg-slate-300 pt-4 h-[50px] text-center cursor-pointer hover:bg-blue-500 ${
                  isLoggedIn && menuOpen ? 'block' : 'hidden'
                }`}
                onClick={() => {
                  {
                    router.push(`/organizer/transaction`);
                    setMenuOpen(false);
                  }
                }}
              >
                <h1>Transaction</h1>
              </div>
              <div
                className={`bg-slate-300 pt-4 h-[50px] text-center cursor-pointer hover:bg-blue-500 ${
                  isLoggedIn && menuOpen ? 'block' : 'hidden'
                }`}
                onClick={() => {
                  {
                    router.push(`/organizer/events`);
                    setMenuOpen(false);
                  }
                }}
              >
                <h1>Events</h1>
              </div>
            </div>
          )}

          <div
            className={` bg-slate-300 pt-4 h-[50px] text-center cursor-pointer hover:bg-blue-500 ${
              isLoggedIn && menuOpen ? 'block' : 'hidden'
            }`}
            onClick={() => {
              dispatch(logout());
              router.push('/');
            }}
          >
            Sign Out
          </div>
        </div>

        {/* profile icon */}
        <div
          className={` gap-4  mr-4 text-3xl text-white hidden ${
            isLoggedIn ? 'md:flex' : 'md:hidden'
          }`}
        >
          {data.role === 'organizer' && (
            <div
              className="text-white flex items-center mr-10 cursor-pointer"
              onClick={() =>
                router.push(`/organizer/create-event`)
              }
            >
              <IoCalendarSharp className=" text-3xl mr-2" />
              <h1 className="text-lg">Create Event</h1>
            </div>
          )}
          {data.role === 'customer' && (
            <div
              className="text-white flex items-center mr-10 cursor-pointer"
              onClick={() =>
                router.push(`/customer/purchased-event`)
              }
            >
              <BsTicketPerforatedFill className=" text-3xl mr-2" />
              <h1 className="text-lg">Purchased Event</h1>
            </div>
          )}
          <div className="mr-2 md:mr-20 mt-2 md:mt-4">
            <button
              id="dropdownUserAvatarButton"
              data-dropdown-toggle="dropdownAvatar"
              className="flex text-sm bg-gray-800 w-[65px] h-[65px] rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              type="button"
            >
              <span className="sr-only">Open user menu</span>
              <img
                sizes="100vw"
                className="object-cover rounded-full w-full h-full"
                src={`http://localhost:8000/assets/${data.imageProfile}`}
                alt="user photo"
              />
            </button>

            <div
              id="dropdownAvatar"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div></div>
                <div className="font-medium truncate">{data.username}</div>
                <div className="font-medium text-sm truncate">{data.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <a
                    className={`block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white `}
                    onClick={() => {
                      router.push(`/${data.role}/profile`);
                      setMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  onClick={() => {
                    dispatch(logout());
                    router.push('/');
                  }}
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
