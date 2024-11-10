import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { FaHome, FaFileAlt, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import defaultAvatar from "../../assets/default.jpg";
import { useLocation } from "react-router-dom";
import { useLogout } from "../../hook/useLogout";
import { useAuthContext } from "../../hook/useAuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
    console.log("Logout");
  };

  return (
    <Navbar expand="lg" className="sidebar-container flex-column">
      <Navbar.Brand
        href="/"
        className="d-flex align-items-center mb-3 logo-brand"
      >
        <img src={logo} alt="Logo" width="75" height="75" className="me-2" />
        <div>
          <div className="logoname">HR-HATCH</div>
          <small className="sublogoname">The Tech Behind Talent</small>
        </div>
      </Navbar.Brand>
      <div className="text-center mb-3 user-avatar-info">
        <img
          src={defaultAvatar}
          alt="User Avatar"
          className="mb-2 avatar-img"
        />

        {user ? (
          <>
            <div>{user.name}</div>
            <small>{user.email}</small>
          </>
        ) : (
          <div>Guest</div>
        )}
      </div>
      <Nav className="flex-column">
        <Nav.Link
          href="/maindashboard"
          active={location.pathname === "/maindashboard"}
        >
          <FaHome className="me-2" /> Main Dashboard
        </Nav.Link>
        <Nav.Link
          href="/resume-evaluator"
          active={location.pathname === "/resume-evaluator"}
        >
          <FaFileAlt className="me-2" /> Resume Evaluator
        </Nav.Link>
        <Nav.Link href="/analytics" active={location.pathname === "/analytics"}>
          <FaChartBar className="me-2" /> Analytics
        </Nav.Link>
        <Nav.Link href="/" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
