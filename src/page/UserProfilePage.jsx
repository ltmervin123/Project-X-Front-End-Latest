// src/pages/UserProfilePage.js
import React from "react";
import "../styles/MockInterviewPage.css";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../components/MockMainDashboard/Sidebar";
import UserProfile from "../components/UserProfile/UserProfile";
import Header from "../components/Result/Header";

function UserProfilePage() {
  return (
    <>
      <div className="mock-background">
        <Header />
        <div className="MockMaindashboard-container">
          <Row>
            {/* Sidebar with 3/12 width */}
            <Col md={2} className="p-0">
              <Sidebar />
            </Col>
            {/* Main dashboard with 9/12 width */}
            <Col md={10} className="p-3">
              <UserProfile />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
