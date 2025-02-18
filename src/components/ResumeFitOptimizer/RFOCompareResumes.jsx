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
            <Row className="compareresumes-container-row compareresumes-resume-content d-flex justify-content-around align-items-center flex-row gap-2">
              <div className="compareresumes-resume-content-resume-btn d-flex justify-content-start gap-3 align-items-center">
                <button
                  className={`btn-show-original-resume ${activeResume === "original" ? "btn-active" : ""}`}
                  onClick={() => handleResumeToggle("original")}
                >
                  Original Resume
                </button>
                <button
                  className={`btn-show-optimized-resume ${activeResume === "optimized" ? "btn-active" : ""}`}
                  onClick={() => handleResumeToggle("optimized")}
                >
                  Optimized Resume
                </button>
              </div>
              <Row className="compareresumes-content-resume-container d-flex justify-content-center align-items-center flex-column gap-2">
                <Col className="compareresumes-content-resume d-flex flex-row justify-content-between align-items-center gap-3">
                  <div className="compareresumes-content-resume-content ">
                    <div className="compareresumes-content-resume-header">
                      <h5>{activeResume === "original" ? "Original" : "Optimized"} Resume</h5>
                    </div>
                    <div className="compareresumes-content-resume-body">
                      {/* add or remove the resume-active on when the  */}
                      <div 
                        className={`compareresumes-content-resume-original ${activeResume === "original" ? "resume-active" : ""}`}
                      >
                        <div className="compareresumes-content-resume-original-content">
                          
                        </div>
                      </div>
                      <div
                        className={`compareresumes-content-resume-optimized ${activeResume === "optimized" ? "resume-active" : ""}`}
                      >
                        <div className="compareresumes-content-resume-optimized-content"></div>
                      </div>
                    </div>
                  </div>
                  <div className="compareresumes-content-resume-optimization">
                    <div className="compareresumes-content-resume-header">
                      <h5>Optimization Statistics</h5>
                      <p>Key improvements and changes</p>
                    </div>
                    <div className="compareresumes-content-resume-optimization-body d-flex flex-column gap-2">
                      <div className="resume-optimization-group">
                        <div className="resume-optimization-label">Words Added</div>
                        <div className="resume-optimization-value">12</div>
                      </div>
                      <div className="resume-optimization-group">
                        <div className="resume-optimization-label">Words Removed</div>
                        <div className="resume-optimization-value">12</div>
                      </div>
                      <div className="resume-optimization-group">
                        <div className="resume-optimization-label">Grammar Improvements</div>
                        <div className="resume-optimization-value">12</div>
                      </div>
                      <div className="resume-optimization-group">
                        <div className="resume-optimization-label">Keywords Added</div>
                        <div className="resume-optimization-value">12</div>
                      </div>
                      <div className="resume-optimization-group">
                        <div className="resume-optimization-label">Readability Score</div>
                        <div className="resume-optimization-value">12</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Row>
            <Row className="compareresumes-container-row compareresumes-btn-content d-flex justify-content-around align-items-center flex-row gap-2 w-100">
                <div className="compareresumes-container-btn d-flex justify-content-end align-items-center w-100">
                  <button 
                    className="btn-compare-resume btn-primary"
                    onClick={() => {
                        window.location.href = "/ResumeFitOptimizer/SaveAndExportResumes";
                    }}
                  >
                      Save and Export
                  </button>

                </div>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompareResumes;
