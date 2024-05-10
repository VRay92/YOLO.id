import { useRouter } from 'next/navigation';
import * as React from 'react';

interface ICardProps {
  url: string;
  title: string;
  date: string;
  price: string;
  username: string;
}

const Card: React.FunctionComponent<ICardProps> = (props) => {
  const router = useRouter();
  return (
    <div
      className="2xl:h-[380px] w-[280px] 2xl:w-[380px] rounded-xl shadow-xl bg-[#d9d9d9] cursor-pointer"
      onClick={() => router.push('/event_detail_cu')}
    >
      <img src={props.url} alt="" className="rounded-t-lg object-cover " />
      <div className="mt-4 mx-6 text-lg min-w-[200px] w-[200px] 2xl:w-[300px]">
        <h1 className="font-bold h-7 overflow-hidden truncate md:w-[250px] 2xl:w-[380px]">
          {props.title}
        </h1>
        <h1 className="text-[#808080]">{props.date}</h1>
        <h1 className="italic">{props.price}</h1>
        <div className=" bg-[#b8b7b7] h-[2px] mt-2"></div>
        <h1 className="mb-4 mt-4 text-lg overflow-hidden truncate">
          {props.username}
        </h1>
      </div>
    </div>
  );
};

export default Card;
