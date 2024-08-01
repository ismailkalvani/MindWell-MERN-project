import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-primary text-white text-center py-3">
      <div className="container">
        <p className="m-0">&copy; 2024 MindWell. All rights reserved.</p>
        <div className="social-icons mt-3">
          <a href="#" className="text-white mx-2"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
