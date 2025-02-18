// src/pages/MaindashboardPage.js
import React from "react";
import "../styles/MockInterviewPage.css";
import Header from "../components/Result/Header";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../components/MockMainDashboard/Sidebar";
import RFOSaveAndExportResume from "../components/ResumeFitOptimizer/RFOSaveAndExportResume";


function MaindashboardPage() {
  return (
    <>
      <div className="mock-background">
        <Header />
        <div className="MockMaindashboard-container">
          <Row>
            {/* Sidebar with 3/12 width */}
            <Col md={2} className="p-0 MockSidebar">
              <Sidebar />
            </Col>
            {/* Main content area with 9/12 width */}
            <Col md={10} className="p-3">
              <RFOSaveAndExportResume />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default MaindashboardPage;
