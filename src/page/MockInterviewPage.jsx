// src/pages/MaindashboardPage.js
import React from "react";
import "../styles/MockInterviewPage.css";
import Header from "../components/Result/Header";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/MockMainDashboard/Sidebar";
import MainDashboard from "../components/maindashboard/MockInterview";

function MaindashboardPage() {
  return (
    <>
      <Header />
      <div className="MockMaindashboard-container">
          <Row>
            {/* Sidebar with 3/12 width */}
            <Col md={2} className="p-0 MockSidebar">
              <Sidebar />
            </Col>
            {/* Main content area with 9/12 width */}
            <Col md={10} className="p-3">
              <MainDashboard />
            </Col>
          </Row>
      </div>
    </>
  );
}

export default MaindashboardPage;
