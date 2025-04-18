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
    position: "Position Applied For",
    candidateName: "Applicant",
    refereeName: "Referee Name",
    refereeTitle: "Current Company",
    currentCompany: "Current Company",
    relationshipToCandidate: "Relationship to the Applicant",
    datesWorkedTogether: "Dates Worked Together",
    from: "From",
    to: "To",
    notAvailable: "Not Available",
    relationship: "Relationship",
    jobResponsibilitiesAndPerformance: "Job Responsibilities and Performance",
    skillAndCompetencies: "Skills and Competencies",
    workEthicAndBehavior: "Work Ethic and Behavior",
    closingQuestions: "Closing Questions",
    strategicLeadershipAndVision: "Strategic Leadership and Vision",
    businessImpactAndResults: "Business Impact and Results",
    teamLeadershipAndOrganizationalDevelopment:
      "Team Leadership and Organizational Development",
    decisionMakingAndProblemSolving: "Decision Making and Problem Solving",
    innovationAndGrowth: "Innovation and Growth",
    leadershipAndManagementSkills: "Leadership and Management Skills",
    signatureAndVerification: "SIGNATURE AND VERIFICATION",
    noImageAvailable: "No image available",
    noAnswerProvided: "No Answer Provided",
    downloading: "Downloading...",
    download: "Download",
    date: "Date",
    signature: "Signature",
    invalidDate: "Invalid Date",
    refereeCompanyWorkedWith: "Company Worked With",

    question: function (index) {
      return `Question ${index + 1}`;
    },
    originalAnswer: "Original Answer",
    aiEnhancedAnswer: "AI Enhanced Answer",
    format: {
      "Standard Format": "Standard Format",
      "Management Format": "Management Format",
      "Executive Format": "Executive Format",
    },
    steps: [
      "Basic Information",
      "Select Language",
      "Choose Method",
      "Questionnaire",
      "Reference Completed",
    ],
    assessments: {
      Unsatisfactory: "Unsatisfactory",
      "Needs Improvement": "Needs Improvement",
      "Meets Expectations": "Meets Expectations",
      "Exceeds Expectations": "Exceeds Expectations",
      Exceptional: "Exceptional",
    },
    overallAssessments: {
      jobPerformance: "Overall Job Performance Assessment:",
      skillsAndCompetencies: "Overall Assessment of Skills and Competencies:",
      workEthicAndBehavior:
        "Overall Evaluation Regarding Work Ethic and Behavior:",
      leadershipAndManagement:
        "Overall Performance in Leadership and Management:",
      strategicLeadership: "Overall Assessment of Strategic Leadership:",
      businessImpact: "Overall Assessment of Business Impact and Results:",
      teamLeadership:
        "Overall Assessment of Team Leadership and Organizational Development:",
      decisionMaking:
        "Overall Assessment of Decision Making and Problem Solving:",
      innovationAndGrowth: "Overall Assessment of Innovation and Growth:",
    },
  },
  Japanese: {
    header: "完了した参照チェック",
    successMessage:
      "あなたの回答は正常に保存されました。参照チェックを完了していただきありがとうございます。このプロセスにおけるあなたの時間と入力に感謝します。あなたは今、あなたの回答をダウンロードするか、ページを終了することができます。",
    exit: "終了",
    position: "応募した職位",
    candidateName: "応募者",
    refereeName: "推薦者名",
    refereeTitle: "現在の会社",
    currentCompany: "現在の会社名",
    relationshipToCandidate: "応募者との関係",
    datesWorkedTogether: "一緒に働いた期間",
    from: "開始日",
    to: "終了日",
    notAvailable: "利用不可",
    relationship: "関係",
    jobResponsibilitiesAndPerformance: "職務責任とパフォーマンス",
    skillAndCompetencies: "スキルと能力",
    workEthicAndBehavior: "労働倫理と行動",
    closingQuestions: "締めの質問",
    strategicLeadershipAndVision: "戦略的リーダーシップとビジョン",
    businessImpactAndResults: "ビジネスへの影響と結果",
    teamLeadershipAndOrganizationalDevelopment:
      "チームリーダーシップと組織開発",
    decisionMakingAndProblemSolving: "意思決定と問題解決",
    innovationAndGrowth: "革新と成長",
    leadershipAndManagementSkills: "リーダーシップと管理スキル",
    signatureAndVerification: "署名と確認",
    noImageAvailable: "画像は利用できません",
    noAnswerProvided: "回答は提供されていません",
    downloading: "ダウンロード中...",
    download: "ダウンロード",
    date: "日付",
    signature: "署名",
    invalidDate: "無効な日付",
    refereeCompanyWorkedWith: "一緒に働いた会社",

    question: function (index) {
      return `第${index + 1}問`;
    },
    originalAnswer: "元の回答",
    aiEnhancedAnswer: "AI強化回答",
    format: {
      "Standard Format": "標準フォーマット",
      "Management Format": "管理用フォーマット",
      "Executive Format": "経営層向けフォーマット",
    },
    steps: ["基本情報", "言語選択", "方法選択", "アンケート", "参照完了"],
    assessments: {
      Unsatisfactory: "不満足",
      "Needs Improvement": "改善が必要",
      "Meets Expectations": "期待に応える",
      "Exceeds Expectations": "期待を上回る",
      Exceptional: "優れている",
    },
    overallAssessments: {
      jobPerformance: "総合的な職務遂行評価：",
      skillsAndCompetencies: "スキルと能力の総合評価：",
      workEthicAndBehavior: "職業倫理と行動に関する総合評価：",
      leadershipAndManagement: "リーダーシップと管理能力の総合評価：",
      strategicLeadership: "戦略的リーダーシップの総合評価：",
      businessImpact: "ビジネスへの影響と成果の総合評価：",
      teamLeadership: "チームリーダーシップと組織開発の総合評価：",
      decisionMaking: "意思決定と問題解決の総合評価：",
      innovationAndGrowth: "革新と成長の総合評価：",
    },
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
    if (!date) return translations[language].invalidDate; // Use translation for "Invalid Date"

    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) return translations[language].invalidDate; // Check if the date is valid

    // Format the date based on the selected language
    return newDate.toLocaleDateString(
      language === "Japanese" ? "ja-JP" : "en-US",
      {
        month: "long",
        year: "numeric",
        day: "numeric", // Include day for better formatting
      }
    );
  }

  function formatDateForWorkDuration(date) {
    if (!date) return translations[language].invalidDate; // Use translation for "Invalid Date"

    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) return translations[language].invalidDate; // Check if the date is valid

    return newDate.toLocaleDateString(
      language === "Japanese" ? "ja-JP" : "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );
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
        return translations[language].relationship;
      case "jobResponsibilitiesAndPerformance":
        return translations[language].jobResponsibilitiesAndPerformance;
      case "skillAndCompetencies":
        return translations[language].skillAndCompetencies;
      case "workEthicAndBehavior":
        return translations[language].workEthicAndBehavior;
      case "closingQuestions":
        return translations[language].closingQuestions;
      case "strategicLeadershipAndVision":
        return translations[language].strategicLeadershipAndVision;
      case "businessImpactAndResults":
        return translations[language].businessImpactAndResults;
      case "teamLeadershipAndOrganizationalDevelopment":
        return translations[language]
          .teamLeadershipAndOrganizationalDevelopment;
      case "decisionMakingAndProblemSolving":
        return translations[language].decisionMakingAndProblemSolving;
      case "innovationAndGrowth":
        return translations[language].innovationAndGrowth;
      case "leadershipAndManagementSkills":
        return translations[language].leadershipAndManagementSkills;
      default:
        return translations[language].notAvailable;
    }
  }

  function getOverallAssessmentText(category) {
    const t = translations[language].overallAssessments;

    switch (category) {
      // Standard Format
      case "jobResponsibilitiesAndPerformance":
        return t.jobPerformance;
      case "skillAndCompetencies":
        return t.skillsAndCompetencies;
      case "workEthicAndBehavior":
        return t.workEthicAndBehavior;
      // Management Format
      case "leadershipAndManagementSkills":
        return t.leadershipAndManagement;
      // Executive Format
      case "strategicLeadershipAndVision":
        return t.strategicLeadership;
      case "businessImpactAndResults":
        return t.businessImpact;
      case "teamLeadershipAndOrganizationalDevelopment":
        return t.teamLeadership;
      case "decisionMakingAndProblemSolving":
        return t.decisionMaking;
      case "innovationAndGrowth":
        return t.innovationAndGrowth;
      default:
        return `${translations[language].overall} ${formatCategories(
          category
        )} ${translations[language].assessment}`;
    }
  }

  const getAssessmentStyle = (assessment) => {
    const translatedAssessment = translations[language].assessments[assessment];
    const styles = {
      Unsatisfactory: {
        color: "#FF1D48",
        borderColor: "#FF1D48",
        backgroundColor: "rgba(255, 29, 72, 0.15)",
      },
      "Needs Improvement": {
        color: "#ED7D31",
        borderColor: "#ED7D31",
        backgroundColor: "rgba(237, 125, 49, 0.15)",
      },
      "Meets Expectations": {
        color: "#FFEA66",
        borderColor: "#FFEA66",
        backgroundColor: "rgba(255, 234, 102, 0.15)",
      },
      "Exceeds Expectations": {
        color: "#70AD47",
        borderColor: "#70AD47",
        backgroundColor: "rgba(112, 173, 71, 0.15)",
      },
      Exceptional: {
        color: "#5D643F",
        borderColor: "#5D643F",
        backgroundColor: "rgba(93, 100, 63, 0.15)",
      },
    };

    return (
      styles[assessment] || {
        color: "grey",
        borderColor: "grey",
        backgroundColor: "rgba(128, 128, 128, 0.15)",
      }
    );
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
      signatureTitle.textContent = translations[language].signature; // Use the translation for "Signature"
    }
    const options = {
      margin: 10,
      filename: `Referee ${referenceData?.referenceRequestId?.refereeName.firstName} ${referenceData?.referenceRequestId?.refereeName.lastName} Response Copy.pdf`,
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
  const currentStep = 5; // Set the current step (1 for Basic Information)

  const steps = translations[language].steps;

  //Display None will hide the downloadable PDF form to test temporarily comment it out
  return (
    <div className="row main-login justify-content-center position-relative">
      <div style={{ display: "none" }}>

        <div ref={reportRef} className="ViewRequest-container">
          <h4 className="color-orange mb-2">
            {translations[language].format[referenceData?.questionFormat] ||
              translations[language].notAvailable}
          </h4>
          <p className="mb-2">
            <b>{translations[language].position}: </b>
            <span className="Capitalize">
              {referenceData?.referenceRequestId?.position ||
                translations[language].notAvailable}
            </span>
          </p>
          <p className="mb-2">
            <b>{translations[language].candidateName}: </b>
            <span className="Capitalize">
              {`${referenceData?.referenceRequestId?.candidate.firstName} ${referenceData?.referenceRequestId?.candidate.lastName}` ||
                translations[language].notAvailable}
            </span>
          </p>
          <p className="mb-2">
            <b>{translations[language].refereeName}: </b>
            <span className="Capitalize">
              {`${referenceData?.referenceRequestId?.refereeName.firstName} ${referenceData?.referenceRequestId?.refereeName.lastName}` ||
                translations[language].notAvailable}
            </span>
          </p>
          <p className="mb-2">
            <b>{translations[language].currentCompany}: </b>
            <span className="Capitalize">
              {referenceData?.currentCompany ||
                translations[language].notAvailable}
            </span>
          </p>
          <p className="mb-2">
            <b>
              {`${translations[language].refereeCompanyWorkedWith} (${referenceData?.referenceRequestId?.candidate.firstName})`}
              :{" "}
            </b>
            <span className="Capitalize">
              {referenceData?.companyWorkedWith ||
                translations[language].notAvailable}
            </span>
          </p>
          <p className="mb-2">
            <b>{translations[language].relationshipToCandidate}: </b>
            <span>
              {formatter(referenceData?.refereeRelationshipWithCandidate) ||
                translations[language].notAvailable}
            </span>
          </p>
          <p className="mb-2">
            <b>{translations[language].datesWorkedTogether}: </b>
            <span>
              {referenceData?.workDuration ? (
                <>
                  <b>{translations[language].from}</b>{" "}
                  {formatDateForWorkDuration(
                    referenceData?.workDuration?.startDate
                  )}{" "}
                  <b>{translations[language].to}</b>{" "}
                  {formatDateForWorkDuration(
                    referenceData?.workDuration?.endDate
                  )}
                </>
              ) : (
                translations[language].notAvailable
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
                              <b>{translations[language].question(index)}: </b>
                              {question}
                            </p>
                          </div>

                          <h6 className="color-gray mb-2">
                            {item?.preferredAnswerType[index] ===
                            "Original Answer"
                              ? translations[language].originalAnswer
                              : translations[language].aiEnhancedAnswer ||
                                translations[language].notAvailable}
                          </h6>

                          <div className="AIEnchanceAns-container mb-4">
                            <p>
                              {item?.answers[index] || "No Answer Provided"}
                            </p>
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
                                {item.assessmentRating ||
                                  translations[language].notAvailable}
                              </p>
                            </div>
                          </div>
                        )}
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
                          {item.preferredAnswerType[index] ||
                            translations[language].notAvailable}
                        </h6>

                        <div className="AIEnchanceAns-container mb-4">
                          <p>
                            {item.answers[index] ||
                              translations[language].noAnswerProvided}
                          </p>
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
                              {item.overallAssessment ||
                                translations[language].notAvailable}
                            </p>
                          </div>
                        </div>
                      )} */}
                  </div>
                ))}
          </div>
          <p className="signature-verif-title color-orange mt-5 mb-3">
            {translations[language].signatureAndVerification}
          </p>
          <div className="w-100 uploaded-id-container d-flex gap-3 mb-5">
            <div>
              {referenceData?.frontIdImageURL ? (
                <img
                  src={referenceData.frontIdImageURL}
                  alt="ID displayed here..."
                />
              ) : (
                <p>{translations[language].noImageAvailable}</p>
              )}{" "}
            </div>
          </div>
          <img
            className="signature-feild"
            src={referenceData?.signatureImageURL || ""}
            alt="Signature here..."
          />
          <p className="mb-2">
            <b>{translations[language].refereeName}: </b>
            <span className="Capitalize">
              {`${referenceData?.referenceRequestId?.refereeName.firstName} ${referenceData?.referenceRequestId?.refereeName.lastName}` ||
                translations[language].notAvailable}
            </span>
          </p>
          <p className=" mb-2">
            <b>{translations[language].date}:</b>

            <span> {formatDate(referenceData?.createdAt)}</span>
          </p>
        </div>
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
              {downloading
                ? translations[language].downloading
                : translations[language].download}{" "}
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
      <div className="d-flex align-items-center justify-content-center flex-column main-login-form">
        <div className="reference-progress-indicator">
          {steps.map((step, index) => (
            <div key={index} className="reference-step-container">
              <div
                className={`step ${currentStep >= index + 1 ? "active" : ""}`}
              >
                <div className="bullet">{index + 1}</div>
                {index < steps.length - 1 && <div className="line" />}{" "}
                {/* Line between steps */}
              </div>
              <div className="step-label">{step}</div>
            </div>
          ))}
        </div>
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
              {downloading
                ? translations[language].downloading
                : translations[language].download}{" "}
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
