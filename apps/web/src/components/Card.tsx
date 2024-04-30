import * as React from 'react';

interface ICardProps {
  url: string;
  title: string;
  date: string;
  price: string;
  username: string;
}

const Card: React.FunctionComponent<ICardProps> = (props) => {
  return (
    <div className="2xl:h-[380px] 2xl:w-[380px] rounded-xl shadow-xl bg-[#d9d9d9] ">
      <img
        src={props.url}
        alt=""
        className="rounded-t-lg h-[150px] 2xl:h-[200px] w-[380px] object-cover "
      />
      <div className="mt-4 ml-6 text-lg  max-w-[270px] 2xl:max-w-[300px] ">
        <h1 className="font-bold h-7 overflow-hidden truncate">
          {props.title}
        </h1>
        <h1 className="text-[#808080]">{props.date}</h1>
        <h1 className="italic">{props.price}</h1>
        <div className="mr-6 bg-[#b8b7b7] h-[2px] mt-2"></div>
        <h1 className="mb-4 mt-4 text-lg overflow-hidden truncate">
          {props.username}
        </h1>
      </div>
    </div>
  );
};

export default Card;
