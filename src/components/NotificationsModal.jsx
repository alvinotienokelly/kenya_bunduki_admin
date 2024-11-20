import React, { useEffect, useState } from 'react'
import { fetchNotifications } from '../services/api_service';
import toast from 'react-hot-toast';

const NotificationsModal = () => {
    const [notifications, setNotifications] = useState([]);

    const getNotifications = async () => {
        try {
            const response = await fetchNotifications();
            console.log(response);
            setNotifications(response.notifications);
        } catch (error) {
            toast.error("");
        }
    }

    useEffect(() => {
        getNotifications();
    }, []);

  return (
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50 text-sm">
          <p className="font-semibold text-primary mb-2">Notifications</p>
          <div className="text-gray-700 mb-2">No new notifications</div>
      </div>
  )
}

export default NotificationsModal