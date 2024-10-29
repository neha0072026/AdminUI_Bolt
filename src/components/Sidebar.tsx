import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import { navItems } from "../config/navigation";

const Sidebar: React.FC<{
  isCollapsed: boolean;
  toggleSidebar: () => void;
}> = ({ isCollapsed, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const location = useLocation();

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const isMenuOpen = (name: string) => openMenus.includes(name);

  const isActive = (path: string) => location.pathname === path;

  const logoUrl = import.meta.env.VITE_LOGO_URL;
  const logoText = import.meta.env.VITE_LOGO_TEXT || "Admin";

  return (
    <div
      className={`bg-white text-gray-800 border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col h-full`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center justify-center w-full">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="h-11 max-w-full object-contain"
              />
            ) : (
              <span className="font-semibold text-xl text-gray-800">
                {logoText}
              </span>
            )}
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-md hover:bg-gray-100 ${
            isCollapsed ? "mx-auto" : ""
          }`}
        >
          <Menu className="h-6 w-6 text-gray-400" />
        </button>
      </div>
      <nav className="mt-4 flex-grow overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`w-full flex items-center justify-between py-2 px-4 text-gray-600 hover:bg-gray-100 ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`h-5 w-5 text-gray-400 ${
                        isCollapsed ? "mr-0" : "mr-2"
                      }`}
                    />
                    {!isCollapsed && (
                      <span
                        className="font-semibold text-base"
                        style={{ fontWeight: 650 }}
                      >
                        {item.name}
                      </span>
                    )}
                  </div>
                  {!isCollapsed &&
                    (isMenuOpen(item.name) ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ))}
                </button>
                {isMenuOpen(item.name) && !isCollapsed && (
                  <div className="ml-4">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block py-2 px-4 text-base ${
                            isActive
                              ? "text-primary-600 bg-gray-100 font-medium"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
                          }`
                        }
                        style={{ fontWeight: 550 }}
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 ${
                    isActive
                      ? "text-primary-600 bg-gray-100 font-semibold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                  } ${isCollapsed ? "justify-center" : ""}`
                }
                style={{ fontWeight: 650 }}
              >
                <item.icon
                  className={`h-5 w-5 ${isCollapsed ? "mr-0" : "mr-2"} ${
                    isActive(item.path) ? "text-primary-600" : "text-gray-400"
                  }`}
                />
                {!isCollapsed && <span className="text-base">{item.name}</span>}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
