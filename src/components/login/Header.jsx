// src/components/LandingPage/Header.jsx
import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";


const Header = () => {
  return (
    <div className="loginHeader">
      <Navbar>
        <div className="d-flex justify-content-between align-items-center landing-header w-100">
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" width="80" height="80" />
            <div>
              <div className="logoname">
                HR-<div className="logocolor">HATCH</div>
              </div>
              <small className="sublogoname">THE TECH BEHIND THE TALENT.</small>
            </div>
          </Navbar.Brand>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
