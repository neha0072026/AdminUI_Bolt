import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface InventoryItem {
  id: number;
  itemNumber: string;
  itemName: string;
  quantity: number;
  lowWaterMark: number;
  aisleNumber: string;
  binNumber: string;
}

interface EditInventoryItemModalProps {
  item: InventoryItem | null;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
}

const EditInventoryItemModal: React.FC<EditInventoryItemModalProps> = ({
  item,
  onClose,
  onSave,
}) => {
  const [editedItem, setEditedItem] = useState<InventoryItem>({
    id: 0,
    itemNumber: "",
    itemName: "",
    quantity: 0,
    lowWaterMark: 0,
    aisleNumber: "",
    binNumber: "",
  });

  useEffect(() => {
    if (item) {
      setEditedItem(item);
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "lowWaterMark"
          ? parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedItem);
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
        <h2 className="text-2xl font-bold mb-4">
          {item ? "Edit Inventory Item" : "Add New Inventory Item"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="itemNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Item Number
            </label>
            <input
              type="text"
              id="itemNumber"
              name="itemNumber"
              value={editedItem.itemNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={editedItem.itemName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={editedItem.quantity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
              min="0"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lowWaterMark"
              className="block text-sm font-medium text-gray-700"
            >
              Low Water Mark
            </label>
            <input
              type="number"
              id="lowWaterMark"
              name="lowWaterMark"
              value={editedItem.lowWaterMark}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
              min="0"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="aisleNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Aisle Number
            </label>
            <input
              type="text"
              id="aisleNumber"
              name="aisleNumber"
              value={editedItem.aisleNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="binNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Bin Number
            </label>
            <input
              type="text"
              id="binNumber"
              name="binNumber"
              value={editedItem.binNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Save Inventory Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInventoryItemModal;
