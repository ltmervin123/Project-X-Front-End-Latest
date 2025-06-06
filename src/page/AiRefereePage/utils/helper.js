export const getCategoryOrder = () => {
  return {
    "Standard Format": [
      "relationship",
      "jobResponsibilitiesAndPerformance",
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
      "strategicLeadershipAndVision",
      "businessImpactAndResults",
      "decisionMakingAndProblemSolving",
      "innovationAndGrowth",
      "workEthicAndBehavior",
      "closingQuestions",
    ],
  };
};

export const getCategoryToRate = () => {
  return [
    "jobResponsibilitiesAndPerformance",
    "skillAndCompetencies",
    "workEthicAndBehavior",
    "leadershipAndManagementSkills",
    "strategicLeadershipAndVision",
    "businessImpactAndResults",
    "teamLeadershipAndOrganizationalDevelopment",
    "decisionMakingAndProblemSolving",
    "innovationAndGrowth",
  ];
};
