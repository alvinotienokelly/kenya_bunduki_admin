import React, { useEffect, useState } from 'react';
import { getDealTasks } from '../../services/api_service';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Modal from '../../elements/Modal';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';

const DealTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalType, setModalType] = useState(null);
    const { id: dealId } = useParams();
    const [newTaskData, setNewTaskData] = useState({
        title: '',
        description: '',
        assigned_to: '',
        due_date: '',
        deal_id: dealId
    });

    const fetchDealTasks = async () => {
        try {
            const response = await getDealTasks(dealId);
            setTasks(response.tasks);
        } catch (error) {
            console.error("Error fetching deal tasks:", error);
            toast.error("Error fetching deal tasks");
        }
    };

    const handleOpenModal = (task, type) => {
        setSelectedTask(task);
        setModalType(type);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
        setModalType(null);
    };

    useEffect(() => {
        fetchDealTasks();
    }, []);
    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.length > 4 ? `${words.slice(0, 4).join(' ')}...` : description;
    };

    return (
        <div className='border p-4 rounded-lg border-gray-300'>
            <div className="flex w-full items-center justify-between">
                <p className="text-[16px] font-semibold text-primary dark:text-white">Tasks</p>
            </div>

            <div className="mt-4 overflow-x-auto bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg">
                <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white text-black text-left">
                            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Title</th>
                            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Description</th>
                            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Status</th>
                            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Due Date</th>
                            <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.length > 0 ? (
                            tasks?.map((task, index) => (
                                <tr
                                    className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-700'} text-gray-700 dark:text-gray-100 text-[14px]`}
                                    key={task.task_id}
                                >
                                    <td className="py-2 px-4 border-b">{task.title}</td>
                                    <td className="py-2 px-4 border-b">{truncateDescription(task.description)}</td>
                                    <td className="py-2 px-4 border-b">{task.status}</td>
                                    <td className="py-2 px-4 border-b">
                                        {new Date(task.due_date).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center flex gap-2">
                                        <button
                                            onClick={() => handleOpenModal(task, 'view')}
                                            className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                                        >
                                            <FaEye size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleOpenModal(task, 'edit')}
                                            className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                                        >
                                            <CiEdit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleOpenModal(task, 'delete')}
                                            className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                                        >
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 px-4 text-center">No tasks available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modalType && (
                <Modal title={
                    modalType === 'add' ? "Add New Task" :
                        modalType === 'view' ? "Task Details" :
                            modalType === 'edit' ? "Edit Task" :
                                "Confirm Delete"
                } onClose={handleCloseModal}>
                    {modalType === 'view' && selectedTask && (
                        <div className="space-y-4">
                            <div><strong>Title:</strong> {selectedTask.title}</div>
                            <div><strong>Description:</strong> {selectedTask.description}</div>
                            <div><strong>Status:</strong> {selectedTask.status}</div>
                            <div><strong>Due Date:</strong> {new Date(selectedTask.due_date).toLocaleDateString()}</div>
                            <hr className='w-full my-2' />
                            <div>
                                <strong>Assigned To:</strong> {selectedTask.assignee?.name} ({selectedTask.assignee?.email})
                            </div>
                            <div>
                                <strong>Created By:</strong> {selectedTask.creator?.name} ({selectedTask.creator?.email})
                            </div>
                            <hr className='w-full my-2' />
                            <div><strong>Deal:</strong> {selectedTask.deal?.title}</div>
                            <div><strong>Deal Sector:</strong> {selectedTask.deal?.sector}</div>
                            <div><strong>Deal Region:</strong> {selectedTask.deal?.region}</div>
                            <div><strong>Deal Stage:</strong> {selectedTask.deal?.deal_stage}</div>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default DealTasks;