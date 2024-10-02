// src/pages/Workshops.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Workshops.css';

const workshops = [
  {
    title: "Mindfulness & Meditation",
    description: "Learn the basics of mindfulness and meditation in this introductory workshop. Perfect for beginners and those looking to enhance their practice.",
    image: "/mindfulness.jpg",
  },
  {
    title: "Stress Management Techniques",
    description: "Discover effective strategies to manage stress and improve your mental health. This workshop offers practical tips and exercises.",
    image: "/management.jpg",
  },
  {
    title: "Building Resilience",
    description: "Develop resilience and the ability to bounce back from adversity. This workshop is designed to help you strengthen your mental and emotional toughness.",
    image: "/resilience.jpg",
  },
];

const Workshops = () => {
  return (
    <div className="workshops-page">
      <Container>
        <h1 className="text-center mb-4">Workshops</h1>
        <p className="text-center mb-5">
          Our workshops are designed to provide practical skills and knowledge to help you navigate various aspects of
          mental health and well-being. Join us to learn, grow, and connect with others on the same journey.
        </p>
        <Row>
          {workshops.map((workshop, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="workshop-card">
                <Card.Img variant="top" src={workshop.image} />
                <Card.Body>
                  <Card.Title>{workshop.title}</Card.Title>
                  <Card.Text>{workshop.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Workshops;
