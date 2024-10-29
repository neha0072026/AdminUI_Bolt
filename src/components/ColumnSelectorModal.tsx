import React, { useState } from "react";
import { X } from "lucide-react";

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
  key: keyof Order | string;
}
interface ColumnSelectorModalProps {
  defaultColumns: ColumnConfig[];
  visibleColumns: ColumnConfig[];
  onClose: () => void;
  onSave: (columns: ColumnConfig[]) => void;
  allColumns: ColumnConfig[];
}

const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = ({
  defaultColumns,
  visibleColumns,
  onClose,
  onSave,
  allColumns,
}) => {
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnConfig[]>(visibleColumns);

  const handleToggleColumn = (column: ColumnConfig) => {
    console.log("Toggling column:", column);
    const isDefaultColumn = defaultColumns.some(
      (defaultColumn) =>
        defaultColumn.header === column.header &&
        defaultColumn.key === column.key
    );
    if (isDefaultColumn) return;
    setSelectedColumns((prev) => {
      const newSelection = prev.some(
        (col) => col.header === column.header && col.key === column.key
      )
        ? prev.filter(
            (col) => !(col.header === column.header && col.key === column.key)
          )
        : [...prev, column];
      console.log("Updated selectedColumns:", newSelection);
      return newSelection;
    });
  };
  const handleSelectAll = () => {
    const isAllSelected = selectedColumns.length === allColumns.length;
    if (isAllSelected) {
      setSelectedColumns([...defaultColumns]);
    } else {
      setSelectedColumns([...allColumns]);
    }
  };
  const handleDefaultView = () => {
    setSelectedColumns([...defaultColumns]);
  };
  const handleSave = () => {
    const finalColumns = [...new Set([...selectedColumns])];
    onSave(finalColumns);
    onClose();
  };

  const renderCheckbox = (column: ColumnConfig) => {
    const isDefaultColumn = defaultColumns.some(
      (defaultColumn) =>
        defaultColumn.header === column.header &&
        defaultColumn.key === column.key
    );
    const isSelected = selectedColumns.some(
      (selectedColumn) =>
        selectedColumn.header === column.header &&
        selectedColumn.key === column.key
    );
    return (
      <label className="flex items-center flex-1">
        {" "}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleToggleColumn(column)}
          disabled={isDefaultColumn}
          className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 mr-2"
        />{" "}
        <span className="text-sm font-medium text-gray-700">
          {" "}
          {column.header}{" "}
        </span>{" "}
      </label>
    );
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold mb-4">Add/Remove Columns</h2>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedColumns.length === allColumns.length}
              onChange={handleSelectAll}
              className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Select all
            </span>
          </label>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {allColumns.map((column) => (
            <div key={column.header} className="flex items-center p-2 rounded">
              {" "}
              {renderCheckbox(column)}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleDefaultView}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Default view
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelectorModal;
