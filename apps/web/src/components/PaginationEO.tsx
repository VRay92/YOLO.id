import * as React from 'react';

interface PaginationEOProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationEO: React.FC<PaginationEOProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`${
            currentPage === page
              ? 'bg-red-600 text-white'
              : 'bg-white text-red-600'
          } border border-red-600 px-4 py-2 mx-1 rounded-lg`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationEO;
