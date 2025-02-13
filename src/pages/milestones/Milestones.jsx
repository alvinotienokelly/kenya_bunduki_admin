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

  const fetchMilestones = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await getAllInvestorMilestoneStatusesByUser();
      console.log("User milestones" + JSON.stringify(response));
      setMilestones(response.milestoneStatuses);
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
  const filteredMilestones = milestones.filter((milestone) =>
    activeTab === "pending"
      ? milestone.status !== "Complete"
      : milestone.status === "Complete"
  );
  return (
    <Layout title="Milestones">
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
