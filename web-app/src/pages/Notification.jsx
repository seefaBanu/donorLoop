import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBell, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import Services from '../services/Services';

const Notification = ({ token, userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await Services.getNotificationsByBloodDonorId(token, userId);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [token, userId]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-600 mr-2" />;
      case 'error':
        return <FaTimesCircle className="text-red-600 mr-2" />;
      case 'warning':
        return <FaExclamationCircle className="text-yellow-600 mr-2" />;
      case 'info':
        return <FaInfoCircle className="text-blue-600 mr-2" />;
      default:
        return <FaBell className="text-gray-600 mr-2" />;
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-3xl mb-6 flex items-center justify-center">
        <FaBell className="mr-2 text-red-600" /> Notifications
      </h2>
      <ul>
        {notifications.length === 0 ? (
          <li className="text-center">No notifications available</li>
        ) : (
          notifications.map((notification) => (
            <li
              key={notification.id}
              className={`border-b border-gray-300 py-4 flex items-start ${notification.isRead ? 'bg-gray-100' : 'bg-white'} transition-colors duration-200 hover:bg-gray-50`}
            >
              {getNotificationIcon(notification.type)}
              <div className="flex flex-col">
                <span className="font-medium">{notification.message}</span>
                <span className="text-sm text-gray-500">{new Date(notification.timestamp).toLocaleString()}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notification;
