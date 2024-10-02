// src/components/NavigationBar.js
import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const NavigationBar = () => {
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
      <Container>
        <Navbar.Brand href="/">MindWell</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/blog">Blog</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link href="/appointments">Appointments</Nav.Link>
                <Nav.Link href="/counseling">Counseling</Nav.Link>
                <Nav.Link href="/workshops">Workshops</Nav.Link>
                {isAdmin ? (
                  <Nav.Link href="/admin/dashboard">Admin Portal</Nav.Link>
                ) : (
                  <Nav.Link href="/user/dashboard">My Dashboard</Nav.Link>
                )}
                <Nav.Link
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
