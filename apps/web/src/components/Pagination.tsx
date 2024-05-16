import { divide } from 'cypress/types/lodash';
import * as React from 'react';

interface IPaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
  currentPage: number;
}

const Pagination: React.FunctionComponent<IPaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className={`flex cursor-pointer items-center justify-center px-4 h-10 mr-4 border ${
              currentPage === number
                ? 'bg-white text-[#282828]'
                : 'border-white hover:bg-white text-white hover:text-[#282828]'
            }`}
          >
            <a className="text-xl  ">{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
