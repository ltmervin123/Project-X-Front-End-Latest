import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2"; // Example if you use Chart.js for the chart

const Reports = () => {
  const [activeButton, setActiveButton] = useState("Overview"); // Default active button

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the active button when clicked
  };
  const cardData = [
    {
      title: "Total References",
      value: 257,
      change: "+2 from last week",
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
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Completed",
        data: [20, 35, 50, 45, 60, 75], // Example data
        backgroundColor: "#1877F2",
      },
      {
        label: "Pending",
        data: [15, 10, 30, 20, 25, 25], // Example data
        backgroundColor: "#F8BD00",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    indexAxis: "x", 
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable the default tooltip
        external: function (context) {
          const tooltipEl = createTooltipElement(); // Ensure tooltip element exists
  
          const tooltipModel = context.tooltip;
  
          // Hide tooltip if opacity is 0
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
  
          // Set tooltip position based on chart's canvas
          tooltipEl.style.left =
            position.left + window.scrollX + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            position.top + window.scrollY + tooltipModel.caretY + "px";
  
          // Get the data index and month
          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          const month = context.chart.data.labels[dataIndex]; // Month from the labels
          const completed = context.chart.data.datasets[0].data[dataIndex]; // Completed value
          const pending = context.chart.data.datasets[1].data[dataIndex]; // Pending value
  
          // Construct the tooltip content
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
          display: false, // Hide grid lines on x-axis
        },
        ticks: {
          font: {
            size: 12, // Adjust font size
          },
          color: "#000", // Label color
        },
      },
      y: {
        grid: {
          display: false, // Hide grid lines on y-axis
        },
        ticks: {
          font: {
            size: 12, // Adjust font size
          },
          color: "#000", // Label color
        },
      },
    },
  };
  
  /*reports*/
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

  /*candidates*/
  const candidateChartData = {
    labels: [
      "Leadership",
      "Communication",
      "Technical Skills",
      "Teamwork",
      "Problem-solving",
    ],
    datasets: [
      {
        label: "Candidate Evaluation",
        data: [8, 7, 9, 6, 7], // Example scores
        backgroundColor: "#1877F2",
      },
    ],
  };

  const candidateChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y", // This makes the chart horizontal
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable default tooltip
        external: function (context) {
          const tooltipEl = document.getElementById("chartjs-tooltip");
  
          // Ensure the tooltip element exists, create if it doesn't
          let tooltipElement = tooltipEl;
          if (!tooltipElement) {
            tooltipElement = document.createElement("div");
            tooltipElement.id = "chartjs-tooltip";
            tooltipElement.innerHTML = "<table></table>";
            document.body.appendChild(tooltipElement);
          }
  
          const tooltipModel = context.tooltip;
  
          // Hide tooltip if opacity is 0
          if (tooltipModel.opacity === 0) {
            tooltipElement.style.opacity = 0;
            return;
          }
  
          // Position the tooltip
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipElement.style.opacity = 1;
          tooltipElement.style.backgroundColor = "#fff";
          tooltipElement.style.padding = "10px";
          tooltipElement.style.position = "absolute";
          tooltipElement.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
          tooltipElement.style.borderRadius = "10px";
          tooltipElement.style.pointerEvents = "none";
  
          // Set tooltip position
          tooltipElement.style.left =
            position.left + window.scrollX + tooltipModel.caretX + "px";
          tooltipElement.style.top =
            position.top + window.scrollY + tooltipModel.caretY + "px";
  
          // Get the data point and dataset info
          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          const department = context.chart.data.labels[dataIndex]; // Evaluation skill (e.g., "Leadership")
          const score = context.chart.data.datasets[0].data[dataIndex]; // Evaluation score
  
          // Custom tooltip content
          const innerHtml = `
            <table class="tooltip-bar-chart">
              <tr>
                <td style="font-weight: 500;">${department}: ${score}</td>
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
          display: false, // Hide grid lines on x-axis
        },
        ticks: {
          font: {
            size: 12, // Adjust font size
          },
          color: "#000", // Label color
        },
      },
      y: {
        grid: {
          display: false, // Hide grid lines on y-axis
        },
        ticks: {
          font: {
            size: 12, // Adjust font size
          },
          color: "#000", // Label color
        },
      },
    },
  };
    return (
    <div className="MockMainDashboard-content d-flex flex-column gap-4">
      <div>
        <h3>Analytics & Reports</h3>
        <p>
          Gain insights into your reference checking process and hiring
          efficiency.
        </p>
      </div>
      <Row>
        {cardData.map((card, index) => (
          <Col key={index} md={3}>
            <div className="AiReferenceCard">
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

      <div className="d-flex justify-content-center gap-5 button-controls-report">
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
        <button
          className={`btn-custom ${
            activeButton === "Candidates" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Candidates")}
        >
          Candidates
        </button>
      </div>

      <div className="AiReference-report-container position-relative">
        {activeButton === "Reports" ? (
          <>
            <div className="AiReference-table-title">
              <h4>Recent Reports</h4>
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
        ) : activeButton === "Candidates" ? (
          <>
            <div className="AiReference-table-title">
              <h4>Candidate Evaluation Summaries</h4>
              <p>Average scores across key competencies.</p>
            </div>
            <Row>
              <Col md={5}>
                <div className="chart-container-report">
                  <Bar
                    data={candidateChartData}
                    options={candidateChartOptions}
                  />
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <div className="AiReference-table-title">
              <h4>Reference Check Analytics</h4>
              <p>Overview of completed and pending reference checks.</p>
            </div>
            <Row>
              <Col md={5}>
                <div className="chart-container-report">
                  <Bar
                    data={chartData}
                    options={barOptions}
                  />
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
