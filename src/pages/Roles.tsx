import React, { useState } from "react";
//import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
//import EditRoleModal from "../components/EditRoleModal";

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

/*const mockFetchRoles = async (): Promise<Role[]> => {
  // Simulating API call
  return [
    { id: 1, name: "Admin", permissions: ["all"] },
    { id: 2, name: "Manager", permissions: ["read", "write"] },
    { id: 3, name: "User", permissions: ["read"] },
  ];
};*/

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: "Admin", permissions: ["all"] },
    { id: 2, name: "Manager", permissions: ["read", "write"] },
    { id: 3, name: "User", permissions: ["read"] },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  /*const {
    data: roles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: mockFetchRoles,
  });*/

  const filteredRoles = roles?.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //if (isLoading) return <div>Loading...</div>;
  //if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const handleAddRole = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEditRole = (id: number) => {
    const roleToEdit = roles.find((role) => role.id === id);
    if (roleToEdit) {
      setEditingRole(roleToEdit);
      setIsModalOpen(true);
    }
  };
  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleSaveRole = (savedRole: Role) => {
    if (savedRole.id === 0) {
      // Add new product
      const newRole = { ...savedRole, id: Date.now() };
      setRoles([...roles, newRole]);
    } else {
      // Update existing product
      setRoles(
        roles.map((product) => (product.id === savedRole.id ? savedRole : role))
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumbs
        items={[{ name: "Home", path: "/home" }, { name: "Roles" }]}
      />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Roles</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search roles..."
          className="w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleAddRole}
          className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Role
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRoles?.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {role.permissions.join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {isModalOpen && (
        <EditRoleModal
          product={editingRole}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveRole}
        />
      )} */}
    </div>
  );
};

export default Roles;
