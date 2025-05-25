import { useMemo } from "react";

const labels = {
  English: {
    Jobs: "Jobs",
    ActiveJobs: "Active Jobs",
    JobId: "Job ID",
    JobName: "Job Name",
    Vacancies: "Vacancies",
    Department: "Department",
    HiringManager: "Hiring Manager",
    PostedDate: "Posted Date",
    Actions: "Actions",
    Edit: "Edit",
    Delete: "Delete",
    AddVacancy: "Add Vacancy",
    ManageAndTrackPositions: "Manage and track your open positions.",
    SearchJobName: "Search job name...",
    JobNotFound: "Job not found",
    NoActiveJobs: "No active jobs record",
    departments: {
      sales: "Sales",
      marketing: "Marketing",
      customerService: "Customer Service",
      hr: "Human Resources (HR)",
      finance: "Finance",
      accounting: "Accounting",
      operations: "Operations",
      it: "IT (Information Technology)",
      legal: "Legal",
      administration: "Administration",
      productDevelopment: "Product Development",
      rAndD: "Research and Development (R&D)",
      logistics: "Logistics, Supply Chain & Procurement",
      businessDev: "Business Development",
      pr: "Public Relations (PR)",
      design: "Design",
      compliance: "Compliance",
      riskManagement: "Risk Management",
    },
    ViewManageTrack:
      "View, manage, and track open job positions. You can edit details or delete listings as needed.",
  },
  Japanese: {
    Jobs: "求人",
    ActiveJobs: "求人",
    JobId: "求人ID",
    JobName: "職種名",
    Vacancies: "求人情報",
    Department: "部門",
    HiringManager: "採用担当者",
    PostedDate: "掲載日",
    Actions: "操作",
    Edit: "編集",
    Delete: "削除",
    AddVacancy: "追加",
    ManageAndTrackPositions: "空いているポジションを管理および追跡します。",
    SearchJobName: "職種名を検索...",
    JobNotFound: "求人が見つかりません",
    NoActiveJobs: "アクティブな求人情報はありません",
    departments: {
      sales: "営業",
      marketing: "マーケティング",
      customerService: "カスタマーサービス",
      hr: "人事",
      finance: "財務",
      accounting: "経理",
      operations: "運営",
      it: "IT",
      legal: "法務",
      administration: "総務",
      productDevelopment: "製品開発",
      rAndD: "研究開発",
      logistics: "物流・調達",
      businessDev: "事業開発",
      pr: "広報",
      design: "デザイン",
      compliance: "コンプライアンス",
      riskManagement: "リスク管理",
    },
    ViewManageTrack:
      "公開されている求人情報を表示、管理、追跡できます。詳細を編集したり、必要に応じてリストを削除したりできます。",
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
