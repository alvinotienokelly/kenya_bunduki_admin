import React, { useEffect, useState } from "react";
import {
  fetchContactPerson,
  addContactperson,
  updateContactPerson,
  deleteContactPerson,
} from "../../services/api_service";
import { GoPlus } from "react-icons/go";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Modal from "../../elements/Modal";
import toast from "react-hot-toast";

const ContactPersonList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentContactId, setCurrentContactId] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetchContactPerson();
      console.log(JSON.stringify(response));
      setContacts(response.contactPersons);
    } catch (error) {
      toast.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (isEditing) {
      // Update contact logic
      updateContactPerson(currentContactId, formData)
        .then(() => {
          fetchContacts();
          toast.success("Contact person updated successfully");
        })
        .catch((error) => {
          toast.error("Error updating contact person");
        });
    } else {
      // Add contact logic

      addContactperson(formData)
        .then(() => {
          fetchContacts();
          toast.success("Contact person added successfully");
        })
        .catch((error) => {
          toast.error("Error adding contact person");
        });
    }
    setShowModal(false);
  };

  const handleEditClick = (contact) => {
    setFormData(contact);
    setCurrentContactId(contact.contact_id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setFormData({ name: "", email: "", phone: "", position: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleDeleteClick = async (contactId) => {
    try {
      await deleteContactPerson(contactId);
      toast.success("Contact person deleted successfully");
      fetchContacts();
    } catch (error) {
      toast.error("Error deleting contact person");
    }
  };

  return (
    <div className="">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddClick}
          className="bg-primary text-white font-medium text-[14px] flex items-center justify-center gap-2 px-6 py-0.5 md:py-1.5 rounded-md"
        >
          <GoPlus /> Add contact Person
        </button>
      </div>

      <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-left">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Position</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact, index) => (
            <tr
              key={contact.contact_id}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-500"
                  : "bg-gray-100 dark:bg-gray-600"
              } text-gray-700 dark:text-gray-100 text-[14px]`}
            >
              <td className="px-4 py-2">{contact?.name}</td>
              <td className="px-4 py-2">{contact?.email}</td>
              <td className="px-4 py-2">{contact.phone}</td>
              <td className="px-4 py-2">{contact.position}</td>
              <td className="px-4 py-2 flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(contact)}
                  className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                >
                  <CiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteClick(contact.contact_id)}
                  className="text-red-600 bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                >
                  <FaTrashAlt size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal
          title={isEditing ? "Edit Contact Person" : "Add Contact Person"}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter phone"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter position"
                required
              />
            </div>
            <div className="flex justify-end">
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
        </Modal>
      )}
    </div>
  );
};

export default ContactPersonList;
