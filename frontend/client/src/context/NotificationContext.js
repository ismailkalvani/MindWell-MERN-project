import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/notifications/user",
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const removeNotification = (_id) => {
    setNotifications(
      (prev) => prev.filter((notification) => notification._id !== _id) // Changed 'id' to '_id'
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
