// src/components/LandingPage/Header.jsx
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/maindashboard" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width="55"
            height="55"
          />
          <div>
          <div className="logoname">HR-<div className='logocolor'>HATCH</div> </div>            <small className="sublogoname">The Tech Behind Talent.</small>
          </div>
        </Navbar.Brand>
        <Button href="/login" className="btn-login d-flex align-items-center justify-content-center">
          Login
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
