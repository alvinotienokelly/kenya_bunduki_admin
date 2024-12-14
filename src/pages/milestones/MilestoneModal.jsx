import React, { useState } from 'react';
import Modal from '../../elements/Modal';

const MilestoneModal = ({ type, milestone, loading, onClose, onAdd, onEdit, onDelete }) => {
    const [milestoneData, setMilestoneData] = useState(milestone || { title: '', description: '', due_date: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMilestoneData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleAdd = () => onAdd(milestoneData);
    const handleEdit = () => onEdit(milestoneData);
    const handleDelete = () => onDelete(milestone.milestone_id);

    const renderContent = () => {
        switch (type) {
            case 'view':
                return (
                    <div>
                        <p><strong>Title:</strong> {milestone.title}</p>
                        <p><strong>Description:</strong> {milestone.description}</p>
                        <p><strong>Status:</strong> {milestone.status}</p>
                        <p><strong>Due Date:</strong> {new Date(milestone.due_date).toLocaleDateString()}</p>
                    </div>
                );
            case 'edit':
            case 'add':
                return (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={milestoneData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter milestone title"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <textarea
                                name="description"
                                value={milestoneData.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter milestone description"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
                            <input
                                type="date"
                                name="due_date"
                                value={milestoneData.due_date}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={type === 'add' ? handleAdd : handleEdit}
                                disabled={loading}
                                className={`bg-primary text-white px-6 py-2 rounded-md ${loading && "opacity-50 cursor-not-allowed"}`}
                            >
                                {loading ? (type === 'add' ? "Adding..." : "Saving...") : (type === 'add' ? "Add Milestone" : "Save Changes")}
                            </button>
                        </div>
                    </form>
                );
            case 'delete':
                return (
                    <div>
                        <p>Are you sure you want to delete this milestone?</p>
                        <div className="flex justify-end mt-4 gap-2">
                            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-1.5 rounded-md">
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className={`bg-red-600 text-white px-4 py-1.5 rounded-md ${loading && "opacity-50 cursor-not-allowed"}`}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Modal title={type === 'add' ? "Add New Milestone" : type === 'edit' ? "Edit Milestone" : type === 'delete' ? "Confirm Delete" : "Milestone Details"} onClose={onClose}>
            {renderContent()}
        </Modal>
    );
};

export default MilestoneModal;