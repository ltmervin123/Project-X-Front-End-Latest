import React, { useState } from "react";
const TRANSLATIONS = {
  English: {
    hrhatchQuestionFormats: "Question Formats",
    standardizedQuestionSets: "Standardized question sets provided by",
    formatDescription:
      "Snappcheck offers question formats for reference checks in three categories: Standard, Management, and Executive formats.",

    questions: "questions",
    viewQuestions: "View Questions",
  },
  Japanese: {
    hrhatchQuestionFormats: " 質問フォーマット",
    standardizedQuestionSets: "によって提供される標準化された質問セット",
    formatDescription:
      "Snappcheck は、標準、マネジメント、エグゼクティブの3種類のカテゴリでリファレンスチェック用の質問フォーマットを提供しています。",

    questions: "質問",
    viewQuestions: "質問を見る",
  },
};

const HrHatchFormatsComponent = ({ hrHatchFormats, handleButtonClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  // Define language here
  const language = sessionStorage.getItem("preferred-language") || "English"; // For fade in smooth animation

  return (
    <>
      <div className="AiReference-table-title">
        <h4 className="mb-0 d-flex gap-2 align-items-center">
          <div>
            <span className="color-orange">SNAPP</span>
            CHECK {TRANSLATIONS[language].hrhatchQuestionFormats}
          </div>

          <div className="position-relative d-flex">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <path
                d="M9 11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73478 12 7.48043 11.8946 7.29289 11.7071C7.10536 11.5196 7 11.2652 7 11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11ZM7.5 4C6.83696 4 6.20107 4.26339 5.73223 4.73223C5.26339 5.20107 5 5.83696 5 6.5H7C7 6.36739 7.05268 6.24021 7.14645 6.14645C7.24021 6.05268 7.36739 6 7.5 6H8.146C8.2321 6.00004 8.31566 6.02917 8.38313 6.08265C8.45061 6.13614 8.49803 6.21086 8.51771 6.29468C8.53739 6.3785 8.52818 6.46651 8.49156 6.54444C8.45495 6.62237 8.39309 6.68564 8.316 6.724L7 7.382V9H9V8.618L9.211 8.512C9.69063 8.27189 10.0752 7.87692 10.3024 7.39105C10.5296 6.90517 10.5862 6.35683 10.463 5.8348C10.3398 5.31276 10.044 4.8476 9.62346 4.51461C9.20296 4.18162 8.68238 4.0003 8.146 4H7.5Z"
                fill="#F46A05"
              />
              <path
                d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
                fill="#F46A05"
              />
            </svg>
            {showTooltip && (
              <span className="job-tooltip-text">
                {TRANSLATIONS[language].formatDescription}
              </span>
            )}
          </div>
        </h4>
        <p className="d-flex align-items-center">
          {TRANSLATIONS[language].standardizedQuestionSets}
          &nbsp;
          <b>
            <span className="color-orange">SNAPP</span>
            CHECK
          </b>
          .
        </p>
      </div>
      <div className="d-flex justify-content-around align-items-center h-100 gap-3 hr-hatch-card-container mt-2">
        {hrHatchFormats.map((format, index) => (
          <div
            key={index}
            className="hr-hatch-card d-flex justify-content-center align-items-center flex-column border"
          >
            <h5>
              {format.title} {format.svg}
            </h5>
            <p>{format.description}</p>
            <small>
              {format.questionCount} {TRANSLATIONS[language].questions}
            </small>
            <br />
            <button
              className="btn-view-questions mb-3"
              onClick={() => handleButtonClick(format.title)}
            >
              {TRANSLATIONS[language].viewQuestions}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default HrHatchFormatsComponent; // Ensure this line is present
