// src/pages/RFOUploadDocsPage.js
import React from "react";
import Header from "../../components/Result/Header";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../../components/MockMainDashboard/Sidebar";
import UploadDocs from "../../components/ResumeFitOptimizer/RFOUploadDocs";
import "../../styles/ResumeFitOptimizerStyles/ResumeFitOptimizer.css";


function RFOUploadDocsPage() {
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
              <UploadDocs />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default RFOUploadDocsPage;
