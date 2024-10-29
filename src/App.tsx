import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Home";
import UserManagementPage from "./pages/Users";
import ProductManagementPage from "./pages/Products";
import OrderManagementPage from "./pages/Orders";
import InventoryManagementPage from "./pages/Inventory";
import ReportsPage from "./pages/Reports";
import Stores from "./pages/Stores";
import Roles from "./pages/Roles";
import Settings from "./pages/Settings";
import IntegrationsPage from "./pages/Integrations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const queryClient = new QueryClient();

  if (
    !isLoggedIn &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" replace />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="orders" element={<OrderManagementPage />} />
          <Route path="inventory" element={<InventoryManagementPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="roles" element={<Roles />} />
          <Route path="stores" element={<Stores />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/settings/integrations" element={<IntegrationsPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
