import React from "react";
import { Container } from "react-bootstrap";
import "../styles/About.css";

const About = () => {
  return (
    <Container className="about-page">
      <h1 className="about-title">About Us</h1>
      <p className="about-text">
        MindWell is dedicated to improving mental health and well-being. Our
        mission is to provide guidance and support through personalized
        counseling, workshops, and a variety of resources.
      </p>
      <h2 className="about-title-2">Mission and Vision</h2>
      <p className="about-text2">
        At MindWell, our mission is to provide accessible and compassionate
        mental health support to individuals of all backgrounds. We envision a
        world where mental health is prioritized, and everyone has the resources
        they need to thrive.
      </p>

      <h2 className="about-title-2">Contact Information</h2>
      <p className="about-text2">
        If you have any questions or need support, please feel free to contact
        us. We are here to help you.
      </p>
      <div className="about-team">
        <h2 className="team-title">Our Team</h2>
        <div className="team-member">
          <h3>Ismail Kalvani </h3>
          <p>Lead Counselor</p>
        </div>
        <div className="team-member">
          <h3>Tofik vepari</h3>
          <p>Workshop Coordinator</p>
        </div>
        <div className="team-member">
          <h3>Megha Macchi</h3>
          <p>Workshop Coordinator</p>
        </div>
      </div>
    </Container>
  );
};

export default About;
