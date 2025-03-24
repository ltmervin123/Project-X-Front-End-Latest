import React, { useState, useEffect, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import ViewRequest from "../ReferenceRequest/Components/ViewRequest";

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

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-4">
      <div>
        <h3 className="mb-0">Analytics & Reports</h3>
        <p className="mb-2">
          Gain insights into your reference checking process and hiring
          efficiency.
        </p>
      </div>
      <Row className="d-flex justify-content-center">
        {cardData.map((card, index) => (
          <Col key={index} md={3}>
            <div
              className={`AiReferenceCard fade-in ${
                isReportsCardVisible ? "visible" : ""
              }`}
              onClick={() => {
                if (card.refresh) {
                  window.location.reload(); // Refresh the page
                } else {
                  navigate(card.route); // Navigate to the specified route
                }
              }}
              style={{ cursor: "pointer" }} // Change cursor to pointer
            >
              {/* Title and Count */}
              <div className="h-100">
                <p className="d-flex title">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: card.color, // Dynamic color from card data
                      marginRight: "10px", // Space between box and title
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
          className={`btn-custom ${activeButton === "Reports" ? "active" : ""}`}
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
              <h4 className="mb-0">Recent Reports</h4>
              <p>Download or view detailed reports.</p>
            </div>
            <table>
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
                    <td>{entry.candidate}</td>
                    <td>{entry.refereeName}</td>
                    <td
                      className="text-center"
                      style={{
                        color: getStatusColor(entry.status), // Use the function to get the color
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
          </>
        ) : (
          <>
            <div className="AiReference-table-title">
              <h4 className="mb-0">Reference Check Analytics</h4>
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
    </div>
  );
};

export default Reports;
