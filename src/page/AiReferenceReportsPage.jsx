import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../components/AiReference/Header";
import Sidebar from "../components/AiReference/Sidebar";
import ReferenceReports from "../components/AiReference/Reports";
import "../styles/AiReferenceReports.css";


function AiReferenceReportsPage() {
  return (
    <>
      <Header />
      <div className="MockMaindashboard-container h-100">
        <Row>
          {/* Sidebar with 3/12 width */}
          <Col md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>
          {/* Main content area with 9/12 width */}
          <Col md={10} className="p-3">
            <ReferenceReports />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AiReferenceReportsPage;
