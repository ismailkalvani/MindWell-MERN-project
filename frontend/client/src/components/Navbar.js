import React, { useContext } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom"; 
import "../styles/Navbar.css";

const NavigationBar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useContext(AuthContext); // Access user details

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="navbar-custom"
    >
      <Container>
        <Navbar.Brand href="/">MindWell</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className="nav-link-custom"
              activeClassName="active-link-custom"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              className="nav-link-custom"
              activeClassName="active-link-custom"
            >
              About
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/blog"
              className="nav-link-custom"
              activeClassName="active-link-custom"
            >
              Blog
            </Nav.Link>
            {isAdmin ? (
              <Nav.Link
                as={NavLink}
                to="/admin/contact"
                className="nav-link-custom"
                activeClassName="active-link-custom"
              >
                Contact Dashboard
              </Nav.Link>
            ) : (
              <Nav.Link
                as={NavLink}
                to="/contact"
                className="nav-link-custom"
                activeClassName="active-link-custom"
              >
                Contact
              </Nav.Link>
            )}

            {isAuthenticated ? (
              <>
                {!isAdmin ? (
                  <Nav.Link
                    as={NavLink}
                    to="/appointments"
                    className="nav-link-custom"
                    activeClassName="active-link-custom"
                  >
                    Appointments
                  </Nav.Link>
                ) : null}
                <Nav.Link
                  as={NavLink}
                  to="/counseling"
                  className="nav-link-custom"
                  activeClassName="active-link-custom"
                >
                  Counseling
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/workshops"
                  className="nav-link-custom"
                  activeClassName="active-link-custom"
                >
                  Workshops
                </Nav.Link>
                {isAdmin ? (
                  <Nav.Link
                    as={NavLink}
                    to="/admin/dashboard"
                    className="nav-link-custom"
                    activeClassName="active-link-custom"
                  >
                    Admin Portal
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    as={NavLink}
                    to="/user/dashboard"
                    className="nav-link-custom"
                    activeClassName="active-link-custom"
                  >
                    MyAppointments
                  </Nav.Link>
                )}
                <Nav.Link
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                  className="nav-link-custom"
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="nav-link-custom"
                  activeClassName="active-link-custom"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className="nav-link-custom"
                  activeClassName="active-link-custom"
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* User Profile Section */}
          {isAuthenticated && user && (
            <div className="user-profile">
              <Image
                src= "\avatar.png"
                roundedCircle
                width="40"
                height="40"
                className="me-2"
              />
              <span className="navbar-user-name">{user.name}</span>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
