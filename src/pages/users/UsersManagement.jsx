import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
  deactivateUser,
  banUser,
} from "../../services/api_service";
import { FaEdit, FaBan, FaUserSlash, FaPlus, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      toast.success("User added successfully");
      setShowModal(false);
      setFormData({ name: "", email: "", phone: "" });
      const response = await fetchUsers();
      setUsers(response.users);
    } catch (error) {
      toast.error("Failed to add user");
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser(selectedUser.id, formData);
      toast.success("User updated successfully");
      setShowModal(false);
      setFormData({ name: "", email: "", phone: "" });
      setIsEditing(false);
      const response = await fetchUsers();
      setUsers(response.users);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
      const response = await fetchUsers();
      setUsers(response.users);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

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

  const handleEditClick = (user) => {
    setFormData(user);
    setSelectedUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setFormData({ name: "", email: "", phone: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <Layout title="Users Management">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddClick}
          className="bg-primary text-white font-medium text-[14px] flex items-center justify-center gap-2 px-6 py-0.5 md:py-1.5 rounded-md"
        >
          <FaPlus /> Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                User ID
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Email</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Phone</th>
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
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.phone}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">{user.status}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
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
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit User" : "Add User"}
            </h2>
            <form onSubmit={isEditing ? handleEditUser : handleAddUser} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-1.5 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-1.5 rounded-md"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UsersManagement;