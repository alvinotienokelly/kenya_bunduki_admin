import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaEye, FaTrashAlt } from "react-icons/fa";

const MilestonesTable = ({ milestones, loading, onView, onEdit, onDelete }) => {
  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 4 ? `${words.slice(0, 4).join(" ")}...` : description;
  };

  const renderShimmerRows = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <tr key={index} className="animate-pulse bg-gray-200 dark:bg-gray-700">
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </td>
        <td className="px-4 py-3 flex gap-2">
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </td>
      </tr>
    ));

  return (
    <div className="mt-4 overflow-x-auto bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg">
      <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white text-black text-left">
            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">
              Deal
            </th>
            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">
              Title
            </th>
            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">
              Description
            </th>
            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">
              Status
            </th>
            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">
              Date
            </th>
            {/* <th className="py-2 px-4 border-b dark:border-gray-500 text-center">
              Actions
            </th> */}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            renderShimmerRows()
          ) : milestones?.length > 0 ? (
            milestones.map((milestone, index) => (
              <tr
                key={milestone.id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-600"
                    : "bg-gray-100 dark:bg-gray-700"
                } text-gray-700 dark:text-gray-100 text-[14px]`}
              >
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {milestone.deal.project}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {milestone.milestone.name}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {truncateDescription(milestone.milestone.description)}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {milestone.status}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {new Date(milestone.createdAt).toLocaleDateString()}
                </td>
                {/* <td className="py-2 px-4 border-b dark:border-gray-600 text-center flex justify-center gap-2">
                  <button
                    onClick={() => onView(milestone)}
                    className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                  >
                    <FaEye size={16} />
                  </button>
                </td> */}
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
