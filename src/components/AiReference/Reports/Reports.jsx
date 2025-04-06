import React, { useState, useEffect, useRef, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import ViewRequest from "../ReferenceRequest/Components/ViewRequest";
import PopupGuide from "../../AiReference/PopupGuide";

const MONTHS_OF_YEAR = [
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

const Reports = () => {
  const navigate = useNavigate(); // Move useNavigate here
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
      const month = MONTHS_OF_YEAR[date.getMonth()];

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
      (a, b) => MONTHS_OF_YEAR.indexOf(a) - MONTHS_OF_YEAR.indexOf(b)
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

    return completedCount > 0
      ? Math.round(totalResponseTime / completedCount)
      : 0;
  }, [reference]);

  const cardData = [
    {
      title: "Total References",
      value: countTotalReference,
      color: "#1877F2",
      route: "/AiReferenceCandidates", // Add route for Total References
    },
    {
      title: "Completion Rate",
      value: calculateCompletionRate,
      color: "#F8BD00",
      refresh: true, // Indicate that this card should refresh the page
    },
    {
      title: "Avg. Response Time",
      value:
        calculateAverageResponseDays > 1
          ? `${calculateAverageResponseDays} days`
          : `${calculateAverageResponseDays} day`,
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
        label: "Completed",
        data: completedReferenceCounts,
        backgroundColor: "#1877F2",
      },
      {
        label: "Pending",
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
                <td style="color: #1877F2; font-weight: 400;">Completed: ${completed}</td>
              </tr>
              <tr>
                <td style="color: #F8BD00; font-weight: 400;">Pending: ${pending}</td>
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
      />
    );
  }

  const handleAutoReportButtonClick = () => {
    handleButtonClick("Reports");
    if (reportButtonRef.current) {
      reportButtonRef.current.click();
    }
  };
  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-4">
      <div>
        <h3 className="mb-0">Analytics & Reports</h3>
        <p className="mb-2">
          Gain insights into your reference checking process and hiring
          efficiency.
        </p>
      </div>
      <Row className="d-flex justify-content-center AiReferenceReportCard-container">
        {cardData.map((card, index) => (
          <Col key={index} md={3}>
            <div
              className={`AiReferenceCard fade-in ${
                isReportsCardVisible ? "visible" : ""
              }`}
              onClick={() => {
                if (card.refresh) {
                  window.location.reload();
                } else {
                  navigate(card.route);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              {/* Title and Count */}
              <div className="h-100">
                <p className="d-flex title">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: card.color,
                      marginRight: "10px",
                    }}
                  ></div>
                  {card.title}
                </p>
                <p className="d-flex align-items-center justify-content-center value">
                  {card.value}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

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
          Overview
        </button>
        <button
          ref={reportButtonRef} // Assign the ref here
          className={`btn-custom btn-aireference-report ${
            activeButton === "Reports" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Reports")}
        >
          Reports
        </button>
      </div>

      <div
        className={`AiReference-report-container position-relative fade-in ${
          isChartVisible ? "visible" : ""
        }`}
      >
        {activeButton === "Reports" ? (
          <>
            <div className="AiReference-table-title">
              <h4 className="mb-0 d-flex gap-2 align-items-center">
                Recent Reports
                <div className="position-relative d-flex">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <path
                      d="M9 11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73478 12 7.48043 11.8946 7.29289 11.7071C7.10536 11.5196 7 11.2652 7 11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11ZM7.5 4C6.83696 4 6.20107 4.26339 5.73223 4.73223C5.26339 5.20107 5 5.83696 5 6.5H7C7 6.36739 7.05268 6.24021 7.14645 6.14645C7.24021 6.05268 7.36739 6 7.5 6H8.146C8.2321 6.00004 8.31566 6.02917 8.38313 6.08265C8.45061 6.13614 8.49803 6.21086 8.51771 6.29468C8.53739 6.3785 8.52818 6.46651 8.49156 6.54444C8.45495 6.62237 8.39309 6.68564 8.316 6.724L7 7.382V9H9V8.618L9.211 8.512C9.69063 8.27189 10.0752 7.87692 10.3024 7.39105C10.5296 6.90517 10.5862 6.35683 10.463 5.8348C10.3398 5.31276 10.044 4.8476 9.62346 4.51461C9.20296 4.18162 8.68238 4.0003 8.146 4H7.5Z"
                      fill="#F46A05"
                    />
                    <path
                      d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
                      fill="#F46A05"
                    />
                  </svg>
                  {showTooltip && (
                    <span className="job-tooltip-text">
                      Access recent completed requests and download them as
                      needed.
                    </span>
                  )}
                </div>
              </h4>
              <p>Download or view detailed reports.</p>
            </div>
            {candidateData.length > 0 ? (
              <table className="AiReference-report-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Referee</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateData.map((entry, index) => (
                    <tr key={index}>
                      <td>{`${entry.candidate.firstName} ${entry.candidate.lastName}`}</td>
                      <td>{`${entry.refereeName.firstName} ${entry.refereeName.lastName}`}</td>
                      <td
                        className="text-center"
                        style={{
                          color: getStatusColor(entry.status),
                          fontWeight: "bold",
                        }}
                      >
                        {entry.status}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            variant="link"
                            className="btn-view-details"
                            onClick={() => handleDownloadRecord(entry)}
                          >
                            Download PDF
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No records found</div>
            )}
          </>
        ) : (
          <>
            <div className="AiReference-table-title">
              <h4 className="mb-0 d-flex gap-2 align-items-center">
                Reference Check Analytics
                <div className="position-relative d-flex">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <path
                      d="M9 11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73478 12 7.48043 11.8946 7.29289 11.7071C7.10536 11.5196 7 11.2652 7 11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11ZM7.5 4C6.83696 4 6.20107 4.26339 5.73223 4.73223C5.26339 5.20107 5 5.83696 5 6.5H7C7 6.36739 7.05268 6.24021 7.14645 6.14645C7.24021 6.05268 7.36739 6 7.5 6H8.146C8.2321 6.00004 8.31566 6.02917 8.38313 6.08265C8.45061 6.13614 8.49803 6.21086 8.51771 6.29468C8.53739 6.3785 8.52818 6.46651 8.49156 6.54444C8.45495 6.62237 8.39309 6.68564 8.316 6.724L7 7.382V9H9V8.618L9.211 8.512C9.69063 8.27189 10.0752 7.87692 10.3024 7.39105C10.5296 6.90517 10.5862 6.35683 10.463 5.8348C10.3398 5.31276 10.044 4.8476 9.62346 4.51461C9.20296 4.18162 8.68238 4.0003 8.146 4H7.5Z"
                      fill="#F46A05"
                    />
                    <path
                      d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
                      fill="#F46A05"
                    />
                  </svg>
                  {showTooltip && (
                    <span className="job-tooltip-text">
                      This section will allow you to track the completed
                      progress of your referees and download them as needed.
                    </span>
                  )}
                </div>
              </h4>
              <p>Overview of completed and pending reference checks.</p>
            </div>
            <Row>
              <Col md={5}>
                <div className="chart-container-report">
                  <Bar data={chartData} options={barOptions} />
                </div>
              </Col>
              <Col md={7}>
                {/* Custom legend below the chart */}
                <div className="custom-legend h-100 d-flex flex-column align-items-center justify-content-center">
                  <ul>
                    <li>
                      <div className="legend-box completed"></div>
                      Completed
                    </li>
                    <li>
                      <div className="legend-box pending"></div>
                      Pending
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
      {showGuide && (
        <PopupGuide
          introKey="reports"
          onStepChangeReport={handleAutoReportButtonClick} // Pass the click handler
        />
      )}
    </div>
  );
};

export default Reports;
