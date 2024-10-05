// src/pages/Blog.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Blog.css';

const blogPosts = [
  {
    title: "The Importance of Mental Health Awareness",
    description: "Explore why mental health awareness is crucial in today's world and how it can help reduce stigma.",
    image: "/awareness.jfif",
    link: "https://www.cigna-me.com/en/blog/mental-health-awareness#:~:text=Mental%20health%20awareness%20refers%20to,of%20mental%20health%20and%20wellbeing."
  },
  {
    title: "5 Tips for Managing Anxiety",
    description: "Learn effective strategies to manage anxiety and improve your mental well-being.",
    image: "/anxiety.jfif",
    link: "https://www.mentalhealth.com/library/5-strategies-for-managing-anxiety"
  },
  {
    title: "Mindfulness Practices for Everyday Life",
    description: "Incorporate mindfulness into your daily routine with these simple practices.",
    image: "/practices.jfif",
    link: "https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/"
  },
];

const Blog = () => {
  return (
    <div className="blog-page">
      <Container>
        <h1 className="text-center mb-4">Our Blog</h1>
        <p className="text-center mb-5">
          Stay informed and inspired with our latest articles on mental health, well-being, and personal growth.
        </p>
        <Row>
          {blogPosts.map((post, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="blog-card">
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <a href={post.link} className="btn btn-primary">Read More</a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Blog;
