import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="text-center py-3">
        <p className="m-0">&copy; 2024 MindWell. All rights reserved.</p>
        <div className="social-icons mt-3">
          <a href="#" className="text-white mx-2"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="#" className="text-white mx-2"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#" className="text-white mx-2"><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
