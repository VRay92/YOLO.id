import SideBarEO from '@/components/SidebarEO';
import Image from 'next/image';
import * as React from 'react';

interface IProfileEOProps {}

const ProfileEO: React.FunctionComponent<IProfileEOProps> = (props) => {
  return (
    <div className="flex bg-[#282828] min-h-screen">
      <div className="mx-12 mt-28">
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
              className="mr-8 2xl:w-[350px] h-[50px] rounded-lg border-gray-200 mb-4"
            />
            <h1>Email address</h1>
            <input
              type="text"
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
            />
            <h1>Confirm password</h1>
            <input
              type="password"
              className="w-auto md:w-[350px] h-[50px] rounded-lg border-gray-200"
            />
            <div>
              <button className="w-full md:w-[350px] h-[3rem] rounded-2xl bg-red-600 text-white mt-10">
                Change Data
              </button>
            </div>
          </div>
          <div className="rounded-full h-[220px] w-[220px] relative">
            <Image
              fill
              sizes="100vw"
              src="/profile.webp"
              alt="hero"
              className="object-cover rounded-full hidden md:block"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileEO;
