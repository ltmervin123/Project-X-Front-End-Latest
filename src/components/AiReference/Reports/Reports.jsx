import React, { useState, useEffect, useRef, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import ViewRequest from "../ReferenceRequest/Components/ViewRequest";
import PopupGuide from "../../AiReference/PopupGuide";
import ReportsHeader from "./components/ReportsHeader";
import ReportsTable from "./components/ReportsTable";
import ReportsChart from "./components/ReportsChart";

// Translation dictionary - Enhanced with all static content
const TRANSLATIONS = {
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
  },
};

// const MONTHS_OF_YEAR = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

const Reports = () => {
  const navigate = useNavigate(); // Move useNavigate here
  const language = sessionStorage.getItem("preferred-language") || "English";
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [activeButton, setActiveButton] = useState("Overview");
  const [reference, setReference] = useState(
    JSON.parse(localStorage.getItem("reference")) || []
  );
  const [isReportsCardVisible, setIsReportsCardVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [candidateId, setCandidateId] = useState("");
  const [refereeId, setRefereeId] = useState("");
  const [refereeQuestionFormat, setRefereeQuestionFormat] = useState("");
  const [showGuide, setShowGuide] = useState(true);
  const reportButtonRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsReportsCardVisible(true), 100),
      setTimeout(() => setIsButtonVisible(true), 500),
      setTimeout(() => setIsChartVisible(true), 1000),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const getMonthlyCounts = useMemo(() => {
    const monthMap = new Map();

    // Initialize month map
    reference.forEach((record) => {
      const date = new Date(record.dateSent);
      const month = TRANSLATIONS[language].months[date.getMonth()];

      if (!monthMap.has(month)) {
        monthMap.set(month, { total: 0, pending: 0, completed: 0 });
      }

      //Counting status and total referee for the all record
      if (!record.referees && record.status === "Completed") {
        monthMap.get(month).total += 1;
        monthMap.get(month).completed += 1;
      } else {
        //Counting status and total referee for the individual referees
        monthMap.get(month).total += record.referees.length;
        record.referees.forEach((referee) => {
          if (referee.status === "Completed") {
            monthMap.get(month).completed += 1;
          } else {
            monthMap.get(month).pending += 1;
          }
        });
      }
    });

    // Sort months based on order in the monthNames array
    const months = Array.from(monthMap.keys()).sort(
      (a, b) =>
        TRANSLATIONS[language].months.indexOf(a) -
        TRANSLATIONS[language].months.indexOf(b)
    );
    const totalPendingReference = months.map(
      (month) => monthMap.get(month).pending
    );
    const completedReferenceCounts = months.map(
      (month) => monthMap.get(month).completed
    );

    const totalReference = months.map((month) => monthMap.get(month).total);

    return {
      months,
      totalPendingReference,
      completedReferenceCounts,
      totalReference,
    };
  }, [reference]);

  const {
    months,
    totalPendingReference,
    completedReferenceCounts,
    totalReference,
  } = getMonthlyCounts;

  const countTotalReference = useMemo(() => {
    return totalReference.reduce((sum, num) => sum + num, 0);
  }, [reference]);

  const countTotalCompletedReference = (completedReference) => {
    return completedReference.reduce((sum, num) => sum + num, 0);
  };

  const calculateCompletionRate = useMemo(() => {
    const totalCompletedReference = countTotalCompletedReference(
      completedReferenceCounts
    );
    const totalReferenceCount = countTotalReference;

    return totalReferenceCount > 0
      ? ((totalCompletedReference / totalReferenceCount) * 100).toFixed(0) + "%"
      : "0%";
  }, [reference]);

  const calculateAverageResponseDays = useMemo(() => {
    let { totalResponseTime, completedCount } = reference.reduce(
      (acc, record) => {
        const { dateSent, referees } = record;
        const sentDate = new Date(dateSent);

        referees.forEach((ref) => {
          if (ref.status === "Completed" && ref.completedDate) {
            const completedDate = new Date(ref.completedDate);
            const responseTime =
              (completedDate - sentDate) / (1000 * 60 * 60 * 24);
            acc.totalResponseTime += responseTime;
            acc.completedCount++;
          }
        });

        return acc;
      },
      { totalResponseTime: 0, completedCount: 0 }
    );

    if (completedCount === 0) return 0;

    const averageDays = totalResponseTime / completedCount;

    if (averageDays < 1) {
      // Convert to hours and round to nearest hour
      const hours = Math.round(averageDays * 24);
      return `${hours} ${hours === 1 ? "hour" : "hours"}`;
    }

    return `${Math.round(averageDays)} ${
      Math.round(averageDays) === 1 ? "day" : "days"
    }`;
  }, [reference]);

  const cardData = [
    {
      title: TRANSLATIONS[language].totalReferences,
      value: countTotalReference,
      color: "#1877F2",
      route: "/ai-reference-request", // Add route for Total References
    },
    {
      title: TRANSLATIONS[language].completionRate,
      value: calculateCompletionRate,
      color: "#F8BD00",
      refresh: true, // Indicate that this card should refresh the page
    },
    {
      title: TRANSLATIONS[language].averageResponseTime,
      value: calculateAverageResponseDays,
      color: "#319F43",
      refresh: true, // Indicate that this card should refresh the page
    },
  ];

  // Helper function to create a tooltip element if it doesn't exist yet
  function createTooltipElement() {
    let tooltipEl = document.getElementById("chartjs-tooltip");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip";
      tooltipEl.innerHTML = "<table></table>";
      document.body.appendChild(tooltipEl);
    }

    return tooltipEl;
  }

  /*overview*/
  const chartData = {
    labels: months,
    datasets: [
      {
        label: TRANSLATIONS[language].completed,
        data: completedReferenceCounts,
        backgroundColor: "#1877F2",
      },
      {
        label: TRANSLATIONS[language].pending,
        data: totalPendingReference,
        backgroundColor: "#F8BD00",
      },
    ],
  };

  // Function to generate unique whole number ticks, ensuring 0 is included
  const generateYTicks = (min, max) => {
    const ticks = [];

    const start = Math.min(0, Math.floor(min));
    const end = Math.ceil(max);

    for (let i = start; i <= end; i++) {
      ticks.push(i);
    }
    return ticks;
  };

  const minCompleted = Math.min(...chartData.datasets[0].data);
  const maxCompleted = Math.max(...chartData.datasets[0].data);
  const minPending = Math.min(...chartData.datasets[1].data);
  const maxPending = Math.max(...chartData.datasets[1].data);

  const minY = Math.min(minCompleted, minPending);
  const maxY = Math.max(maxCompleted, maxPending);

  const barYTicks = generateYTicks(minY, maxY);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          const tooltipEl = createTooltipElement();

          const tooltipModel = context.tooltip;

          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = 1;
          tooltipEl.style.backgroundColor = "#fff";
          tooltipEl.style.padding = "10px";
          tooltipEl.style.position = "absolute";
          tooltipEl.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
          tooltipEl.style.borderRadius = "10px";
          tooltipEl.style.pointerEvents = "none";

          tooltipEl.style.left =
            position.left + window.scrollX + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            position.top + window.scrollY + tooltipModel.caretY + "px";

          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          const month = context.chart.data.labels[dataIndex]; // Month from the labels
          const completed = context.chart.data.datasets[0].data[dataIndex]; // Completed value
          const pending = context.chart.data.datasets[1].data[dataIndex]; // Pending value

          const innerHtml = `
            <table class="tooltip-bar-chart">
              <tr>
                <td style="font-weight: 500;">${month}</td>
              </tr>
              <tr>
                <td style="color: #1877F2; font-weight: 400;">${TRANSLATIONS[language].completed}: ${completed}</td>
              </tr>
              <tr>
                <td style="color: #F8BD00; font-weight: 400;">${TRANSLATIONS[language].pending}: ${pending}</td>
              </tr>
            </table>
          `;

          tooltipEl.querySelector("table").innerHTML = innerHtml;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#000",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#000",
          callback: function (value) {
            return barYTicks.includes(value) ? value : "";
          },
        },
      },
    },
  };
  const useCompletedReferees = () => {
    return useMemo(() => {
      return reference
        .flatMap((record) =>
          record.referees
            ? record.referees
                .filter((referee) => referee.status === "Completed")
                .map((referee) => ({
                  candidate: record.candidate,
                  candidateId: record._id,
                  refereeName: referee.name,
                  refereeEmail: referee.email,
                  refereeId: referee._id,
                  status: referee.status,
                  questionFormat: referee.questionFormat,
                }))
            : []
        )
        .reverse();
    }, [reference]);
  };
  const handleDownloadRecord = (data) => {
    setCandidateId(data.candidateId);
    setRefereeId(data.refereeId);
    setRefereeQuestionFormat(data.questionFormat);
    setIsDownload(true);
  };
  // Function to get the color based on status
  const getStatusColor = (status) => {
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

  const candidateData = useCompletedReferees();
  if (isDownload) {
    return (
      <ViewRequest
        referenceId={candidateId}
        refereeId={refereeId}
        token={token}
        refereeQuestionFormat={refereeQuestionFormat}
        onClose={() => setIsDownload(false)}
      />
    );
  }

  const handleAutoReportButtonClick = () => {
    handleButtonClick("Reports");
    if (reportButtonRef.current) {
      reportButtonRef.current.click();
    }
  };

  const getTranslatedStatus = (status) => {
    switch (status) {
      case "In Progress":
        return TRANSLATIONS[language].inProgress;
      case "Completed":
        return TRANSLATIONS[language].completed;
      case "Expired":
        return TRANSLATIONS[language].expired;
      case "New":
        return TRANSLATIONS[language].new;
      default:
        return status;
    }
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-4">
      <ReportsHeader
        translations={TRANSLATIONS[language]}
        cardData={cardData}
        isReportsCardVisible={isReportsCardVisible}
        onCardClick={(card) => {
          if (card.refresh) {
            window.location.reload();
          } else {
            navigate(card.route);
          }
        }}
      />

      <div
        className={`d-flex justify-content-center gap-4 button-controls-report fade-in ${
          isButtonVisible ? "visible" : ""
        }`}
      >
        <button
          className={`btn-custom ${
            activeButton === "Overview" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Overview")}
        >
          {TRANSLATIONS[language].overview}
        </button>
        <button
          ref={reportButtonRef} // Assign the ref here
          className={`btn-custom btn-aireference-report ${
            activeButton === "Reports" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Reports")}
        >
          {TRANSLATIONS[language].reports}
        </button>
      </div>

      <div
        className={`AiReference-report-container position-relative fade-in ${
          isChartVisible ? "visible" : ""
        }`}
      >
        {activeButton === "Reports" ? (
          <ReportsTable
            translations={TRANSLATIONS[language]}
            candidateData={candidateData}
            getStatusColor={getStatusColor}
            getTranslatedStatus={getTranslatedStatus}
            onDownloadRecord={handleDownloadRecord}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
          />
        ) : (
          <ReportsChart
            translations={TRANSLATIONS[language]}
            chartData={chartData}
            barOptions={barOptions}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
          />
        )}
      </div>

      {showGuide && (
        <PopupGuide
          introKey="reports"
          onStepChangeReport={handleAutoReportButtonClick}
        />
      )}
    </div>
  );
};

export default Reports;
