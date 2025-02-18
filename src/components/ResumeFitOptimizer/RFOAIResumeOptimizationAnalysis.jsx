import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "../../styles/ResumeFitOrganizer.css";
import { Button, Row, Col } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Doughnut } from "react-chartjs-2";

function UploadDocs() {
  const now = 6;
  const current = now;
  const total = 10;
  const dnname = ["Experience", "Education", "Achievements", "Skills", "Keywords"];
  const dncurrent = 15;
  const dntotal = 20;
  const createDoughnutData = (score, outOf, color) => ({
    datasets: [
      {
        data: [score, outOf - score], // Assuming a scale of 10
        backgroundColor: [color, "#36434E"], // Use the specified color and remaining color
        borderColor: "#36434E",
      },
    ],
  });



  return (
    <>
      <div className="ResumeFitOptimizer-contentainer d-flex flex-column gap-2">
        <div className="ResumeFitOptimizer-content d-flex flex-column gap-2">
          <div className="header d-flex justify-content-center align-items-center">
            <h4>AI Resume Optimization & Fit Score Analysis</h4>
          </div>
          <div className="airesumeoptimizationanalysis-container d-flex justify-content-start align-items-center flex-column gap-3">
            <Row className="airesumeoptimizationanalysis-container-row airesumeoptimizationanalysis-progress-content d-flex justify-content-around align-items-center flex-row gap-2">
              <div className="airesumeoptimizationanalysis-progress-content-header">
                <h5>Optimization Progress</h5>
                <p>Real-time AI analysis of your resume</p>
              </div>
              <div className="airesumeoptimizationanalysis-content-progress d-flex justify-content-between align-items-center flex-row gap-2">
                <Col md={6} className="progress-content-progress-bar d-flex flex-column gap-2">
                  <div className="progress-content-group">
                    <div className="progress-content-label">Grammar & Clarity</div>
                    <ProgressBar 
                      className="progress-bar-orange"
                      now={now} 
                      label={current} 
                      max={total}
                      style={{ backgroundColor: "" }} 
                    />
                    <div className="position-absolute w-100 text-end pe-2" style={{ top: "50%", transform: "translateY(-50%)" }}>
                      {total}
                    </div>
                  </div>

                  <div className="progress-content-group">
                    <div className="progress-content-label">Structure & Readability</div>
                    <ProgressBar 
                      className="progress-bar-blue"
                      now={now} 
                      label={current} 
                      max={total}
                      style={{ backgroundColor: "" }} 
                    />
                    <div className="position-absolute w-100 text-end pe-2" style={{ top: "50%", transform: "translateY(-50%)" }}>
                      {total}
                    </div>
                  </div>
                  <div className="progress-content-group">
                    <div className="progress-content-label">Key Experience</div>
                    <ProgressBar 
                      className="progress-bar-green"
                      now={now} 
                      label={current} 
                      max={total}
                      style={{ backgroundColor: "" }} 
                    />
                    <div className="position-absolute w-100 text-end pe-2" style={{ top: "50%", transform: "translateY(-50%)" }}>
                      {total}
                    </div>
                  </div>
                  <div className="progress-content-group">
                    <div className="progress-content-label">Keyword Match</div>
                    <ProgressBar 
                      className="progress-bar-yellow"
                      now={now} 
                      label={current} 
                      max={total}
                      style={{ backgroundColor: "" }} 
                    />
                    <div className="position-absolute w-100 text-end pe-2" style={{ top: "50%", transform: "translateY(-50%)" }}>
                      {total}
                    </div>
                  </div>
                  
                </Col>
                <Col md={6} className="progress-content-progress-percentage d-flex justify-content-start align-items-center flex-column">
                  <span className="progress-content-label">Overall Fit Score Analysis</span>
                  <span className="progress-content-percentage">70%</span>

                </Col>
              </div>
            </Row>
            <Row className="airesumeoptimizationanalysis-container-row airesumeoptimizationanalysis-strength-analysis-content d-flex justify-content-around align-items-center flex-row gap-2">
              <div className="airesumeoptimizationanalysis-strength-analysis-content-header">
                <h5>Resume Strength Analysis</h5>
                <p>Evaluation of key resume components</p>
              </div>
              <div className="airesumeoptimizationanalysis-content-analysis">
              <Col className="progress-content-progress-percentage-container d-flex justify-content-around align-items-center flex-row">
                {dnname.map((name, index) => (
                  <Col key={index} xs={1} md={1} className="chart-col">
                    <div className="chart-name">{name}</div>
                    <div className="doughnut-chart" style={{ width: "10px" }}>
                      <Doughnut
                        className="doughnut"
                        data={createDoughnutData(dncurrent, dntotal, "#1706ac")}
                        options={{
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              enabled: true,
                              callbacks: {
                                label: (tooltipItem) => {
                                  const filledValue = Number(tooltipItem.raw) || 0;
                                  return `${filledValue.toFixed(1)} / ${dntotal}`;
                                },
                              },
                            },
                          },
                          rotation: -90,
                          circumference: 180,
                          cutout: "70%",
                          maintainAspectRatio: true,
                          responsive: true,
                        }}
                      />
                    </div>
                    <div className="chart-score">
                      <div>{dncurrent}</div>
                    </div>
                  </Col>
                ))}
              </Col>

              </div>
            </Row>
            <Row className="airesumeoptimizationanalysis-container-row airesumeoptimizationanalysis-btn-content d-flex justify-content-around align-items-center flex-row gap-2 w-100">
                <div className="airesumeoptimizationanalysis-container-btn d-flex justify-content-end align-items-center w-100">
                    <button 
                        className="btn-compare-resume btn-primary"
                        onClick={() => {
                          window.location.href = "/ResumeFitOptimizer/CompareResumes";
                        }}
                    >
                        Compare Resumes
                    </button>
                </div>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadDocs;
