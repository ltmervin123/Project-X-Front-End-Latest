import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

const ReferenceVerificationSection = () => {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const language = sessionStorage.getItem("preferred-language") || "English";
  const reportRef = useRef();

  const translations = {
    English: {
      header: "Completed Reference Check",
      successMessage: "Your responses have been successfully saved. Thank you for completing the reference checking. We appreciate your time and input in this process. You may now download your responses or exit the page.",
      exit: "Exit",
    },
    Japanese: {
      header: "完了した参照チェック",
      successMessage: "あなたの回答は正常に保存されました。参照チェックを完了していただきありがとうございます。このプロセスにおけるあなたの時間と入力に感謝します。あなたは今、あなたの回答をダウンロードするか、ページを終了することができます。",
      exit: "終了",
    },
  };

  const referenceData = {
    referenceRequestId: {
      position: "Software Engineer",
      candidate: "John Doe",
      refereeName: "Jane Smith",
      refereeTitle: "Senior Developer",
    },
    refereeRelationshipWithCandidate: "Colleague",
    workDuration: {
      startDate: "2020-01-01",
      endDate: "2021-01-01",
    },
    referenceQuestion: [
      {
        category: "Technical Skills",
        questions: ["What are the candidate's strengths?", "How does the candidate handle pressure?"],
        answers: ["Strong problem-solving skills.", "Handles pressure well."],
      },
    ],
    createdAt: new Date().toISOString(),
  };

  const formatCategories = (letter) => {
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
      default:
        return "Not Available";
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    if (!reportRef.current) return;

    const clonedReport = reportRef.current.cloneNode(true);
    const signatureTitle = clonedReport.querySelector(".signature-verif-title");
    if (signatureTitle) {
      signatureTitle.textContent = "Signature";
    }

    const options = {
      margin: 10,
      filename: `${referenceData.referenceRequestId.candidate}-Reference-Report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "legal", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(clonedReport)
      .save()
      .finally(() => setDownloading(false));
  };

  return (
    <div className="row main-login justify-content-center position-relative">
      {/* Hidden report content for PDF generation */}
      <div style={{ display: "none" }}>
        <div ref={reportRef} className="ViewRequest-container">
          <h4 className="color-orange mb-2">Standard Format</h4>
          <p className="mb-2">
            <b>Position: </b>
            <span className="Capitalize">
              {referenceData.referenceRequestId.position}
            </span>
          </p>
          <p className="mb-2">
            <b>Candidate Name: </b>
            <span className="Capitalize">
              {referenceData.referenceRequestId.candidate}
            </span>
          </p>
          <p className="mb-2">
            <b>Referee Name: </b>
            <span className="Capitalize">
              {referenceData.referenceRequestId.refereeName}
            </span>
          </p>
          <p className="mb-2">
            <b>Referee Title: </b>
            <span className="Capitalize">
              {referenceData.referenceRequestId.refereeTitle}
            </span>
          </p>
          <p className="mb-2">
            <b>Relationship to Candidate: </b>
            {referenceData.refereeRelationshipWithCandidate}
          </p>
          <p className="mb-2">
            <b>Dates Worked Together: </b>
            From {referenceData.workDuration.startDate} To{" "}
            {referenceData.workDuration.endDate}
          </p>
          <div className="my-4">
            {referenceData.referenceQuestion.map((item) => (
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
                    <div className="AIEnchanceAns-container mb-4">
                      <p>{item.answers[index]}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="signature-verif-title color-orange mt-5 mb-3">
            SIGNATURE AND VERIFICATION
          </p>
          <p className="mb-2">
            <b>Referee Name: </b>
            {referenceData.referenceRequestId.refereeName}
          </p>
          <p className="mb-2">
            <b>Date:</b> {new Date(referenceData.createdAt).toDateString()}
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
          <button className="btn-download" onClick={handleDownload} disabled={downloading}>
            {downloading ? "Downloading..." : "Download"}
          </button>
            <button
              className="btn-exit"
              onClick={() => (window.location.href = "/")}
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