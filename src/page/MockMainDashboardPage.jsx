// src/pages/MockMainDashboardPage.js
import React from "react";
import "../styles/MockMainDashboardPage.css";
import Header from "../components/Result/Header";
import Sidebar from "../components/MockMainDashboard/Sidebar";
import MainDashboard from "../components/MockMainDashboard/MainDashboard";
import Summary from "../components/MockMainDashboard/Summary";
import { Container, Row, Col } from "react-bootstrap";

// MockMainDashboardPage.js
function MockMainDashboardPage() {
  return (
    <>
      <Header />
      <div className="MockMaindashboard-container">
        <Row className="h-100">
          <Col md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>
          <Col md={7} className="d-flex flex-column">
            <MainDashboard />
          </Col>
          <Col md={3} className="d-flex justify-content-center">
            <Summary />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MockMainDashboardPage;
