import * as React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

interface INextPageButtonProps {
  onClick: () => void;
  name: string;
}

const NextPageButton: React.FunctionComponent<INextPageButtonProps> = ({
  onClick,
  name,
}) => {
  return (
    <button
      className="bg-blue-500 flex text-white w-[8.5rem] h-[2.5rem] rounded-lg p-4 my-8 md:mt-0 items-center gap-2 active:translate-y-[1px]"
      onClick={onClick}
    >
      <h1>{name}</h1>
      <FaArrowRight></FaArrowRight>
    </button>
  );
};

export default NextPageButton;
