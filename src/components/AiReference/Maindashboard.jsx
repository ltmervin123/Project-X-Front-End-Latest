import React, { useState } from "react"; // Import useState
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { Line, Bar } from "react-chartjs-2"; // Import Line and Bar chart components
import { Chart, registerables } from "chart.js"; // Import Chart.js and registerables
import default_avatar_img from "../../assets/default.png"; // Import default avatar image

// Register all necessary components
Chart.register(...registerables);

const LogContainer = ({ logData }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedLogs = showAll ? logData : logData.slice(0, 4);

  return (
    <div className="LogContainer my-4">
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-3">Recent Activities</p>
        <a href="#" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All"}
        </a>
      </div>
      <div className="list-log-container">
        {displayedLogs.map((log) => (
          <div
            key={log.id}
            className="log-item d-flex align-items-center mb-3 gap-3"
          >
            {/* Circle with first letter of name */}
            <div className="avatar-letter d-flex align-items-center justify-content-center">
              {log.name.charAt(0)}
            </div>
            <div>
              <strong>{log.name}</strong> completed a reference check for{" "}
              <strong>{log.referenceFor}</strong>
              <div className="text-muted">{log.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MainDashboard = () => {
  const cardData = [
    { title: "Active Jobs", count: "257", color: "#1877F2" },
    { title: "Pending References", count: "12", color: "#F8BD00" },
    { title: "Completed References", count: "159", color: "#319F43" },
    { title: "Total Candidates", count: "159", color: "#686868" },
  ];
  // Data for the line chart
  const lineData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
    ],
    datasets: [
      {
        label: "Total",
        data: [300, 320, 350, 380, 410, 440, 470, 500],
        fill: false,
        backgroundColor: "#1877F2",
        borderColor: "#1877F2",
        tension: 0.1,
      },
      {
        label: "Completed",
        data: [120, 140, 160, 180, 200, 220, 240, 260],
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
              <td style="color: #1877F2; font-weight: 200;">Total: ${
                lineData.datasets[0].data[tooltipModel.dataPoints[0].dataIndex]
              }</td>
            </tr>
            <tr>
              <td style="color: #319F43;font-weight: 200;">Complete: ${
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
      },
    },
  },
};


  const barData = {
    labels: ["Engineering", "Sales", "Marketing", "HR", "Finance", "Operation"], // Departments as labels
    datasets: [
      {
        label: "Department References",
        backgroundColor: "#1877F2",
        borderColor: "transparent",
        borderWidth: 2,
        data: [30, 25, 15, 10, 20, 40],
      },
    ],
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: false, // Disable the default tooltip
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

          // If tooltip is not visible, hide it
          if (tooltipModel.opacity === 0) {
            tooltipElement.style.opacity = 0;
            return;
          }

          // Positioning the tooltip
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipElement.style.opacity = 1;
          tooltipElement.style.backgroundColor = "#fff";
          tooltipElement.style.padding = "10px";
          tooltipElement.style.position = "absolute";
          tooltipElement.style.boxShadow =
            "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
          tooltipElement.style.borderRadius = "10px";
          tooltipElement.style.pointerEvents = "none";

          // Calculate the tooltip position
          tooltipElement.style.left =
            position.left + window.scrollX + tooltipModel.caretX + "px";
          tooltipElement.style.top =
            position.top + window.scrollY + tooltipModel.caretY + "px";

          // Populate the custom tooltip content
          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          const department = context.chart.data.labels[dataIndex]; // Access the department from labels
          const value = context.chart.data.datasets[0].data[dataIndex]; // Access the data value

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
          display: false, // Disable grid on the x-axis
        },
        ticks: {
          font: {
            size: 12, // Adjust the font size of the x-axis labels if needed
          },
          color: "#000", // Change the label color if necessary
        },
      },
      y: {
        grid: {
          display: false, // Disable grid on the y-axis
        },
        ticks: {
          font: {
            size: 12, // Adjust the font size of the x-axis labels if needed
          },
          color: "#000", // Change the label color if necessary
        },
      },
    },
  };

  const logData = [
    {
      id: 1,
      name: "John Doe",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 2,
      name: "Kirk Delagente",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 3,
      name: "John Doe",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 4,
      name: "Kirk Delagente",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 5,
      name: "John Doe",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 6,
      name: "Kirk Delagente",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
  ];

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-3">Dashboard</h3>
        <p>Manage and track your reference check processes.</p>
      </div>
      <div>
        <Row className="mb-3">
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
                  <p className="d-flex align-items-center justify-content-center count">
                    {card.count}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Row>
        <Col md="6">
          <div className="line-bar-chart-container position-relative">
            <p className="mb-3 line-title-overlay">Reference Check Overview</p>
            <div className="line-chart">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="line-bar-chart-container position-relative">
            <p className="mb-3 bar-title-overlay">By Department</p>
            <div className="bar-chart">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </Col>
      </Row>
      <LogContainer logData={logData} />
    </div>
  );
};

export default MainDashboard;
