import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import {
  fetchTimeSlots,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} from "../../services/api_service";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const TimeSlotsManagement = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    isPeakHour: false,
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlotId, setCurrentSlotId] = useState(null);

  useEffect(() => {
    const getTimeSlots = async () => {
      try {
        const response = await fetchTimeSlots();
        setTimeSlots(response.timeSlots);
      } catch (error) {
        toast.error("Failed to fetch time slots");
      } finally {
        setLoading(false);
      }
    };

    getTimeSlots();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      ...formData,
    };

    try {
      if (isEditing) {
        await updateTimeSlot(currentSlotId, formDataToSend);
        toast.success("Time slot updated successfully");
      } else {
        await createTimeSlot(formDataToSend);
        toast.success("Time slot created successfully");
      }
      setShowModal(false);
      setFormData({ startTime: "", endTime: "", isPeakHour: false, date: "" });
      setIsEditing(false);
      setCurrentSlotId(null);
      const response = await fetchTimeSlots();
      setTimeSlots(response.timeSlots);
    } catch (error) {
      toast.error("Failed to save time slot");
    }
  };

  const handleEditClick = (slot) => {
    setFormData(slot);
    setCurrentSlotId(slot.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteClick = async (slotId) => {
    try {
      await deleteTimeSlot(slotId);
      toast.success("Time slot deleted successfully");
      const response = await fetchTimeSlots();
      setTimeSlots(response.timeSlots);
    } catch (error) {
      toast.error("Failed to delete time slot");
    }
  };

  return (
    <Layout title="Time Slots Management">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white font-medium text-[14px] flex items-center justify-center gap-2 px-6 py-0.5 md:py-1.5 rounded-md"
        >
          Add Time Slot
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Start Time
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                End Time
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Peak Hour
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Date
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : timeSlots.length > 0 ? (
              timeSlots.map((slot) => (
                <tr key={slot.id} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">{slot.startTime}</td>
                  <td className="py-2 px-4">{slot.endTime}</td>
                  <td className="py-2 px-4">
                    {slot.isPeakHour ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4">{slot.date}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEditClick(slot)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(slot.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No time slots available
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
              {isEditing ? "Edit Time Slot" : "Add Time Slot"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPeakHour"
                  checked={formData.isPeakHour}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-gray-700 dark:text-gray-400">
                  Peak Hour
                </label>
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

export default TimeSlotsManagement;