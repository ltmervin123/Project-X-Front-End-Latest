import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../components/AiReferenceDashboard/Header";
import Sidebar from "../components/AiReferenceDashboard/Sidebar";
import Jobs from "../components/AiReferenceDashboard/Jobs";
import "../styles/AiReferenceJobs.css";

function AiReferenceCheckerPage() {
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
            <Jobs />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AiReferenceCheckerPage;
