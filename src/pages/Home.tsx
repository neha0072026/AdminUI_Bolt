import React from "react";
import { Users, Store, Package, ShoppingCart } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";

const DashboardCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
}> = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-700">{value}</p>
      </div>
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumbs items={[{ name: "Home" }]} />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Users" value="1,234" icon={Users} />
        <DashboardCard title="Active Stores" value="56" icon={Store} />
        <DashboardCard title="Products" value="9,876" icon={Package} />
        <DashboardCard title="Orders (Today)" value="123" icon={ShoppingCart} />
      </div>
    </div>
  );
};

export default Home;
