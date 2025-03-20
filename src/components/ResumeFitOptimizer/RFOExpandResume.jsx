import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import axios from "axios";

function ExpandResume() {
  const uploadedDocData = JSON.parse(
    localStorage.getItem("rfoUploadedDocxData")
  );
  const [docData, setDocData] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCard, setActiveCard] = useState("v1"); // State to track active card
  const SERVER_URL = process.env.REACT_APP_API_URL;
  const userStr = localStorage.getItem("user");
  const userData = userStr ? JSON.parse(userStr) : null;
  const token = userData?.token;
  const log = console.log;
  log("uploadedDocData", uploadedDocData);

  const expandResume = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = (version) => {
    setActiveCard(version);
  };

  return (
    <div className="ResumeFitOptimizer-container d-flex flex-column gap-2">
      <div className="expnadresume-container d-flex justify-content-center align-items-center flex-column gap-3">
        <Row className=" expnadresume-resume-content w-100 d-flex gap-3 px-4">
          <Col className="expnadresume-content-resume-original">
            <div className="expnadresume-content-resume-original-header">
              <h5 className="mb-2">Original Resume</h5>
            </div>
            <div className="expnadresume-content-resume-original-content">
              <div
                className={`resume-original-content-container ${
                  isExpanded ? "expanded" : ""
                }`}
              >
                <DocViewer
                  documents={[
                    {
                      uri: "https://www2.hu-berlin.de/stadtlabor/wp-content/uploads/2021/12/sample3.docx",
                      fileType: "docx",
                      fileName: "sample3",
                    },
                  ]}
                  pluginRenderers={DocViewerRenderers}
                  style={{ height: "100%", width: "100%" }}
                  config={{
                    header: {
                      disableHeader: false,
                      disableFileName: false,
                    },
                    zoom: {
                      disableZoom: true,
                      disableWheelZoom: false,
                    },
                    fullscreen: {
                      disableFullscreen: true,
                    },
                    theme: {
                      primary: "#007bff",
                      secondary: "#6c757d",
                      text_primary: "#000000",
                      text_secondary: "#ffffff",
                      disableThemeToggle: true,
                    },
                  }}
                />
                <Button className="expand-button" onClick={expandResume}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 800 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M675 500V675H500"
                      stroke="black"
                      strokeWidth="50"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M659.062 659.016L475 475"
                      stroke="black"
                      strokeWidth="50"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M125 300V125H300"
                      stroke="black"
                      strokeWidth="50"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M140.938 140.984L325 325"
                      stroke="black"
                      strokeWidth="50"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M500 125H675V300"
                      stroke="black"
                      strokeWidth="50"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M659.016 140.938L475 325"
                      stroke="black"
                      strokeWidth="50"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M300 675H125V500"
                      stroke="black"
                      strokeWidth="50"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M140.984 659.062L325 475"
                      stroke="black"
                      strokeWidth="50"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </Col>
          <Col className="expnadresume-content-resume-optimized">
            <div className="expnadresume-content-resume-optimized-header">
              <h5 className="mb-2">Optimized Resume</h5>
              {/* Cards for Standard Resumes */}
              <Row className="mb-3 d-flex justify-content-center ">
                {["v1", "v2", "v3"].map((version) => (
                  <Col key={version}>
                    <Card
                      onClick={() => handleCardClick(version)}
                      className={activeCard === version ? "active" : ""}
                    >
                      <Card.Body>
                        <Card.Title>Standard {version}</Card.Title>
                        <Card.Text>
                          {version === "v1"
                            ? "Traditional format with enhanced content"
                            : version === "v2"
                            ? "Modern layout with section icons"
                            : "Two-column minimalist design"}
                        </Card.Text>
                      </Card.Body>
                      {activeCard === version && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 16C9.05058 16 10.0909 15.7931 11.0615 15.391C12.0321 14.989 12.914 14.3997 13.6569 13.6569C14.3997 12.914 14.989 12.0321 15.391 11.0615C15.7931 10.0909 16 9.05058 16 8C16 6.94943 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05058 -1.56548e-08 8 0C5.87827 3.16163e-08 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM7.79378 11.2356L12.2382 5.90222L10.8729 4.76444L7.05067 9.35022L5.07289 7.37156L3.816 8.62844L6.48267 11.2951L7.17067 11.9831L7.79378 11.2356Z"
                            fill="#F46A05"
                          />
                        </svg>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="expnadresume-content-resume-optimized-content">
              {activeCard === "v1" && <div>Content for Standard v1</div>}
              {activeCard === "v2" && <div>Content for Standard v2</div>}
              {activeCard === "v3" && <div>Content for Standard v3</div>}
            </div>
          </Col>
        </Row>
        <Row className="expnadresume-btn-content d-flex justify-content-around align-items-center flex-row gap-2 w-100">
          <Col className="px-3">
            <div className="expnadresume-container-btn d-flex justify-content-end align-items-center ">
              <button
                className="btn-save-export btn-primary"
                onClick={() => {
                  window.location.href =
                    "/ResumeFitOptimizer/SaveAndExportResumes";
                }}
              >
                Save and Export
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ExpandResume;