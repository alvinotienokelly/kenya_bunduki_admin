import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaRegFileAlt,
  FaRegHandshake,
  FaClipboardList,
  FaDatabase,
  FaTasks,
  FaFlag,
} from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/noble_capital_logo.svg";
import Cookies from "js-cookie";

const SideMenu = () => {
  const location = useLocation();

  const getLinkClasses = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path))
      ? "flex items-center text-white bg-primary px-2 py-1.5 rounded text-[14px]"
      : "flex items-center text-white hover:bg-primary hover:text-white px-2 py-1.5 rounded dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700";
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    window.location.assign("/accounts/login");
  };

  return (
    <div className="hidden md:flex flex-col bg-black text-primary dark:bg-gray-900 dark:text-gray-300 w-64 h-screen justify-between p-4">
      <div className="flex flex-col">
        {/* <img src={logo} className="h-[80px] mb-6" alt="Noble Capital Logo" /> */}
        <div className="space-y-4 font-medium w-full">
          <Link
            to="/dashboard/admin"
            className={getLinkClasses(["/dashboard/admin", "/dashboard/admin"])}
          >
            <FaRegHandshake size={24} className="mr-2" /> Dashboard
          </Link>
          <Link
            to="/dashboard/bookings-management"
            className={getLinkClasses(["/dashboard/bookings-management"])}
          >
            <FaRegFileAlt size={24} className="mr-2" /> Bookings Management
          </Link>
          {/* <Link to="/dashboard/transactions" className={getLinkClasses(['/dashboard/transactions'])}>
            <FaFileInvoice size={24} className="mr-2" /> Transactions
          </Link> */}
          <Link
            to="/dashboard/users-management"
            className={getLinkClasses(["/dashboard/users-management"])}
          >
            <FaTasks size={24} className="mr-2" /> Users Management
          </Link>
          <Link
            to="/dashboard/time-slots-management"
            className={getLinkClasses(["/dashboard/time-slots-management"])}
          >
            <FaFlag size={24} className="mr-2" /> Time Slots Management
          </Link>
          <Link
            to="/dashboard/milestones"
            className={getLinkClasses(["/dashboard/milestones"])}
          >
            <FaFlag size={24} className="mr-2" /> Gun Types Management
          </Link>
          <Link
            to="/dashboard/milestones"
            className={getLinkClasses(["/dashboard/milestones"])}
          >
            <FaFlag size={24} className="mr-2" /> Payments & Transactions
          </Link>
          <Link
            to="/dashboard/milestones"
            className={getLinkClasses(["/dashboard/milestones"])}
          >
            <FaFlag size={24} className="mr-2" /> Reports & Analytics
          </Link>
          <Link
            to="/dashboard/milestones"
            className={getLinkClasses(["/dashboard/milestones"])}
          >
            <FaFlag size={24} className="mr-2" /> Notifications & Messaging
          </Link>
          {/* <Link
            to="/dashboard/target-companies"
            className={getLinkClasses(['/dashboard/target-companies'])}
          >
            <FaClipboardList size={24} className="mr-2" /> Target Companies
          </Link>
          <Link to="/dashboard/audit-logs" className={getLinkClasses(['/dashboard/audit-logs'])}>
            <FaDatabase size={24} className="mr-2" /> Audit Logs
          </Link> */}
        </div>
      </div>
      <div className="flex flex-col w-full border-t border-primary dark:border-gray-700 font-medium">
        <Link
          to="/dashboard/settings"
          className={getLinkClasses(["/dashboard/settings"])}
        >
          <IoSettingsOutline size={24} className="mr-2" /> Settings
        </Link>
        <button
          onClick={logout}
          className="flex items-center text-[15.5px] hover:bg-primary hover:text-white p-2 rounded mt-2 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <FiLogOut size={24} className="mr-2" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
