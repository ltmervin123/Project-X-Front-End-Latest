// src/components/LandingPage/Header.jsx
import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../../../assets/logo.png";

const Header = () => {
  return (
    <div className="loginHeader">
      <Navbar>
        <div className="d-flex justify-content-center align-items-center landing-header w-100">
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" width="200" height="30" />
          </Navbar.Brand>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
