// src/components/LandingPage/Header.jsx
import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand
          href="/maindashboard"
          className="d-flex align-items-center"
        >
          <img src={logo} alt="Logo" width="55" height="55" className="" />
          <div>
            <div className="logoname">HR-HATCH</div>
            <small className="sublogoname">The Tech Behind Talent.</small>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
