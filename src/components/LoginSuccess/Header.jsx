// src/components/LandingPage/Header.jsx
import React from "react";
import { Navbar, Container } from "react-bootstrap";


const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand
          href="/maindashboard"
          className="d-flex align-items-center"
        >
          <img
              src={logo}
              alt="Logo"
              width="200"
              height="30"
            />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
