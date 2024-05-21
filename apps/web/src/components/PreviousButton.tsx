import * as React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface IPreviousButtonProps {
  onClick: () => void;
  name: string;
}

const PreviousButton: React.FunctionComponent<IPreviousButtonProps> = ({
  onClick,
  name,
}) => {
  return (
    <button
      className="bg-blue-500 flex text-white w-[12rem] h-[2.5rem] rounded-lg p-4 my-8 md:mt-0 items-center gap-2 active:translate-y-[1px]"
      onClick={onClick}
    >
      <FaArrowLeft></FaArrowLeft>
      <h1>{name}</h1>
    </button>
  );
};

export default PreviousButton;
