export const formatDate = (date) => {
  if (!date) return "";
  return date.split("T")[0];
};

export const getReferenceStatusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#F8BD00";
    case "Expired":
      return "#FF0000";
    case "Completed":
      return "#1877F2";
    case "New":
      return "#319F43";
    default:
      return "black";
  }
};

export const getTranslatedStatus = (status, labels) => {
  const statusKey = `Status_${status.replace(/\s+/g, "")}`;
  return labels[statusKey] || status;
};

export const calculateCandidateStatus = (reference) => {
  const statuses = reference.referees.map((referee) => referee.status);

  const inProgressCount = statuses.filter(
    (status) => status === "In Progress"
  ).length;

  const completedCount = statuses.filter(
    (status) => status === "Completed"
  ).length;

  const expiredCount = statuses.filter((status) => status === "Expired").length;

  return { inProgressCount, completedCount, expiredCount };
};

export const getCategories = () => {
  return {
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
};

export const convertDateToString = (date) => {
  const newDate = new Date(date);
  return newDate.toDateString();
};

export const formatDateForWorkDuration = (date) => {
  if (!date) return "Invalid Date";

  const newDate = new Date(date);
  if (isNaN(newDate)) return "Invalid Date";

  return newDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export const formatName = (letter) => {
  if (!letter) {
    return "";
  }
  return letter.charAt(0).toUpperCase() + letter.slice(1);
};

export const formatCategories = (letter, labels) => {
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
      return labels[letter];
    default:
      return labels.notAvailable;
  }
};

export const getOverallAssessmentText = (category, labels) => {
  switch (category) {
    case "jobResponsibilitiesAndPerformance":
      return labels.overallJobPerformance;
    case "skillAndCompetencies":
      return labels.overallSkillsCompetencies;
    case "workEthicAndBehavior":
      return labels.overallWorkEthicBehavior;
    case "leadershipAndManagementSkills":
      return labels.overallLeadershipManagement;
    case "strategicLeadershipAndVision":
      return labels.overallStrategicLeadership;
    case "businessImpactAndResults":
      return labels.overallBusinessImpact;
    case "teamLeadershipAndOrganizationalDevelopment":
      return labels.overallTeamLeadership;
    case "decisionMakingAndProblemSolving":
      return labels.overallDecisionMaking;
    case "innovationAndGrowth":
      return labels.overallInnovation;
    default:
      return `${labels.overallAssessment} ${formatCategories(category)}`;
  }
};

export const getAssessmentStyle = (assessment) => {
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

  const englishAssessment = japaneseToEnglish[assessment] || assessment;

  return assessmentStyles[englishAssessment] || {};
};

export const formatAnswerType = (type, labels) => {
  if (type === "Original Answer" || type === "オリジナルの回答") {
    return labels.originalAnswer;
  }
  if (type === "AI Enhanced Answer" || type === "AI強化された回答") {
    return labels.aiEnhancedAnswer;
  }
  return type;
};

export const formatQuestionFormat = (questionFormat, labels) => {
  switch (questionFormat) {
    case "Standard Format":
      return labels.standardFormat;
    case "Management Format":
      return labels.managementFormat;
    case "Executive Format":
      return labels.executiveFormat;
    default:
      return questionFormat;
  }
};
