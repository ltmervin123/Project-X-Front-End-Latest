import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const SystemUsageChartSection = ({ isVisible, selectedCompany, companies }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getLabels = () => {
    switch (selectedPeriod) {
      case "Daily":
        return ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"];
      case "Weekly":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "Monthly":
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      default:
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    }
  };

  const getCompanyData = () => {
    if (selectedCompany === "All Company") {
      return {
        usageData: [30, 25, 45, 80, 75, 65, 35],
        referenceChecks: [1234, 1100, 8500, 32000, 122000],
        averageUsage: [
          { average: "22.1 checks", peakTime: "December" },
          { average: "18.5 checks", peakTime: "January" },
          { average: "20.3 checks", peakTime: "February" },
          { average: "25.0 checks", peakTime: "March" }
        ]
      };
    }

    const companySpecificData = {
      "HR-HΛTCH": {
        usageData: [25, 30, 40, 70, 65, 55, 30],
        referenceChecks: [1000, 900, 7000, 28000, 100000],
        averageUsage: [
          { average: "20.1 checks", peakTime: "December" },
          { average: "17.5 checks", peakTime: "January" },
          { average: "19.3 checks", peakTime: "February" }
        ]
      },
      // Add similar data for other companies...
    };

    return companySpecificData[selectedCompany] || companySpecificData["HR-HΛTCH"];
  };

  const companyData = getCompanyData();

  const systemUsageData = {
    labels: getLabels(),
    datasets: [
      {
        label: "System Usage",
        data: companyData.usageData,
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
      const usage = tooltipModel.dataPoints[0].parsed.y;

      const content = `
        <tr>
          <td style="font-weight: 500;font-size: 13px;">${time}</td>
        </tr>
        <tr>
          <td style="color: #f46a05; font-weight: 400; font-size: 13px;">Usage: ${usage}</td>
        </tr>
      `;

      tooltipElement.querySelector("table").innerHTML = content;
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: createCustomTooltip()
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

  const totalReferenceChecksData = companyData.referenceChecks.map((value, index) => ({
    period: ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Last 90 Days"][index],
    value
  }));

  const averageUsageData = companyData.averageUsage;

  return (
    <Row>
      <Col md="6">
        <div
          className={`usage-chart-container mb-4 fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <b className="chart-title mb-0">Usage Trends</b>
                <p className="chart-subtitle mb-0">
                  Reference checks processed over time for {selectedCompany === "All Company" ? "all companies" : <span className="color-orange">{selectedCompany}</span>}
                </p>
              </div>
              <div className="custom-dropdown">
                <div
                  className={`dropdown-header ${
                    isDropdownOpen ? "dropdown-open" : ""
                  }`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedPeriod}</span>
                  {/* <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i> */}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-options">
                    {["Daily", "Weekly", "Monthly"].map((period) => (
                      <div
                        key={period}
                        className={`dropdown-item ${
                          selectedPeriod === period ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedPeriod(period);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {period}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="usage-user-chart">
            <Line data={systemUsageData} options={options} />
          </div>
        </div>
      </Col>
      <Col
        md="6"
        className="d-flex align-items-center justify-content-start flex-column gap-4"
      >
        <div
          className={`total-reference-check-chart-container fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content d-flex justify-content-between align-items-center">
            <div>
            <b className="chart-title mb-0">Total Reference Checks</b>
            <p className="chart-subtitle mb-0">
              Processed in current period for {selectedCompany === "All Company" ? "all companies" : <span className="color-orange">{selectedCompany}</span>}
            </p>
            </div>
            <div className="total-reference-check-count">
            23,600
            </div>
          </div>
          <div className="total-reference-check-data mt-3">
            {totalReferenceChecksData.slice(0, 4).map((data, index) => (
              <div className="d-flex justify-content-between" key={index}>
                <p className="total-reference-check-value mb-1">
                  {data.period}
                </p>
                <p className="total-reference-check-value mb-1">
                  {data.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`total-reference-check-chart-container fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">Average Usage per User</b>
            <p className="chart-subtitle mb-0">
              Reference checks per user for {selectedCompany === "All Company" ? "all companies" : <span className="color-orange">{selectedCompany}</span>}
            </p>
          </div>
          <div className="total-reference-check-data mt-4">
            <div className="d-flex justify-content-between">
              <p className="total-reference-check-header mb-1">
                Average Usage
              </p>
              <p className="total-reference-check-header mb-1">Peak Time</p>
            </div>
            {averageUsageData.slice(0, 3).map((data, index) => (
              <div className="d-flex justify-content-between" key={index}>
                <p className="total-reference-check-value mb-1">
                  {data.average}
                </p>
                <p className="total-reference-check-value mb-1">
                  {data.peakTime}
                </p>
              </div>
            ))}
   
            
          </div>

        </div>
      </Col>
    </Row>
  );
};

export default SystemUsageChartSection;
