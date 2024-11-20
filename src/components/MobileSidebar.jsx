import React, { useEffect } from 'react';
import { FaRegFileAlt, FaRegHandshake, FaFileInvoice, FaUsers, FaDatabase, FaTasks, FaFlag } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const MobileSidebar = ({ isOpen, onClose, user }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (isOpen) {
            const handleOutsideClick = (event) => {
                if (!event.target.closest('.sidebar') && !event.target.closest('.sidebar-toggle')) {
                    onClose();
                }
            };
            document.addEventListener('click', handleOutsideClick);
            return () => document.removeEventListener('click', handleOutsideClick);
        }
    }, [isOpen, onClose]);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black z-40 transition-opacity ${isOpen ? 'opacity-40' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div
                className={`fixed top-0 right-0 w-4/5 h-full bg-white dark:bg-gray-800 text-white shadow-lg z-50 transform transition-all sidebar ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700">
                            <div className="text-xl font-semibold text-primary dark:text-white">Menu</div>
                            <button onClick={onClose} className="text-2xl text-primary dark:text-white">&times;</button>
                        </div>

                        <div className="flex flex-col p-6 space-y-4">
                            <MenuItem icon={<FaRegHandshake size={24} />} label="Deals" onClick={() => navigate('/dashboard/deals')} />
                            <MenuItem icon={<FaFileInvoice size={24} />} label="Transactions" onClick={() => navigate('/dashboard/transactions')} />
                            <MenuItem icon={<FaUsers size={24}  />} label="Target Companies" onClick={() => navigate('/dashboard/companies')} />
                            <MenuItem icon={<FaRegFileAlt size={24} />} label="Audit Logs" onClick={() => navigate('/dashboard/audit-logs')} />
                            <MenuItem icon={<FaTasks size={24}  />} label="Tasks" onClick={() => navigate('/dashboard/tasks')} />
                            <MenuItem icon={<FaDatabase size={24}  />} label="Documents" onClick={() => navigate('/dashboard/documents')} />
                            <MenuItem icon={<IoSettingsOutline size={24}  />} label="Settings" onClick={() => navigate('/dashboard/settings')} />
                            <MenuItem icon={<IoMdNotificationsOutline size={24} />} label="Notifications" onClick={() => navigate('/notifications')} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center border-t border-gray-700">
                        <div className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-600 p-4 w-full justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="theme"
                                    className="sr-only peer"
                                    onChange={() => toggleTheme()}
                                    checked={theme === 'light'}
                                />
                                <div
                                    className={`w-16 h-8 rounded-full border-2 ${theme === 'light' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600'
                                        } flex items-center justify-center`}
                                >
                                    <span className="text-sm font-medium">Light</span>
                                </div>
                            </label>

                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="theme"
                                    className="sr-only peer"
                                    onChange={() => toggleTheme()}
                                    checked={theme === 'dark'}
                                />
                                <div
                                    className={`w-16 h-8 rounded-full border-2 ${theme === 'dark' ? 'bg-primary text-white' : 'bg-gray-200 text-primary dark:bg-gray-600'
                                        } flex items-center justify-center`}
                                >
                                    <span className="text-sm font-medium">Dark</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex items-center mb-4 py-6">
                            <img
                                src={user?.profile_image || 'https://your-default-image-link.com'}
                                className="w-14 h-14 rounded-full border-2 border-gray-200 dark:border-white"
                                alt="avatar"
                            />
                            <div className="ml-3 text-start">
                                <p className="font-semibold text-lg text-black dark:text-white">{user?.name || 'User Name'}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{user?.email || 'user@example.com'}</p>
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
        className="flex items-center text-lg cursor-pointer py-3 px-4 rounded-md text-white hover:bg-indigo-700 transition-colors duration-200 w-full"
        onClick={onClick}
    >
        <div className="text-indigo-300 mr-4">{icon}</div>
        <span className='dark:text-white text-primary'>{label}</span>
    </div>
);

export default MobileSidebar;
