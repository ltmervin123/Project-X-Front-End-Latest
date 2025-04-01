import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/AiReference/Header";
import Sidebar from "../../components/AiReference/Sidebar";
import Jobs from "../../components/AiReference/Jobs/Jobs";
import PopupGuide from "../../components/AiReference/PopupGuide"; // Import PopupGuide
import "../../styles/AiReferenceStyles/AiReferenceJobs.css";

function AiReferenceCheckerPage() {
  const [showGuide, setShowGuide] = useState(true);

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
      {showGuide && <PopupGuide introKey="jobs" />} {/* Pass "jobs" as introKey */}
    </>
  );
}

export default AiReferenceCheckerPage;