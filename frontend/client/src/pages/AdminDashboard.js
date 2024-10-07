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
  Form,
} from "react-bootstrap";
import styles from "../styles/AdminDashboard.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const { addNotification } = useContext(NotificationContext);

  // Function to fetch appointments
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
      console.log("Fetched appointments for admin:", res.data);
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to fetch appointments. Please try again later.");
    }
  };

  useEffect(() => {
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
    setShowRescheduleModal(false);
    setNewDate("");
    setNewTime("");
  };

  const handleApprove = async (id) => {
    const reason = "Approved by admin";
    try {
      await axios.patch(
        `http://localhost:5000/api/appointments/${id}/approve`,
        { status: "approved", reason },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      toast.success("Appointment approved!");
      fetchAppointments(); // Refresh data
      addNotification("Appointment has been approved.");
    } catch (err) {
      toast.error("Failed to approve appointment.");
    }
  };

  const handleReschedule = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/appointments/${id}/reschedule`,
        { date: newDate, time: newTime },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      toast.success("Appointment rescheduled!");
      fetchAppointments(); // Refresh data
      handleClose(); // Close the modal
    } catch (err) {
      toast.error("Failed to reschedule appointment.");
    }
  };

  // Calculate today's date and time
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const currentTime = today.toTimeString().substring(0, 5);
  const minTime = newDate === todayDate ? currentTime : "00:00"; // Updated minTime logic

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
                      <tr key={appointment._id}>
                        <td>
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td>{appointment.time}</td>
                        <td>{appointment.service}</td>
                        <td>{appointment.name}</td>
                        <td>{appointment.email}</td>
                        <td>
                          <div className="d-flex flex-column gap-2">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="w-100"
                              onClick={() => cancelAppointment(appointment._id)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="outline-success"
                              size="sm"
                              className="w-100"
                              onClick={() => handleApprove(appointment._id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="w-100"
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setShowRescheduleModal(true);
                              }}
                            >
                              Reschedule
                            </Button>
                            <Button
                              variant="outline-info"
                              size="sm"
                              className="w-100"
                              onClick={() => handleShow(appointment)}
                            >
                              View Details
                            </Button>
                          </div>
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

      {/* Modal for Rescheduling */}
      <Modal show={showRescheduleModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <Form.Group controlId="formNewDate">
                <Form.Label>New Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={todayDate}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNewTime">
                <Form.Label>New Time</Form.Label>
                <Form.Control
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  min={minTime}
                  required
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleReschedule(selectedAppointment._id)}
          >
            Reschedule
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
