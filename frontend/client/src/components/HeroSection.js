import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1>Welcome to MindWell</h1>
            <p>Your mental health is our priority. Get guidance and support here.</p>
            <Button variant="primary">Get Started</Button>
          </Col>
          <Col md={6}>
            <img src="\hero1.webp" alt="Hero" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
