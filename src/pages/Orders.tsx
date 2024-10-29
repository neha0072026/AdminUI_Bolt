import React, { useState, useEffect } from "react";
import {
  Truck,
  Search,
  Download,
  Calendar,
  RefreshCw,
  Columns,
} from "lucide-react";
import ViewOrderModal from "../components/ViewOrderModal";
import TableFooter from "../components/TableFooter";
import * as XLSX from "xlsx";
import Breadcrumbs from "../components/Breadcrumbs";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ColumnSelectorModal from "../components/ColumnSelectorModal";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
  [key: string]: any;
}
interface ColumnConfig {
  header: string;
  key: keyof Order;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customer: "John Doe",
      date: "2023-03-15",
      total: 99.99,
      status: "Pending",
      items: [
        { id: 1, name: "Product A", quantity: 1, price: 49.99 },
        { id: 2, name: "Product B", quantity: 2, price: 25.0 },
      ],
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "2023-03-14",
      total: 149.99,
      status: "Shipped",
      items: [{ id: 3, name: "Product C", quantity: 1, price: 149.99 }],
    },
    {
      id: 3,
      customer: "Bob Johnson",
      date: "2023-03-13",
      total: 79.99,
      status: "Delivered",
      items: [{ id: 4, name: "Product D", quantity: 1, price: 79.99 }],
    },
    {
      id: 4,
      customer: "Alice Williams",
      date: "2023-03-12",
      total: 199.99,
      status: "Pending",
      items: [{ id: 5, name: "Product E", quantity: 2, price: 99.99 }],
    },
    {
      id: 5,
      customer: "Charlie Brown",
      date: "2023-03-11",
      total: 299.99,
      status: "Shipped",
      items: [{ id: 6, name: "Product F", quantity: 3, price: 99.99 }],
    },
    {
      id: 6,
      customer: "Diana Prince",
      date: "2023-03-10",
      total: 159.99,
      status: "Delivered",
      items: [{ id: 7, name: "Product G", quantity: 1, price: 159.99 }],
    },
    {
      id: 7,
      customer: "Edward Norton",
      date: "2023-03-09",
      total: 89.99,
      status: "Pending",
      items: [{ id: 8, name: "Product H", quantity: 1, price: 89.99 }],
    },
    {
      id: 8,
      customer: "Frank Castle",
      date: "2023-03-08",
      total: 249.99,
      status: "Shipped",
      items: [{ id: 9, name: "Product I", quantity: 2, price: 124.99 }],
    },
    {
      id: 9,
      customer: "Grace Kelly",
      date: "2023-03-07",
      total: 179.99,
      status: "Delivered",
      items: [{ id: 10, name: "Product J", quantity: 1, price: 179.99 }],
    },
    {
      id: 10,
      customer: "Henry Ford",
      date: "2023-03-06",
      total: 399.99,
      status: "Pending",
      items: [{ id: 11, name: "Product K", quantity: 4, price: 99.99 }],
    },
    {
      id: 11,
      customer: "Iris West",
      date: "2023-03-05",
      total: 129.99,
      status: "Shipped",
      items: [{ id: 12, name: "Product L", quantity: 1, price: 129.99 }],
    },
    {
      id: 12,
      customer: "Jack Ryan",
      date: "2023-03-04",
      total: 449.99,
      status: "Delivered",
      items: [{ id: 13, name: "Product M", quantity: 3, price: 149.99 }],
    },
    {
      id: 13,
      customer: "Kelly Johnson",
      date: "2023-03-03",
      total: 199.99,
      status: "Pending",
      items: [{ id: 14, name: "Product N", quantity: 2, price: 99.99 }],
    },
    {
      id: 14,
      customer: "Jane Smith",
      date: "2023-03-02",
      total: 299.99,
      status: "Shipped",
      promotions: 5,
      items: [{ id: 15, name: "Product O", quantity: 3, price: 99.99 }],
    },
  ]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<keyof Order>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);

  const defaultColumns: ColumnConfig[] = [
    { header: "Order Number", key: "id" },
    { header: "Order Date", key: "date" },
    { header: "Order By", key: "customer" },
    { header: "Total", key: "total" },
    { header: "Status", key: "status" },
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);
  const allColumns: ColumnConfig[] = [
    { header: "Order Number", key: "id" },
    { header: "Order Date", key: "date" },
    { header: "Total", key: "total" },
    { header: "Payment Type", key: "paymentType" },
    { header: "Promotions", key: "promotions" },
    { header: "Tax", key: "tax" },
    { header: "Order Handling Fee", key: "orderHandlingFee" },
    { header: "Order By", key: "customer" },
    { header: "Emulated By", key: "emulatedBy" },
    { header: "Special Instructions", key: "specialInstructions" },
    { header: "Billing Address", key: "billingAddress" },
    { header: "Shipped Date", key: "shippedDate" },
    { header: "PO Number", key: "poNumber" },
    { header: "Cost Center Name", key: "costCenterName" },
    { header: "External Reference", key: "externalReference" },
    { header: "Guest Reference", key: "guestReference" },
    { header: "Total No of Items", key: "totalNoOfItems" },
    { header: "Fulfillment Status", key: "fulfillmentStatus" },
    { header: "Fulfillment Charges", key: "fulfillmentCharges" },
  ];

  useEffect(() => {
    filterAndSortOrders();
  }, [
    searchTerm,
    statusFilter,
    sortField,
    sortDirection,
    orders,
    startDate,
    endDate,
  ]);

  const filterAndSortOrders = () => {
    let filtered = orders.filter(
      (order) =>
        (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toString().includes(searchTerm)) &&
        (statusFilter === "All" || order.status === statusFilter) &&
        (!startDate || new Date(order.date) >= startDate) &&
        (!endDate || new Date(order.date) <= endDate)
    );

    const sorted = filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredOrders(sorted);
  };

  const handleSort = (field: keyof Order) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleShipOrder = (id: number) => {
    // TODO: Implement ship order functionality
    console.log("Ship order", id);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredOrders.map((order) => ({
        "Order ID": order.id,
        Customer: order.customer,
        Date: order.date,
        Total: order.total,
        Status: order.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleColumnSelector = () => {
    setIsColumnSelectorOpen(true);
  };

  const handleSaveColumns = (columns: ColumnConfig[]) => {
    setVisibleColumns(columns);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumbs
        items={[{ name: "Home", path: "/home" }, { name: "Orders" }]}
      />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Orders</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            className="ml-4 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="pl-10 pr-3 py-2 w-40 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="pl-10 pr-3 py-2 w-40 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
            }}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
            title="Clear date filter"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button
            onClick={handleColumnSelector}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Columns className="h-5 w-5 mr-2" />
            Columns
          </button>
          <button
            onClick={handleExportToExcel}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Download className="h-5 w-5 mr-2" />
            Download All
          </button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.map((field) => (
                  <th
                    key={field.header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(field.key as keyof Order)}
                  >
                    {field.header}
                    {sortField === field.key && (
                      <span className="ml-2">
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order) => (
                <tr key={order.id}>
                  {visibleColumns.map((column) => (
                    <td
                      key={column.header}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {column.header === "Order Number" ? (
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-primary-600 hover:text-primary-900"
                          title="View Order Details"
                        >
                          #{order.id}
                        </button>
                      ) : column.header === "Total" ? (
                        <span> ${order.total.toFixed(2)}</span>
                      ) : column.header === "Status" ? (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      ) : column.header === "Order Date" ? (
                        <span>
                          {format(
                            parseISO(order.date),
                            "MM/dd/yyyy hh:mm:ss a"
                          )}
                        </span>
                      ) : (
                        <span>{order[column.key as keyof Order]}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {order.status === "Pending" && (
                      <button
                        onClick={() => handleShipOrder(order.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Ship Order"
                      >
                        <Truck className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter
          currentPage={currentPage}
          totalPages={Math.ceil(filteredOrders.length / rowsPerPage)}
          rowsPerPage={rowsPerPage}
          totalItems={filteredOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
      {selectedOrder && (
        <ViewOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      {isColumnSelectorOpen && (
        <ColumnSelectorModal
          defaultColumns={defaultColumns}
          visibleColumns={visibleColumns}
          onClose={() => setIsColumnSelectorOpen(false)}
          onSave={handleSaveColumns}
          allColumns={allColumns}
        />
      )}
    </div>
  );
};

export default Orders;
