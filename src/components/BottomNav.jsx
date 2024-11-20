import React from 'react';
import { FaCog, FaRegHandshake, FaRegFileAlt, FaClipboardList } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 flex md:hidden justify-around items-center py-2 px-2">
            <NavItem
                icon={<FaRegHandshake size={24} />}
                label="Deals"
                path="/dashboard/deals"
                isActive={isActive}
                navigate={navigate}
            />
            <NavItem
                icon={<FaRegFileAlt size={24} />}
                label="Transactions"
                path="/dashboard/transactions"
                isActive={isActive}
                navigate={navigate}
            />
            <NavItem
                icon={<FaClipboardList size={24} />}
                label="Companies"
                path="/dashboard/target-companies"
                isActive={isActive}
                navigate={navigate}
            />
            <NavItem
                icon={<FaCog size={24} />}
                label="Settings"
                path="/dashboard/settings"
                isActive={isActive}
                navigate={navigate}
            />
        </div>
    );
};

const NavItem = ({ icon, label, path, isActive, navigate }) => (
    <div
        className={`flex flex-col items-center text-sm cursor-pointer transition-all ${isActive(path)
            ? 'text-blue-500 dark:text-blue-400 font-medium'
            : 'text-gray-600 dark:text-gray-400'
            }`}
        onClick={() => navigate(path)}
    >
        {icon}
        <span>{label}</span>
    </div>
);

export default BottomNav;
