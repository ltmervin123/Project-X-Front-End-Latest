import React from "react";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";

function RFOAIResumeOptimizationAnalysis() {
  const scoreBreakdown = [
    { title: "Keyword Match", score: 99 },
    { title: "Skills Assessment", score: 70 },
    { title: "Achievements & Impact", score: 20 },
    { title: "Work Experience", score: 90 },
    { title: "Education & Certification", score: 20 },
    { title: "Formatting & Readability", score: 90 },
    { title: "Cultural Fit Indicators", score: 98 },
    { title: "Gaps in Employment", score: 20 },
    { title: "Professional Affiliations", score: 5 },
  ];

  const getProgressColor = (score) => {
    if (score <= 50) return "progress-red";
    if (score <= 70) return "progress-orange";
    if (score <= 90) return "progress-yellow";
    return "progress-green";
  };

  const getFontColor = (score) => {
    if (score <= 50) return "#ff0000"; // Red
    if (score <= 70) return "#f46a05"; // Orange
    if (score <= 90) return "#f8bd00"; // Yellow
    return "#319f43"; // Green
  };

  const averageScore = (
    scoreBreakdown.reduce((acc, item) => acc + item.score, 0) /
    scoreBreakdown.length
  ).toFixed(0);

  const circularProgressColor = getProgressColor(averageScore);
  const circularFontColor = getFontColor(averageScore);

  return (
    <>
      <div className="ResumeFitOptimizer-contentainer d-flex flex-column gap-2">
        <div className="ResumeFitOptimizer-content d-flex flex-column gap-2">
          <div className="header d-flex justify-content-center align-items-center">
            <h4>Resume Fit Analysis</h4>
          </div>
          <Row>
            <div className="airesumeoptimizationanalysis-container d-flex justify-content-start align-items-center gap-3">
              <div className="airesumeoptimizationanalysis-overallfitscore d-flex justify-content-center align-items-center gap-4 flex-column">
                <h1>Overall Fit Score</h1>
                <CircularProgressBar
                  percent={averageScore}
                  colorSlice={
                    circularProgressColor === "progress-green"
                      ? "#319f43"
                      : circularProgressColor === "progress-yellow"
                      ? "#f8bd00"
                      : circularProgressColor === "progress-orange"
                      ? "#f46a05"
                      : "#ff0000"
                  }
                  colorCircle="#e0e0e0"
                  fontColor={circularFontColor} // Set font color based on average score
                  fontSize="1rem"
                  fontWeight={500}
                  size={150}
                  stroke={10}
                  rotation={-90}
                  unit="%"
                  textPosition="0.35em"
                />
                <p>Your resume is a good match for this position</p>
              </div>
              <div className="airesumeoptimizationanalysis-scorebreakdown">
                <h3 className="mb-3">Score Breakdown</h3>
                <Row>
                  <Col>
                    {scoreBreakdown.slice(0, 5).map((item, index) => (
                      <div key={index} className="score-item mb-3">
                        <div className="d-flex justify-content-between">
                        <span className="mb-2">{item.title}</span>
                        <span style={{ color: getFontColor(item.score), fontWeight: "500" }}>{item.score}%</span>                        </div>
                        <ProgressBar
                          now={item.score}
                          variant={getProgressColor(item.score)}
                        />
                      </div>
                    ))}
                  </Col>
                  <Col>
                    {scoreBreakdown.slice(5).map((item, index) => (
                      <div key={index} className="score-item mb-3">
                        <div className="d-flex justify-content-between">
                          <span className="mb-2">{item.title}</span>
                          <span style={{ color: getFontColor(item.score), fontWeight: "500" }}>{item.score}%</span>                        </div>
                        <ProgressBar
                          now={item.score}
                          variant={getProgressColor(item.score)} 
                        />
                      </div>
                    ))}
                  </Col>
                </Row>
              </div>
            </div>
          </Row>

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
        </div>
      </div>
    </>
  );
}

export default RFOAIResumeOptimizationAnalysis;
