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
      className="bg-blue-500 flex text-white w-[rem] h-[2.5rem] rounded-lg p-4 items-center gap-2"
      onClick={onClick}
    >
      <h1>{name}</h1>
      <FaArrowRight></FaArrowRight>
    </button>
  );
};

export default NextPageButton;
