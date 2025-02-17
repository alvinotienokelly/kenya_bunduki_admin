import React, { useEffect, useState } from "react";
import {
  getMilestones,
  addDealMilestone,
  updateDealMilestone,
  deleteDealMilestone,
  getAllInvestorMilestoneStatusesByUser,
} from "../../services/api_service";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import MilestonesTable from "./MilestonesTable";
import MilestoneModal from "./MilestoneModal";
import Layout from "../../elements/Layout";

const Milestones = () => {
  const [milestones, setMilestones] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { id: dealId } = useParams();
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedDeal, setSelectedDeal] = useState("");

  const fetchMilestones = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await getAllInvestorMilestoneStatusesByUser();
      console.log("User milestones" + JSON.stringify(response));
      if (response.status) {
        setMilestones(response.milestoneStatuses);
      }
    } catch (error) {
      console.error("Error fetching milestones:", error);
      toast.error("Error fetching milestones");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = () => {
    const filters = {
      status: status || "",
      created_by: createdBy || "",
      start_date: startDate || "",
      end_date: endDate || "",
      deal_id: dealId || "",
    };

    fetchMilestones(filters);
  };

  const handleOpenModal = (milestone, type) => {
    setSelectedMilestone(milestone);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedMilestone(null);
    setModalType(null);
  };

  const handleAddMilestone = async (milestoneData) => {
    try {
      await addDealMilestone({ ...milestoneData, deal_id: dealId });
      toast.success("Milestone added successfully");
      fetchMilestones();
    } catch (error) {
      console.error("Error adding milestone:", error);
      toast.error("Error adding milestone");
    }
  };

  const handleEditMilestone = async (updatedMilestone) => {
    setLoading(true);
    try {
      await updateDealMilestone(
        updatedMilestone.milestone_id,
        updatedMilestone
      );
      toast.success("Milestone updated successfully");
      fetchMilestones();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating milestone:", error);
      toast.error("Error updating milestone");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMilestone = async (milestoneId) => {
    setLoading(true);
    try {
      await deleteDealMilestone(milestoneId);
      toast.success("Milestone deleted successfully");
      fetchMilestones();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting milestone:", error);
      toast.error("Error deleting milestone");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);
  const uniqueProjects = [
    ...new Set(milestones.map((milestone) => milestone.deal.project)),
  ];

  const filteredMilestones = milestones
    .filter((milestone) =>
      activeTab === "pending"
        ? milestone.status !== "Complete"
        : milestone.status === "Complete"
    )
    .filter((milestone) =>
      selectedDeal ? milestone.deal.project === selectedDeal : true
    );
  return (
    <Layout title="Milestones">
      <h1 className="text-2xl font-bold mb-4 mt-4">Milestones</h1>

      <div className="relative mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search milestones..."
          className="w-[50%] pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm === "") {
              fetchMilestones();
            } else {
              const searched = milestones.filter((milestone) =>
                milestone.milestone.name.toLowerCase().includes(searchTerm)
              );
              setMilestones(searched);
            }
          }}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1118 10.5a7.5 7.5 0 01-1.35 6.15z"
          />
        </svg>
        <select
          className="w-[50%] pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={selectedDeal}
          onChange={(e) => setSelectedDeal(e.target.value)}
        >
          <option value="">All Projects</option>
          {uniqueProjects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 p-1">
        <div className="w-full flex gap-4 border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "pending"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "complete"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("complete")}
          >
            Complete
          </button>
        </div>

        <MilestonesTable
          milestones={filteredMilestones}
          loading={loading}
          onView={(milestone) => handleOpenModal(milestone, "view")}
          onEdit={(milestone) => handleOpenModal(milestone, "edit")}
          onDelete={(milestone) => handleOpenModal(milestone, "delete")}
        />

        {modalType && (
          <MilestoneModal
            type={modalType}
            milestone={selectedMilestone}
            loading={loading}
            onClose={handleCloseModal}
            onAdd={handleAddMilestone}
            onEdit={handleEditMilestone}
            onDelete={handleDeleteMilestone}
          />
        )}
      </div>
    </Layout>
  );
};

export default Milestones;
