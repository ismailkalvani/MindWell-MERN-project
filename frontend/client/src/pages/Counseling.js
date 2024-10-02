// src/pages/Counseling.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Counseling.css';

const Counseling = () => {
  return (
    <div className="counseling-page">
      <Container>
        <h1 className="text-center mb-4">Personalized Counseling</h1>
        <Row>
          <Col md={6}>
            <img src="counseling.jpg" alt="Counseling Session" className="img-fluid mb-4" />
          </Col>
          <Col md={6}>
            <p>
              At MindWell, we believe that mental health is a crucial aspect of overall well-being. Our personalized
              counseling services are designed to help you navigate life's challenges with the support of
              experienced professionals. Whether you're dealing with anxiety, depression, stress, or relationship
              issues, our counselors are here to guide you towards a healthier, more balanced life.
            </p>
            <p>
              Our counseling approach is client-centered, meaning we tailor our sessions to meet your unique needs and
              goals. We offer a range of services, including individual therapy, couples counseling, and family
              therapy, ensuring that you receive the type of support that best suits your situation.
            </p>
            <p>
              During your sessions, you can expect a safe, confidential, and non-judgmental environment where you can
              openly discuss your thoughts and feelings. Our goal is to empower you with the tools and strategies
              needed to overcome obstacles and achieve personal growth.
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h2>Why Choose Our Counseling Services?</h2>
            <ul>
              <li>Experienced and compassionate counselors</li>
              <li>Flexible scheduling, including evening and weekend appointments</li>
              <li>Personalized treatment plans</li>
              <li>Confidential and supportive environment</li>
              <li>Holistic approach to mental health</li>
            </ul>
            <p>
              If you're ready to take the first step towards better mental health, we're here to support you every step
              of the way. Schedule your first session today and begin your journey towards healing and growth.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Counseling;
