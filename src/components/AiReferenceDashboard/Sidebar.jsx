// src/components/maindashboard/Sidebar.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  return (
    <Navbar expand="lg" className="ai-reference-sidebar-container flex-column">
      <Navbar.Brand
        href="/HR_HATCH/maindashboard"
        className="d-flex align-items-center mb-3 logo-brand"
      >
        <img src={logo} alt="Logo" width="80" height="80" className="me-2" />
        <div>
          <div className="logoname">HR-<div className='logocolor'>HATCH</div></div>
          <small className="sublogoname">THE TECH BEHIND THE TALENT.</small>
        </div>
      </Navbar.Brand>
      
      <Nav className="flex-column">
        <Nav.Link href="#company-name" className="sidebar-item">Company Name</Nav.Link>
        <Nav.Link href="#profile" className="sidebar-item">Profile</Nav.Link>
        <Nav.Link href="#reference" className="sidebar-item">Reference</Nav.Link>
        <Nav.Link href="#reports" className="sidebar-item">Reports</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;