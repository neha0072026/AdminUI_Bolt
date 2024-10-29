import {
  Home,
  Users,
  Package,
  ShoppingCart,
  BarChart2,
  Settings,
  Store,
} from "lucide-react";

export const navItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Stores", icon: Store, path: "/stores" },
  {
    name: "Users",
    icon: Users,
    subItems: [
      { name: "User List", path: "/users" },
      { name: "Role", path: "/roles" },
    ],
  },
  {
    name: "Products",
    icon: Package,
    subItems: [
      { name: "Product List", path: "/products" },
      { name: "Inventory", path: "/inventory" },
    ],
  },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Reports", icon: BarChart2, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];
