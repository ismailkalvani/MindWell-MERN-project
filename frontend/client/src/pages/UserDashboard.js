// src/pages/UserDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/appointments/user",
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );
        console.log("Fetched appointments:", res.data); // Log fetched appointments
        setAppointments(res.data);
      } catch (err) {
        setError("Failed to fetch appointments. Please try again later.");
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setAppointments(
        appointments.filter((appointment) => appointment._id !== id)
      );
      setSuccess("Appointment canceled successfully.");
      toast.success("Appointment canceled successfully.");
    } catch (err) {
      setError("Failed to cancel the appointment. Please try again later.");
    }
  };

  return (
    <Container className="user-dashboard">
      <h1 className="mb-4">Your Appointments</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Table striped bordered hover responsive className="appointments-table">
        <thead>
          <tr>
            <th>User Name</th> {/* Added User Name column */}
            <th>Date</th>
            <th>Time</th>
            <th>Service</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.name}</td>{" "}
                {/* Assuming name is available in appointment */}
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.time}</td>
                <td>{appointment.service}</td>
                <td>{appointment.message || "N/A"}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => cancelAppointment(appointment._id)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default UserDashboard;
