// src/components/maindashboard/Sidebar.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/logo.png";
import {  FaSignOutAlt } from "react-icons/fa";
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
        <img src={logo} alt="Logo" width="55" height="55" className="me-2" />
        <div>
          <div className="logoname">
            HR-<div className="logocolor">HATCH</div>{" "}
          </div>{" "}
          <small className="sublogoname">The Tech Behind Talent.</small>
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
          <svg width="21" height="22" viewBox="0 0 21 22"  fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.281738 18.9484V6.94836L8.28174 0.948364L16.2817 6.94836V18.9484H10.2817V11.9484H6.28174V18.9484H0.281738Z" />
          </svg>
          Dashboard
        </Nav.Link>
        <Nav.Link
          className="sidebarnav"
          key="reference-checker"
          href="/comingsoon"
          active={location.pathname === "/comingsoon"}
        >
        <svg width="21" height="22" viewBox="0 0 21 22"  fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.8749 17.917C14.717 17.917 15.4346 17.6238 16.0275 17.0373C16.6197 16.4516 16.9158 15.7308 16.9158 14.875C16.9158 14.0336 16.6197 13.3164 16.0275 12.7235C15.4346 12.1298 14.717 11.833 13.8749 11.833C13.0198 11.833 12.299 12.1298 11.7126 12.7235C11.1261 13.3157 10.8329 14.0329 10.8329 14.875C10.8329 15.7308 11.1261 16.4516 11.7126 17.0373C12.299 17.6238 13.0198 17.917 13.8749 17.917ZM19.3999 21.167L16.3709 18.1445C16.0192 18.4204 15.6328 18.632 15.2118 18.7793C14.7907 18.9267 14.3451 19.0003 13.8749 19.0003C12.7295 19.0003 11.7556 18.5991 10.9532 17.7967C10.1508 16.9944 9.74995 16.0204 9.75067 14.875C9.75139 13.7296 10.1522 12.7556 10.9532 11.9532C11.7541 11.1509 12.728 10.75 13.8749 10.7507C15.0218 10.7515 15.9957 11.1523 16.7967 11.9532C17.5976 12.7542 17.9984 13.7281 17.9992 14.875C17.9992 15.3488 17.9212 15.7998 17.7652 16.2281C17.6092 16.6564 17.3929 17.0464 17.1163 17.3981L20.1453 20.4L19.3999 21.167ZM2.08392 19.75C1.58486 19.75 1.1685 19.5832 0.834835 19.2495C0.501168 18.9158 0.333974 18.4995 0.333252 18.0004V1.99958C0.333252 1.50125 0.500446 1.08525 0.834835 0.751583C1.16922 0.417917 1.58559 0.250722 2.08392 0.25H10.6249L15.4999 5.125V8.39667C15.2327 8.32661 14.964 8.27064 14.6939 8.22875C14.4231 8.18758 14.1501 8.167 13.8749 8.167C12.8364 8.167 11.8758 8.38078 10.9933 8.80833C10.1107 9.23589 9.35995 9.81367 8.741 10.5417H4.12492V11.625H8.02059C7.73747 12.1212 7.52406 12.6433 7.38034 13.1915C7.23589 13.7404 7.16656 14.3016 7.17234 14.875H4.12492V15.9583H7.2525C7.36806 16.695 7.60386 17.3858 7.95992 18.0307C8.31742 18.6757 8.77025 19.2488 9.31842 19.75H2.08392ZM10.0833 5.66667H14.4166L10.0833 1.33333V5.66667Z" />
        </svg>

          Reference Checker
        </Nav.Link>
        <Nav.Link
        className="sidebarnav"
          key="resume-builder"
          href="/comingsoon"
          active={location.pathname === "/comingsoon"}
        >
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 7H14.5L9 1.5V7ZM2 0H10L16 6V18C16 18.5304 15.7893 19.0391 15.4142 19.4142C15.0391 19.7893 14.5304 20 14 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V2C0 0.89 0.89 0 2 0ZM10 18V17C10 15.67 7.33 15 6 15C4.67 15 2 15.67 2 17V18H10ZM6 10C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12C4 12.5304 4.21071 13.0391 4.58579 13.4142C4.96086 13.7893 5.46957 14 6 14C6.53043 14 7.03914 13.7893 7.41421 13.4142C7.78929 13.0391 8 12.5304 8 12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10Z"/>
        </svg>


          Resume Builder
        </Nav.Link>
        <Nav.Link
        className="sidebarnav"
          key="analytics"
          href="/analytics"
          active={location.pathname === "/analytics"}
        >
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14H6V9H4V14ZM12 14H14V4H12V14ZM8 14H10V11H8V14ZM8 9H10V7H8V9ZM2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H16C16.55 0 17.021 0.196 17.413 0.588C17.805 0.98 18.0007 1.45067 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2Z"/>
        </svg>

          Analytics
        </Nav.Link>
        <Nav.Link
        className="sidebarnav"
          key="logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;