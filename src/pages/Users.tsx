import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
import EditUserModal from "../components/EditUserModal";
import Breadcrumbs from "../components/Breadcrumbs";
import TableFooter from "../components/TableFooter";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "Admin",
      status: true,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      role: "Manager",
      status: true,
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@example.com",
      role: "User",
      status: false,
    },
    {
      id: 4,
      firstName: "Alice",
      lastName: "Williams",
      email: "alice@example.com",
      role: "Manager",
      status: true,
    },
    {
      id: 5,
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie@example.com",
      role: "User",
      status: true,
    },
    {
      id: 6,
      firstName: "Diana",
      lastName: "Prince",
      email: "diana@example.com",
      role: "Admin",
      status: true,
    },
    {
      id: 7,
      firstName: "Edward",
      lastName: "Norton",
      email: "edward@example.com",
      role: "User",
      status: false,
    },
    {
      id: 8,
      firstName: "Frank",
      lastName: "Castle",
      email: "frank@example.com",
      role: "Manager",
      status: true,
    },
    {
      id: 9,
      firstName: "Grace",
      lastName: "Kelly",
      email: "grace@example.com",
      role: "User",
      status: true,
    },
    {
      id: 10,
      firstName: "Henry",
      lastName: "Ford",
      email: "henry@example.com",
      role: "User",
      status: false,
    },
    {
      id: 11,
      firstName: "Iris",
      lastName: "West",
      email: "iris@example.com",
      role: "Manager",
      status: true,
    },
    {
      id: 12,
      firstName: "Jack",
      lastName: "Ryan",
      email: "jack@example.com",
      role: "User",
      status: true,
    },
    {
      id: 13,
      firstName: "Kelly",
      lastName: "Johnson",
      email: "kelly@example.com",
      role: "Admin",
      status: true,
    },
    {
      id: 14,
      firstName: "Luke",
      lastName: "Cage",
      email: "luke@example.com",
      role: "User",
      status: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<keyof User>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    filterAndSortUsers();
  }, [searchTerm, roleFilter, statusFilter, sortField, sortDirection, users]);

  const filterAndSortUsers = () => {
    let filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (roleFilter !== "All") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (user) => user.status === (statusFilter === "Active")
      );
    }

    const sorted = filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredUsers(sorted);
  };

  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setEditingUser(userToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSaveUser = (savedUser: User) => {
    if (savedUser.id === 0) {
      // Add new user
      const newUser = { ...savedUser, id: Date.now() };
      setUsers([...users, newUser]);
    } else {
      // Update existing user
      setUsers(
        users.map((user) => (user.id === savedUser.id ? savedUser : user))
      );
    }
    setIsModalOpen(false);
  };

  const handleStatusChange = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
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

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumbs
        items={[{ name: "Home", path: "/home" }, { name: "Users" }]}
      />
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        User Management
      </h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            className="ml-4 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
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
          onClick={handleAddUser}
          className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("firstName")}
              >
                Name
                {sortField === "firstName" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email
                {sortField === "email" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("role")}
              >
                Role
                {sortField === "role" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {`${user.firstName} ${user.lastName}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <label className="switch-sm">
                    <input
                      type="checkbox"
                      checked={user.status}
                      onChange={() => handleStatusChange(user.id)}
                    />
                    <span className="sr-only">User status</span>
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="text-primary-600 hover:text-primary-900 mr-2"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
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
          totalPages={Math.ceil(filteredUsers.length / rowsPerPage)}
          rowsPerPage={rowsPerPage}
          totalItems={filteredUsers.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
      {isModalOpen && (
        <EditUserModal
          user={editingUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default Users;
