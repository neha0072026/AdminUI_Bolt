import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
  pageSize?: number;
}

const Table = <T extends {}>({
  data,
  columns,
  pageSize = 10,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState(data);
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const totalPages = Math.ceil(data.length / pageSize);
  const currentPageStart = (currentPage - 1) * pageSize + 1;
  const currentPageEnd = Math.min(currentPage * pageSize, data.length);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (field: keyof T) => {
    const newSortDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newSortDirection);
    const sorted = [...sortedData].sort((a, b) => {
      if (a[field] < b[field]) return newSortDirection === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newSortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(({ header, accessor }) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(accessor)}
                >
                  {header}
                  {sortField === accessor && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map(({ accessor }) => (
                    <td
                      key={String(accessor)}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {row[accessor]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td
                colSpan={columns.length - 1}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500"
              >
                Showing {currentPageStart} to {currentPageEnd} of {data.length}{" "}
                entries
              </td>
              <td className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                <div className="inline-flex items-center">
                  <button
                    onClick={handlePreviousPage}
                    className={`px-3 py-1 border-t border-b border-l border-gray-300 bg-white text-gray-500 text-xs ${
                      currentPage === 1
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-gray-100"
                    }`}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages).keys()].map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page + 1)}
                      className={`px-3 py-1 border-t border-b ${
                        page !== totalPages - 1 && "border-r"
                      } border-gray-300 ${
                        currentPage === page + 1
                          ? "bg-gray-200 text-gray-700"
                          : "bg-white text-gray-500"
                      } text-xs hover:bg-gray-100`}
                    >
                      {page + 1}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    className={`px-3 py-1 border-t border-b border-r border-gray-300 bg-white text-gray-500 text-xs ${
                      currentPage === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-gray-100"
                    }`}
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Table;
