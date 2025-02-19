import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../components/AiReference/Header";
import Sidebar from "../components/AiReference/Sidebar";
import Jobs from "../components/AiReference/Jobs";
import "../styles/AiReferenceJobs.css";

function AiReferenceCheckerPage() {
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
              <Jobs />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default AiReferenceCheckerPage;
