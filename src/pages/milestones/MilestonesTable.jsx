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
    <div className="mt-4 bg-white dark:bg-gray-800  dark:border-gray-600 rounded-lg p-4">
      {milestones?.length > 0 ? (
        milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className={`${"bg-white dark:bg-gray-600"} text-gray-700 border dark:text-gray-100 p-4 rounded-lg mb-4`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                <strong>Project:</strong> {milestone.deal.project}
              </h3>
              <p className="text-sm">
                {/* <strong>Status:</strong>{" "} */}
                <span
                  className={`${
                    milestone.status === "Complete"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  <strong>{milestone.status}</strong>
                </span>
              </p>
            </div>

            <div className="mb-2">
              <strong>Milestone:</strong> {milestone.milestone.name}
            </div>
            <div className="mb-2">
              <strong>Description:</strong>{" "}
              {truncateDescription(milestone.milestone.description)}
            </div>
            <div className="mb-2"></div>
            <div className="mb-2">
              <strong>Created:</strong>{" "}
              {new Date(milestone.createdAt).toLocaleDateString()}
            </div>
            {/* <div className="flex gap-2 mt-2">
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
            </div> */}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No milestones available.
        </div>
      )}
    </div>
  );
};

export default MilestonesTable;
