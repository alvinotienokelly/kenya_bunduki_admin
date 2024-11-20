import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileModal = ({ user }) => {
    const navigate = useNavigate();
  return (
      <div className="border border-gray-100 dark:border-gray-600 absolute right-0 mt-2 top-[100%] w-64 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 z-50 text-sm">
          <p className="text-primary dark:text-white font-semibold mb-1">{user?.name}</p>
          <p className="text-gray-700 dark:text-gray-400">{user?.email}</p>
          <p className="text-gray-500 dark:text-gray-300 text-xs">Role: {user?.role}</p>
          <p className="text-gray-500 dark:text-gray-300 text-xs">KYC Status: {user?.kyc_status}</p>
          <button
              onClick={() => navigate('/profile')}
              className="mt-2 text-primary dark:text-white dark:underline font-semibold w-full text-left"
          >
              View Profile
          </button>
          <button
              onClick={() => navigate('/accounts/login')}
              className="mt-2 text-red-500 font-semibold text-left w-full"
          >
              Log Out
          </button>
      </div>
  )
}

export default ProfileModal