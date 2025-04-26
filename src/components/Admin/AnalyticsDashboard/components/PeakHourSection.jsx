import { Line } from "react-chartjs-2";
import React, { useMemo } from "react";
const PeakHourSection = ({ isVisible, peakHourData }) => {
  const peakHoursData = useMemo(() => {
    return {
      labels: peakHourData?.hourlyData?.map((data) => data.hour) || [],
      datasets: [
        {
          label: "Activity Level",
          data: peakHourData?.hourlyData?.map((data) => data.count) || [],
          borderColor: "#f46a05",
          backgroundColor: "rgba(244, 106, 5, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [peakHourData]);

  // Memoize the createCustomTooltip function
  const createCustomTooltip = useMemo(() => {
    return () => ({
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
  }, []);

  // Memoize the chart options
  const options = useMemo(() => {
    return {
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
  }, [createCustomTooltip]);

  return (
    <div
      className={`peak-hours-chart-container fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="chart-content">
        <b className="chart-title mb-0">Peak Hours</b>
        <p className="chart-subtitle mb-0">Busiest times by hour of day</p>
      </div>
      <div className="peak-hours-user-chart">
        <Line data={peakHoursData} options={options} />
      </div>
      <div className="peak-usage-time">
        <p className="mb-0">Peak Usage Time: </p>
        <p className="mb-0 color-blue">{peakHourData?.peakUsageTime}</p>
      </div>
    </div>
  );
};

export default PeakHourSection;
