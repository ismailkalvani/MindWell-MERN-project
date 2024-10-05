import React from "react";
import { Container } from "react-bootstrap";
import "../styles/About.css";
import { Navigate } from "react-router-dom";

const About = () => {
  return (
    <Container className="about-page">
      <h1 className="about-title">About Us</h1>
      <p className="about-text">
        MindWell is dedicated to improving mental health and well-being. Our
        mission is to provide guidance and support through personalized
        counseling, workshops, and a variety of resources.MindWell aims to make
        Leeds a mentally healthy and caring city where everyone enjoys a full
        life, feels connected, and has easy access to mental health support and
        advice.
      </p>
      <h2 className="about-title-2">Mission and Vision</h2>
      <p className="about-text2">
        At MindWell, our mission is to provide accessible and compassionate
        mental health support to individuals of all backgrounds. We envision a
        world where mental health is prioritized, and everyone has the resources
        they need to thrive. We want to remove the barriers to accessing mental
        health and wellbeing support in Leeds – focusing on helping those who
        need it most. We’re here to: help everyone understand their options and
        find support when they need it. ensure everyone has the best tools and
        information for caring for their mental health and wellbeing, whatever
        their needs. listen and to encourage open and understanding
        conversations about mental health, free from stigma, discrimination and
        prejudice.
      </p>

      <h2 className="about-title-2">Contact Information</h2>
      <p className="about-text2">
        If you have any questions or need support, please feel free to contact
        us. We are here to help you.<br></br>

        <a  href="http://localhost:3000/contact"><b>Contact us </b> </a>
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
