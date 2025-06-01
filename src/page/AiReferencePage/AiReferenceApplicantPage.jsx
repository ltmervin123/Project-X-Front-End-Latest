import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/AiReference/Header";
import Sidebar from "../../components/AiReference/Sidebar";
import Candidates from "../../components/AiReference/Candidates/Applicant";
import PopupGuide from "../../components/AiReference/PopupGuide"; // Import PopupGuide
import TranslationDropdown from "../../components/AiReference/TranslationDropdown";
import "../../styles/AiReferenceStyles/AiReferenceJobs.css";
import "../../styles/AiReferenceStyles/AiReferenceApplicant.css";

function AiReferenceApplicantPage() {
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
            <Candidates />
            <TranslationDropdown />
          </Col>
        </Row>
      </div>
      {showGuide && <PopupGuide introKey="applicants" />}
    </>
  );
}

export default AiReferenceApplicantPage;
