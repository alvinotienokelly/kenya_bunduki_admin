import React, { useEffect, useState } from "react";
import {
  fetchSectors,
  createUserTicketPreference,
  getUserTicketPreferences,
  updateTicketPreference,
} from "../../services/api_service";
import { GoPlus } from "react-icons/go";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Modal from "../../elements/Modal";
import toast from "react-hot-toast";

const FundStrategy = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    ticket_size_min: "",
    ticket_size_max: "",
  });
  const [preferenceId, setPreferenceId] = useState(null);

  const fetchSystemSectors = async () => {
    try {
      console.log("fetching sectors");
      const response = await fetchSectors();
    } catch (error) {
      toast.error("Error fetching tasks");
    } finally {
    }
  };

  const fetchTicketPreference = async () => {
    try {
      const response = await getUserTicketPreferences();
      if (response.preferences && response.preferences.length > 0) {
        const preferences = response.preferences[0];
        setFormData({
          ticket_size_min: preferences.ticket_size_min,
          ticket_size_max: preferences.ticket_size_max,
        });
        setPreferenceId(preferences.preference_id);
      }
    } catch (error) {
      toast.error("Error fetching tasks");
    } finally {
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    try {
      if (preferenceId) {
        const response = updateTicketPreference(preferenceId, {
          ticket_size_min: formData.ticket_size_min,
          ticket_size_max: formData.ticket_size_max,
        });
        
        toast.success("Preferences updated successfully");
      } else {
        const response = createUserTicketPreference({
          ticket_size_min: formData.ticket_size_min,
          ticket_size_max: formData.ticket_size_max,
        });
        toast.success("Preferences created successfully");
      }
    } catch (error) {
        console.log(error);
      toast.error("Error saving preferences");
    }
  };
  useEffect(() => {
    fetchSystemSectors();
    fetchTicketPreference();
  }, []);

  return (
    <div className="">
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Minimum Investment Amount
              </label>
              <input
                type="number"
                name="ticket_size_min"
                value={formData.ticket_size_min}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter minimum investment amount"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Maximum Investment Amount
              </label>
              <input
                type="number"
                name="ticket_size_max"
                value={formData.ticket_size_max}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter maximum investment amount"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-1.5 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FundStrategy;
