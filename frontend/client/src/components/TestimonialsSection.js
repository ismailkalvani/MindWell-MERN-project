// src/components/TestimonialsSection.js
import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import '../styles/TestimonialsSection.css';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "MindWell has completely changed my life. The counseling services are top-notch!",
      name: "Hammad Mansuri ",
      image: "/A.jpg"
    },
    {
      quote: "The workshops offered are insightful and have helped me improve my mental health.",
      name: "Hanzala Mansuri ",
      image: "/B.jpg"
    },
    {
      quote: "I appreciate the resources available at MindWell. They've been incredibly helpful.",
      name: "Israr Khan",
      image: "/C.jpg"
    }
  ];

  return (
    <section className="testimonials-section">
      <Container>
        <h2 className="text-center mb-5">What Our Clients Say</h2>
        <Carousel>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <div className="testimonial-item text-center">
                <img src={testimonial.image} alt={testimonial.name} className="rounded-circle mb-4" />
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <p className="testimonial-name">- {testimonial.name}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
