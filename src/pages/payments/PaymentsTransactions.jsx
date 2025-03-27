import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import {
  fetchPayments,
  processRefund,
  updateBookingPrice,
} from "../../services/api_service";
import { FaEdit, FaTrashAlt, FaUndo } from "react-icons/fa";
import toast from "react-hot-toast";

const PaymentsTransactions = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bookingId: "",
    newPrice: "",
    paymentType: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState(null);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const response = await fetchPayments();
        console.log(JSON.stringify(response));
        setPayments(response);
      } catch (error) {
        toast.error("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    getPayments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRefund = async (paymentId) => {
    try {
      await processRefund(paymentId);
      toast.success("Refund processed successfully");
      setPayments(
        payments.map((payment) =>
          payment.id === paymentId
            ? { ...payment, status: "Refunded" }
            : payment
        )
      );
    } catch (error) {
      toast.error("Failed to process refund");
    }
  };

  const handleEditClick = (payment) => {
    setFormData({ bookingId: payment.bookingId, newPrice: payment.price });
    setCurrentPaymentId(payment.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBookingPrice(currentPaymentId, formData.newPrice);
      toast.success("Booking price updated successfully");
      setShowModal(false);
      setFormData({ bookingId: "", newPrice: "", paymentType: "" });
      setIsEditing(false);
      setCurrentPaymentId(null);
      const response = await fetchPayments();
      setPayments(response.payments);
    } catch (error) {
      toast.error("Failed to update booking price");
    }
  };

  return (
    <Layout title="Payments & Transactions">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Phone</th>

              <th className="py-2 px-4 border-b dark:border-gray-700">Booking ID</th>

              <th className="py-2 px-4 border-b dark:border-gray-700">Amount</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Status</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Payment Type</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading...</td>
              </tr>
            ) : payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">{payment.Booking.name}</td>
                  <td className="py-2 px-4">{payment.Booking.phone}</td>

                  <td className="py-2 px-4">{payment.bookingId}</td>
                  <td className="py-2 px-4">${payment.amount}</td>
                  <td className="py-2 px-4">{payment.paymentStatus}</td>
                  <td className="py-2 px-4">{payment.paymentMethod}</td>
                  <td className="py-2 px-4">{new Date(payment.createdAt).toLocaleString()}</td>

                  <td className="py-2 px-4">
                    {/* {payment.paymentType === "mpesa" && <img src={mpesaLogo} alt="Mpesa" className="h-6" />}
                    {payment.paymentType === "visa" && <img src={visaLogo} alt="Visa" className="h-6" />}
                    {payment.paymentType === "mastercard" && <img src={mastercardLogo} alt="MasterCard" className="h-6" />} */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No payments available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Booking Price" : "Add Booking Price"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-400">Booking ID</label>
                <input
                  type="text"
                  name="bookingId"
                  value={formData.bookingId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-400">New Price</label>
                <input
                  type="number"
                  name="newPrice"
                  value={formData.newPrice}
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

export default PaymentsTransactions;