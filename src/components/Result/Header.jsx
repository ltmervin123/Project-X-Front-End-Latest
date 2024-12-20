// src/components/MockMainDashboard/Header.js
import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import defaultAvatar from "../../assets/default.png";
import logo from "../../assets/LogoBrand.png"; // Adjust the path to your logo image
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";
// Uncomment and implement these hooks if you have authentication and logout logic
// import { useLogout } from "path-to-your-logout-hook";
// import { useAuthContext } from "path-to-your-auth-context";

function Header() {
  const { user } = useAuthContext();
  // const location = useLocation();
  // const { logout } = useLogout();

  // const handleLogout = () => {
  //   logout();
  // };

  // Assuming you have a user object with a name property
  const username = user ? user.name : "Guest";

  return (
    <Navbar
      expand="lg"
      className="MockMain-Header d-flex align-items-center justify-content-between"
    >
      <Navbar.Brand
        href="/maindashboard"
        className="d-flex align-items-center justify-content-center MockMain-LogoBrand"
      >
        <img src={logo} alt="Logo" className="me-2" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="UserNameNav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {" "}
        {/* Added justify-content-end */}
        <Nav>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="dropdown-header d-flex align-items-center justify-content-center gap-1"
            >
              {/* Replace 'Username' with dynamic username if available */}
              <img src={defaultAvatar} alt="User  Avatar" />
              {/* {username} */}
              <p>{username}</p>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/userprofile">Profile</Dropdown.Item>
              <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
              {/* <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
