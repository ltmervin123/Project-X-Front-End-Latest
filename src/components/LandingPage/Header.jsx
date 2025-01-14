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
              width="200"
              height="30"
            />

          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Nav className="me-auto d-flex gap-3">
              <NavDropdown title="Product" id="nav-dropdown-products">
                <NavDropdown.Item className='noclickblue' href="/maindashboard">Mock.AI</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Resume Fit Optimizer</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Job Tracker (Coming Soon)</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/AiReference">AI Referee</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Services" id="nav-dropdown-services">
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Recruitment Services</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">AI-Powered Job Posting</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Company" id="nav-dropdown-company">
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Why HR-Hatch?</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Partners</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">About Us</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Events/News</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pricing" id="nav-dropdown-pricing">
                <NavDropdown.Item className='noclickblue' href="/comingsoon">Mock.AI</NavDropdown.Item>
                <NavDropdown.Item className='noclickblue' href="/comingsoon">AI Referee</NavDropdown.Item>


              </NavDropdown>
            </Nav>
            <div className="signup-link ms-3">
              <a href="/login" className="btn-signup">Sign-in</a>
            </div>
          </div>
        </div>
      </Navbar>
    </div>

  );
};

export default Header;