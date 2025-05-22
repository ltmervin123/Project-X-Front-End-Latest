import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AddJobComponent from "./Components/AddJobComponent";
import { socket } from "../../../utils/socket/socketSetup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecentActivitySection from "./Components/RecentActivitySection";
import HeaderSections from "./Components/HeaderSections";
import CardSection from "./Components/CardSection";
import ChartSection from "./Components/ChartSection";

const TRANSLATIONS = {
  English: {
    Dashboard: "Dashboard",

    ManageTrackResponse: "Manage and track your reference response",
    StartReferenceCheck: "Start Reference Check",
    ActiveJobs: "Active Jobs",
    PendingReferences: "Pending References",
    CompletedReferences: "Completed References",

    TotalApplicants: "Total Applicants",
    ReferenceOverview: "Reference Overview",
    ByDepartment: "By Department",
    RecentActivities: "Recent Activities",
    ClickToStart: "Click here to begin the reference check process.",
    ManageTrackProcesses: "Manage and track your reference check processes.",
    completed: "completed",
    NoRecentActivities: "No recent activities",
    ViewAll: "View All",
    ShowLess: "Show Less",
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
    Total: "Total",
    Complete: "Complete",
    months: {
      January: "January",
      February: "February",
      March: "March",
      April: "April",
      May: "May",
      June: "June",
      July: "July",
      August: "August",
      September: "September",
      October: "October",
      November: "November",
      December: "December",
    },
    "a reference check for": "a reference check for",
    ago: "ago",
    TotalCredits: "Total Credits",
    TotalRate: "Total Rate",
    AcceptanceRate: "Acceptance Rate",
  },
  Japanese: {
    Dashboard: "ダッシュボード",

    ManageTrackResponse: "リファレンスチェックの管理と追跡",
    StartReferenceCheck: "リファレンスチェックを開始する",
    ActiveJobs: "求人",
    PendingReferences: "保留中のリファレンス",
    CompletedReferences: "完了リファレンス",
    TotalApplicants: "応募者数",
    ReferenceOverview: "リファレンスチェック概要",
    ByDepartment: "部門別",
    RecentActivities: "最近の活動",
    ClickToStart:
      "ここをクリックしてリファレンスチェックプロセスを開始します。",
    ManageTrackProcesses: "リファレンスチェックプロセスを管理し、追跡します。",
    completed: "完了",
    NoRecentActivities: "最近の活動はありません",
    ViewAll: "すべて表示",
    ShowLess: "表示を減らす",
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
    Total: "合計",
    Complete: "完了",
    months: {
      January: "1月",
      February: "2月",
      March: "3月",
      April: "4月",
      May: "5月",
      June: "6月",
      July: "7月",
      August: "8月",
      September: "9月",
      October: "10月",
      November: "11月",
      December: "12月",
    },
    "a reference check for": "のリファレンスチェック",
    ago: "前",
    TotalCredits: "総クレジット",
    TotalRate: "総レート",
    AcceptanceRate: "承認率",
  },
};

const MainDashboard = () => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const id = USER?.id;
  const token = USER?.token;
  const [showJobForm, setShowJobForm] = useState(false);
  const language = sessionStorage.getItem("preferred-language") || "English";
  const [isStartReferenceCheckVisible, setIsStartReferenceCheckVisible] =
    useState(false);
  const [isAiReferenceCardVisible, setIsAiReferenceCardVisible] =
    useState(false);
  const [isLineChartVisible, setIsLineChartVisible] = useState(false);
  const [isBarChartVisible, setIsBarChartVisible] = useState(false);
  const [isLogContainerVisible, setIsLogContainerVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsStartReferenceCheckVisible(true), 100),
      setTimeout(() => setIsAiReferenceCardVisible(true), 300),
      setTimeout(() => setIsLineChartVisible(true), 900),
      setTimeout(() => setIsBarChartVisible(true), 1200),
      setTimeout(() => setIsLogContainerVisible(true), 1600),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleOpenJobForm = () => {
    setShowJobForm(true);
  };

  const [candidates, setCandidates] = useState(
    JSON.parse(localStorage.getItem("candidates")) || []
  );
  const [activeJobs, setActiveJobs] = useState(
    JSON.parse(localStorage.getItem("jobs")) || []
  );
  const [reference, setReference] = useState(
    JSON.parse(localStorage.getItem("reference")) || []
  );
  const [questionSets, setQuestionSets] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );
  const [completedRecords, setCompletedRecords] = useState(
    JSON.parse(localStorage.getItem("completedReference")) || []
  );
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  const fetchCompletedRecords = async ({ signal }) => {
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/get-completed-reference/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          signal,
        },
      });
      localStorage.setItem(
        "completedReference",
        JSON.stringify(response.data.result)
      );
      setCompletedRecords(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomReferenceQuestions = async ({ signal } = {}) => {
    try {
      const URL = `${API}/api/ai-referee/company-reference-questions/get-reference-questions/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          signal,
        },
      });
      localStorage.setItem(
        "questions",
        JSON.stringify(response.data.questions)
      );
      setQuestionSets(response.data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReference = async ({ signal } = {}) => {
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/get-reference-request-by-companyId/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "reference",
          JSON.stringify(response.data.reference)
        );
        setReference(response.data.reference);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobs = async ({ signal } = {}) => {
    try {
      const URL = `${API}/api/ai-referee/company-jobs/get-jobs-by-id/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });
      if (response.status === 200) {
        localStorage.setItem("jobs", JSON.stringify(response.data.jobs));
        setActiveJobs(response.data.jobs);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCandidates = async ({ signal }) => {
    try {
      const URL = `${API}/api/ai-referee/company-candidates/get-candidates-by-companyId/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });

      if (response.status === 200) {
        setCandidates(response.data.candidates);
        localStorage.setItem(
          "candidates",
          JSON.stringify(response.data.candidates)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchCandidates = async ({ signal } = {}) => {
    try {
      await fetchCandidates(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchUpdatedQuestions = async ({ signal } = {}) => {
    try {
      await fetchCustomReferenceQuestions(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchReference = async ({ signal } = {}) => {
    try {
      await fetchReference(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchCompletedReference = async ({ signal } = {}) => {
    try {
      await fetchCompletedRecords(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const refetchJobs = async ({ signal } = {}) => {
    try {
      //fetch the jobs again
      await fetchJobs(signal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleReferenceSubmitted = async (data) => {
      if (data?.completed) {
        await handleRefetchCandidates();
        await handleRefetchJobs();
        await handleRefetchReference();
      }
    };

    socket.off("referenceSubmitted");
    socket.on("referenceSubmitted", (data) => {
      handleReferenceSubmitted(data);
    });
  }, []);

  //This function return an array of months according to the reference data
  const getMonthlyCounts = (reference) => {
    const monthNames = [
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
    ];

    const translatedMonthNames = monthNames.map(
      (month) => TRANSLATIONS[language].months[month]
    );

    const monthMap = new Map();

    // Initialize month map using English month names for internal mapping
    reference.forEach((record) => {
      const date = new Date(record.dateSent);
      const month = monthNames[date.getMonth()];

      if (!monthMap.has(month)) {
        monthMap.set(month, { total: 0, completed: 0 });
      }

      //Counting status and total referee for the all record
      if (!record.referees && record.status === "Completed") {
        monthMap.get(month).total += 1;
        monthMap.get(month).completed += 1;
      } else {
        monthMap.get(month).total += record.referees.length;
        //Counting status and total referee for the individual referees
        record.referees.forEach((referee) => {
          if (referee.status === "Completed") {
            monthMap.get(month).completed += 1;
          }
        });
      }
    });

    // Sort months based on order in the monthNames array
    const months = Array.from(monthMap.keys()).sort(
      (a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)
    );

    // Map the sorted English month names to translated ones
    const translatedMonths = months.map(
      (month) => TRANSLATIONS[language].months[month]
    );

    const totalReferenceCount = months.map(
      (month) => monthMap.get(month).total
    );
    const completedReferenceCounts = months.map(
      (month) => monthMap.get(month).completed
    );

    return {
      months: translatedMonths,
      totalReferenceCount,
      completedReferenceCounts,
    };
  };
  const { months, totalReferenceCount, completedReferenceCounts } =
    getMonthlyCounts(reference);

  // Calculate the count for each card
  const activeJobCount =
    activeJobs.reduce((total, job) => total + (job.vacancies || 0), 0) || 0;

  const totalCompletedReference = reference.reduce((count, record) => {
    // Check if the record has referees
    if (record?.referees) {
      record.referees.forEach((referee) => {
        // Count only if the referee's status is "Completed" and the candidate is not null
        if (referee.status === "Completed" && record.candidate !== null) {
          count++;
        }
      });
    }
    // Check if the record itself is "Completed" and the candidate is not null
    else if (record.status === "Completed" && record.candidate !== null) {
      count++;
    }
    return count;
  }, 0);

  const pendingReferenceCount = reference.reduce((count, record) => {
    // Check if the record has referees
    if (record?.referees) {
      // Count only those referees whose status is "In Progress" and the candidate is not null
      count += record.referees.filter(
        (referee) =>
          referee.status === "In Progress" && record.candidate !== null
      ).length;
    }
    // Check if the record itself is "In Progress" and the candidate is not null
    else if (record.status === "In Progress" && record.candidate !== null) {
      count++;
    }
    return count;
  }, 0);

  const totalCandidateCount = candidates.length || 0;

  const cardData = [
    {
      title: TRANSLATIONS[language].ActiveJobs, // Use translation
      count: activeJobCount,
      color: "#1877F2",
      path: "/ai-reference-jobs",
    },
    {
      title: TRANSLATIONS[language].PendingReferences,
      count: pendingReferenceCount,
      color: "#F8BD00",
      path: "/ai-reference-request",
    },
    {
      title: TRANSLATIONS[language].CompletedReferences,
      count: totalCompletedReference,
      color: "#319F43",
      path: "/ai-reference-request",
    },
    {
      title: TRANSLATIONS[language].TotalApplicants,
      count: totalCandidateCount,
      color: "#686868",
      path: "/ai-reference-applicants",
    },
    {
      title: TRANSLATIONS[language].TotalCredits,
      count: 5,
      color: "#f46a05",
      path: "/",
    },
  ];
  // Data for the line chart
  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Total",
        data: totalReferenceCount,
        fill: false,
        backgroundColor: "#1877F2",
        borderColor: "#1877F2",
        tension: 0.1,
      },
      {
        label: "Completed",
        data: completedReferenceCounts,
        fill: false,
        backgroundColor: "#319F43",
        borderColor: "#319F43",
        tension: 0.1,
      },
    ],
  };

  // Ensure the tooltip element exists and is created before using it
  const createTooltipElement = () => {
    let tooltipEl = document.getElementById("chartjs-tooltip");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip";
      tooltipEl.innerHTML = "<table></table>";
      document.body.appendChild(tooltipEl);
    }
    return tooltipEl;
  };

  // Function to generate unique whole number ticks
  const generateYTicks = (min, max) => {
    const ticks = [];
    // Ensure the minimum is at least 0
    const start = Math.min(0, Math.floor(min));
    const end = Math.ceil(max);

    for (let i = start; i <= end; i++) {
      ticks.push(i);
    }
    return ticks;
  };

  // Calculate the min and max values from your datasets
  const minTotal = Math.min(...totalReferenceCount);
  const maxTotal = Math.max(...totalReferenceCount);
  const minCompleted = Math.min(...completedReferenceCounts);
  const maxCompleted = Math.max(...completedReferenceCounts);

  // Determine overall min and max
  const minY = Math.min(minTotal, minCompleted);
  const maxY = Math.max(maxTotal, maxCompleted);

  // Generate unique whole number ticks for the y-axis
  const yTicks = generateYTicks(minY, maxY);

  // Update the lineOptions
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          const tooltipEl = createTooltipElement(); // Ensure tooltip element exists

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

          const month = lineData.labels[tooltipModel.dataPoints[0].dataIndex]; // Get the month
          const innerHtml = `
        <table class="tooltip-line=chart">
          <tr>
            <td style="font-weight: 500;">${month}</td>
          </tr>
          <tr>
            <td style="color: #1877F2; font-weight: 400;">${
              TRANSLATIONS[language].Total
            }: ${
            lineData.datasets[0].data[tooltipModel.dataPoints[0].dataIndex]
          }</td>
          </tr>
          <tr>
            <td style="color: #319F43;font-weight: 400;">${
              TRANSLATIONS[language].Complete
            }: ${
            lineData.datasets[1].data[tooltipModel.dataPoints[0].dataIndex]
          }</td>
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
          // Use the generated ticks
          callback: function (value) {
            return yTicks.includes(value) ? value : ""; // Only show the tick if it's in the generated ticks
          },
        },
        // Set the ticks to the generated array
        ticks: {
          callback: function (value) {
            return yTicks.includes(value) ? value : ""; // Only show the tick if it's in the generated ticks
          },
        },
      },
    },
  };
  function getDepartmentCounts() {
    const departmentCounts = {};
    const departmentMap = new Map();

    // Helper function to map department names to translation keys
    const mapDepartmentToKey = (dept) => {
      // Manual mapping for specific department names
      const manualMapping = {
        "Human Resources (HR)": "hr",
        "IT (Information Technology)": "it",
        "Research and Development (R&D)": "rAndD",
        "Public Relations (PR)": "pr",
        "Business Development": "businessDev",
        "Customer Service": "customerService",
        "Risk Management": "riskManagement",
        "Product Development": "productDevelopment",
        "Logistics, Supply Chain & Procurement": "logistics",
      };

      // Check manual mapping first
      if (manualMapping[dept]) {
        return manualMapping[dept];
      }

      // Fall back to automatic conversion for other cases
      return dept
        .toLowerCase()
        .replace(/[\s()&]/g, "")
        .replace(/and/g, "And")
        .replace(
          /(^[a-z]|[A-Z])[a-z]*/g,
          (word) => word.charAt(0).toLowerCase() + word.slice(1)
        );
    };

    activeJobs.forEach((job) => {
      if (job.department) {
        const deptKey = mapDepartmentToKey(job.department);
        departmentCounts[job.department] =
          (departmentCounts[job.department] || 0) + 1;
        departmentMap.set(job.department, deptKey);
      }
    });

    const departments = Object.keys(departmentCounts);
    const counts = Object.values(departmentCounts);

    return { departments, counts, departmentMap };
  }

  const { departments, counts, departmentMap } = getDepartmentCounts();

  const barData = {
    labels: departments.map((dept) => {
      const deptKey = departmentMap.get(dept);
      return TRANSLATIONS[language].departments[deptKey] || dept;
    }),
    datasets: [
      {
        label: "Department References",
        backgroundColor: "#1877F2",
        borderColor: "transparent",
        borderWidth: 2,
        data: counts,
      },
    ],
  };

  // Calculate the min and max values from your counts array
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  // Generate unique whole number ticks for the y-axis
  const barYTicks = generateYTicks(minCount, maxCount);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          const tooltipEl = document.getElementById("chartjs-tooltip");

          let tooltipElement = tooltipEl;
          if (!tooltipElement) {
            tooltipElement = document.createElement("div");
            tooltipElement.id = "chartjs-tooltip";
            tooltipElement.innerHTML = "<table></table>";
            document.body.appendChild(tooltipElement);
          }

          const tooltipModel = context.tooltip;

          if (tooltipModel.opacity === 0) {
            tooltipElement.style.opacity = 0;
            return;
          }

          const position = context.chart.canvas.getBoundingClientRect();
          tooltipElement.style.opacity = 1;
          tooltipElement.style.backgroundColor = "#fff";
          tooltipElement.style.padding = "10px";
          tooltipElement.style.position = "absolute";
          tooltipElement.style.zIndex = 1000;
          tooltipElement.style.boxShadow =
            "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
          tooltipElement.style.borderRadius = "10px";
          tooltipElement.style.pointerEvents = "none";

          // Calculate the tooltip position (right to left)
          const tooltipWidth = tooltipElement.offsetWidth; // Get tooltip width
          let tooltipX = position.left + window.scrollX + tooltipModel.caretX;
          let tooltipY = position.top + window.scrollY + tooltipModel.caretY;

          // If tooltip would overflow the canvas on the right, place it on the left
          if (tooltipX + tooltipWidth > position.left + position.width) {
            tooltipX -= tooltipWidth; // Shift to the left
          }

          // Apply the calculated position
          tooltipElement.style.left = tooltipX + "px";
          tooltipElement.style.top = tooltipY + "px";

          // Populate the custom tooltip content
          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          const department = context.chart.data.labels[dataIndex];
          const value = context.chart.data.datasets[0].data[dataIndex];

          const innerHtml = `
          <table class="tooltip-bar-chart">
            <tr>
              <td style="font-weight: 500;">${department}: ${value}</td>
            </tr>
          </table>
        `;
          tooltipElement.querySelector("table").innerHTML = innerHtml;
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
          callback: function (value, index) {
            // Only show labels if there are 2 or fewer departments
            const deptKey = departmentMap.get(departments[index]);
            return departments.length <= 2
              ? TRANSLATIONS[language].departments[deptKey] ||
                  departments[index]
              : "";
          },
        },
      },
      y: {
        grid: {
          display: false, // Disable grid on the y-axis
        },
        ticks: {
          font: {
            size: 12, // Adjust the font size of the y-axis labels if needed
          },
          color: "#000", // Change the label color if necessary
          callback: function (value) {
            return barYTicks.includes(value) ? value : ""; // Only show the tick if it's in the generated ticks
          },
        },
      },
    },
  };

  // Add sample data for Acceptance Rate Per Agencies
  const acceptanceRateData = {
    labels: ["Agency A", "Agency B", "Agency C", "Agency D", "Agency E"],
    datasets: [
      {
        label: TRANSLATIONS[language].AcceptanceRate,
        data: [85, 72, 90, 65, 78],
        backgroundColor: [
          "#1877F2",
          "#1877F2",
          "#1877F2",
          "#1877F2",
          "#1877F2",
        ],
        borderColor: "transparent",
        borderRadius: 5,
      },
    ],
  };

  const acceptanceRateOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          const tooltipEl = document.getElementById("chartjs-tooltip");

          let tooltipElement = tooltipEl;
          if (!tooltipElement) {
            tooltipElement = document.createElement("div");
            tooltipElement.id = "chartjs-tooltip";
            tooltipElement.innerHTML = "<table></table>";
            document.body.appendChild(tooltipElement);
          }

          const tooltipModel = context.tooltip;

          if (tooltipModel.opacity === 0) {
            tooltipElement.style.opacity = 0;
            return;
          }

          const position = context.chart.canvas.getBoundingClientRect();
          tooltipElement.style.opacity = 1;
          tooltipElement.style.backgroundColor = "#fff";
          tooltipElement.style.padding = "10px";
          tooltipElement.style.position = "absolute";
          tooltipElement.style.zIndex = 1000;
          tooltipElement.style.boxShadow =
            "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
          tooltipElement.style.borderRadius = "10px";
          tooltipElement.style.pointerEvents = "none";

          // Calculate tooltip position
          const tooltipWidth = tooltipElement.offsetWidth;
          let tooltipX = position.left + window.scrollX + tooltipModel.caretX;
          let tooltipY = position.top + window.scrollY + tooltipModel.caretY;

          if (tooltipX + tooltipWidth > position.left + position.width) {
            tooltipX -= tooltipWidth;
          }

          tooltipElement.style.left = tooltipX + "px";
          tooltipElement.style.top = tooltipY + "px";

          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          const agency = context.chart.data.labels[dataIndex];
          const rate = context.chart.data.datasets[0].data[dataIndex];

          const innerHtml = `
          <table class="tooltip-acceptance-chart">
            <tr>
              <td style="font-weight: 500;">${agency}: ${rate}%</td>
            </tr>
          </table>
        `;
          tooltipElement.querySelector("table").innerHTML = innerHtml;
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#000",
          callback: function (value, index) {
            // Only show labels if there are 2 or fewer agencies
            return acceptanceRateData.labels.length <= 2
              ? acceptanceRateData.labels[index]
              : "";
          },
        },
      },
    },
  };

  async function refetchAllData(timeoutRef, abortController) {
    if (abortController.signal.aborted) return; // Stop execution if aborted

    try {
      await Promise.all([
        reFetchCandidates({ signal: abortController.signal }),
        refetchJobs({ signal: abortController.signal }),
        reFetchReference({ signal: abortController.signal }),
        reFetchCompletedReference({ signal: abortController.signal }),
      ]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Request aborted");
        return;
      }
      console.error("Fetch error:", error);
    }

    if (!abortController.signal.aborted) {
      timeoutRef.current = setTimeout(
        () => refetchAllData(timeoutRef, abortController),
        60000
      );
    }
  }

  useEffect(() => {
    refetchAllData(timeoutRef, abortControllerRef.current);

    return () => {
      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Abort fetch requests
      abortControllerRef.current.abort();
    };
  }, []);

  const handleRefetchCandidates = async () => {
    await fetchCandidates(abortControllerRef.current);
  };
  const handleRefetchJobs = async () => {
    await fetchJobs(abortControllerRef.current);
  };
  const handleRefetchReference = async () => {
    await fetchReference(abortControllerRef.current);
  };

  const handleRefetchCompletedRecords = async () => {
    await fetchCompletedRecords(abortControllerRef.current);
  };
  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      {showJobForm ? (
        <AddJobComponent
          onCancel={() => {
            setShowJobForm(false);
          }}
        />
      ) : (
        <>
          {/* HEADER SECTION */}
          <HeaderSections
            translations={TRANSLATIONS}
            language={language}
            setAddJob={() => setShowJobForm(true)}
            isStartReferenceCheckVisible={isStartReferenceCheckVisible}
          />

          {/* CARD SECTION */}
          <CardSection
            cardData={cardData}
            isAiReferenceCardVisible={isAiReferenceCardVisible}
            navigate={navigate}
          />

          {/* CHART SECTION */}
          <ChartSection
            isLineChartVisible={isLineChartVisible}
            isBarChartVisible={isBarChartVisible}
            lineData={lineData}
            lineOptions={lineOptions}
            barData={barData}
            barOptions={barOptions}
            translations={TRANSLATIONS}
            language={language}
          />

          {/* RECENT ACTIVITY SECTION */}
          <RecentActivitySection
            completedRecords={completedRecords}
            language={language}
            translations={TRANSLATIONS}
            isLogContainerVisible={isLogContainerVisible}
          />
        </>
      )}
    </div>
  );
};

export default MainDashboard;
