import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import {
  FaUsers,
  FaCalendarCheck,
  FaDollarSign,
  FaChartLine,
} from "react-icons/fa";

import { fetchRegions } from "../../services/api_service";
import Modal from "../../elements/Modal";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    availableSlots: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });
  useEffect(() => {
    const getStats = async () => {
      try {
        // const response = await fetchDashboardStats();
        // setStats(response);
      } catch (error) {
        toast.error("Failed to fetch dashboard stats");
      }
    };

    getStats();
  }, []);
  return (
    <Layout
      title="Dashboard"
      // rightContent={
      //   <div className="flex items-center px-2 border -mt-6 rounded-md">
      //     <input
      //       type="text"
      //       placeholder="Search"
      //       className="outline-none py-1 px-3 text-[14px] text-gray-400"
      //     />
      //   </div>
      // }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <FaCalendarCheck className="text-primary dark:text-white text-3xl mr-4" />
          <div>
            <p className="text-gray-600 dark:text-gray-400">Total Bookings</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {stats.totalBookings}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <FaChartLine className="text-primary dark:text-white text-3xl mr-4" />
          <div>
            <p className="text-gray-600 dark:text-gray-400">Available Slots</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {stats.availableSlots}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <FaDollarSign className="text-primary dark:text-white text-3xl mr-4" />
          <div>
            <p className="text-gray-600 dark:text-gray-400">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              ${stats.totalRevenue}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-primary dark:text-white text-3xl mr-4" />
          <div>
            <p className="text-gray-600 dark:text-gray-400">Total Users</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {stats.totalUsers}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
