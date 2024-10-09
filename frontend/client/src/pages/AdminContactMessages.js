import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Alert } from "react-bootstrap";
import "../styles/AdminContactDashboard.css"; // Import CSS
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setMessages(res.data);
      } catch (err) {
        setError("Failed to fetch messages. Please try again later.");
      }
    };

    fetchMessages();
  }, []);

  const cancelMessages = async (message) => {
    if (!window.confirm("Are you sure you want to cancel")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/contact/${message._id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setMessages(messages.filter((m) => m._id !== message._id));
      toast.success("Message Cancelled Successfully");
    } catch (err) {
      setError("Failed to cancel the Massage. Please try again later.");
    }
  };

  return (
    <Container className="admin-contact-dashboard">
      {" "}
      <h1 className="mb-4">Submitted Contact Messages</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message) => (
              <tr key={message._id}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>{new Date(message.date).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal from opening
                      cancelMessages(message);
                    }}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No messages found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminContactMessages;
