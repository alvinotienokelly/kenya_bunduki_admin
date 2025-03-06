import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import {
  fetchBookings,
  approveBooking,
  rejectBooking,
  modifyBooking,
  cancelBooking,
  createBooking,
  fetchGunTypes,
} from "../../services/api_service";
import { FaCheck, FaTimes, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [gunTypes, setGunTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    gunType: "",
  });

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetchBookings();
        setBookings(response);
      } catch (error) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    const getGunTypes = async () => {
      try {
        const response = await fetchGunTypes();
        setGunTypes(response);
      } catch (error) {
        toast.error("Failed to fetch gun types");
      }
    };

    getBookings();
    getGunTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    try {
      await createBooking(formData);
      toast.success("Booking added successfully");
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        numberOfPeople: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        gunType: "",
      });
      const response = await fetchBookings();
      setBookings(response);
    } catch (error) {
      toast.error("Failed to add booking");
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await approveBooking(bookingId);
      toast.success("Booking approved successfully");
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "Approved" }
            : booking
        )
      );
    } catch (error) {
      toast.error("Failed to approve booking");
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await rejectBooking(bookingId);
      toast.success("Booking rejected successfully");
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "Rejected" }
            : booking
        )
      );
    } catch (error) {
      toast.error("Failed to reject booking");
    }
  };

  const handleModify = async (bookingId, newDetails) => {
    try {
      await modifyBooking(bookingId, newDetails);
      toast.success("Booking modified successfully");
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, ...newDetails } : booking
        )
      );
    } catch (error) {
      toast.error("Failed to modify booking");
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <Layout title="Bookings Management">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white font-medium text-[14px] flex items-center justify-center gap-2 px-6 py-0.5 md:py-1.5 rounded-md"
        >
          <FaPlus /> Add Booking
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Booking ID
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Email</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Phone</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Number of People
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Booking Date
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Start Time
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                End Time
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Gun Type
              </th>
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
                <td colSpan="11" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">{booking.id}</td>
                  <td className="py-2 px-4">{booking.name}</td>
                  <td className="py-2 px-4">{booking.email}</td>
                  <td className="py-2 px-4">{booking.phone}</td>
                  <td className="py-2 px-4">{booking.numberOfPeople}</td>
                  <td className="py-2 px-4">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{booking.startTime}</td>
                  <td className="py-2 px-4">{booking.endTime}</td>
                  <td className="py-2 px-4">{booking.gunType}</td>
                  <td className="py-2 px-4">{booking.status}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleApprove(booking.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleReject(booking.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={() =>
                        handleModify(booking.id, {
                          /* new details */
                        })
                      }
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center py-4">
                  No bookings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">Add Booking</h2>
            <form onSubmit={handleAddBooking} className="space-y-4">
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
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Number of People
                </label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">
                  Booking Date
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
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
                  Gun Type
                </label>
                <select
                  name="gunType"
                  value={formData.gunType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Gun Type</option>
                  {gunTypes.map((gun) => (
                    <option key={gun.id} value={gun.id}>
                      {gun.name}
                    </option>
                  ))}
                </select>
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
                  Add Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookingsManagement;