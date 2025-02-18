import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import {
  fetchGunTypes,
  createGunType,
  updateGunType,
  deleteGunType,
} from "../../services/api_service";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const GunTypesManagement = () => {
  const [gunTypes, setGunTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rentalPrice: "",
    restrictions: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentGunTypeId, setCurrentGunTypeId] = useState(null);

  useEffect(() => {
    const getGunTypes = async () => {
      try {
        const response = await fetchGunTypes();
        setGunTypes(response.gunTypes);
      } catch (error) {
        toast.error("Failed to fetch gun types");
      } finally {
        setLoading(false);
      }
    };

    getGunTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateGunType(currentGunTypeId, formData);
        toast.success("Gun type updated successfully");
      } else {
        await createGunType(formData);
        toast.success("Gun type created successfully");
      }
      setShowModal(false);
      setFormData({ name: "", rentalPrice: "", restrictions: "" });
      setIsEditing(false);
      setCurrentGunTypeId(null);
      const response = await fetchGunTypes();
      setGunTypes(response.gunTypes);
    } catch (error) {
      toast.error("Failed to save gun type");
    }
  };

  const handleEditClick = (gunType) => {
    setFormData(gunType);
    setCurrentGunTypeId(gunType.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteClick = async (gunTypeId) => {
    try {
      await deleteGunType(gunTypeId);
      toast.success("Gun type deleted successfully");
      const response = await fetchGunTypes();
      setGunTypes(response.gunTypes);
    } catch (error) {
      toast.error("Failed to delete gun type");
    }
  };

  return (
    <Layout title="Gun Types Management">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white font-medium text-[14px] flex items-center justify-center gap-2 px-6 py-0.5 md:py-1.5 rounded-md"
        >
          Add Gun Type
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Rental Price
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Restrictions
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : gunTypes.length > 0 ? (
              gunTypes.map((gunType) => (
                <tr key={gunType.id} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">{gunType.name}</td>
                  <td className="py-2 px-4">{gunType.rentalPrice}</td>
                  <td className="py-2 px-4">{gunType.restrictions}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEditClick(gunType)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(gunType.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No gun types available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Gun Type" : "Add Gun Type"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  Rental Price
                </label>
                <input
                  type="number"
                  name="rentalPrice"
                  value={formData.rentalPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Restrictions
                </label>
                <textarea
                  name="restrictions"
                  value={formData.restrictions}
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

export default GunTypesManagement;
