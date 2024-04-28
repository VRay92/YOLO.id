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
    <div className="size-[380px] rounded-xl shadow-xl bg-[#d9d9d9]">
      <img
        src={props.url}
        alt=""
        className="rounded-t-lg h-[200px] min-w-[380px] object-cover"
      />
      <div className="mt-4 ml-6 text-lg">
        <h1 className="font-bold ">{props.title}</h1>
        <h1 className="text-[#808080]">{props.date}</h1>
        <h1 className="italic">{props.price}</h1>
        <div className="mr-6 bg-[#808080] h-[2px] mt-2"></div>
        <h1 className="mt-4 text-lg">{props.username}</h1>
      </div>
    </div>
  );
};

export default Card;
