import { useState, useEffect, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddJobComponent from "./Components/AddJobComponent";
import { socket } from "../../../utils/socket/socketSetup";
import RecentActivitySection from "./Components/RecentActivitySection";
import HeaderSections from "./Components/HeaderSections";
import CardSection from "./Components/CardSection";
import ChartSection from "./Components/ChartSection";
import { useLabels } from "./Hooks/useLabels";
import { useGetCandidate } from "../../../hook/useCandidate";
import {
  useGetCompletedReference,
  useGetReferences,
} from "../../../hook/useReference";
import { useGetJobs } from "../../../hook/useJob";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAgency } from "../../../hook/useAgencyPartner";
import {
  getAgencySuccessRate,
  calculateAgencySuccessRate,
} from "../../../utils/helpers/chartData";
const MainDashboard = () => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const user = JSON.parse(localStorage.getItem("user"));
  const queryClient = useQueryClient();
  const { labels } = useLabels(language);
  const { data: candidates = [] } = useGetCandidate(user);
  const { data: completedRecords = [] } = useGetCompletedReference(user);
  const { data: activeJobs = [] } = useGetJobs(user);
  const { data: reference = [] } = useGetReferences(user);
  const { data: agencies = [], isPending } = useGetAgency(user);
  const [showJobForm, setShowJobForm] = useState(false);
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

  useEffect(() => {
    //INVALIDATE QUERIES WHEN SOMEONE SUBMIT REFERENCE RESPONSE
    const handleReferenceSubmitted = async (data) => {
      if (data?.completed) {
        queryClient.invalidateQueries({ queryKey: ["candidates"] });
        queryClient.invalidateQueries({ queryKey: ["completed-reference"] });
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        queryClient.invalidateQueries({ queryKey: ["references"] });
      }
    };

    socket.off("referenceSubmitted");
    socket.on("referenceSubmitted", (data) => {
      handleReferenceSubmitted(data);
    });
  }, []);

  const {
    months = [],
    totalReferenceCount = [],
    completedReferenceCounts = [],
  } = useMemo(() => {
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
    const translatedMonths = months.map((month) => labels.months[month]);

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
  }, [reference, labels.months]);

  // Calculate the count for each card
  const activeJobCount = useMemo(() => {
    return (
      activeJobs.reduce((total, job) => total + (job.vacancies || 0), 0) || 0
    );
  }, [activeJobs]);

  const totalCompletedReference = useMemo(() => {
    return reference.reduce((count, record) => {
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
  }, [reference]);

  const pendingReferenceCount = useMemo(() => {
    return reference.reduce((count, record) => {
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
  }, [reference]);

  const totalCandidateCount = useMemo(() => {
    return candidates.length || 0;
  }, [candidates]);

  const cardData = useMemo(() => {
    return [
      {
        title: labels.ActiveJobs,
        count: activeJobCount,
        color: "#1877F2",
        path: "/ai-reference-jobs",
      },
      {
        title: labels.PendingReferences,
        count: pendingReferenceCount,
        color: "#F8BD00",
        path: "/ai-reference-request",
      },
      {
        title: labels.CompletedReferences,
        count: totalCompletedReference,
        color: "#319F43",
        path: "/ai-reference-request",
      },
      {
        title: labels.TotalApplicants,
        count: totalCandidateCount,
        color: "#686868",
        path: "/ai-reference-applicants",
      },
      {
        title: labels.TotalCredits,
        count: 0,
        color: "#f46a05",
        path: "/",
      },
    ];
  }, [
    labels.ActiveJobs,
    labels.PendingReferences,
    labels.CompletedReferences,
    labels.TotalApplicants,
    labels.TotalCredits,
    activeJobCount,
    pendingReferenceCount,
    totalCompletedReference,
    totalCandidateCount,
  ]);

  const lineData = useMemo(() => {
    return {
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
  }, [months, totalReferenceCount, completedReferenceCounts]);

  const createTooltipElement = useCallback(() => {
    let tooltipEl = document.getElementById("chartjs-tooltip");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip";
      tooltipEl.innerHTML = "<table></table>";
      document.body.appendChild(tooltipEl);
    }
    return tooltipEl;
  }, []);

  const generateYTicks = useMemo(() => {
    return (min, max) => {
      const ticks = [];
      const start = Math.min(0, Math.floor(min));
      const end = Math.ceil(max);

      for (let i = start; i <= end; i++) {
        ticks.push(i);
      }
      return ticks;
    };
  }, []);

  // Calculate chart bounds and ticks
  const yTicks = useMemo(() => {
    const minTotal = Math.min(...totalReferenceCount);
    const maxTotal = Math.max(...totalReferenceCount);
    const minCompleted = Math.min(...completedReferenceCounts);
    const maxCompleted = Math.max(...completedReferenceCounts);

    const minY = Math.min(minTotal, minCompleted);
    const maxY = Math.max(maxTotal, maxCompleted);

    return generateYTicks(minY, maxY);
  }, [totalReferenceCount, completedReferenceCounts, generateYTicks]);

  const lineOptions = useMemo(() => {
    return {
      responsive: true,
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

            const month = lineData.labels[tooltipModel.dataPoints[0].dataIndex];
            const innerHtml = `
        <table class="tooltip-line=chart">
          <tr>
            <td style="font-weight: 500;">${month}</td>
          </tr>
          <tr>
            <td style="color: #1877F2; font-weight: 400;">${labels.Total}: ${
              lineData.datasets[0].data[tooltipModel.dataPoints[0].dataIndex]
            }</td>
          </tr>
          <tr>
            <td style="color: #319F43;font-weight: 400;">${labels.Complete}: ${
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

            callback: function (value) {
              return yTicks.includes(value) ? value : "";
            },
          },

          ticks: {
            callback: function (value) {
              return yTicks.includes(value) ? value : "";
            },
          },
        },
      },
    };
  }, [
    createTooltipElement,
    labels.Complete,
    labels.Total,
    lineData.datasets,
    lineData.labels,
    yTicks,
  ]);

  const { departments, counts, departmentMap } = useMemo(() => {
    const departmentCounts = {};
    const departmentMap = new Map();

    const mapDepartmentToKey = (dept) => {
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
  }, [activeJobs]);

  const barData = useMemo(() => {
    return {
      labels: departments.map((dept) => {
        const deptKey = departmentMap.get(dept);
        return labels.departments[deptKey] || dept;
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
  }, [counts, departmentMap, departments, labels.departments]);

  const barYTicks = useMemo(() => {
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    return generateYTicks(minCount, maxCount);
  }, [counts, generateYTicks]);

  const barOptions = useMemo(() => {
    return {
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
              tooltipX -= tooltipWidth;
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
              const deptKey = departmentMap.get(departments[index]);
              return departments.length <= 1
                ? labels.departments[deptKey] || departments[index]
                : "";
            },
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
  }, [barYTicks, departments, departmentMap, labels.departments]);

  const acceptanceRateData = useMemo(() => {
    return {
      labels: agencies.map((agency) => agency.name),
      datasets: [
        {
          label: labels.AcceptanceRate,
          data: calculateAgencySuccessRate({ agencies, candidates }),
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
  }, [labels.AcceptanceRate, agencies, candidates]);

  const acceptanceRateOptions = useMemo(() => {
    return {
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
            const agency = agencies[dataIndex];
            const agencyId = agency._id;

            const acceptedValue = getAgencySuccessRate({
              agencyId,
              candidates,
            });

            const innerHtml = `
          <table class="tooltip-acceptance-chart">
            <tr>
              <td style="font-weight: 500;">${agency.name}: ${acceptedValue}%</td>
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
              return acceptanceRateData.labels.length <= 2
                ? acceptanceRateData.labels[index]
                : "";
            },
          },
        },
      },
    };
  }, [acceptanceRateData.labels, agencies, candidates]);

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      {showJobForm ? (
        <AddJobComponent
          onCancel={() => {
            setShowJobForm(false);
          }}
          user={user}
          labels={labels}
        />
      ) : (
        <>
          {/* HEADER SECTION */}
          <HeaderSections
            labels={labels}
            setAddJob={() => setShowJobForm(true)}
            isStartReferenceCheckVisible={isStartReferenceCheckVisible}
          />

          {/* CARD SECTION */}
          <CardSection
            cardData={cardData}
            isAiReferenceCardVisible={isAiReferenceCardVisible}
            language={language}
          />

          {/* CHART SECTION */}
          <ChartSection
            isLineChartVisible={isLineChartVisible}
            isBarChartVisible={isBarChartVisible}
            lineData={lineData}
            lineOptions={lineOptions}
            barData={barData}
            barOptions={barOptions}
            labels={labels}
            acceptanceRateData={acceptanceRateData}
            acceptanceRateOptions={acceptanceRateOptions}
          />

          {/* RECENT ACTIVITY SECTION */}
          <RecentActivitySection
            completedRecords={completedRecords}
            labels={labels}
            isLogContainerVisible={isLogContainerVisible}
          />
        </>
      )}
    </div>
  );
};

export default MainDashboard;
