import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded-md ${
            i === currentPage
              ? "text-primary-600 font-bold"
              : "text-gray-700 hover:text-primary-600"
          }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(<span key="start-ellipsis">...</span>);
    }

    if (endPage < totalPages) {
      pageNumbers.push(<span key="end-ellipsis">...</span>);
    }

    return pageNumbers;
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex items-center">
        <span className="mr-2 text-sm text-gray-700">Rows per page:</span>
        <select
          className="mr-4 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          {[5, 10, 20, 50, 100].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-700">
          {startItem} - {endItem} of {totalItems}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-1 rounded-full text-gray-400 hover:text-primary-600 disabled:opacity-50"
          title="First Page"
        >
          <ChevronsLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 rounded-full text-gray-400 hover:text-primary-600 disabled:opacity-50"
          title="Previous Page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-1">{renderPageNumbers()}</div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 rounded-full text-gray-400 hover:text-primary-600 disabled:opacity-50"
          title="Next Page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1 rounded-full text-gray-400 hover:text-primary-600 disabled:opacity-50"
          title="Last Page"
        >
          <ChevronsRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TableFooter;
