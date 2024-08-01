import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ServicesSection.css';

const ServicesSection = () => {
  return (
    <section className="services-section py-5">
      <div className="container">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Counseling</h5>
                <p className="card-text">Get personalized counseling from experienced professionals.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Workshops</h5>
                <p className="card-text">Join our workshops to improve your mental well-being.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Resources</h5>
                <p className="card-text">Access a variety of resources to support your mental health.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
