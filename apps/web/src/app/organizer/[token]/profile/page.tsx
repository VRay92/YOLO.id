'use client';
import OrganizerRoute from '@/components/OrganizerRoute';
import SideBarEO from '@/components/SidebarEO';
import { updateUser } from '@/lib/features/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import axios from 'axios';
import Image from 'next/image';
import * as React from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface IProfileEOProps {}

const ProfileEO: React.FunctionComponent<IProfileEOProps> = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const dispatch = useAppDispatch();
  const [organizer, setOrganizer] = React.useState({
    id: '',
    username: '',
    email: '',
    imageProfile: '',
  });
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  React.useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/profile`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          setOrganizer(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching organizer:', error);
      }
    };
    fetchOrganizer();
  }, [organizer.imageProfile]);

  const handleImageUploadSuccess = (imageName: string) => {
    setOrganizer((prevOrganizer) => ({
      ...prevOrganizer,
      imageProfile: imageName,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizer({ ...organizer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/profile`,
          { ...organizer, password },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setOrganizer(response.data.data);
        dispatch(
          updateUser({
            username: response.data.data.username,
            email: response.data.data.email,
          }),
        );
        setPassword('');
        setConfirmPassword('');
        toast.success('Data updated successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error updating organizer:', error);
      toast.error('Failed to update data', {
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

  console.log('organizer', organizer.imageProfile);
  const onSavePhoto = async (): Promise<void> => {
    const formData = new FormData();
    const token = localStorage.getItem('token');

    // Menyematkan file
    if (file) {
      // formData.append("email","mail.com"): example if you want to send other data
      formData.append('imgProfile', file);

      console.log('form data', file);
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
      console.log('update photo', formData);
      handleImageUploadSuccess(updatePhoto.data.fileName);
      alert('Update profile success');
      setOpenModal(false);
    }
  };

  return (
    <OrganizerRoute>
      <div className="flex bg-[#282828] min-h-screen">
      <div className="mx-12 mt-28 hidden md:block">
          <SideBarEO />
        </div>
        <section className="w-full md:h-[710px] rounded-none md:mr-16 md:rounded-lg md:my-14 relative">
          <Image
            fill
            sizes="100vw"
            src="/background.jpg"
            alt="hero"
            className="object-cover rounded-none md:rounded-lg hidden md:block"
          />
          <div className="rounded-full h-[220px] w-[220px] relative mt-20 mx-auto block md:hidden">
            <Image
              fill
              sizes="100vw"
              src="/profile.webp"
              alt="hero"
              className="object-cover rounded-full"
            />
          </div>
          <h1 className="relative font-semibold text-center md:text-left text-3xl text-black mt-16 md:ml-16 lg:pb-10">
            Profile
          </h1>
          <div className="relative ml-4 mr-4 md:ml-16 md:mr-0 mt-10 flex w-full md:flex-row flex-col">
            <div id="left-container" className="border-gray-400 flex flex-col">
              <h1>Company Name</h1>
              <input
                type="text"
                name="username"
                value={organizer.username}
                onChange={handleChange}
                className="mr-8 2xl:w-[350px] h-[50px] rounded-lg border-gray-200 mb-4"
              />
              <h1>Email address</h1>
              <input
                type="text"
                name="email"
                value={organizer.email}
                onChange={handleChange}
                className="w-auto md:w-[350px] h-[50px] rounded-lg border-gray-200 mb-2"
              />
            </div>
            <div
              id="right-container"
              className="md:ml-16 mr-8 md:mr-16 flex flex-col"
            >
              <h1>Password</h1>
              <input
                type="password"
                className="w-auto md:w-[350px] h-[50px] rounded-lg border-gray-200 mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <h1>Confirm password</h1>
              <input
                type="password"
                className="w-auto md:w-[350px] h-[50px] rounded-lg border-gray-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full md:w-[350px] h-[3rem] rounded-2xl bg-red-600 text-white mt-10"
                >
                  Change Data
                </button>
              </div>
            </div>
            <div>
              <div className="rounded-full w-[200px] h-[200px] relative cursor-pointer">
                <img
                  sizes="100vw"
                  src={`http://localhost:8000/assets/${organizer.imageProfile}`}
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
          </div>
        </section>
        {/* CHANGE PICTURE MODAL */}
        <div
          className={`absolute left-0 top-0 z-[36] h-screen w-screen bg-black bg-opacity-50 backdrop-blur-sm backdrop-filter ${
            openModal ? 'block' : 'hidden'
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
                onClick={onSavePhoto}
                className={`bg-orange-500 w-[5rem] h-[2rem] mt-4 rounded-md ${
                  file ? 'block' : 'hidden'
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </OrganizerRoute>
  );
};

export default ProfileEO;
