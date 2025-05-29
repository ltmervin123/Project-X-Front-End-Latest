import { useMemo } from "react";

const labels = {
  English: {
    analyticsAndReports: "Analytics and Reports",
    totalReferences: "Total References",
    completionRate: "Completion Rate",
    averageResponseTime: "Avg. Response Time",
    referenceCheckAnalytics: "Reference Check Analytics",
    completed: "Completed",
    pending: "Pending",
    overviewOfCompletedAndPending:
      "Overview of the completed and pending reference checks",
    overview: "Overview",
    reports: "Reports",
    gainInsights:
      "Gain insights into your reference checking process and hiring efficiency.",
    recentReports: "Recent Reports",
    downloadOrView: "Download or view detailed reports.",
    noRecordsFound: "No records found",
    applicant: "Applicant",
    referee: "Referee",
    status: "Status",
    actions: "Actions",
    downloadPDF: "Download PDF",
    tooltipReports:
      "Access recent completed requests and download them as needed.",
    tooltipAnalytics:
      "This section will allow you to track the completed progress of your referees and download them as needed.",
    day: "day",
    days: "days",
    inProgress: "In Progress",
    expired: "Expired",
    new: "New",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    downloading: "Downloading...",
    returnToReference: "Return to Reference Request",
    downloadReference: "Download Reference",
  },
  Japanese: {
    analyticsAndReports: "分析・レポート",
    totalReferences: "総リファレンス数",
    completionRate: "完了率",
    averageResponseTime: "平均回答時間",
    referenceCheckAnalytics: "リファレンスチェック分析",
    completed: "完了",
    pending: "未完了",
    overviewOfCompletedAndPending: "完了・未完了のリファレンスチェックの概要",
    overview: "概要",
    reports: "レポート",
    gainInsights:
      "リファレンスチェックのプロセスと採用効率に関するインサイトを取得しましょう。",
    recentReports: "最新レポート",
    downloadOrView: "詳細レポートをダウンロードまたは表示します。",
    noRecordsFound: "レコードが見つかりません",
    applicant: "応募者",
    referee: "推薦者",
    status: "ステータス",
    actions: "アクション",
    downloadPDF: "PDFをダウンロード",
    tooltipReports:
      "最近完了したリクエストにアクセスし、必要に応じてダウンロードできます。",
    tooltipAnalytics:
      "このセクションでは、推薦者の完了状況を追跡し、必要に応じてダウンロードすることができます。",
    day: "日",
    days: "日間",
    inProgress: "進行中",
    expired: "期限切れ",
    new: "新規",
    months: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    returnToReference: "リファレンス依頼に戻る",
    downloading: "ダウンロード中...",
    downloadReference: "リファレンスをダウンロード",
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
