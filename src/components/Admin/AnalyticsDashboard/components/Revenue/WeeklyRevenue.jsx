import { Bar } from "react-chartjs-2";
import { useState, useMemo } from "react";

const TRANSLATIONS = {
  English: {
    weeklyRevenue: "Weekly Revenue",
    weeklyRevenueDesc: "Revenue breakdown by day of the week",
    totalRevenue: {
      weekly: "Total Weekly Revenue",
      monthly: "Total Monthly Revenue",
      yearly: "Total Yearly Revenue",
    },
    days: {
      Mon: "Mon",
      Tue: "Tue",
      Wed: "Wed",
      Thu: "Thu",
      Fri: "Fri",
      Sat: "Sat",
      Sun: "Sun",
    },
    periods: {
      weekly: "Weekly",
      monthly: "Monthly",
      yearly: "Yearly",
    },
    weeks: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    years: ["2020", "2021", "2022", "2023"],
  },
  Japanese: {
    weeklyRevenue: "週間収益",
    weeklyRevenueDesc: "曜日別の収益内訳",
    totalRevenue: {
      weekly: "週間総収益",
      monthly: "月間総収益",
      yearly: "年間総収益",
    },
    days: {
      Mon: "月",
      Tue: "火",
      Wed: "水",
      Thu: "木",
      Fri: "金",
      Sat: "土",
      Sun: "日",
    },
    periods: {
      weekly: "週次",
      monthly: "月次",
      yearly: "年次",
    },
    weeks: ["月", "火", "水", "木", "金", "土", "日"],
    months: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    years: ["2020年", "2021年", "2022年", "2023年"],
  },
};

const RevenueTrendSection = () => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(() => {
    const translations = {
      English: { periods: { weekly: "Weekly" } },
      Japanese: { periods: { weekly: "週次" } },
    };
    return translations[language]?.periods?.weekly || "Weekly";
  });

  const t = TRANSLATIONS[language];
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

  const getLabels = useMemo(() => {
    switch (selectedPeriod) {
      case t.periods.weekly:
        return t.weeks;
      case t.periods.monthly:
        return t.months;
      case t.periods.yearly:
        return t.years;
      default:
        return [];
    }
  }, [selectedPeriod, t]);

  const getData = useMemo(() => {
    switch (selectedPeriod) {
      case t.periods.weekly:
        return [0, 0, 0, 0];
      case t.periods.monthly:
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      case t.periods.yearly:
        return [0, 0, 0, 0];
      default:
        return [];
    }
  }, [selectedPeriod, t]);

  const weeklyData = {
    labels: getLabels,
    datasets: [
      {
        label: t.weeklyRevenue,
        data: getData,
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
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <b className="chart-title mb-0">{t.weeklyRevenue}</b>
            <p className="chart-subtitle mb-0">{t.weeklyRevenueDesc}</p>
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
                {[t.periods.weekly, t.periods.monthly, t.periods.yearly].map(
                  (period) => (
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
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="revenue-bar-chart">
        <Bar data={weeklyData} options={barOptions} />
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2 revenue-bottom-chart-content">
        <p className="m-0">{t.totalRevenue[selectedPeriod.toLowerCase()]}</p>
        <p className="m-0">¥0</p>
      </div>
    </div>
  );
};

export default RevenueTrendSection;
