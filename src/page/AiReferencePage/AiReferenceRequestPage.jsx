import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/AiReference/Header";
import Sidebar from "../../components/AiReference/Sidebar";
import ReferenceRequest from "../../components/AiReference/ReferenceRequest/ReferenceRequest";
import PopupGuide from "../../components/AiReference/PopupGuide";
import TranslationDropdown from "../../components/AiReference/TranslationDropdown";

import "../../styles/AiReferenceStyles/AiReferenceJobs.css";
import "../../styles/AiReferenceStyles/AiReferenceRequest.css";

function AiReferenceRequestPage() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <>
      <div className="mock-background">
        <Header />
        <div className="MockMaindashboard-container h-100">
          <Row>
            <Col md={2} className="p-0 MockSidebar">
              <Sidebar />
            </Col>
            <Col md={10} className="p-3">
              <ReferenceRequest />
              <TranslationDropdown />
            </Col>
          </Row>
        </div>
        {showGuide && <PopupGuide introKey="referenceRequests" />}{" "}
      </div>
    </>
  );
}

export default AiReferenceRequestPage;
