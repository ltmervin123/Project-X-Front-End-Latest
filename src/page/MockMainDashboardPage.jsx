// src/pages/MockMainDashboardPage.js
import React, { useState, useEffect } from "react";
import "../styles/MockMainDashboardPage.css";
import Header from "../components/Result/Header";
import Sidebar from "../components/MockMainDashboard/Sidebar";
import MainDashboard from "../components/MockMainDashboard/MainDashboard";
import Summary from "../components/MockMainDashboard/Summary";
import {Row, Col } from "react-bootstrap";

// MockMainDashboardPage.js
function MockMainDashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Header />
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>
      <div className="MockMaindashboard-container">
        <Row className="h-100">
          <Col
            md={2}
            className={`p-0 MockSidebar ${isMobileMenuOpen ? "active" : ""}`}
          >
            <Sidebar />
          </Col>
          <Col md={10} className="d-flex ">
            <div className="mock-interview-maindashboard">
              <MainDashboard />
            </div>
            <div className="mock-interview-summary">
              <Summary />

            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MockMainDashboardPage;
