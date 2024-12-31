// src/components/LandingPage/Header.jsx
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <div className="landingHeader">
      <Navbar>
        <div className="d-flex justify-content-between align-items-center landing-header w-100">
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
                <NavDropdown.Item className='noclickblue' href="/AiReference">AI Reference Checker</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/maindashboard">Mock AI</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Resume Builder</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Talent Acquisition Consulting</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Company" id="nav-dropdown-company">
                <NavDropdown.Item className='noclickblue'href="/comingsoon">About Us</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Our Team</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Careers</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pricing" id="nav-dropdown-pricing">
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Basic Plan</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Pro Plan</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Enterprise Plan</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="signup-link ms-3">| {/* Added margin start for spacing */}
              <a href="/login" className="btn-signup">Sign-in</a>
            </div>
          </div>
        </div>
      </Navbar>
    </div>

  );
};

export default Header;