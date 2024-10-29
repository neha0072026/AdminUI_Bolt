import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
import EditProductModal from "../components/EditProductModal";
import Breadcrumbs from "../components/Breadcrumbs";
import TableFooter from "../components/TableFooter";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  staticDocument: string;
  proofFile: string;
  thumbnailImage: string;
  status: boolean;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Product A",
      category: "Electronics",
      price: 99.99,
      stock: 50,
      staticDocument: "",
      proofFile: "",
      thumbnailImage:
        "https://dwhmarketing.exelaonline.com/DWHAssetRepo//NgA=/acpra/MgAwADIAMwAwADEAMQA2AA==/MQAzADMAMwA4AA==.jpg?t=67",
      status: true,
    },
    {
      id: 2,
      name: "Product B",
      category: "Clothing",
      price: 49.99,
      stock: 100,
      staticDocument: "",
      proofFile: "",
      thumbnailImage:
        "https://trueblue.exelaonline.com/TBAssetRepo//NgA=/acpra/MgAwADIAMgAwADUAMgAzAA==/MQAwADMAMwA3ADkA.jpg?t=5534",
      status: false,
    },
    {
      id: 3,
      name: "Product C",
      category: "Home & Garden",
      price: 29.99,
      stock: 75,
      staticDocument: "",
      proofFile: "",
      thumbnailImage:
        "https://printshop.exelaonline.com/AssetRepo//NgA=/acpra/MgAwADIAMwAwADkAMAA3AA==/MQA2ADQANQAxADMA.png?t=515",
      status: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<keyof Product>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    filterAndSortProducts();
  }, [
    searchTerm,
    categoryFilter,
    statusFilter,
    sortField,
    sortDirection,
    products,
  ]);

  const filterAndSortProducts = () => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm)
    );

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.status === (statusFilter === "Active")
      );
    }

    const sorted = filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredProducts(sorted);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (id: number) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSaveProduct = (savedProduct: Product) => {
    if (savedProduct.id === 0) {
      // Add new product
      const newProduct = { ...savedProduct, id: Date.now() };
      setProducts([...products, newProduct]);
    } else {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === savedProduct.id ? savedProduct : product
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleStatusChange = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, status: !product.status } : product
      )
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumbs
        items={[{ name: "Home", path: "/home" }, { name: "Products" }]}
      />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Products</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search product..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            className="ml-4 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Garden">Home & Garden</option>
          </select>
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
        <button
          onClick={handleAddProduct}
          className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["product name", "category", "price", "stock", "status"].map(
                (field) => (
                  <th
                    key={field}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(field as keyof Product)}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {sortField === field && (
                      <span className="ml-2">
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                )
              )}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={product.thumbnailImage}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <label className="switch-sm">
                    <input
                      type="checkbox"
                      checked={product.status}
                      onChange={() => handleStatusChange(product.id)}
                    />
                    <span className="sr-only">Product status</span>
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900"
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
          totalPages={Math.ceil(filteredProducts.length / rowsPerPage)}
          rowsPerPage={rowsPerPage}
          totalItems={filteredProducts.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
      {isModalOpen && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default Products;
