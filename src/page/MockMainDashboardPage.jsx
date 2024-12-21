// src/pages/MockMainDashboardPage.js
import React from "react";
import "../styles/MockMainDashboardPage.css";
import Header from "../components/Result/Header";
import Sidebar from "../components/MockMainDashboard/Sidebar";
import MainDashboard from "../components/MockMainDashboard/MainDashboard";
import Summary from "../components/MockMainDashboard/Summary";
import { Container, Row, Col } from "react-bootstrap";

function MockMainDashboardPage() {
  return (
    <>
      <Header />
      <div className="MockMaindashboard-container">
        <Row>
          {/* Sidebar (3/12 width) */}
          <Col  md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>
          {/* Main Dashboard (7/12 width) */}
          <Col md={7} className="p-3">
            <MainDashboard />
          </Col>
          {/* Summary (3/12 width) */}
          <Col className="p-3">
            <Summary />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MockMainDashboardPage;
