// src/components/LandingPage/Header.jsx
import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            width="80"
            height="80"
          />
          <div>
            <div className="logoname">
              HR-<div className="logocolor">HATCH</div>{" "}
            </div>{" "}
            <small className="sublogoname">The Tech Behind Talent.</small>
            <div className="logoname">
              HR-<div className="logocolor">HATCH</div>{" "}
            </div>{" "}
            <small className="sublogoname">The Tech Behind Talent.</small>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
