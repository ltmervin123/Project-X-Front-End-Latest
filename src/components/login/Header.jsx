// src/components/LandingPage/Header.jsx
import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/HR_HATCH" className="d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" width="80" height="80" />
          <div>
            <div className="logoname">HR-<div className='logocolor'>HATCH</div></div>
            <small className="sublogoname">THE TECH BEHIND THE TALENT.</small>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
