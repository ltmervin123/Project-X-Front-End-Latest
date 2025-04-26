import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";

const UsageTrendSection = ({ isVisible, usageTrendsData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");

  const getLabels = useMemo(() => {
    switch (selectedPeriod) {
      case "Daily":
        return usageTrendsData?.daily?.data.map((item) => item.label) || [];
      case "Weekly":
        return usageTrendsData?.weekly?.data.map((item) => item.label) || [];
      case "Monthly":
        return usageTrendsData?.monthly?.data.map((item) => item.label) || [];
      default:
        return [];
    }
  }, [selectedPeriod, usageTrendsData]);

  const getCompanyData = useMemo(() => {
    switch (selectedPeriod) {
      case "Daily":
        return usageTrendsData?.daily?.data.map((item) => item.value) || [];
      case "Weekly":
        return usageTrendsData?.weekly?.data.map((item) => item.value) || [];
      case "Monthly":
        return usageTrendsData?.monthly?.data.map((item) => item.value) || [];
      default:
        return [];
    }
  }, [selectedPeriod, usageTrendsData]);

  const systemUsageData = {
    labels: getLabels,
    datasets: [
      {
        label: "System Usage",
        data: getCompanyData,
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
  return (
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
              Reference checks processed over time for all companies
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
  );
};

export default UsageTrendSection;
