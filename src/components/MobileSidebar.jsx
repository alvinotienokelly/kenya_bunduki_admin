import React, { useEffect } from 'react';
import {
    FaRegFileAlt, FaRegHandshake, FaFileInvoice,
    FaUsers, FaDatabase, FaTasks, FaFlag
} from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const MobileSidebar = ({ isOpen, onClose, user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            const handleOutsideClick = (event) => {
                if (!event.target.closest('.sidebar') && !event.target.closest('.sidebar-toggle')) {
                    onClose();
                }
            };
            document.addEventListener('click', handleOutsideClick);

            return () => {
                document.removeEventListener('click', handleOutsideClick);
            };
        }
    }, [isOpen, onClose]);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black z-40 transition-opacity ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div
                className={`fixed top-0 right-0 w-3/4 h-full bg-secondary dark:bg-gray-800 text-black dark:text-gray-200 shadow-2xl z-50 transform transition-all sidebar ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
                            <div className="text-xl font-semibold">Menu</div>
                            <button onClick={onClose} className="text-2xl text-primary dark:text-white">&times;</button>
                        </div>

                        <div className="flex flex-col items-start p-6 space-y-2">
                            <MenuItem icon={<FaRegHandshake />} label="Deals" onClick={() => navigate('/dashboard/deals')} />
                            <MenuItem icon={<FaFileInvoice />} label="Transactions" onClick={() => navigate('/dashboard/transactions')} />
                            <MenuItem icon={<FaUsers />} label="Target Companies" onClick={() => navigate('/dashboard/companies')} />
                            <MenuItem icon={<FaRegFileAlt />} label="Audit Logs" onClick={() => navigate('/dashboard/audit-logs')} />
                            <MenuItem icon={<FaFlag />} label="Milestones" onClick={() => navigate('/dashboard/milestones')} />
                            <MenuItem icon={<FaTasks />} label="Tasks" onClick={() => navigate('/dashboard/tasks')} />
                            <MenuItem icon={<FaDatabase />} label="Documents" onClick={() => navigate('/dashboard/documents')} />
                            <MenuItem icon={<IoSettingsOutline />} label="Settings" onClick={() => navigate('/dashboard/settings')} />
                            <MenuItem icon={<IoMdNotificationsOutline size={20} />} label="Notifications" onClick={() => navigate('/notifications')} />
                        </div>
                    </div>

                    <div className="flex flex-col items-start p-6 border-t border-gray-300 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                            <img
                                src={user?.profile_image ||
                                    'https://imgs.search.brave.com/YcOb3nkF9Tt_BRIMTP5jCYb20mROntYoNtJmshsJrNc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTM4/NzA3NzkyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TXF6/YjkwQzBERWd3MF9U/RkNtaUtkVHhNUGdQ/M19yMGtfMHVoV1BE/Y0VJaz0'}
                                className="w-12 h-12 rounded-full border border-primary"
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-lg">{user?.name || 'User Name'}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const MenuItem = ({ icon, label, onClick }) => (
    <div
        className="flex items-center text-lg cursor-pointer py-2 px-4 rounded-md text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 w-full"
        onClick={onClick}
    >
        <div className="text-primary dark:text-green-400 mr-3">{icon}</div>
        <span className="">{label}</span>
    </div>
);

export default MobileSidebar;
