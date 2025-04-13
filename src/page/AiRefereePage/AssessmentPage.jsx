import React from "react";
import { useNavigate } from "react-router-dom";
import JobPerformanceAssessment from "../../components/Assessment/WorkEthicAndBehaviorAssessment.jsx";
import "../../styles/AiRefereeStyles/AssessmentPage.css";

function AssessmentPage() {

  return (
    <>
      <div className="assessment-form-container">
        <JobPerformanceAssessment />
      </div>
    </>
  );
}

export default AssessmentPage;