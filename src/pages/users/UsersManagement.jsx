import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import {
  fetchUsers,
  updateUserRole,
  deactivateUser,
  banUser,
} from "../../services/api_service";
import { FaEdit, FaBan, FaUserSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.users);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleUpdateRole = async (userId) => {
    try {
      await updateUserRole(userId, newRole);
      toast.success("User role updated successfully");
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await deactivateUser(userId);
      toast.success("User deactivated successfully");
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: "Deactivated" } : user
        )
      );
    } catch (error) {
      toast.error("Failed to deactivate user");
    }
  };

  const handleBan = async (userId) => {
    try {
      await banUser(userId);
      toast.success("User banned successfully");
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: "Banned" } : user
        )
      );
    } catch (error) {
      toast.error("Failed to ban user");
    }
  };

  return (
    <Layout title="Users Management">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                User ID
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Email</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Role</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Status
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">{user.status}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeactivate(user.id)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <FaUserSlash />
                    </button>
                    <button
                      onClick={() => handleBan(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaBan />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Update User Role</h2>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="range_officer">Range Officer</option>
              <option value="user">User</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-1.5 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateRole(selectedUser.id)}
                className="bg-primary text-white px-4 py-1.5 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UsersManagement;
