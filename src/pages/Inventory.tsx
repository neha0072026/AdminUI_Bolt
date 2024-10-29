import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  Plus,
  Minus,
  FileDown,
  Upload,
  Search,
} from "lucide-react";
import EditInventoryItemModal from "../components/EditInventoryItemModal";
import UploadInventoryItemsModal from "../components/UploadInventoryItemsModal";
import * as XLSX from "xlsx";
import Breadcrumbs from "../components/Breadcrumbs";
import TableFooter from "../components/TableFooter";

interface InventoryItem {
  id: number;
  itemNumber: string;
  itemName: string;
  quantity: number;
  lowWaterMark: number;
  aisleNumber: string;
  binNumber: string;
}

const InventoryManagementPage: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: 1,
      itemNumber: "015334",
      itemName: "110# Smooth Index 11 x 17",
      quantity: 36500,
      lowWaterMark: 0,
      aisleNumber: "",
      binNumber: "",
    },
    {
      id: 2,
      itemNumber: "26206",
      itemName: "26x20x6 Shipping Box",
      quantity: 117,
      lowWaterMark: 0,
      aisleNumber: "",
      binNumber: "",
    },
    {
      id: 3,
      itemNumber: "26513",
      itemName: "PFI New Hire Gift - Wireless Mouse/Pad",
      quantity: 25,
      lowWaterMark: 0,
      aisleNumber: "",
      binNumber: "",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredOrders] =
    useState<InventoryItem[]>(inventoryItems);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<keyof InventoryItem>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    filterAndSortOrders();
  }, [searchTerm, statusFilter, sortField, sortDirection, inventoryItems]);

  const filterAndSortOrders = () => {
    let filtered = inventoryItems.filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm) ||
        item.binNumber.includes(searchTerm) ||
        item.itemNumber.includes(searchTerm)
    );
    if (statusFilter !== "All") {
      filtered = filtered.filter((item) => item.itemName === statusFilter);
    }
    const sorted = filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredOrders(sorted);
  };

  const handleSort = (field: keyof InventoryItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (id: number) => {
    const itemToEdit = inventoryItems.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDeleteItem = (id: number) => {
    setInventoryItems(inventoryItems.filter((item) => item.id !== id));
  };

  const handleSaveItem = (savedItem: InventoryItem) => {
    if (savedItem.id === 0) {
      // Add new item
      const newItem = { ...savedItem, id: Date.now() };
      setInventoryItems([...inventoryItems, newItem]);
    } else {
      // Update existing item
      setInventoryItems(
        inventoryItems.map((item) =>
          item.id === savedItem.id ? savedItem : item
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleAdjustQuantity = (id: number, adjustment: number) => {
    setInventoryItems(
      inventoryItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + adjustment }
          : item
      )
    );
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventoryItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "inventory.xlsx");
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumbs
        items={[{ name: "Home", path: "/home" }, { name: "Inventory" }]}
      />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Inventory</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search inventory item..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex space-x-4">
          {" "}
          {/* Group buttons together */}
          <button
            onClick={handleAddItem}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            title="Add Inventory Item"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Item
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            title="Upload Inventory Items"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload Items
          </button>
          <button
            onClick={handleExportToExcel}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            title="Export to Excel"
          >
            <FileDown className="h-5 w-5 mr-2" />
            Download All
          </button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Item Number",
                "Item Name",
                "Quantity",
                "Low Water Mark",
                "Aisle Number",
                "Bin Number",
              ].map((field) => (
                <th
                  key={field}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(field as keyof InventoryItem)}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortField === field && (
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
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.itemNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.itemName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.lowWaterMark}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.aisleNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.binNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button
                    onClick={() => handleAdjustQuantity(item.id, 1)}
                    className="text-green-600 hover:text-green-900 mr-2"
                    title="Add"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleAdjustQuantity(item.id, -1)}
                    className="text-red-600 hover:text-red-900 mr-2"
                    title="Subtract"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEditItem(item.id)}
                    className="text-primary-600 hover:text-primary-900 mr-2"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TableFooter
          currentPage={currentPage}
          totalPages={Math.ceil(filteredItems.length / rowsPerPage)}
          rowsPerPage={rowsPerPage}
          totalItems={filteredItems.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
      {isModalOpen && (
        <EditInventoryItemModal
          item={editingItem}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveItem}
        />
      )}
      {isUploadModalOpen && (
        <UploadInventoryItemsModal
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={(items) => {
            // Handle the uploaded items here
            console.log("Uploaded items:", items);
            setIsUploadModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default InventoryManagementPage;
