import React, { useEffect, useState } from 'react';
import { getDealMilestones, addDealMilestone, updateDealMilestone, deleteDealMilestone } from '../../services/api_service';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Modal from '../../elements/Modal';
import MilestonesTable from './MilestonesTable';

const DealMilestones = () => {
    const [milestones, setMilestones] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [modalType, setModalType] = useState(null);
    const { id: dealId } = useParams();

    const fetchDealTasks = async () => {
        try {
            const response = await getDealMilestones(dealId);
            setMilestones(response.milestones);
        } catch (error) {
            console.error("Error fetching deal milestones:", error);
            toast.error("Error fetching deal milestones");
        }
    };

    const handleOpenModal = (milestone, type) => {
        setSelectedMilestone(milestone);
        setModalType(type);
    };

    const handleCloseModal = () => {
        setSelectedMilestone(null);
        setModalType(null);
    };

    useEffect(() => {
        fetchDealTasks();
    }, []);

    return (
        <div className='border p-4 rounded-lg border-gray-300 dark:border-gray-600'>
            <div className="flex w-full items-center justify-between">
                <p className="text-[16px] font-semibold text-primary dark:text-white">Milestone</p>
            </div>
            <MilestonesTable
                milestones={milestones}
                onView={(milestone) => handleOpenModal(milestone, 'view')}
                onEdit={(milestone) => handleOpenModal(milestone, 'edit')}
                onDelete={(milestone) => handleOpenModal(milestone, 'delete')}
            />

            {modalType && (
                <Modal title={modalType === 'view' ? "Milestone Details" : modalType === 'edit' ? "Edit Milestone" : "Confirm Delete"} onClose={handleCloseModal}>
                    {modalType === 'view' && (
                        <div>
                            <p><strong>Title:</strong> {selectedMilestone.title}</p>
                            <p><strong>Description:</strong> {selectedMilestone.description}</p>
                            <p><strong>Status:</strong> {selectedMilestone.status}</p>
                            <p><strong>Due Date:</strong> {new Date(selectedMilestone.due_date).toLocaleDateString()}</p>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default DealMilestones;