// src/components/MockMainDashboard/Header.js
import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import defaultAvatar from "../../assets/default.png";
import logo from "../../assets/LogoBrand.png"; // Adjust the path to your logo image
import { useLogout } from "../../hook/useLogout";
import { useAuthContext } from "../../hook/useAuthContext";

function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext(); // Assuming 'user' contains the user information
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className="MockMain-Header d-flex align-items-center justify-content-between">
      <Navbar.Brand
        href="/maindashboard"
        className="d-flex align-items-center justify-content-center MockMain-LogoBrand"
      >
        <img src={logo} alt="Logo" className="me-2" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="UserNameNav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="dropdown-header d-flex align-items-center justify-content-center gap-1">
              <img
                src={defaultAvatar}
                alt="User Avatar"
              />
              {/* Conditional rendering of the username */}
            {user ? (
              <>
                <p className="user-name">{user.name}</p>
              </>
            ) : (
              <div>Guest</div>
            )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* Conditionally applying the active class to Dropdown.Item based on current location */}
              <Dropdown.Item
                as={NavLink}
                to="/userprofile"
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/comingsoon"
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Settings
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/login"
                onClick={handleLogout}
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
