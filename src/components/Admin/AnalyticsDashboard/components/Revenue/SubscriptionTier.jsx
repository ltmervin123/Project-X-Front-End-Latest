import { Bar } from "react-chartjs-2";
import React, { useMemo } from "react";

const SubscriptionTier = ({ isVisible, subscriptionData }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      title: "Users per Subscription Tier",
      subtitle: "Distribution across subscription plans for all companies",
    },
    Japanese: {
      title: "サブスクリプション層別ユーザー数",
      subtitle: "全企業のサブスクリプションプラン分布",
    },
  };

  const t = translations[language];

  const createCustomTooltip = useMemo(() => {
    return (isRevenue = false) => ({
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
        const label = context.chart.data.labels[dataIndex];
        const value =
          tooltipModel.dataPoints[0]?.parsed?.y ??
          tooltipModel.dataPoints[0]?.raw ??
          0;

        const content = `
              <tr>
                <td style="font-weight: 500; font-size: 13px;">
                  ${label}: ${
          isRevenue
            ? `¥ ${value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1, ")}`
            : value
        }
                </td>
              </tr>
            `;

        tooltipElement.querySelector("table").innerHTML = content;
      },
    });
  }, []);

  const subscriptionTierData = useMemo(
    () => ({
      labels: subscriptionData.map((item) => item.tier),
      datasets: [
        {
          data: subscriptionData.map((item) => item.count),
          backgroundColor: ["#1706ac", "#1706ac", "#1706ac", "#1706ac"],
          borderRadius: 10,
        },
      ],
    }),
    [subscriptionData]
  );

  const baseChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          grid: { display: false },
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              if (this.chart.id === "revenue") {
                return (
                  "¥ " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ")
                );
              }
              return value;
            },
          },
        },
      },
      barPercentage: 0.7,
    }),
    []
  );

  const subscriptionChartOptions = useMemo(
    () => ({
      ...baseChartOptions,
      plugins: {
        ...baseChartOptions.plugins,
        tooltip: createCustomTooltip(false),
      },
    }),
    [baseChartOptions, createCustomTooltip]
  );

  return (
    <div
      className={`subscription-chart-container fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="chart-content">
        <b className="chart-title mb-0">{t.title}</b>
        <p className="chart-subtitle mb-0">{t.subtitle}</p>
      </div>
      <div className="subscription-user-chart">
        <Bar
          data={subscriptionTierData}
          options={subscriptionChartOptions}
          id="subscription"
        />
      </div>
    </div>
  );
};

export default SubscriptionTier;
