import React from "react";
import { Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const SubscriptionChartSection = ({ isVisible }) => {
  const createCustomTooltip = (isRevenue = false) => ({
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
      const value = tooltipModel.dataPoints[0]?.parsed?.y ?? tooltipModel.dataPoints[0]?.raw ?? 0;
      
      const content = `
        <tr>
          <td style="font-weight: 500; font-size: 13px;">
            ${label}: ${isRevenue ? `¥ ${value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1, ')}` : value}
          </td>
        </tr>
      `;

      tooltipElement.querySelector("table").innerHTML = content;
    },
  });

  const getCompanyData = () => {
    return {
      subscriptionTiers: [30, 45, 20, 5],
      revenue: [300, 4500, 8000, 2500],
      conversions: [20, 20, 20],
    };
  };

  const companyData = getCompanyData();

  const subscriptionTierData = {
    labels: ["Free", "Basic", "Premium", "Enterprise"],
    datasets: [
      {
        data: companyData.subscriptionTiers,
        backgroundColor: ["#1706ac", "#1706ac", "#1706ac", "#1706ac"],
        borderRadius: 10,
      },
    ],
  };

  const revenueData = {
    labels: ["Free", "Basic", "Premium", "Enterprise"],
    datasets: [
      {
        data: companyData.revenue,
        backgroundColor: ["#1706ac", "#1706ac", "#1706ac", "#1706ac"],
        borderRadius: 10,
      },
    ],
  };

  const baseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        beginAtZero: true,
        ticks: {
          callback: function(value, index, values) {
            if (this.chart.id === 'revenue') {
              return '¥ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
            }
            return value;
          }
        }
      },
    },
    barPercentage: 0.7,
  };

  const subscriptionChartOptions = {
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      tooltip: createCustomTooltip(false)  // Pass false for subscription chart
    }
  };

  const revenueChartOptions = {
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      tooltip: createCustomTooltip(true)  // Pass true for revenue chart
    }
  };

  const conversionData = [
    {
      title: "Free to Basic Conversion",
      percentage: companyData.conversions[0],
      color: "#f46a05",
    },
    {
      title: "Basic to Premium Conversion",
      percentage: companyData.conversions[1],
      color: "#f46a05",
    },
    {
      title: "Premium to Enterprise Conversion",
      percentage: companyData.conversions[2],
      color: "#f46a05",
    },
  ];

  return (
    <>
      <Row className="mb-3">
        <Col md="6">
          <div
            className={`subscription-chart-container fade-in ${
              isVisible ? "visible" : ""
            }`}
          >
            <div className="chart-content">
              <b className="chart-title mb-0">Users per Subscription Tier</b>
              <p className="chart-subtitle mb-0">
                Distribution across subscription plans for all companies
              </p>
            </div>
            <div className="subscription-user-chart">
              <Bar data={subscriptionTierData} options={subscriptionChartOptions} id="subscription" />
            </div>
          </div>
        </Col>
        <Col md="6">
          <div
            className={`subscription-chart-container fade-in ${
              isVisible ? "visible" : ""
            }`}
          >
            <div className="chart-content">
              <b className="chart-title mb-0">Revenue by Subscription Tier</b>
              <p className="chart-subtitle mb-0">
                Monthly revenue by subscription tier for all companies
              </p>
            </div>
            <div className="subscription-user-chart">
              <Bar data={revenueData} options={revenueChartOptions} id="revenue" />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <div
          className={`subscription-analytics-chart-container d-flex gap-3 fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div>
            <div className="chart-content">
              <b className="chart-title mb-0">Subscription Analytics</b>
              <p className="chart-subtitle mb-0">
                Detailed breakdown of subscription data for all companies
              </p>
            </div>
            <div className="subscription-analytics">
              {conversionData.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="progress-item d-flex align-items-center justify-content-start gap-3 mb-2 mb-3"
                >
                  <span>{item.title}</span>

                  <div
                    className="progress w-100"
                    style={{ backgroundColor: "#f2f3f7" }}
                  >
                    <div
                      className="progress-bar"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <span>{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex ">
              <b className="mb-0">Total Revenue</b>
              <p className=" mb-0">¥ 8,000</p>
            </div>
            <div className="d-flex ">
              <b className="mb-0">Avg. Revenue Per User</b>
              <p className=" mb-0">¥ 16</p>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default SubscriptionChartSection;
