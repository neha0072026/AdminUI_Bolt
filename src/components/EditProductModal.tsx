import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  staticDocument: string;
  proofFile: string;
  thumbnailImage: string;
}

interface EditProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    stock: 0,
    staticDocument: "",
    proofFile: "",
    thumbnailImage: "",
  });

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setEditedProduct((prev) => ({
        ...prev,
        [name]: files[0].name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedProduct);
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
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={editedProduct.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Books">Books</option>
              <option value="Toys">Toys</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={editedProduct.stock}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
              min="0"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="staticDocument"
              className="block text-sm font-medium text-gray-700"
            >
              Static Document
            </label>
            <input
              type="file"
              id="staticDocument"
              name="staticDocument"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="proofFile"
              className="block text-sm font-medium text-gray-700"
            >
              Proof File
            </label>
            <input
              type="file"
              id="proofFile"
              name="proofFile"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="thumbnailImage"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail Image
            </label>
            <input
              type="file"
              id="thumbnailImage"
              name="thumbnailImage"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
