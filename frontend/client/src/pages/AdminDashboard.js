// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Alert,
  Card,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import styles from "../styles/AdminDashboard.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/appointments/admin",
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log("Fetched appointments for admin:", res.data); // Log fetched appointments
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

  const handleShow = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>Manage Appointments</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={12}>
          <Card className={styles.card}>
            <Card.Header>
              <h5>All Appointments</h5>
            </Card.Header>
            <Card.Body>
              <Table className={styles.table} striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Service</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr
                        key={appointment._id}
                        onClick={() => handleShow(appointment)}
                      >
                        <td>
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td>{appointment.time}</td>
                        <td>{appointment.service}</td>
                        <td>{appointment.name}</td>
                        <td>{appointment.email}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent modal from opening
                              cancelAppointment(appointment._id);
                            }}
                          >
                            Cancel
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Appointment Details */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>
                <strong>Name:</strong> {selectedAppointment.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedAppointment.email}
              </p>
              <p>
                <strong>Message:</strong> {selectedAppointment.message}
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

export default AdminDashboard;
