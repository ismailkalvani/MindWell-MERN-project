// src/pages/UserDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Alert, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/appointments/user",
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );
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
      await axios.patch(
        `http://localhost:5000/api/appointments/${id}/cancel`,
        {},
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setAppointments(
        appointments.filter((appointment) => appointment._id !== id)
      );
      setSuccess("Appointment canceled successfully.");
      toast.success("Appointment canceled successfully.");
    } catch (err) {
      setError("Failed to cancel the appointment. Please try again later.");
    }
  };

  const handleShow = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  return (
    <Container className="user-dashboard">
      <h1 className="mb-4">Your Appointments</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Table striped bordered hover responsive className="appointments-table">
        <thead>
          <tr>
            <th>User Name</th>
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
                <td>{appointment.user?.name || "Unknown"}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.time}</td>
                <td>{appointment.service}</td>
                <td>{appointment.message || "No message provided"}</td>
                <td>
                  <Button
                    variant="danger"
                    className="m-2"
                    onClick={() => cancelAppointment(appointment._id)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="info"
                    className="m-2"
                    onClick={() => handleShow(appointment)}
                  >
                    View Details
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

      {/* Modal for Appointment Details */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>
                <strong>Name:</strong> {selectedAppointment.user?.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {selectedAppointment.user?.email || "N/A"}
              </p>
              <p>
                <strong>Message:</strong> {selectedAppointment.message || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedAppointment.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedAppointment.time}
              </p>
              <p>
                <strong>Service:</strong> {selectedAppointment.service}
              </p>
              <p>
                <strong>Status:</strong> {selectedAppointment.status}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserDashboard;
