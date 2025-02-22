import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "../../styles/ResumeFitOptimizer.css";
import { Button, Row, Col } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Doughnut } from "react-chartjs-2";

function UploadDocs() {
  const now = 6;
  const chartdata = [
    { name : "Experience", current:4.6, total:10}, 
    {name:"Education", current:4.6, total:10}, 
    {name:"Achievements", current:4.6, total:10}, 
    {name:"Skills", current:4.6, total:10}
  ];
  const progressData = [
    { name: "Grammar & Clarity", current: 6, total: 10 },
    { name: "Structure & Readability", current: 8, total: 10 },
    { name: "Key Experience", current: 6, total: 10 },
    { name: "Keyword Match", current: 5, total: 10 },
  ];
  const createDoughnutData = (score, color) => ({
    datasets: [
      {
        data: [score, 10 - score], // Assuming a scale of 10
        backgroundColor: [color, "#36434E"], // Use the specified color and remaining color
        borderColor: "#36434E",
        borderWidth:0,
      },
    ],
  });

// Function to determine the progress bar color class
const getProgressBarClass = (current, total) => {
  const percentage = (current / total) * 10;
  if (percentage >= 7.6) return "progress-bar-green";
  if (percentage >= 5.1) return "progress-bar-orange";
  if (percentage >= 2.6) return "progress-bar-yellow";
  if (percentage >= 1) return "progress-bar-red";
  return "progress-bar-red";
};


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
                  {progressData.map((item, index) => (
                    <div className="progress-content-group" key={index}>
                      <div className="progress-content-label">{item.name}</div>
                      <ProgressBar 
                        className={getProgressBarClass(item.current, item.total)}
                        now={item.current} 
                        label={item.current} 
                        max={item.total}
                        style={{ backgroundColor: "" }} 
                      />
                      <div className="position-absolute w-100 text-end pe-2" style={{ top: "50%", transform: "translateY(-50%)" }}>
                        {item.total}
                      </div>
                    </div>
                  ))}
                </Col>
                <Col md={6} className="progress-content-progress-percentage d-flex justify-content-start align-items-center flex-column">
                  <span className="progress-content-percentage">70%</span>
                  <span className="progress-content-label">Overall Fit Score Analysis</span>

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
                {chartdata.map((item, index) => (
                  <Col key={index} md={2} className="chart-col">
                    <div className="chart-name">{item.name}</div>
                    <div className="doughnut-chart">
                      <Doughnut
                        className="doughnut"
                        data={createDoughnutData(item.current, "#28A745")}
                        options={{
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              enabled: true,
                              callbacks: {
                                label: (tooltipItem) => {
                                  const filledValue = Number(tooltipItem.raw) || 0;
                                  return `${filledValue.toFixed(1)} / ${item.total}`;
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
                      <div>{item.current}</div>
                    </div>
                  </Col>
                ))}
              </Col>


              </div>
            </Row>
            <Row className="airesumeoptimizationanalysis-container-row airesumeoptimizationanalysis-btn-content d-flex justify-content-around align-items-center flex-row gap-2 ">
                            <Col className="p-0">
                
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
                </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadDocs;
