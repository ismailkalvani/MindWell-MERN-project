import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/ServicesSection.css';

const ServicesSection = () => {
  return (
    <section className="services-section">
      <Container>
        <h2 className="text-center mb-5">Our Services</h2>
        <Row>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <h5 className="card-title">Counseling</h5>
                <p className="card-text">Get personalized counseling from experienced professionals.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <h5 className="card-title">Workshops</h5>
                <p className="card-text">Join our workshops to improve your mental well-being.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <h5 className="card-title">Resources</h5>
                <p className="card-text">Access a variety of resources to support your mental health.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicesSection;
