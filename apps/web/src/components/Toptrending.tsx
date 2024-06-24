import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface IToptrendingProps {
  url: string;
  rank: number;
  eventid: number;
}

const Toptrending: React.FunctionComponent<IToptrendingProps> = (props) => {
  const router = useRouter();
  return (
    <div
      className="h-[150px] md:h-[300px] md:min-w-[510px] relative cursor-pointer"
      onClick={() => router.push(`/event-detail/${props.eventid}`)}
    >
      <img
        src={`http://localhost:8000/assets/` + props.url}
        alt="toptrending"
        className="object-cover md:h-[300px]"
      ></img>
      <div className="bg-[#F40841] size-[60px] text-white absolute bottom-0 left-0">
        <h1 className="py-3 text-center text-white">
          <span className="text-2xl">#</span>
          <span className="text-4xl font-bold">{props.rank}</span>
        </h1>
      </div>
    </div>
  );
};

export default Toptrending;
//  <div className="relative md:h-[300px] md:w-[520px]">
