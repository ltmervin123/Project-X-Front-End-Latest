// src/components/MockMainDashboard/Header.js
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/default.png";
import logo from "../../assets/snappchecklanding/snappcheck-logo.svg";
import { useLogout } from "../../hook/useLogout";
import { useAuthContext } from "../../hook/useAuthContext";
import * as AuthAPI from "../../api/ai-reference/auth/auth-api";
import { useGetProfile } from "../../hook/useCompany";

function Header() {
  const { user } = useAuthContext();
  const language = sessionStorage.getItem("preferred-language") || "English";
  const { data: companyProfile = {}, isPending } = useGetProfile(user);
  const [avatar, setAvatar] = useState(
    companyProfile?.profileImageURL || defaultAvatar
  );
  const { logout } = useLogout();

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
  const handleLogout = async () => {
    try {
      if (user.accountType === "company" && user.service === "AI_REFERENCE") {
        const companyId = user.id;
        const response = await AuthAPI.logoutCompany(companyId);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      logout();
    }
  };
  const username = user ? user.name.split(" ")[0] : "";

  useEffect(() => {
    if (companyProfile) {
      setAvatar(companyProfile?.profileImageURL || defaultAvatar);
    }
  }, [companyProfile]);

  return (
    <Navbar
      expand="lg"
      className="MockMain-Header d-flex align-items-center justify-content-between"
    >
      <Navbar.Brand
        href="/ai-reference-dashboard"
        className="d-flex align-items-center justify-content-center gap-1 MockMain-LogoBrand"
      >
        <img src={logo} alt="Logo" width="90" height="75" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="UserNameNav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="dropdown-header d-flex align-items-center justify-content-center gap-1"
            >
              <img src={avatar} alt="User Avatar" />

              {user ? (
                <>
                  <p className="user-name">{username}</p>
                </>
              ) : (
                <div>{t.guest}</div>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item
                as={NavLink}
                to="/profile"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {t.profile}
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
