import { useMemo } from "react";

const labels = {
  English: {
    referenceCheckQuestionnaire: "Reference Check Questionnaire",
    questionCategory: {
      relationship: "Relationship",
      jobResponsibilitiesAndPerformance: "Job Responsibilities and Performance",
      skillAndCompetencies: "Skills and Competencies",
      workEthicAndBehavior: "Work Ethic and Behavior",
      leadershipAndManagementSkills: "Leadership and Management Skills",
      strategicLeadershipAndVision: "Strategic Leadership and Vision",
      businessImpactAndResults: "Business Impact and Results",
      teamLeadershipAndOrganizationalDevelopment:
        "Team Leadership and Organizational Development",
      decisionMakingAndProblemSolving: "Decision Making and Problem Solving",
      innovationAndGrowth: "Innovation and Growth",
      closingQuestions: "Closing Questions",
    },
    leavePageConfirmation: "Are you sure you want to leave this page?",
    goBackConfirmation:
      "Are you sure you want to go back? Your progress will be lost.",
    reattemptingCamera: "Reattempting access to camera...",
    steps: [
      "Basic Information",
      "Choose Method",
      "Questionnaire",
      "Reference Completed",
    ],
    question: "Question",
  },
  Japanese: {
    referenceCheckQuestionnaire: "リファレンスチェック質問票",
    questionCategory: {
      relationship: "関係性",
      jobResponsibilitiesAndPerformance: "職務責任と実績",
      skillAndCompetencies: "スキルと能力",
      workEthicAndBehavior: "職業倫理と行動",
      leadershipAndManagementSkills: "リーダーシップとマネジメントスキル",
      strategicLeadershipAndVision: "戦略的リーダーシップとビジョン",
      businessImpactAndResults: "ビジネスへの影響と成果",
      teamLeadershipAndOrganizationalDevelopment:
        "チームリーダーシップと組織開発",
      decisionMakingAndProblemSolving: "意思決定と問題解決",
      innovationAndGrowth: "イノベーションと成長",
      closingQuestions: "最終質問",
    },
    leavePageConfirmation: "このページから移動してもよろしいですか？",
    goBackConfirmation: "前に戻ってもよろしいですか？進行状況は失われます。",
    reattemptingCamera: "カメラへのアクセスを再試行しています...",
    steps: ["基本情報", "方法選択", "アンケート", "参照完了"],
    question: "質問",
  },
};

export const useLabels = (language = "English") => {
  const currentLabels = useMemo(() => {
    return labels[language] || labels.English;
  }, [language]);

  return {
    labels: currentLabels,
  };
};
