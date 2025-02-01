// src/components/MockMainDashboard/Header.js
import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/default.png";
import logo from "../../assets/logo.png"; // Adjust the path to your logo image
import { useLogout } from "../../hook/useLogout";
import { useAuthContext } from "../../hook/useAuthContext";

function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext(); // Assuming 'user' contains the user information
  const handleLogout = () => {
    logout();
  };
  const username = user ? user.name.split(" ")[0] : "";

  return (
    <Navbar
      expand="lg"
      className="MockMain-Header d-flex align-items-center justify-content-between"
    >

      <svg  class="wave" width="100%" height="69" viewBox="0 0 1530 69" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1529 40.7325V59.7325V65H1322.5L0 65.2324V46.2324C6.5 50.7324 68 60.5 138 60.5C210.5 60.5 497 35.5 563.5 22.7324C632.262 9.53056 703 43.2324 824.5 38.7324C923.164 35.0782 1129.67 11.3992 1221 5.23255C1385.4 -11.9674 1523.5 16.7324 1529 40.7325Z" fill="url(#paint0_linear_3237_2962)"/>
<defs>
<linearGradient id="paint0_linear_3237_2962" x1="0" y1="32.6162" x2="1529" y2="32.6162" gradientUnits="userSpaceOnUse">
<stop offset="0.00364205" stop-color="#FFDCC2"/>
<stop offset="0.943965" stop-color="#F46A05"/>
</linearGradient>
</defs>
</svg>



      <Navbar.Brand
        href="/maindashboard"
        className="d-flex align-items-center justify-content-center gap-1 MockMain-LogoBrand"
      >
        <img src={logo} alt="Logo" width="125" height="18" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="UserNameNav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="dropdown-header d-flex align-items-center justify-content-center gap-1"
            >
              <img src={defaultAvatar} alt="User Avatar" />
              {/* Conditional rendering of the username */}
              {user ? (
                <>
                  <p className="user-name">{username}</p>
                </>
              ) : (
                <div>Guest</div>
              )}
            </Dropdown.Toggle>

            {/* Align the dropdown menu to the right */}
            <Dropdown.Menu className="dropdown-menu-end">
              {/* Conditionally applying the active class to Dropdown.Item based on current location */}
              <Dropdown.Item
                as={NavLink}
                to="/userprofile#personal-info"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/comingsoon"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Settings
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/login"
                onClick={handleLogout}
                className={({ isActive }) => (isActive ? "active-link" : "")}
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
