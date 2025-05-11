import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/AiReference/Header";
import Sidebar from "../../components/AiReference/Sidebar";
import Jobs from "../../components/AiReference/Jobs/Jobs";
import PopupGuide from "../../components/AiReference/PopupGuide"; // Import PopupGuide
import TranslationDropdown from "../../components/AiReference/TranslationDropdown";

import "../../styles/AiReferenceStyles/AiReferenceJobs.css";

function AiReferenceCheckerPage() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <>
      <Header />
      <div className="MockMaindashboard-container h-100">
        <Row>
          <Col md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>
          <Col md={10} className="p-3">
            <Jobs />
            <TranslationDropdown />
          </Col>
        </Row>
      </div>
      {showGuide && <PopupGuide introKey="jobs" />}{" "}
    </>
  );
}

export default AiReferenceCheckerPage;
