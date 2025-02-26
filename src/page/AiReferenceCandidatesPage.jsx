import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../components/AiReference/Header";
import Sidebar from "../components/AiReference/Sidebar";
import Candidates from "../components/AiReference/Candidates";
import "../styles/AiReferenceJobs.css";
import "../styles/AiReferenceCandidates.css";

function AiReferenceCandidatesPage() {
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
              <Candidates />
            </Col>
          </Row>
        </div>
    </>
  );
}

export default AiReferenceCandidatesPage;
