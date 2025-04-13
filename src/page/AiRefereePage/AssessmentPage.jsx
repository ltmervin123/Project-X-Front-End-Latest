import React from "react";
import { useNavigate } from "react-router-dom";
import OverAllAssesment from "../../components/Assessment/OverAllAssesment.jsx";
import "../../styles/AiRefereeStyles/AssessmentPage.css";

function AssessmentPage() {

  return (
    <>
      <div className="assessment-form-container">
        <OverAllAssesment />
      </div>
    </>
  );
}

export default AssessmentPage;