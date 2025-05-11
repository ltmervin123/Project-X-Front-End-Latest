import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import "../../../../styles/AiRefereeStyles/ViewRequest.css";

import html2pdf from "html2pdf.js";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import { fetchReferenceByReferenceId } from "../../../../api/ai-reference/reference-request/reference-request-api";

// Translation dictionary
const TRANSLATIONS = {
  English: {
    loading: "Loading Reference Request...",
    pleaseWait: "Please wait while we fetch the reference data",
    returnToReference: "Return to Reference Request",
    notAvailable: "Not Available",
    noImage: "No image available",
    idDisplayed: "ID displayed here...",
    signatureDisplay: "Signature here...",
    downloading: "Downloading...",
    downloadReference: "Download Reference",
    positionAppliedFor: "Position Applied For",
    applicant: "Applicant",
    refereeName: "Referee Name",
    currentCompany: "Current Company",
    companyWorkedWith: "Company you worked with",
    relationshipToApplicant: "Relationship to the Applicant",
    datesWorkedTogether: "Dates Worked Together",
    from: "From",
    to: "To",
    question: "Question",
    verification: "VERIFICATION",
    date: "Date",

    // Category translations
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

    // Assessment text translations
    overallJobPerformance: "Overall Job Performance Assessment:",
    overallSkillsCompetencies: "Overall Assessment of Skills and Competencies:",
    overallWorkEthicBehavior:
      "Overall Evaluation Regarding Work Ethic and Behavior:",
    overallLeadershipManagement:
      "Overall Performance in Leadership and Management:",
    overallStrategicLeadership: "Overall Assessment of Strategic Leadership:",
    overallBusinessImpact: "Overall Assessment of Business Impact and Results:",
    overallTeamLeadership:
      "Overall Assessment of Team Leadership and Organizational Development:",
    overallDecisionMaking:
      "Overall Assessment of Decision Making and Problem Solving:",
    overallInnovation: "Overall Assessment of Innovation and Growth:",
    overallAssessment: "Overall Assessment:",
    originalAnswer: "Original Answer",
    aiEnhancedAnswer: "AI Enhanced Answer",
    standardFormat: "Standard Format",
    managementFormat: "Management Format",
    executiveFormat: "Executive Format",
  },
  Japanese: {
    loading: "リファレンス依頼を読み込んでいます...",
    pleaseWait: "リファレンスデータを取得中です。お待ちください。",
    returnToReference: "リファレンス依頼に戻る",
    notAvailable: "利用不可",
    noImage: "画像がありません",
    idDisplayed: "IDがここに表示されます...",
    signatureDisplay: "署名がここに...",
    downloading: "ダウンロード中...",
    downloadReference: "リファレンスをダウンロード",
    positionAppliedFor: "応募職種",
    applicant: "応募者",
    refereeName: "推薦者名",
    currentCompany: "現在の会社",
    companyWorkedWith: "一緒に働いていた会社",
    relationshipToApplicant: "応募者との関係",
    datesWorkedTogether: "一緒に働いた期間",
    from: "から",
    to: "まで",
    question: "質問",
    verification: "検証",
    date: "日付",

    // Category translations
    relationship: "関係性",
    jobResponsibilitiesAndPerformance: "職務責任とパフォーマンス",
    skillAndCompetencies: "スキルと能力",
    workEthicAndBehavior: "職業倫理と行動",
    closingQuestions: "最終質問",
    strategicLeadershipAndVision: "戦略的リーダーシップとビジョン",
    businessImpactAndResults: "ビジネスへの影響と結果",
    teamLeadershipAndOrganizationalDevelopment:
      "チームリーダーシップと組織開発",
    decisionMakingAndProblemSolving: "意思決定と問題解決",
    innovationAndGrowth: "イノベーションと成長",
    leadershipAndManagementSkills: "リーダーシップとマネジメントスキル",

    // Assessment text translations
    overallJobPerformance: "総合的な職務パフォーマンス評価：",
    overallSkillsCompetencies: "スキルと能力の総合評価：",
    overallWorkEthicBehavior: "職業倫理と行動に関する総合評価：",
    overallLeadershipManagement: "リーダーシップとマネジメントの総合評価：",
    overallStrategicLeadership: "戦略的リーダーシップの総合評価：",
    overallBusinessImpact: "ビジネスへの影響と結果の総合評価：",
    overallTeamLeadership: "チームリーダーシップと組織開発の総合評価：",
    overallDecisionMaking: "意思決定と問題解決の総合評価：",
    overallInnovation: "イノベーションと成長の総合評価：",
    overallAssessment: "総合評価：",
    originalAnswer: "オリジナルの回答",
    aiEnhancedAnswer: "AI強化された回答",
    standardFormat: "標準フォーマット",
    managementFormat: "マネジメントフォーマット",
    executiveFormat: "エグゼクティブフォーマット",
  },
};

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
  const [downloading, setDownloading] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const handleReturnReferenceRequest = () => {
    onClose();
  };
  // Define language
  const preferredLanguage =
    sessionStorage.getItem("preferred-language") || "English";

  const {
    data: referenceData,
    isLoading: fetchingReference,
    isError,
    error,
  } = useQuery({
    queryKey: ["reference", { referenceId, refereeId, token }],
    queryFn: fetchReferenceByReferenceId,
    staleTime: 1000 * 60 * 5,
    enabled: !!referenceId && !!refereeId && !!token,
  });

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
      case "jobResponsibilitiesAndPerformance":
      case "skillAndCompetencies":
      case "workEthicAndBehavior":
      case "closingQuestions":
      case "strategicLeadershipAndVision":
      case "businessImpactAndResults":
      case "teamLeadershipAndOrganizationalDevelopment":
      case "decisionMakingAndProblemSolving":
      case "innovationAndGrowth":
      case "leadershipAndManagementSkills":
        return TRANSLATIONS[
          referenceData?.referenceRequestId?.selectedLanguage
        ][letter];
      default:
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .notAvailable;
    }
  }

  function getOverallAssessmentText(category) {
    switch (category) {
      case "jobResponsibilitiesAndPerformance":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .overallJobPerformance;
      case "skillAndCompetencies":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .overallSkillsCompetencies;
      case "workEthicAndBehavior":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .overallWorkEthicBehavior;
      case "leadershipAndManagementSkills":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .overallLeadershipManagement;
      case "strategicLeadershipAndVision":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .overallStrategicLeadership;
      case "businessImpactAndResults":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .overallBusinessImpact;
      case "teamLeadershipAndOrganizationalDevelopment":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .overallTeamLeadership;
      case "decisionMakingAndProblemSolving":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .overallDecisionMaking;
      case "innovationAndGrowth":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .overallInnovation;
      default:
        return `${
          TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
            .overallAssessment
        } ${formatCategories(category)}`;
    }
  }

  const getAssessmentStyle = (assessment) => {
    // Create a mapping of Japanese to English assessments
    const japaneseToEnglish = {
      不満足: "Unsatisfactory",
      改善が必要: "Needs Improvement",
      期待通り: "Meets Expectations",
      期待以上: "Exceeds Expectations",
      優秀: "Exceptional",
    };

    const assessmentStyles = {
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
        backgroundColor: "rgba(93, 100, 63, 0.15)",
        color: "#5D643F",
      },
    };

    // Convert Japanese assessment to English if necessary
    const englishAssessment = japaneseToEnglish[assessment] || assessment;

    return assessmentStyles[englishAssessment] || {};
  };

  const downloadPDF = () => {
    if (!reportRef.current) return;
    setDownloading(true);

    // Clone the report content to modify it without affecting the original
    const clonedReport = reportRef.current.cloneNode(true);

    const options = {
      margin: [15, 10, 15, 10],
      filename: `${referenceData?.referenceRequestId?.candidate.firstName} ${referenceData?.referenceRequestId?.candidate.lastName}-Reference-Report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "legal",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        compressPDF: true,
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
      },
    };

    html2pdf()
      .set(options)
      .from(clonedReport)
      .save()
      .then(() => {
        setDownloading(false);
      });
  };

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setIsLandscape(naturalWidth > naturalHeight);
  };

  const handleImageError = () => {
    console.error("Image failed to load");
  };

  function formatAnswerType(type) {
    if (type === "Original Answer" || type === "オリジナルの回答") {
      return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
        .originalAnswer;
    }
    if (type === "AI Enhanced Answer" || type === "AI強化された回答") {
      return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
        .aiEnhancedAnswer;
    }
    return type;
  }

  const formatQuestionFormat = (questionFormat) => {
    switch (questionFormat) {
      case "Standard Format":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .standardFormat;
      case "Management Format":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .managementFormat;
      case "Executive Format":
        return TRANSLATIONS[referenceData?.referenceRequestId?.selectedLanguage]
          .executiveFormat;
      default:
        return questionFormat;
    }
  };

  if (fetchingReference) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="text-center">
          <Col>
            <Spinner
              animation="border"
              variant="primary"
              role="status"
              style={{ width: "5rem", height: "5rem" }}
            />
            <h3>{TRANSLATIONS[preferredLanguage].loading}</h3>
            <p className="text-muted">
              {TRANSLATIONS[preferredLanguage].pleaseWait}
            </p>
          </Col>
        </Row>
      </Container>
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
    <>
      {referenceData ? (
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
              {TRANSLATIONS[preferredLanguage].returnToReference}
            </button>
          </div>
          <div className="ViewRequest-container">
            <div ref={reportRef}>
              <h4 className="color-orange mb-2">
                {formatQuestionFormat(referenceData?.questionFormat) ||
                  TRANSLATIONS[
                    referenceData?.referenceRequestId?.selectedLanguage
                  ].notAvailable}
              </h4>
              <p className="mb-2">
                <b>
                  {
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].positionAppliedFor
                  }
                  :{" "}
                </b>
                <span className="Capitalize">
                  {referenceData?.referenceRequestId?.position ||
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>
                  {
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].applicant
                  }
                  :{" "}
                </b>
                <span className="Capitalize">
                  {`${referenceData?.referenceRequestId?.candidate.firstName} ${referenceData?.referenceRequestId?.candidate.lastName}` ||
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>
                  {
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].refereeName
                  }
                  :{" "}
                </b>
                <span className="Capitalize">
                  {`${referenceData?.referenceRequestId?.refereeName.firstName} ${referenceData?.referenceRequestId?.refereeName.lastName}` ||
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>
                  {
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].currentCompany
                  }
                  :{" "}
                </b>
                <span className="Capitalize">
                  {referenceData?.currentCompany ||
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>
                  {
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].companyWorkedWith
                  }{" "}
                  ({referenceData?.referenceRequestId?.candidate.firstName}):{" "}
                </b>
                <span>
                  {formatter(referenceData?.companyWorkedWith) ||
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>
                  {
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].relationshipToApplicant
                  }
                  :{" "}
                </b>
                <span>
                  {formatter(referenceData?.refereeRelationshipWithCandidate) ||
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>
                  {
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].datesWorkedTogether
                  }
                  :{" "}
                </b>
                <span>
                  {referenceData?.workDuration ? (
                    <>
                      <b>
                        {
                          TRANSLATIONS[
                            referenceData?.referenceRequestId?.selectedLanguage
                          ].from
                        }
                      </b>{" "}
                      {formatDateForWorkDuration(
                        referenceData?.workDuration?.startDate
                      )}{" "}
                      <b>
                        {
                          TRANSLATIONS[
                            referenceData?.referenceRequestId?.selectedLanguage
                          ].to
                        }
                      </b>{" "}
                      {formatDateForWorkDuration(
                        referenceData?.workDuration?.endDate
                      )}
                    </>
                  ) : (
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].notAvailable
                  )}
                </span>
              </p>

              <div className="my-4">
                {refereeQuestionFormat === "HR-HATCH-FORMAT"
                  ? referenceData?.referenceQuestion
                      .sort((a, b) => {
                        const order =
                          CATEGORY_ORDER[refereeQuestionFormat] || [];
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
                                  <b>
                                    {
                                      TRANSLATIONS[
                                        referenceData?.referenceRequestId
                                          ?.selectedLanguage
                                      ].question
                                    }{" "}
                                    {index + 1}:{" "}
                                  </b>
                                  {question}
                                </p>
                              </div>

                              <h6 className="color-gray mb-2">
                                {formatAnswerType(
                                  item.preferredAnswerType[index]
                                )}
                              </h6>

                              <div className="AIEnchanceAns-container mb-4">
                                <p className="m-0">{item.answers[index]}</p>
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
                                  style={getAssessmentStyle(
                                    item.assessmentRating
                                  )}
                                >
                                  <p className="m-0">
                                    {item.assessmentRating ||
                                      TRANSLATIONS[
                                        referenceData?.referenceRequestId
                                          ?.selectedLanguage
                                      ].notAvailable}
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
                                <b>
                                  {
                                    TRANSLATIONS[
                                      referenceData?.referenceRequestId
                                        ?.selectedLanguage
                                    ].question
                                  }{" "}
                                  {index + 1}:{" "}
                                </b>
                                {question}
                              </p>
                            </div>

                            <h6 className="color-gray mb-2">
                              {formatAnswerType(
                                item.preferredAnswerType[index]
                              )}
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
                                {item.overallAssessment || TRANSLATIONS[language].notAvailable}
                              </p>
                            </div>
                          </div>
                        )} */}
                      </div>
                    ))}
              </div>

              <p className="signature-verif-title color-orange mt-5 mb-3">
                {
                  TRANSLATIONS[
                    referenceData?.referenceRequestId?.selectedLanguage
                  ].verification
                }
              </p>
              <div className="w-100 uploaded-id-container d-flex gap-3 mb-5">
                <div>
                  {referenceData?.frontIdImageURL ? (
                    <img
                      src={referenceData.frontIdImageURL}
                      alt={
                        TRANSLATIONS[
                          referenceData?.referenceRequestId?.selectedLanguage
                        ].idDisplayed
                      }
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      className={isLandscape ? "landscape" : "portrait"}
                    />
                  ) : (
                    <p>
                      {
                        TRANSLATIONS[
                          referenceData?.referenceRequestId?.selectedLanguage
                        ].noImage
                      }
                    </p>
                  )}
                </div>
              </div>
              {/* <img
              className="signature-feild"
              src={referenceData?.signatureImageURL || ""}
              alt={TRANSLATIONS[language].signatureDisplay}
            /> */}

              <p className="mb-2">
                <b>
                  {
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].refereeName
                  }
                  :{" "}
                </b>
                <span className="Capitalize">
                  {`${referenceData?.referenceRequestId?.refereeName.firstName} ${referenceData?.referenceRequestId?.refereeName.lastName}` ||
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>
                  {
                    TRANSLATIONS[
                      referenceData?.referenceRequestId?.selectedLanguage
                    ].date
                  }
                  :
                </b>
                <span> {formatDate(referenceData?.createdAt)}</span>
              </p>
            </div>

            <div className="d-flex justify-content-center">
              <button onClick={downloadPDF} disabled={downloading}>
                {downloading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="spinner-border spinner-border-sm text-light me-2"
                      role="status"
                    ></div>
                    <span>{TRANSLATIONS[preferredLanguage].downloading}</span>
                  </div>
                ) : (
                  <span>
                    {TRANSLATIONS[preferredLanguage].downloadReference}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ViewRequest;
