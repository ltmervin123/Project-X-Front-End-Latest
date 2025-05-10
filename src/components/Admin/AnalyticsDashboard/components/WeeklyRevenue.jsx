import { Bar } from "react-chartjs-2";

const RevenueTrendSection = ({ isVisible }) => {
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

      const dataIndex = tooltipModel.dataPoints?.[0]?.dataIndex;
      if (dataIndex === undefined) {
        tooltipElement.style.opacity = 0;
        return;
      }

      const label = context.chart.data.labels[dataIndex];
      const value =
        tooltipModel.dataPoints[0]?.parsed?.y ??
        tooltipModel.dataPoints[0]?.parsed;
      const content = `
            <tr>
              <td style="font-weight: 500;font-size: 13px;">${label}: ¥${
        value?.toLocaleString() || 0
      }</td>
            </tr>
          `;

      tooltipElement.querySelector("table").innerHTML = content;
    },
  });

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] || [""],
    datasets: [
      {
        label: "Weekly Revenue",
        data: [0, 0, 0, 0, 0, 0, 0] || [0],
        backgroundColor: "#1706ac",
        borderColor: "transparent",
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: createCustomTooltip(),
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: "#000" },
      },
      y: {
        grid: { display: false },
        ticks: {
          font: { size: 12 },
          color: "#000",
          callback: (value) => `${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="revenue-chart-container">
      <div className="chart-content">
        <b className="chart-title mb-0">Weekly Revenue</b>
        <p className="chart-subtitle mb-0">
          Revenue breakdown by day of the week
        </p>
      </div>
      <div className="revenue-bar-chart">
        <Bar data={weeklyData} options={barOptions} />
      </div>
      <div className="d-flex justify-content-between">
        <p>Total Weekly Revenue</p>
        <p className="text-primary">¥0</p>
      </div>
    </div>
  );
};

export default RevenueTrendSection;
