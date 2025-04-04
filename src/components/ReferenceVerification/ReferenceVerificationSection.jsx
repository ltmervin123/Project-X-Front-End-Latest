import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import axios from "axios";

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

const translations = {
  English: {
    header: "Completed Reference Check",
    successMessage:
      "Your responses have been successfully saved. Thank you for completing the reference checking. We appreciate your time and input in this process. You may now download your responses or exit the page.",
    exit: "Exit",
  },
  Japanese: {
    header: "完了した参照チェック",
    successMessage:
      "あなたの回答は正常に保存されました。参照チェックを完了していただきありがとうございます。このプロセスにおけるあなたの時間と入力に感謝します。あなたは今、あなたの回答をダウンロードするか、ページを終了することができます。",
    exit: "終了",
  },
};

const ReferenceVerificationSection = () => {
  const API = process.env.REACT_APP_API_URL;
  const TOKEN = sessionStorage.getItem("token");
  const location = useLocation();
  const language = sessionStorage.getItem("preferred-language") || "English";
  const referenceQuestions =
    JSON.parse(sessionStorage.getItem("referenceQuestions")) || null;
  const [refereeQuestionFormat, setRefereeQuestionFormat] = useState(
    referenceQuestions?.formatType
  );
  const reportRef = useRef();
  const [downloading, setDownloading] = useState(false);
  const [fetchingReference, setFetchingReference] = useState(false);
  const [referenceData, setReferenceData] = useState(
    JSON.parse(sessionStorage.getItem("downloadedReference")) || []
  );
  const referenceId = location.state?.referenceId || null;
  const refereeId = location.state?.refereeId || null;

  const fetchReferenceByReferenceId = useCallback(async () => {
    try {
      setFetchingReference(true);
      const URL = `${API}/api/ai-referee/reference/download-reference/${referenceId}/${refereeId}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (response.status === 200) {
        setReferenceData(response.data.referenceDetails);
        sessionStorage.setItem(
          "downloadedReference",
          JSON.stringify(response.data.referenceDetails)
        );
      }
    } catch (error) {
      console.error("Error fetching reference data:", error);
    } finally {
      setFetchingReference(false);
    }
  }, [referenceId, refereeId]);

  useEffect(() => {
    const fetchingRefenceWhenRender = async () => {
      if (referenceId && refereeId && referenceData.length === 0) {
        await fetchReferenceByReferenceId();
      }
    };

    fetchingRefenceWhenRender();
  }, [referenceId, refereeId]);

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
      filename: `Referee ${referenceData?.referenceRequestId?.refereeName} Response Copy.pdf`,
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

  const clearReferenceSessionStorage = () => {
    sessionStorage.removeItem("downloadedReference");
    sessionStorage.removeItem("refereeData");
    sessionStorage.removeItem("referenceQuestions");
    sessionStorage.removeItem("referenceQuestionsData");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("preferred-language");
    sessionStorage.removeItem("interview-method");
  };

  return (
    <div className="row main-login justify-content-center position-relative">
      <div style={{ display: "none" }}>
        <div ref={reportRef} className="ViewRequest-container">
          <h4 className="color-orange mb-2">
            {referenceData?.questionFormat || "Not Available"}
          </h4>
          <p className="mb-2">
            <b>Position: </b>
            <span className="Capitalize">
              {referenceData?.referenceRequestId?.position || "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Candidate Name: </b>
            <span className="Capitalize">
              {referenceData?.referenceRequestId?.candidate || "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Referee Name: </b>
            <span className="Capitalize">
              {referenceData?.referenceRequestId?.refereeName ||
                "Not Available"}
            </span>
          </p>
          <p className="mb-2">
            <b>Referee Title: </b>
            <span className="Capitalize">
              {referenceData?.refereeTitle || "Not Available"}
            </span>
          </p>
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
              ? (referenceData?.referenceQuestion || [])
                  .sort((a, b) => {
                    const order = CATEGORY_ORDER[refereeQuestionFormat] || [];
                    return (
                      order.indexOf(a.category) - order.indexOf(b.category)
                    );
                  })
                  .map((item) => (
                    <div key={item?.category}>
                      <h5 className="color-gray mt-5">
                        {" "}
                        {formatCategories(item.category)}
                      </h5>
                      {(item?.questions || []).map((question, index) => (
                        <div key={index}>
                          <div className="d-flex w-100 mt-4">
                            <p className="mb-2">
                              <b>Question {index + 1}: </b>
                              {question}
                            </p>
                          </div>

                          <h6 className="color-gray mb-2">
                            {item?.preferredAnswerType[index] ||
                              "Not Available"}
                          </h6>

                          <div className="AIEnchanceAns-container mb-4">
                            <p>
                              {item?.answers[index] || "No Answer Provided"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
              : (referenceData?.referenceQuestion || []).map((item) => (
                  <div key={item.category}>
                    <h5 className="color-gray">{item.category}</h5>
                    {(item.questions || []).map((question, index) => (
                      <div key={index}>
                        <div className="d-flex w-100 mt-4">
                          <p className="mb-2">
                            <b>Question {index + 1}: </b>
                            {question}
                          </p>
                        </div>

                        <h6 className="color-gray mb-2">
                          {item.preferredAnswerType[index] || "Not Available"}
                        </h6>

                        <div className="AIEnchanceAns-container mb-4">
                          <p>{item.answers[index] || "No Answer Provided"}</p>
                        </div>
                      </div>
                    ))}
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
              {referenceData?.referenceRequestId?.refereeName ||
                "Not Available"}
            </span>
          </p>
          <p className=" mb-2">
            <b>Date:</b>
            <span> {formatDate(referenceData?.createdAt)}</span>
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center main-login-form">
        <div className="reference-verification-container">
          <div className="reference-verification-header">
            <svg
              width="50"
              height="50"
              viewBox="0 0 68 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M68 34C68 52.7773 52.7773 68 34 68C15.2227 68 0 52.7773 0 34C0 15.2227 15.2227 0 34 0C52.7773 0 68 15.2227 68 34ZM18.5455 37.0909L23.1818 32.4545L29.3636 38.6364L44.8182 23.1818L49.4545 27.8182L29.3636 47.9091L18.5455 37.0909Z"
                fill="white"
              />
            </svg>
            <h2 className="fs-4">{translations[language].header}</h2>
          </div>

          <p>{translations[language].successMessage}</p>
          <div className="d-flex gap-4">
            <button
              className="btn-download"
              onClick={downloadPDF}
              disabled={downloading || fetchingReference}
            >
              {downloading ? "Downloading..." : "Download"}
            </button>
            <button
              className="btn-exit"
              onClick={() => {
                clearReferenceSessionStorage();
                window.location.href = "/";
              }}
            >
              {translations[language].exit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceVerificationSection;
