import { color } from "highcharts";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const PeakHoursChartSection = ({ isVisible, selectedCompany }) => {
  const peakHoursData = {
    labels: ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"],
    datasets: [
      {
        label: "Activity Level",
        data: [30, 45, 60, 35, 25, 50, 70, 55, 40],
        borderColor: "#f46a05",
        backgroundColor: "rgba(244, 106, 5, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const createCustomTooltip = () => ({
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

      tooltipElement.style.opacity = 1;
      tooltipElement.style.backgroundColor = "#fff";
      tooltipElement.style.padding = "10px";
      tooltipElement.style.position = "absolute";
      tooltipElement.style.zIndex = 1000;
      tooltipElement.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
      tooltipElement.style.borderRadius = "10px";
      tooltipElement.style.pointerEvents = "none";

      const position = context.chart.canvas.getBoundingClientRect();
      const tooltipWidth = tooltipElement.offsetWidth;
      let tooltipX = position.left + window.scrollX + tooltipModel.caretX;
      let tooltipY = position.top + window.scrollY + tooltipModel.caretY;

      if (tooltipX + tooltipWidth > position.left + position.width) {
        tooltipX -= tooltipWidth;
      }

      tooltipElement.style.left = tooltipX + "px";
      tooltipElement.style.top = tooltipY + "px";

      const dataIndex = tooltipModel.dataPoints[0].dataIndex;
      const time = context.chart.data.labels[dataIndex];
      const activity = tooltipModel.dataPoints[0].parsed.y;

      const content = `
        <tr>
          <td style="font-weight: 500; font-size: 13px;">${time}</td>
        </tr>
        <tr>
          <td style="color: #f46a05; font-weight: 400;font-size: 13px;">Activity Level: ${activity}</td>
        </tr>
      `;

      tooltipElement.querySelector("table").innerHTML = content;
    },
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: createCustomTooltip(),
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  const topUsers = [
    {
      name: "John Doe",
      email: "john@example.com",
      plan: "Basic",
      checks: 250,
      avatar: "JD",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      plan: "Basic",
      checks: 250,
      avatar: "JD",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      plan: "Regular",
      checks: 250,
      avatar: "JD",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      plan: "Premium",
      checks: 250,
      avatar: "JD",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      plan: "Basic",
      checks: 250,
      avatar: "JD",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      plan: "Enterprise",
      checks: 250,
      avatar: "JD",
    },
  ];

  const getPlanStyle = (plan) => {
    switch (plan) {
      case "Basic":
        return {
          backgroundColor: "rgba(248, 189, 0, 0.3)",
          borderColor: "#F8BD00",
          color: "#F8BD00",
        };
      case "Regular":
        return {
          backgroundColor: "rgba(244, 106, 5, 0.3)",
          borderColor: "#F46A05",
          color: "#F46A05",
        };
      case "Premium":
        return {
          backgroundColor: "rgba(49, 159, 67, 0.3)",
          borderColor: "#319F43",
          color: "#319F43",
        };
      case "Enterprise":
        return {
          backgroundColor: "rgba(24, 119, 242, 0.3)",
          borderColor: "#1877F2",
          color: "#1877F2",
        };
      default:
        return {};
    }
  };

  return (
    <Row className="mb-4">
      <Col md="6">
        <div
          className={`peak-hours-chart-container fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">Peak Hours</b>
            <p className="chart-subtitle mb-0">
              Busiest times by hour of day for{" "}
              {selectedCompany === "All Company" ? (
                "all companies"
              ) : (
                <span className="color-orange">{selectedCompany}</span>
              )}
            </p>
          </div>
          <div className="peak-hours-user-chart">
            <Line data={peakHoursData} options={options} />
          </div>
          <div className="peak-usage-time">
            <p className="mb-0">Peak Usage Time: </p>
            <p className="mb-0 color-blue">2pm - 3pm</p>
          </div>
        </div>
      </Col>
      <Col md="6">
        <div
          className={`peak-hours-chart-container fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">Top Active Users</b>
            <p className="chart-subtitle mb-0">
              Most active users on the platform for{" "}
              {selectedCompany === "All Company" ? (
                "all companies"
              ) : (
                <span className="color-orange">{selectedCompany}</span>
              )}
            </p>
          </div>
          <div className="total-reference-check-data mt-3">
            {topUsers.map((user, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <span className="user-number me-2">{index + 1}.</span>
                <div className="user-avatar me-2">{user.avatar}</div>
                <div className="user-info d-flex align-items-center justify-content-between w-100">
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 fw-bold d-flex align-items-end gap-2">
                        {user.name}
                        <span
                          className="mb-0 small"
                          style={getPlanStyle(user.plan)}
                        >
                          {user.plan}
                        </span>
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 text-muted small">{user.email}</p>
                    </div>
                  </div>

                  <div>
                    <p className="user-checks mb-0">{user.checks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PeakHoursChartSection;
