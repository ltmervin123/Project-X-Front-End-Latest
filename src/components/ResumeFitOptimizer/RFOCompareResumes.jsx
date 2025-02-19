import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "../../styles/ResumeFitOrganizer.css";
import { Button, Row, Col } from "react-bootstrap";

function CompareResumes() {

  // Step 1: State to track which resume is active
  const [activeResume, setActiveResume] = useState("original"); // default is 'original'

  // Step 2: Handle button click to toggle the resume
  const handleResumeToggle = (resumeType) => {
    setActiveResume(resumeType);
  };
  return (
    <>
      <div className="ResumeFitOptimizer-contentainer d-flex flex-column gap-2">
        <div className="ResumeFitOptimizer-content d-flex flex-column gap-2">
          <div className="compareresumes-container d-flex justify-content-center align-items-center flex-column gap-3">
            <Row className="compareresumes-container-row compareresumes-resume-content d-flex justify-content-around align-items-center flex-row gap-2 w-100">

              <Row className="compareresumes-content-resume-container d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                <Col className="compareresumes-content-resume d-flex flex-row justify-content-between align-items-center gap-3">
                  
                  <Col 
                    className="compareresumes-content-resume-original"
                  >
                    <div className="compareresumes-content-resume-original-header">
                      <h5>Original Resume</h5>
                    </div>
                    <div className="compareresumes-content-resume-original-content">
                      
                    </div>
                  </Col>
                  <Col
                    className="compareresumes-content-resume-optimized"
                  >
                    <div className="compareresumes-content-resume-optimized-header">
                      <h5>Optimized Resume</h5>
                    </div>
                    <div className="compareresumes-content-resume-optimized-content"></div>
                  </Col>
                </Col>
              </Row>
            </Row>
            <Row className="compareresumes-container-row compareresumes-btn-content d-flex justify-content-around align-items-center flex-row gap-2 w-100">
                            <Col className="px-3">
                
                <div className="compareresumes-container-btn d-flex justify-content-between align-items-center ">
                  {/* change or remove href to cancel */}
                  <button 
                    className="btn-cancel-optimizer btn-primary"
                    onClick={() => {
                        window.location.href = "/ResumeFitOptimizer/CompareResumes";
                    }}
                  >
                      Cancel Optimizer
                  </button>
                  <button 
                    className="btn-save-export btn-primary"
                    onClick={() => {
                        window.location.href = "/ResumeFitOptimizer/SaveAndExportResumes";
                    }}
                  >
                      Save and Export
                  </button>

                </div>
                </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompareResumes;
