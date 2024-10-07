import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Container>
      <h1>Notifications</h1>
      <ListGroup>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <ListGroup.Item key={notification._id}>
              {notification.message}
            </ListGroup.Item>
          ))
        ) : (
          <p>No notifications found.</p>
        )}
      </ListGroup>
    </Container>
  );
};

export default Notifications;
