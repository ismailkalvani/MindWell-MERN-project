import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <Container className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <Form className="contact-form">
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default Contact;
