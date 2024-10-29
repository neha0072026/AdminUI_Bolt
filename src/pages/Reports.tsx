import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Breadcrumbs from "../components/Breadcrumbs";

interface SalesData {
  date: string;
  sales: number;
}

interface ProductSalesData {
  name: string;
  sales: number;
}

const mockFetchSalesData = async (): Promise<SalesData[]> => {
  // Simulating API call
  return [
    { date: "2023-03-01", sales: 1200 },
    { date: "2023-03-02", sales: 1800 },
    { date: "2023-03-03", sales: 1400 },
    { date: "2023-03-04", sales: 2000 },
    { date: "2023-03-05", sales: 2400 },
    { date: "2023-03-06", sales: 1800 },
    { date: "2023-03-07", sales: 2200 },
  ];
};

const mockFetchProductSalesData = async (): Promise<ProductSalesData[]> => {
  // Simulating API call
  return [
    { name: "T-Shirt", sales: 500 },
    { name: "Jeans", sales: 300 },
    { name: "Sneakers", sales: 400 },
    { name: "Hat", sales: 200 },
    { name: "Socks", sales: 100 },
  ];
};

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<"sales" | "products">("sales");
  const {
    data: salesData,
    isLoading: salesLoading,
    error: salesError,
  } = useQuery({
    queryKey: ["salesData"],
    queryFn: mockFetchSalesData,
  });
  const {
    data: productSalesData,
    isLoading: productSalesLoading,
    error: productSalesError,
  } = useQuery({
    queryKey: ["productSalesData"],
    queryFn: mockFetchProductSalesData,
  });

  if (salesLoading || productSalesLoading) return <div>Loading...</div>;
  if (salesError || productSalesError)
    return (
      <div>
        An error occurred:{" "}
        {((salesError || productSalesError) as Error).message}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumbs
        items={[{ name: "Home", path: "/home" }, { name: "Reports" }]}
      />
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reports</h1>
      <div className="mb-4">
        <select
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={reportType}
          onChange={(e) =>
            setReportType(e.target.value as "sales" | "products")
          }
        >
          <option value="sales">Sales Over Time</option>
          <option value="products">Product Sales</option>
        </select>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {reportType === "sales" ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={productSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Reports;
