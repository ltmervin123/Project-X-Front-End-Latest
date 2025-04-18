import React, { useState, useEffect, useRef } from "react";
import "../../../../styles/AiRefereeStyles/ViewRequest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";

const CATEGORY_ORDER = {
  "Standard Format": [
    "relationship",
    "jobResponsibilitiesAndPerformance",
    "skillAndCompetencies",
    "workEthicAndBehavior",
    "closingQuestions",
  ],
  "Management Format": [
    "relationship",
    "jobResponsibilitiesAndPerformance",
    "leadershipAndManagementSkills",
    "workEthicAndBehavior",
    "closingQuestions",
  ],
  "Executive Format": [
    "relationship",
    "jobResponsibilitiesAndPerformance",
    "strategicLeadershipAndVision",
    "businessImpactAndResults",
    "teamLeadershipAndOrganizationalDevelopment",
    "decisionMakingAndProblemSolving",
    "innovationAndGrowth",
    "closingQuestions",
  ],
};

function ViewRequest({
  referenceId,
  refereeId,
  token,
  refereeQuestionFormat,
  onClose,
}) {
  const reportRef = useRef();
  const API = process.env.REACT_APP_API_URL;
  const [fetchingReference, setFetchingReference] = useState(false);
  const [error, setError] = useState("");
  const [referenceData, setReferenceData] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const handleReturnReferenceRequest = () => {
    onClose();
  };

  const fetchReferenceByReferenceId = async () => {
    try {
      setFetchingReference(true);
      const URL = `${API}/api/ai-referee/company-request-reference/get-reference/${referenceId}/${refereeId}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setReferenceData(response.data.referenceDetails);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "An error occurred while fetching reference"
      );
    } finally {
      setFetchingReference(false);
    }
  };

  function formatDate(date) {
    const newDate = new Date(date);
    return newDate.toDateString();
  }

  function formatDateForWorkDuration(date) {
    if (!date) return "Invalid Date";

    const newDate = new Date(date);
    if (isNaN(newDate)) return "Invalid Date";

    return newDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
  function formatter(letter) {
    if (!letter) {
      return "";
    }
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  }

  function formatCategories(letter) {
    switch (letter) {
      case "relationship":
        return "Relationship";
      case "jobResponsibilitiesAndPerformance":
        return "Job Responsibilities and Performance";
      case "skillAndCompetencies":
        return "Skills and Competencies";
      case "workEthicAndBehavior":
        return "Work Ethic and Behavior";
      case "closingQuestions":
        return "Closing Questions";
      case "strategicLeadershipAndVision":
        return "Strategic Leadership and Vision";
      case "businessImpactAndResults":
        return "Business Impact and Results";
      case "teamLeadershipAndOrganizationalDevelopment":
        return "Team Leadership and Organizational Development";
      case "decisionMakingAndProblemSolving":
        return "Decision Making and Problem Solving";
      case "innovationAndGrowth":
        return "Innovation and Growth";
      case "leadershipAndManagementSkills":
        return "Leadership and Management Skills";
      default:
        return "Not Available";
    }
  }

  function getOverallAssessmentText(category) {
    switch (category) {
      // Standard Format
      case "jobResponsibilitiesAndPerformance":
        return "Overall Job Performance Assessment:";
      case "skillAndCompetencies":
        return "Overall Assessment of Skills and Competencies:";
      case "workEthicAndBehavior":
        return "Overall Evaluation Regarding Work Ethic and Behavior:";

      // Management Format
      case "leadershipAndManagementSkills":
        return "Overall Performance in Leadership and Management:";
      case "workEthicAndBehavior":
        return "Overall Evaluation Regarding Work Ethic and Behavior:";

      // Executive Format
      case "strategicLeadershipAndVision":
        return "Overall Assessment of Strategic Leadership:";
      case "businessImpactAndResults":
        return "Overall Assessment of Business Impact and Results:";
      case "teamLeadershipAndOrganizationalDevelopment":
        return "Overall Assessment of Team Leadership and Organizational Development:";
      case "decisionMakingAndProblemSolving":
        return "Overall Assessment of Decision Making and Problem Solving:";
      case "innovationAndGrowth":
        return "Overall Assessment of Innovation and Growth:";

      default:
        return `Overall ${formatCategories(category)} Assessment:`;
    }
  }

  const getAssessmentStyle = (assessment) => {
    switch (assessment) {
      case "Unsatisfactory":
        return {
          color: "#FF1D48",
          borderColor: "#FF1D48",
          backgroundColor: "rgba(255, 29, 72, 0.15)",
        };
      case "Needs Improvement":
        return {
          color: "#ED7D31",
          borderColor: "#ED7D31",
          backgroundColor: "rgba(237, 125, 49, 0.15)",
        };
      case "Meets Expectations":
        return {
          color: "#FFEA66",
          borderColor: "#FFEA66",
          backgroundColor: "rgba(255, 234, 102, 0.15)",
        };
      case "Exceeds Expectations":
        return {
          color: "#70AD47",
          borderColor: "#70AD47",
          backgroundColor: "rgba(112, 173, 71, 0.15)",
        };
      case "Exceptional":
        return {
          color: "#5D643F",
          borderColor: "#5D643F",
          backgroundColor: "rgba(93, 100, 63, 0.15)",
        };
      default:
        return {
          color: "grey",
          borderColor: "grey",
          backgroundColor: "rgba(128, 128, 128, 0.15)",
        };
    }
  };

  const downloadPDF = () => {
    if (!reportRef.current) return;
    setDownloading(true);

    // Clone the report content to modify it without affecting the original
    const clonedReport = reportRef.current.cloneNode(true);

    // Remove the Id image container
    clonedReport.querySelector(".uploaded-id-container").remove();

    // Modify the "SIGNATURE AND VERIFICATION" text
    const signatureTitle = clonedReport.querySelector(".signature-verif-title");
    if (signatureTitle) {
      signatureTitle.textContent = "Signature";
    }

    const options = {
      margin: 10,
      filename: `${referenceData?.referenceRequestId?.candidate.firstName} ${referenceData?.referenceRequestId?.candidate.lastName}-Reference-Report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "legal",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        compressPDF: true,
      },
      pagebreak: { mode: ["avoid-all", "legacy"] },
    };

    html2pdf()
      .set(options)
      .from(clonedReport)
      .save()
      .then(() => {
        setDownloading(false);
      });
  };

  useEffect(() => {
    const fetchingRefenceWhenRender = async () => {
      await fetchReferenceByReferenceId();
    };

    fetchingRefenceWhenRender();
  }, []);

  if (fetchingReference) {
    return (
      <div className="MockMainDashboard-content d-flex flex-column gap-2">
        <h3>Loading Reference Request...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="MockMainDashboard-content d-flex flex-column gap-2">
        <h3>{error}</h3>
      </div>
    );
  }

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setIsLandscape(naturalWidth > naturalHeight);
  };

  const handleImageError = () => {
    console.error("Image failed to load");
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="w-100 mb-2">
        <button
          className="btn-back-to-reference-request d-flex gap-3 align-items-center"
          onClick={handleReturnReferenceRequest}
        >
          <svg
            width="27"
            height="16"
            viewBox="0 0 27 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.292893 8.70711C-0.0976314 8.31658 -0.0976315 7.68342 0.292892 7.2929L6.65685 0.928934C7.04738 0.53841 7.68054 0.538409 8.07107 0.928934C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65686 15.0711L0.292893 8.70711ZM27 9L1 9L1 7L27 7L27 9Z"
              fill="white"
            />
          </svg>
          Return to Reference Request
        </button>
      </div>
      <div className="ViewRequest-container">
        <div ref={reportRef}>
          <h4 className="color-orange mb-2">
            {referenceData?.questionFormat || "Not Available"}
          </h4>
          <p className="mb-2">
            <b>Position Applied For: </b>
            <span className="Capitalize">
              {referenceData?.referenceRequestId?.position || "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Applicant: </b>
            <span className="Capitalize">
              {`${referenceData?.referenceRequestId?.candidate.firstName} ${referenceData?.referenceRequestId?.candidate.lastName}` ||
                "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Referee Name: </b>
            <span className="Capitalize">
              {`${referenceData?.referenceRequestId?.refereeName.firstName} ${referenceData?.referenceRequestId?.refereeName.lastName}` ||
                "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Current Company: </b>
            <span className="Capitalize">
              {referenceData?.currentCompany || "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>
              Company you worked with (
              {referenceData?.referenceRequestId?.candidate.firstName}):{" "}
            </b>
            <span>
              {formatter(referenceData?.companyWorkedWith) || "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Relationship to the Applicant: </b>
            <span>
              {formatter(referenceData?.refereeRelationshipWithCandidate) ||
                "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Dates Worked Together: </b>
            <span>
              {referenceData?.workDuration ? (
                <>
                  <b>From</b>{" "}
                  {formatDateForWorkDuration(
                    referenceData?.workDuration?.startDate
                  )}{" "}
                  <b>To</b>{" "}
                  {formatDateForWorkDuration(
                    referenceData?.workDuration?.endDate
                  )}
                </>
              ) : (
                "Not Available"
              )}
            </span>
          </p>

          <div className="my-4">
            {refereeQuestionFormat === "HR-HATCH-FORMAT"
              ? referenceData?.referenceQuestion
                  .sort((a, b) => {
                    const order = CATEGORY_ORDER[refereeQuestionFormat] || [];
                    return (
                      order.indexOf(a.category) - order.indexOf(b.category)
                    );
                  })
                  .map((item) => (
                    <div key={item.category}>
                      <h5 className="color-gray mt-5">
                        {formatCategories(item.category)}
                      </h5>
                      {item.questions.map((question, index) => (
                        <div key={index}>
                          <div className="d-flex w-100 mt-4">
                            <p className="mb-2">
                              <b>Question {index + 1}: </b>
                              {question}
                            </p>
                          </div>

                          <h6 className="color-gray mb-2">
                            {item.preferredAnswerType[index]}
                          </h6>

                          <div className="AIEnchanceAns-container mb-4">
                            <p>{item.answers[index]}</p>
                          </div>
                        </div>
                      ))}

                      {/* Add Overall Category Assessment */}
                      {item.category !== "relationship" &&
                        item.category !== "closingQuestions" && (
                          <div className="overall-assessment-container mt-4 d-flex gap-2 align-items-center">
                            <b>{getOverallAssessmentText(item.category)}</b>
                            <div
                              className="overall-assessment-detail"
                              style={getAssessmentStyle(item.assessmentRating)}
                            >
                              <p className="m-0">
                                {item.assessmentRating || "Not Available"}
                              </p>
                            </div>
                          </div>
                        )}
                    </div>
                  ))
              : referenceData?.referenceQuestion.map((item) => (
                  <div key={item.category}>
                    <h5 className="color-gray">{item.category}</h5>
                    {item.questions.map((question, index) => (
                      <div key={index}>
                        <div className="d-flex w-100 mt-4">
                          <p className="mb-2">
                            <b>Question {index + 1}: </b>
                            {question}
                          </p>
                        </div>

                        <h6 className="color-gray mb-2">
                          {item.preferredAnswerType[index]}
                        </h6>

                        <div className="AIEnchanceAns-container mb-4">
                          <p>{item.answers[index]}</p>
                        </div>
                      </div>
                    ))}

                    {/* Add Overall Category Assessment */}
                    {/* {item.category !== "relationship" &&
                      item.category !== "closingQuestions" && (
                        <div className="overall-assessment-container mt-4 d-flex gap-2 align-items-center">
                          <b>{getOverallAssessmentText(item.category)}</b>
                          <div
                            className="overall-assessment-detail"
                            style={getAssessmentStyle(item.overallAssessment)}
                          >
                            <p className="m-0">
                              {item.overallAssessment || "Not Available"}
                            </p>
                          </div>
                        </div>
                      )} */}
                  </div>
                ))}
          </div>

          <p className="signature-verif-title color-orange mt-5 mb-3">
            SIGNATURE AND VERIFICATION
          </p>
          <div className="w-100 uploaded-id-container d-flex gap-3 mb-5">
            <div>
              {referenceData?.frontIdImageURL ? (
                <img
                  src={referenceData.frontIdImageURL}
                  alt="ID displayed here..."
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={isLandscape ? "landscape" : "portrait"}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
          <img
            className="signature-feild"
            src={referenceData?.signatureImageURL || ""}
            alt="Signature here..."
          />

          <p className="mb-2">
            <b>Referee Name: </b>
            <span className="Capitalize">
              {`${referenceData?.referenceRequestId?.refereeName.firstName} ${referenceData?.referenceRequestId?.refereeName.lastName}` ||
                "Not Available"}
            </span>
          </p>
          <p className=" mb-2">
            <b>Date:</b>
            <span> {formatDate(referenceData?.createdAt)}</span>
          </p>
        </div>

        <div className="d-flex justify-content-center">
          <button onClick={downloadPDF} disabled={downloading}>
            {downloading ? "Downloading..." : "Download Reference Report"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewRequest;
