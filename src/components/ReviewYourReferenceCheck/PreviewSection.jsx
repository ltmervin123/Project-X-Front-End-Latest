import React from "react";

const translations = {
  English: {
    continue: "Continue",
    overallAssessment: "Overall Assessment",
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
    assessments: {
      Unsatisfactory: "Unsatisfactory",
      "Needs Improvement": "Needs Improvement",
      "Meets Expectations": "Meets Expectations",
      "Exceeds Expectations": "Exceeds Expectations",
      Exceptional: "Exceptional",
    },
    question: function (index) {
      return `Question ${index + 1}`;
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
    continue: "続ける",
    overallAssessment: "総合評価",
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
    assessments: {
      Unsatisfactory: "不満足",
      "Needs Improvement": "改善が必要",
      "Meets Expectations": "期待通り",
      "Exceeds Expectations": "期待以上",
      Exceptional: "優秀",
    },
    question: function (index) {
      return `第${index + 1}問`;
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

const PreviewSection = ({
  referenceQuestionsData,
  submittedAnswers,
  onContinue,
  language = "English",
}) => {
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
    // Create a mapping of Japanese to English assessments
    const japaneseToEnglish = {
      "不満足": "Unsatisfactory",
      "改善が必要": "Needs Improvement",
      "期待通り": "Meets Expectations",
      "期待以上": "Exceeds Expectations",
      "優秀": "Exceptional",
    };

    const assessmentStyles = {
      "Unsatisfactory": {
        backgroundColor: "rgba(255, 29, 72, 0.15)",
        color: "#FF1D48",
      },
      "Needs Improvement": {
        backgroundColor: "rgba(237, 125, 49, 0.15)",
        color: "#ED7D31",
      },
      "Meets Expectations": {
        backgroundColor: "rgba(255, 234, 102, 0.15)",
        color: "#FFEA66",
      },
      "Exceeds Expectations": {
        backgroundColor: "rgba(112, 173, 71, 0.15)",
        color: "#70AD47",
      },
      "Exceptional": {
        backgroundColor: "rgba(93, 100, 63, 0.15)",
        color: "#5D643F",
      },
    };

    // Convert Japanese assessment to English if necessary
    const englishAssessment = japaneseToEnglish[assessment] || assessment;

    console.log("Assessment:", assessment);
    console.log("English Assessment:", englishAssessment);
    console.log("Style:", assessmentStyles[englishAssessment]);

    return assessmentStyles[englishAssessment] || {};
  };

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
  const groupedAnswers = referenceQuestionsData.map((category) => ({
    category: category.category,
    questions: category.questions.map((question, index) => {
      const submittedAnswer = submittedAnswers.find(
        (a) => a.question.trim() === question.trim()
      );
      return {
        question,
        answer: submittedAnswer?.answer || "",
        type: submittedAnswer?.preferredAnswerType || "",
        assessment: submittedAnswer?.assessment || "",
      };
    }),
    assessmentRating: category.assessmentRating,
  }));

  return (
    <div className="QuestionPreview-section">
      <div className="QuestionPreview-container">
        {groupedAnswers.map((group, index) => (
          <div key={index} className="category-section mb-4">
            <h5 className="color=gray mb-3">
              {" "}
              {formatCategories(group.category)}
            </h5>
            {group.questions.map((qa, qIndex) => (
              <div key={qIndex} className="question-answer-pair mb-3">
                <p className="question mb-2">
                  <b>{translations[language].question(qIndex)}: </b>
                  {qa.question}
                </p>
                <b className="answer-type d-block mb-1">{qa.type}</b>

                <div className="AIEnchanceAns-container p-3 mb-2">
                  <p className="answer m-0">{qa.answer}</p>
                  {qa.assessment && (
                    <div
                      className="assessment-tag mt-2 p-1 px-2 d-inline-block"
                      style={getAssessmentStyle(qa.assessment)}
                    >
                      {translations[language].assessments[qa.assessment]}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {group.category !== "relationship" &&
              group.category !== "closingQuestions" && (
                <>
                  {console.log(
                    `Overall Assessment for ${group.category}:`,
                    group.assessmentRating
                  )}
                  <div className="overall-assessment-container mt-4 d-flex gap-2 align-items-center">
                    <b>{getOverallAssessmentText(group.category)}</b>
                    <div
                      className="overall-assessment-detail"
                      style={getAssessmentStyle(group.assessmentRating)}
                    >
                      <p className="m-0">
                        {group.assessmentRating ||
                          translations[language].notAvailable}
                      </p>
                    </div>
                  </div>
                </>
              )}
          </div>
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <button
          className="btn-continue"
          onClick={() => {
            onContinue();
          }}
        >
          {translations[language].continue}
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;
