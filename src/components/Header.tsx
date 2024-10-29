import React, { useState, useRef, useEffect } from "react";
import { Bell, User, Search, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "../config/navigation";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof navItems>([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length > 0) {
      const filteredResults = navItems
        .flatMap((item) =>
          item.subItems
            ? [
                { name: item.name, path: item.path },
                ...item.subItems.map((subItem) => ({
                  name: `${item.name} - ${subItem.name}`,
                  path: subItem.path,
                })),
              ]
            : [{ name: item.name, path: item.path }]
        )
        .filter((item) => item.name.toLowerCase().includes(term));
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSignOut = () => {
    // Implement sign out logic here
    console.log("User signed out");
    setIsUserMenuOpen(false);
    // Redirect to login page
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center">
            <div className="max-w-xs w-full lg:max-w-xs relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none sm:text-sm">
                  {searchResults.map((item, index) => (
                    <Link
                      key={`${item.path}-${index}`}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setSearchResults([])}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            <div className="ml-3 relative" ref={userMenuRef}>
              <div>
                <button
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
                </button>
              </div>
              {isUserMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
