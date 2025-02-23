import React, { useState, useEffect, useRef } from "react"; // Ensure useState is imported
import "../../styles/ViewRequest.css";
import axios from "axios";

import html2pdf from "html2pdf.js";

function ViewRequest({ referenceId, token }) {
  const reportRef = useRef();

  const API = process.env.REACT_APP_API_URL;
  const [fetchingRefence, setFetchingReference] = useState(false);
  const [error, setError] = useState("");
  const [referenceData, setReferenceData] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const fetchReferenceByReferenceId = async () => {
    try {
      setFetchingReference(true);
      const URL = `${API}/api/ai-referee/company-request-reference//get-reference/${referenceId}`;
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
    if (!date) return "Invalid Date"; // Handle null/undefined cases

    const newDate = new Date(date);
    if (isNaN(newDate)) return "Invalid Date"; // Handle invalid dates

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

  //fetching reference when the component mounts

  const downloadPDF = () => {
    if (!reportRef.current) return;
    setDownloading(true);

    const options = {
      margin: 10,
      filename: `${referenceData?.referenceRequestId?.candidate}-Reference-Report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // Increase quality
        useCORS: true, // Ensures external images are loaded
      },
      jsPDF: {
        unit: "mm",
        format: "legal",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        compressPDF: true, // Reduces file size
      },
      pagebreak: { mode: ["avoid-all", "legacy"] },
    };

    html2pdf()
      .set(options)
      .from(reportRef.current)
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

  if (fetchingRefence) {
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

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="ViewRequest-container">
        <div ref={reportRef}>
          <h4 className="color-orange mb-2">
            {referenceData?.questionFormat || "Not Available"}
          </h4>
          <p className="mb-2">
            <b>Position: </b>
            <span>
              {referenceData?.referenceRequestId?.position || "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Candidate Name: </b>
            <span>
              {referenceData?.referenceRequestId?.candidate || "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Referee Name: </b>
            <span>
              {referenceData?.referenceRequestId?.refereeName ||
                "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Referee Title: </b>
            <span>{referenceData?.refereeTitle || "Not Available"}</span>
          </p>
          {/* <p className="mb-2">
            <b>Company Name: </b>
            <span>[Insert Company Name]</span>
          </p> */}
          <p className="mb-2">
            <b>Relationship to Candidate: </b>
            <span>
              {formatter(referenceData?.refereeRelationshipWithCandidate)}
            </span>
          </p>
          <p className="mb-2">
            <b>Dates Worked Together: </b>

            <span>
              {referenceData?.workDuration ? (
                <>
                  From{" "}
                  {formatDateForWorkDuration(
                    referenceData?.workDuration?.startDate
                  )}{" "}
                  To{" "}
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
            {referenceData?.referenceQuestion.map((item) => (
              <div>
                <h5 className="color-gray">
                  {formatCategories(item.category)}
                </h5>
                {item.questions.map((question, index) => (
                  <div>
                    <div className="d-flex w-100">
                      <p>
                        <b>Question {index + 1}: </b>

                        {question}
                      </p>
                    </div>

                    <h6 className="color-gray">Normalized Answer:</h6>

                    <div className="EnchanceAns-container mb-4">
                      <p>{item.answers[index]}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="signature-verif-title color-orange mb-2">
            SIGNATURE AND VERIFICATION
          </p>
          <img
            className="signature-feild"
            src={referenceData?.signatureImageURL || ""}
            alt="Signature here..."
          />

          <p className="mb-2">
            <b>Referee Name: </b>
            <span>
              {referenceData?.referenceRequestId?.refereeName ||
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
