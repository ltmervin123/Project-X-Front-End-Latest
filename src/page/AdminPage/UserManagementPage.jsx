import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
import TranslationDropdown from "../../components/Admin/TranslationDropdown";
import UserManagement from "../../components/Admin/UserManagement/UserManagement";
import "../../styles/AdminStyles/UserManagementPage.css";

function UserManagementPage() {
  // const isAuthenticated = sessionStorage.getItem("authenticated") || false;

  return (
    <>
      <Header />
      <div className="MockMaindashboard-container ">
        <Row>
          {/* Sidebar with 3/12 width */}
          <Col md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>
          {/* Main content area with 9/12 width */}
          <Col md={10} className="p-3">
            <UserManagement />
            <TranslationDropdown />
          </Col>
        </Row>
      </div>
      {/* {isAuthenticated && <PopupGuide introKey="mainDashboard" />} */}
    </>
  );
}

export default UserManagementPage;
