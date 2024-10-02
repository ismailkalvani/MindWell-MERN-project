import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "../styles/Appointments.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const token = localStorage.getItem("token"); // Fetch token from local storage
const config = {
  headers: {
    "x-auth-token": token, // Include token in headers
  },
};

const Appointments = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    date: "",
    time: "",
    service: "Counseling", // Default service
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { name, email, message, date, time, service } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/appointments",
        formData,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"), // Include token in request
          },
        }
      );
      setSubmitted(true);
      toast.success(res.data.message);
    } catch (err) {
      setError("Failed to book the appointment. Please try again later.");
      toast.error(
        err.response?.data?.message || "Failed to book the appointment."
      );

      setSubmitted(false);
    }
  };

  return (
    <Container className="appointments-page">
      <h1 className="appointments-title">Book an Appointment</h1>
      <p className="appointments-text">
        Schedule your appointment with our mental health professionals...
      </p>
      {submitted && (
        <Alert variant="success">
          Your appointment has been booked successfully!
        </Alert>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="appointments-form" onSubmit={onSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        <Form.Group controlId="formService">
          <Form.Label>Service</Form.Label>
          <Form.Control
            as="select"
            name="service"
            value={service}
            onChange={onChange}
          >
            <option value="Counseling">Counseling</option>
            <option value="Workshop">Workshop</option>
            <option value="Resource Support">Resource Support</option>
          </Form.Control>
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={date}
                onChange={onChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={time}
                onChange={onChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={3}
            value={message}
            onChange={onChange}
            placeholder="Enter any additional information here"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Appointments;
