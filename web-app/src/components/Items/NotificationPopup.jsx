import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IoDisc, IoTime } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Services from "../../services/Services";


const NotificationPopup = ({ userId, token, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const popupRef = useRef(null);
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    Services.getNotificationsByBloodDonorId(token, userId)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
        }
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }, [userId, token]);

  const markAsRead = (notificationId) => {
    Services.markAsRead(notificationId, token)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification
          )
        );
      })
      .catch((error) =>
        console.error("Error marking notification as read:", error)
      );
  };

  const markAllAsRead = () => {
    Services.markAllAsRead(userId, token)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) => ({
            ...notification,
            isRead: true,
          }))
        );
        setState({ ...state, open: true });
      })
      .catch((error) =>
        console.error("Error marking all notifications as read:", error)
      );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleNotificationClick = (notificationId) => {
    markAsRead(notificationId);
    setState({ ...state, open: true });
    navigate("/request");
  };

  const formatTimestamp = (timestamp) => {
    const sriLankaTimeZone = "Asia/Colombo";
    return new Intl.DateTimeFormat("en-US", {
      timeZone: sriLankaTimeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(timestamp));
  };

  const handleSnackBarClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div
      ref={popupRef}
      className="absolute lg:top-8  bg-white border rounded shadow-lg w-80 z-50 top-18 right-0"
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-base font-semibold">Notifications</h2>
        {notifications.length > 0 && (
          <button
            className="text-left text-sm text-gray-700 hover:underline"
            onClick={markAllAsRead}
          >
            Mark all as read
            <Snackbar
              autoHideDuration={3000}
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleSnackBarClose}
              message="Marked all as read"
              key={vertical + horizontal}
            />
          </button>
        )}
      </div>
      <div className="max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4  border-b flex flex-col justify-between  ${
                notification.isRead ? "bg-gray-100" : ""
              }`}
              onClick={() => navigate("/request")}
            >
              <div className="flex my-1">
                <p className="text-sm">{notification.message}</p>
                {!notification.isRead && (
                  <Tooltip title="Mark as Read">
                    <button
                      className="text-green-500 hover:underline text-sm my-auto"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <IoDisc />
                      <Snackbar
                        autoHideDuration={3000}
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleSnackBarClose}
                        message="Marked as read"
                        key={vertical + horizontal}
                      />
                    </button>
                  </Tooltip>
                )}
              </div>
              <p className="flex gap-1 text-xs text-gray-600">
                <IoTime className="my-auto text-red-600" />
                {formatTimestamp(notification.timestamp)}
              </p>{" "}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
