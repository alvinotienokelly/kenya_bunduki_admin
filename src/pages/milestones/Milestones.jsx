import React, { useEffect, useState } from 'react';
import { getMilestones, addDealMilestone, updateDealMilestone, deleteDealMilestone } from '../../services/api_service';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import MilestonesTable from './MilestonesTable';
import MilestoneModal from './MilestoneModal';
import Layout from '../../elements/Layout';

const Milestones = () => {
    const [milestones, setMilestones] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { id: dealId } = useParams();

    const fetchMilestones = async (filters = {}) => {
        try {
            setLoading(true);
            const response = await getMilestones(filters);
            setMilestones(response.milestones);
        } catch (error) {
            console.error("Error fetching milestones:", error);
            toast.error("Error fetching milestones");
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = () => {
        const filters = {
            status: status || '',
            created_by: createdBy || '',
            start_date: startDate || '',
            end_date: endDate || '',
            deal_id: dealId || '',
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
            await updateDealMilestone(updatedMilestone.milestone_id, updatedMilestone);
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

    return (
        <Layout
            title="Milestones"
            rightContent={
                <button onClick={() => handleOpenModal(null, 'add')} className="bg-primary text-white font-medium text-[14px] px-6 py-1.5 rounded-md">
                    Add Milestone
                </button>
            }
        >
            <div className="mt-4 p-1">
                <div className="w-full justify-between flex gap-4">
                    <div className="flex items-center gap-4">
                        <select
                            className="px-3 py-1 border rounded-md bg-transparent"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Complete">Complete</option>
                        </select>

                        <input
                            type="text"
                            className="px-3 py-1 border rounded-md"
                            placeholder="Created by (Investor)"
                            value={createdBy}
                            onChange={(e) => setCreatedBy(e.target.value)}
                        />

                        <input
                            type="date"
                            className="px-3 py-1 border rounded-md"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            className="px-3 py-1 border rounded-md"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleFilterChange}
                        className="bg-primary text-white px-6 py-1 text-[14px] rounded-md"
                    >
                        Filter
                    </button>
                </div>

                <MilestonesTable
                    milestones={milestones}
                    loading={loading}
                    onView={(milestone) => handleOpenModal(milestone, 'view')}
                    onEdit={(milestone) => handleOpenModal(milestone, 'edit')}
                    onDelete={(milestone) => handleOpenModal(milestone, 'delete')}
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