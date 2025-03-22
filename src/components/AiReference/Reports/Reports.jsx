import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import { format, subWeeks, isAfter } from "date-fns";

const Reports = () => {
  const [activeButton, setActiveButton] = useState("Overview");
  const [reference, setReference] = useState(
    JSON.parse(localStorage.getItem("reference")) || []
  );
  const [isReportsCardVisible, setIsReportsCardVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsReportsCardVisible(true), 100),
      setTimeout(() => setIsButtonVisible(true), 500),
      setTimeout(() => setIsChartVisible(true), 1000),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the active button when clicked
  };

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

    const monthMap = new Map();

    // Initialize month map
    reference.forEach((record) => {
      const date = new Date(record.dateSent);
      const month = monthNames[date.getMonth()];

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

      //Counting status and total referee for the individual referees
      // record.referees.forEach((referee) => {
      //   if (referee.status === "Completed") {
      //     monthMap.get(month).completed += 1;
      //   } else {
      //     monthMap.get(month).pending += 1;
      //   }
      // });
    });

    // Sort months based on order in the monthNames array
    const months = Array.from(monthMap.keys()).sort(
      (a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)
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
  };
  const {
    months,
    totalPendingReference,
    completedReferenceCounts,
    totalReference,
  } = getMonthlyCounts(reference);

  const referenceState = () => {
    const today = new Date();
    const lastWeek = subWeeks(today, 1);

    return reference.filter((ref) => isAfter(new Date(ref.dateSent), lastWeek))
      .length;
  };

  const cardData = [
    {
      title: "Total References",
      value: totalReference,
      change: `+${referenceState()} from last week`,
      color: "#1877F2",
    },
    {
      title: "Completion Rate",
      value: "89%",
      change: "+5% from last month",
      color: "#F8BD00",
    },
    {
      title: "Avg. Response Time",
      value: "2.3 days",
      change: "-0.5 days from last month",
      color: "#319F43",
    },
    {
      title: "Positive Feedbacks",
      value: "78%",
      change: "+3% from last month",
      color: "#686868",
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
        },
      },
    },
  };

  const candidateData = [
    { candidate: "John Doe", referee: "Alice Johnson", status: "Completed" },
    { candidate: "Jane Smith", referee: "Bob Lee", status: "Completed" },
    { candidate: "Sam Green", referee: "Clara White", status: "Completed" },
    { candidate: "Robert Brown", referee: "David Black", status: "Completed" },
    { candidate: "Emily Davis", referee: "Eva Stone", status: "Completed" },
    { candidate: "Mark Wilson", referee: "Grace Wood", status: "Completed" },
    { candidate: "Nina Clark", referee: "Harry Green", status: "Completed" },
    { candidate: "James Taylor", referee: "Ivy Moon", status: "Completed" },
    { candidate: "Lucy Adams", referee: "Jack Rivers", status: "Completed" },
    { candidate: "Chris Walker", referee: "Laura Pike", status: "Completed" },
  ];

  // /*candidates*/
  // const candidateChartData = {
  //   labels: [
  //     "Leadership",
  //     "Communication",
  //     "Technical Skills",
  //     "Teamwork",
  //     "Problem-solving",
  //   ],
  //   datasets: [
  //     {
  //       label: "Candidate Evaluation",
  //       data: [8, 7, 9, 6, 7], // Example scores
  //       backgroundColor: "#1877F2",
  //     },
  //   ],
  // };

  // const candidateChartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   indexAxis: "y", // This makes the chart horizontal
  //   plugins: {
  //     legend: {
  //       display: false, // Hide the legend
  //     },
  //     tooltip: {
  //       enabled: false, // Disable default tooltip
  //       external: function (context) {
  //         const tooltipEl = document.getElementById("chartjs-tooltip");

  //         // Ensure the tooltip element exists, create if it doesn't
  //         let tooltipElement = tooltipEl;
  //         if (!tooltipElement) {
  //           tooltipElement = document.createElement("div");
  //           tooltipElement.id = "chartjs-tooltip";
  //           tooltipElement.innerHTML = "<table></table>";
  //           document.body.appendChild(tooltipElement);
  //         }

  //         const tooltipModel = context.tooltip;

  //         // Hide tooltip if opacity is 0
  //         if (tooltipModel.opacity === 0) {
  //           tooltipElement.style.opacity = 0;
  //           return;
  //         }

  //         // Position the tooltip
  //         const position = context.chart.canvas.getBoundingClientRect();
  //         tooltipElement.style.opacity = 1;
  //         tooltipElement.style.backgroundColor = "#fff";
  //         tooltipElement.style.padding = "10px";
  //         tooltipElement.style.position = "absolute";
  //         tooltipElement.style.boxShadow =
  //           "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
  //         tooltipElement.style.borderRadius = "10px";
  //         tooltipElement.style.pointerEvents = "none";

  //         // Set tooltip position
  //         tooltipElement.style.left =
  //           position.left + window.scrollX + tooltipModel.caretX + "px";
  //         tooltipElement.style.top =
  //           position.top + window.scrollY + tooltipModel.caretY + "px";

  //         // Get the data point and dataset info
  //         const dataIndex = tooltipModel.dataPoints[0].dataIndex;
  //         const department = context.chart.data.labels[dataIndex]; // Evaluation skill (e.g., "Leadership")
  //         const score = context.chart.data.datasets[0].data[dataIndex]; // Evaluation score

  //         // Custom tooltip content
  //         const innerHtml = `
  //           <table class="tooltip-bar-chart">
  //             <tr>
  //               <td style="font-weight: 500;">${department}: ${score}</td>
  //             </tr>
  //           </table>
  //         `;
  //         tooltipElement.querySelector("table").innerHTML = innerHtml;
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //       ticks: {
  //         font: {
  //           size: 12,
  //         },
  //         color: "#000",
  //       },
  //     },
  //     y: {
  //       grid: {
  //         display: false,
  //       },
  //       ticks: {
  //         font: {
  //           size: 12,
  //         },
  //         color: "#000",
  //       },
  //     },
  //   },
  // };
  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-4">
      <div>
        <h3 className="mb-0">Analytics & Reports</h3>
        <p className="mb-2">
          Gain insights into your reference checking process and hiring
          efficiency.
        </p>
      </div>
      <Row>
        {cardData.map((card, index) => (
          <Col key={index} md={3}>
            <div
              className={`AiReferenceCard-report fade-in ${
                isReportsCardVisible ? "visible" : ""
              }`}
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
                <p className="d-flex align-items-center justify-content-start value">
                  {card.value}
                </p>
                <small>{card.change}</small>
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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tbody>
                  {candidateData.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.candidate}</td>
                      <td>{entry.referee}</td>
                      <td
                        style={{
                          color:
                            entry.status === "Completed"
                              ? "#319F43"
                              : "#F8BD00", // Green for Completed, Yellow for Pending
                        }}
                      >
                        {entry.status}
                      </td>
                      <td>
                        <button variant="link" className="btn-view-details">
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
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
