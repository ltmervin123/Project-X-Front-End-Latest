// src/components/LandingPage/Header.jsx
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <div className="landingHeader">
      <Navbar>
        <Container className="d-flex justify-content-between align-items-center ">
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              width="80"
              height="80"
            />
            <div>
              <div className="logoname">HR-<div className='logocolor'>HATCH</div></div>
              <small className="sublogoname">THE TECH BEHIND THE TALENT.</small>
            </div>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Nav className="me-auto d-flex gap-3">
              <NavDropdown title="Product/Services" id="nav-dropdown-products">
                <NavDropdown.Item href="/AiReference">AI Reference Checker</NavDropdown.Item>
                <NavDropdown.Item href="/maindashboard">Mock AI</NavDropdown.Item>
                <NavDropdown.Item href="/comingsoon">Resume Builder</NavDropdown.Item>
                <NavDropdown.Item href="/comingsoon">Talent Acquisition Consulting</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Company" id="nav-dropdown-company">
                <NavDropdown.Item href="/company/about">About Us</NavDropdown.Item>
                <NavDropdown.Item href="/company/team">Our Team</NavDropdown.Item>
                <NavDropdown.Item href="/company/careers">Careers</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pricing" id="nav-dropdown-pricing">
                <NavDropdown.Item href="/pricing/basic">Basic Plan</NavDropdown.Item>
                <NavDropdown.Item href="/pricing/pro">Pro Plan</NavDropdown.Item>
                <NavDropdown.Item href="/pricing/enterprise">Enterprise Plan</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="signup-link ms-3">| {/* Added margin start for spacing */}
              <a href="/login" className="btn-signup">Signin</a>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>

  );
};

export default Header;