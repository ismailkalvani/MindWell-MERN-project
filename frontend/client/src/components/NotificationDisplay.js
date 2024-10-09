import React, { useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { NotificationContext } from "../context/NotificationContext";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationDisplay = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  // Function to mark a notification as read on the server
  const markNotificationAsRead = useCallback(
    async (_id) => {
      try {
        await axios.patch(
          `http://localhost:5000/api/notifications/${_id}/mark-read`,
          {},
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );
        removeNotification(_id); // Remove it from the frontend after marking as read
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    },
    [removeNotification]
  );

  useEffect(() => {
    if (notifications.length > 0) {
      // Only mark notifications as read when there are notifications available
      notifications.forEach((notification) => {
        // Set a timeout to keep the notification visible for a defined duration (e.g., 4 seconds)
        setTimeout(() => {
          markNotificationAsRead(notification._id);
        }, 4000); // 4000ms = 4 seconds
      });
    }
  }, [notifications, markNotificationAsRead]);

  return (
    <ToastContainer position="top-end" className="p-3">
      {notifications.map((notification) => (
        <Toast
          key={notification._id}
          bg="info"
          autohide
          delay={4000} 
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default NotificationDisplay;
