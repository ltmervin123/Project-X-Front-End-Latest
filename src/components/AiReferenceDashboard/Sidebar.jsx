import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom"; // To track the current path
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const location = useLocation(); // Get the current location (path)

  return (
    <Navbar className="ai-reference-sidebar-container flex-column">
      <Navbar.Brand
        href="/maindashboard"
        className="d-flex align-items-center mb-3 gap-2 ">
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

      <Nav className="flex-column justify-content-start ai-reference-sidebar">
        <Nav.Link
          href="/"
          className={`company-name ${location.pathname === "/" ? "active-link" : ""}`}
        >
          Company Name
        </Nav.Link>
        <Nav.Link
          href="/AiReference"
          className={`sidebar-item ${location.pathname === "/AiReference" ? "active-link" : ""}`}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link
          href="/AiReferenceChecker"
          className={`sidebar-item ${location.pathname === "/AiReferenceChecker" ? "active-link" : ""}`}
        >
          Reference
        </Nav.Link>
        <Nav.Link
          href="/AiReferenceReport"
          className={`sidebar-item ${location.pathname === "/AiReferenceReport" ? "active-link" : ""}`}
        >
          Reports
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
