import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "../../styles/ResumeFitOrganizer.css";
import { Button, Row, Col } from "react-bootstrap";

function SaveAndExportResume() {

  // Step 1: State to track which resume is active
  const [activeResume, setActiveResume] = useState("original"); // default is 'original'

  // Step 2: Handle button click to toggle the resume
  const handleResumeToggle = (resumeType) => {
    setActiveResume(resumeType);
  };
  return (
    <>
      <div className="ResumeFitOptimizer-container d-flex flex-column gap-2">
        <div className="ResumeFitOptimizer-content d-flex flex-column gap-2">
          <div className="saveandexportresume-container d-flex justify-content-center align-items-center flex-column gap-3">
            <div className="saveandexportresume-header">
              <h2 className="saveandexportresume-title">Save and Export Resume</h2>
            </div>
            <Row className="saveandexportresume-container-row saveandexportresume-main-content d-flex justify-content-around align-items-start flex-row gap-2 ">
              <div className="saveandexportresume-container-row-header">
                <h5 className="saveandexportresume-title">Export Options</h5>
                <p className="saveandexportresume-description">
                  Download your optimized resume
                </p>
              </div>
              <Row className="saveandexportresume-container-export-btn d-flex justify-content-center align-items-center flex-column gap-3 ">
                <Button variant="secondary">Export as PDF</Button>
                <Button variant="secondary">Export as DOCS</Button>
                <p className="my-3">Your optimized resume is now ready for use!</p>
                <button 
                  className="btn-start-new-optimization btn-primary"
                  onClick={() => {
                      window.location.href = "/ResumeFitOptimizer";
                  }}
                >
                  Start New Optimization
                </button>
              </Row>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default SaveAndExportResume;
