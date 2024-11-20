import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaAngleDown, FaArrowLeft, FaBars } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useAuth } from '../context/AuthContext';
import NotificationsModal from '../components/NotificationsModal';
import ProfileModal from '../components/ProfileModal';
import BottomNav from '../components/BottomNav';
import MobileSidebar from '../components/MobileSidebar';
import SideMenu from '../components/SideMenu';

const Layout = ({ children, title, rightContent }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserDropdown(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const hiddenBackButtonRoutes = [
    '/dashboard/deals',
    '/dashboard/transactions',
    '/dashboard/target-companies',
    '/dashboard/settings',
  ];

  const shouldHideBackButton = hiddenBackButtonRoutes.includes(location.pathname);

  return (
    <div className={`flex w-full bg-secondary dark:bg-gray-900 md:pr-[4%] ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
      <SideMenu />
      <div
        className={`w-full bg-white dark:bg-gray-800 dark:text-white h-[100vh] md:h-[95vh] my-auto md:rounded-lg overflow-y-auto px-3 pt-3 pb-18 md:p-6 ${isSidebarOpen ? 'opacity-50 pointer-events-none' : ''
          }`}
      >
        <div className="flex items-center justify-between w-full py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="w-full flex items-center gap-2">
            {!shouldHideBackButton && (
              <FaArrowLeft
                size={22}
                onClick={handleBack}
                className="text-primary dark:text-gray-200 block cursor-pointer"
              />
            )}
            <p className="block md:hidden font-medium text-primary dark:text-gray-100 text-[18px]">
              {title}
            </p>
          </div>
          <div className="flex justify-end items-center gap-2">
            <div className="w-[150px] justify-end md:hidden items-end flex">{rightContent}</div>
            <FaBars
              className="block md:hidden cursor-pointer sidebar-toggle dark:text-gray-200"
              onClick={toggleSidebar}
            />
          </div>
          <div className="relative hidden md:flex items-center cursor-pointer">
            <div className="relative">
              <IoMdNotificationsOutline
                size={24}
                onClick={toggleNotifications}
                className="dark:text-gray-400"
              />
              {showNotifications && <NotificationsModal />}
            </div>

            <img
              src={user?.profile_image || 'https://imgs.search.brave.com/YcOb3nkF9Tt_BRIMTP5jCYb20mROntYoNtJmshsJrNc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTM4/NzA3NzkyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TXF6/YjkwQzBERWd3MF9U/RkNtaUtkVHhNUGdQ/M19yMGtfMHVoV1BE/Y0VJaz0'}
              className="w-[32px] h-[32px] ml-2 rounded-full border border-primary dark:border-gray-600"
              alt="User avatar"
              onClick={toggleUserDropdown}
            />
            <FaAngleDown
              size={20}
              onClick={toggleUserDropdown}
              className="dark:text-gray-400"
            />

            {showUserDropdown && <ProfileModal user={user} />}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 mt-2">
          <p className="dark:text-gray-400">Home</p>
          <p className="dark:text-gray-400">/</p>
          <p className="text-black dark:text-white text-[16px] font-medium">{title}</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center justify-end md:justify-between w-full">
          <p className="text-primary dark:text-gray-100 hidden md:block font-semibold text-[22px] mt-2">
            {title}
          </p>
          <div className="hidden md:block">{rightContent}</div>
        </div>

        {children}
      </div>
      <BottomNav />
      <MobileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} user={user} />
    </div>

  );
};

export default Layout;
