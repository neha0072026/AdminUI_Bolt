import React, { useState, useEffect } from "react";
//import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import TableFooter from "../components/TableFooter";

interface Store {
  id: number;
  name: string;
  url: string;
  status: boolean;
}

const Stores: React.FC = () => {
  // const mockFetchStores = async (): Promise<Store[]> => {
  // Simulating API call
  const [stores, setStores] = useState<Store[]>([
    {
      id: 1,
      name: "Fashion Store",
      url: "https://fashion-store.com",
      status: true,
    },
    {
      id: 2,
      name: "Electronics Hub",
      url: "https://electronics-hub.com",
      status: true,
    },
    {
      id: 3,
      name: "Home Decor",
      url: "https://home-decor.com",
      status: false,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredStores, setFilteredStores] = useState<Store[]>(stores);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<keyof Store>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    filterAndSortStores();
  }, [searchTerm, statusFilter, sortField, sortDirection, stores]);

  /*const {
    data: stores,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: mockFetchStores,
  });*/

  const filterAndSortStores = () => {
    let filtered = stores?.filter(
      (store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (user) => user.status === (statusFilter === "Active")
      );
    }
    const sorted = filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredStores(sorted);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (id: number) => {
    setStores(
      stores.map((store) =>
        store.id === id ? { ...store, status: !store.status } : store
      )
    );
  };
  const handleSort = (field: keyof Store) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  //if (isLoading) return <div>Loading...</div>;
  //if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumbs
        items={[{ name: "Home", path: "/home" }, { name: "Stores" }]}
      />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Stores</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search stores..."
            className="w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="ml-4 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Store
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["name", "url", "status"].map((field) => (
                <th
                  key={field}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(field as keyof Store)}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortField === field && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStores?.map((store) => (
              <tr key={store.id}>
                <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {store.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <label className="switch-sm">
                    <input
                      type="checkbox"
                      checked={store.status}
                      onChange={() => handleStatusChange(store.id)}
                    />
                    <span className="sr-only">Store status</span>
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TableFooter
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStores.length / rowsPerPage)}
          rowsPerPage={rowsPerPage}
          totalItems={filteredStores.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
};

export default Stores;
