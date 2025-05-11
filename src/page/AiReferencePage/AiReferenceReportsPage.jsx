import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/AiReference/Header";
import Sidebar from "../../components/AiReference/Sidebar";
import ReferenceReports from "../../components/AiReference/Reports/Reports";
import TranslationDropdown from "../../components/AiReference/TranslationDropdown";
import "../../styles/AiReferenceStyles/AiReferenceReports.css";

function AiReferenceReportsPage() {
  return (
    <>
      <div className="mock-background">
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
              <TranslationDropdown />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default AiReferenceReportsPage;
