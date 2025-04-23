import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
import PopupGuide from "../../components/AiReference/PopupGuide";
import AnalyticsDashboard from "../../components/Admin/AnalyticsDashboard/AnalyticsDashboard";
import "../../styles/AdminStyles/AnalyticsDashboardPage.css";

function AnalyticsDashboardPage() {
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
            <AnalyticsDashboard />
          </Col>
        </Row>
      </div>
      {/* {isAuthenticated && <PopupGuide introKey="mainDashboard" />} */}
    </>
  );
}

export default AnalyticsDashboardPage;
