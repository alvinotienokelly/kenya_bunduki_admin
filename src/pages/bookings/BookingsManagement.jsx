import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import {
  fetchBookings,
  approveBooking,
  rejectBooking,
  modifyBooking,
  cancelBooking,
} from "../../services/api_service";
import { FaCheck, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetchBookings();
        setBookings(response.bookings);
      } catch (error) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

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
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Booking ID
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">User</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Date</th>
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
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">{booking.id}</td>
                  <td className="py-2 px-4">{booking.user.name}</td>
                  <td className="py-2 px-4">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
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
                <td colSpan="5" className="text-center py-4">
                  No bookings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default BookingsManagement;
