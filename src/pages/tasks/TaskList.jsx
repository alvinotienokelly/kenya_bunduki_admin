import React, { useEffect, useState } from 'react';
import { getTasks } from '../../services/api_service';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import Modal from '../../elements/Modal';
import { CiEdit } from 'react-icons/ci';
import toast from 'react-hot-toast';
import TaskDetails from './TaskDetails';
import Layout from '../../elements/Layout';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDealTasks = async () => {
        setLoading(true);
        try {
            const response = await getTasks();
            setTasks(response.tasks);
        } catch (error) {
            toast.error("Error fetching deal tasks");
        } finally {
            setLoading(false);
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

    const renderShimmerRows = () => (
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
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </td>
                <td className="px-4 py-3">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </td>
            </tr>
        ))
    );

    return (
        <Layout
            title="Tasks"
        >
            <div className="w-full overflow-x-auto">
                <div className="overflow-x-auto bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg">
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
                            {loading ? (
                                renderShimmerRows()
                            ) : tasks?.length > 0 ? (
                                tasks?.map((task, index) => (
                                    <tr
                                        className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-700'} text-gray-700 dark:text-gray-100 text-[14px]`}
                                        key={task.task_id}
                                    >
                                        <td className="py-2 px-4 border-b dark:border-gray-600">{task.title}</td>
                                        <td className="py-2 px-4 border-b dark:border-gray-600">{truncateDescription(task.description)}</td>
                                        <td className="py-2 px-4 border-b dark:border-gray-600">{task.status}</td>
                                        <td className="py-2 px-4 border-b dark:border-gray-600">
                                            {new Date(task.due_date).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 border-b dark:border-gray-600w text-center flex gap-2">
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
                            <TaskDetails task={selectedTask} />
                        )}
                    </Modal>
                )}
            </div>
        </Layout>
    );
};

export default TaskList;