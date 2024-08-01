import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section text-center text-white">
      <div className="container">
        <h1 className="display-4">Welcome to MindWell</h1>
        <p className="lead">Your mental health is our priority. Get guidance and support here.</p>
        <a href="#" className="btn btn-primary btn-lg">Get Started</a>
      </div>
    </div>
  );
};

export default HeroSection;
