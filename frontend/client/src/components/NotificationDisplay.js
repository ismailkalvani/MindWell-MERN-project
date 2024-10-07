import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationDisplay = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <ToastContainer position="top-end" className="p-3">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          bg="info"
          onClose={() => removeNotification(notification.id)}
          autohide
          delay={3000} // Optional: auto-hide after 3 seconds
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
