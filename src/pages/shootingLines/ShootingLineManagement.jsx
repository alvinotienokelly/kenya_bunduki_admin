import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import {
  fetchShootingLines,
  createShootingLine,
  updateShootingLine,
  deleteShootingLine,
} from "../../services/api_service";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const ShootingLineManagement = () => {
  const [shootingLines, setShootingLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ageGroup: "",
    feet: "",
    upToNumberOfPeople: "",
    pricePerHour: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentShootingLineId, setCurrentShootingLineId] = useState(null);

  useEffect(() => {
    const getShootingLines = async () => {
      try {
        const response = await fetchShootingLines();
        setShootingLines(response);
      } catch (error) {
        toast.error("Failed to fetch shooting lines");
      } finally {
        setLoading(false);
      }
    };

    getShootingLines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateShootingLine(currentShootingLineId, formData);
        toast.success("Shooting line updated successfully");
      } else {
        await createShootingLine(formData);
        toast.success("Shooting line created successfully");
      }
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        ageGroup: "",
        feet: "",
        upToNumberOfPeople: "",
        pricePerHour: "",
        image: null,
      });
      setIsEditing(false);
      setCurrentShootingLineId(null);
      const response = await fetchShootingLines();
      setShootingLines(response);
    } catch (error) {
      toast.error("Failed to save shooting line");
    }
  };

  const handleEditClick = (shootingLine) => {
    setFormData(shootingLine);
    setCurrentShootingLineId(shootingLine.shootingLine_id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteShootingLine(id);
      toast.success("Shooting line deleted successfully");
      const response = await fetchShootingLines();
      setShootingLines(response);
    } catch (error) {
      toast.error("Failed to delete shooting line");
    }
  };

  return (
    <Layout title="Shooting Line Management">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white font-medium text-[14px] flex items-center justify-center gap-2 px-6 py-0.5 md:py-1.5 rounded-md"
        >
          Add Shooting Line
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700">Image</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Description
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Age Group
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Feet</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Up to People
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Price/Hour
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : shootingLines.length > 0 ? (
              shootingLines.map((line) => (
                <tr key={line.id} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">
                    {line.image && (
                      <img
                        src={line.image}
                        alt={line.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4">{line.name}</td>
                  <td className="py-2 px-4">{line.description}</td>
                  <td className="py-2 px-4">{line.ageGroup}</td>
                  <td className="py-2 px-4">{line.feet}</td>
                  <td className="py-2 px-4">{line.upToNumberOfPeople}</td>
                  <td className="py-2 px-4">{line.pricePerHour}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEditClick(line)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(line.shootingLine_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No shooting lines available
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
              {isEditing ? "Edit Shooting Line" : "Add Shooting Line"}
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
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Age Group
                </label>
                <input
                  type="text"
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Feet
                </label>
                <input
                  type="number"
                  name="feet"
                  value={formData.feet}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Up to Number of People
                </label>
                <input
                  type="number"
                  name="upToNumberOfPeople"
                  value={formData.upToNumberOfPeople}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Price Per Hour
                </label>
                <input
                  type="number"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  accept="image/*"
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

export default ShootingLineManagement;
