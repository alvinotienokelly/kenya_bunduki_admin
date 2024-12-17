import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaEye, FaTrashAlt } from 'react-icons/fa';

const MilestonesTable = ({ milestones, onView, onEdit, onDelete }) => {
    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.length > 4 ? `${words.slice(0, 4).join(' ')}...` : description;
    };

    return (
        <div className="mt-4 overflow-x-auto bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg">
            <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white text-black text-left">
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Title</th>
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Description</th>
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Status</th>
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Due Date</th>
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {milestones?.length > 0 ? (
                        milestones.map((milestone, index) => (
                            <tr
                                className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-500' : 'bg-gray-100 dark:bg-gray-600'} text-gray-700 dark:text-gray-100 text-[14px]`}
                                key={milestone.milestone_id}
                            >
                                <td className="py-2 px-4 border-b">{milestone.title}</td>
                                <td className="py-2 px-4 border-b">{truncateDescription(milestone.description)}</td>
                                <td className="py-2 px-4 border-b">{milestone.status}</td>
                                <td className="py-2 px-4 border-b">
                                    {new Date(milestone.due_date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border-b text-center flex justify-center gap-2">
                                    <button
                                        onClick={() => onView(milestone)}
                                        className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                                    >
                                        <FaEye size={16} />
                                    </button>
                                    <button
                                        onClick={() => onEdit(milestone)}
                                        className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                                    >
                                        <CiEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(milestone)}
                                        className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                                    >
                                        <FaTrashAlt size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-4 px-4 text-center">
                                No milestones available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MilestonesTable;