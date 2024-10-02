import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Services.css';

const Services = () => {
  return (
    <Container className="services-page">
      <h1 className="services-title">Our Services</h1>
      <div className="services-list">
        <Card className="service-card">
          <h5>Counseling</h5>
          <p>Get personalized counseling from experienced professionals.</p>
        </Card>
        <Card className="service-card">
          <h5>Workshops</h5>
          <p>Join our workshops to improve your mental well-being.</p>
        </Card>
        <Card className="service-card">
          <h5>Resources</h5>
          <p>Access a variety of resources to support your mental health.</p>
        </Card>
      </div>
    </Container>
  );
};

export default Services;
