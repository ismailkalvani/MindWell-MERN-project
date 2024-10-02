// src/components/NewsletterSignup.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/NewsletterSignup.css';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup email:', email);
    setEmail(''); 
  };

  return (
    <section className="newsletter-signup-section">
      <Container>
        <h2>Stay Updated with MindWell</h2>
        <p>Subscribe to our newsletter to receive the latest updates, articles, and resources on mental health.</p>
        <Form onSubmit={handleSubmit} className="newsletter-form">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="primary" type="submit">
            Subscribe
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default NewsletterSignup;
