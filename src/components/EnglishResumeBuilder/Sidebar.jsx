// src/components/maindashboard/Sidebar.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { FaSignOutAlt } from "react-icons/fa";
import defaultAvatar from "../../assets/default.png";
import { useLocation } from "react-router-dom";
import { useLogout } from "../../hook/useLogout";
import { useAuthContext } from "../../hook/useAuthContext";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className="sidebar-container flex-column">
      <Navbar.Brand
        href="/maindashboard"
        className="d-flex align-items-center mb-3 logo-brand"
      >
        <img src={logo} alt="Logo" width="80" height="80" className="me-2" />
        <div>
          <div className="logoname">
            HR-<div className="logocolor">HATCH</div>
          </div>
          <small className="sublogoname">THE TECH BEHIND THE TALENT.</small>
        </div>
      </Navbar.Brand>
      <Nav className="flex-column ">
        <div className="text-center mb-3 user-avatar-info">
          <Nav.Link
            className="userprofilelink"
            href="/userprofile"
            active={location.pathname === "/userprofile"}
          >
            <img
              src={defaultAvatar}
              alt="User  Avatar"
              className="mb-2 avatar-img"
            />
            {user ? (
              <>
                <div className="user-name">{user.name}</div>

                <p className="user-email">{user.email}</p>
              </>
            ) : (
              <div>Guest</div>
            )}
          </Nav.Link>
        </div>

        <Nav.Link
          className="sidebarnav"
          key="main-dashboard"
          href="/maindashboard"
          active={location.pathname === "/maindashboard"}
        >
          <svg
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.281738 18.9484V6.94836L8.28174 0.948364L16.2817 6.94836V18.9484H10.2817V11.9484H6.28174V18.9484H0.281738Z" />
          </svg>
          Dashboard
        </Nav.Link>

        <Nav.Link
          className="sidebarnav"
          key="resume-builder"
          href="/EnglishResumeBuilder"
          active={location.pathname === "/EnglishResumeBuilder"}
        >
          <svg
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 7H14.5L9 1.5V7ZM2 0H10L16 6V18C16 18.5304 15.7893 19.0391 15.4142 19.4142C15.0391 19.7893 14.5304 20 14 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V2C0 0.89 0.89 0 2 0ZM10 18V17C10 15.67 7.33 15 6 15C4.67 15 2 15.67 2 17V18H10ZM6 10C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12C4 12.5304 4.21071 13.0391 4.58579 13.4142C4.96086 13.7893 5.46957 14 6 14C6.53043 14 7.03914 13.7893 7.41421 13.4142C7.78929 13.0391 8 12.5304 8 12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10Z" />
          </svg>
          English Resume Builder
        </Nav.Link>
        <Nav.Link
          className="sidebarnav"
          key="analytics"
          href="/analytics"
          active={location.pathname === "/analytics"}
        >
          <svg
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 14H6V9H4V14ZM12 14H14V4H12V14ZM8 14H10V11H8V14ZM8 9H10V7H8V9ZM2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H16C16.55 0 17.021 0.196 17.413 0.588C17.805 0.98 18.0007 1.45067 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2Z" />
          </svg>
          Analytics
        </Nav.Link>
        <Nav.Link className="sidebarnav" key="logout" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
