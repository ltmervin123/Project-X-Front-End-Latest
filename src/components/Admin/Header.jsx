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
  const { user } = useAuthContext();
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      guest: "Guest",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
    },
    Japanese: {
      guest: "ゲスト",
      profile: "プロフィール",
      settings: "設定",
      logout: "ログアウト",
    },
  };

  const t = translations[language];
  const handleLogout = () => {
    logout();
  };
  const username = user ? user.name.split(" ")[0] : "";

  return (
    <Navbar
      expand="lg"
      className="MockMain-Header d-flex align-items-center justify-content-between"
    >
      <Navbar.Brand
        href="/ai-reference-dashboard"
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
                <div>{t.guest}</div>
              )}
            </Dropdown.Toggle>

            {/* Align the dropdown menu to the right */}
            <Dropdown.Menu className="dropdown-menu-end">
              {/* Conditionally applying the active class to Dropdown.Item based on current location */}
              <Dropdown.Item
                as={NavLink}
                to="/company-profile#personal-info"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {t.profile}
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/comingsoon"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {t.settings}
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/login"
                onClick={handleLogout}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {t.logout}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
