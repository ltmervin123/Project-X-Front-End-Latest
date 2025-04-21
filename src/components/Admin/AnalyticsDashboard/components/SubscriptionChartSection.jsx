import React from "react";
import { Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const SubscriptionChartSection = ({ isVisible }) => {
  const subscriptionTierData = {
    labels: ["Free", "Basic", "Premium", "Enterprise"],
    datasets: [
      {
        data: [30, 45, 20, 5],
        backgroundColor: ["#1706ac", "#1706ac", "#1706ac", "#1706ac"],
        borderRadius: 10,
      },
    ],
  };

  const revenueData = {
    labels: ["Free", "Basic", "Premium", "Enterprise"],
    datasets: [
      {
        data: [300, 4500, 8000, 2500],
        backgroundColor: ["#1706ac", "#1706ac", "#1706ac", "#1706ac"],
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
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
    barPercentage: 0.7,
  };

  const conversionData = [
    {
      title: "Free to Basic Conversion",
      percentage: 20,
      color: "#f46a05",
    },
    {
      title: "Basic to Premium Conversion",
      percentage: 20,
      color: "#f46a05",
    },
    {
      title: "Premium to Enterprise Conversion",
      percentage: 20,
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
                Distribution across subscription plans of all companies
              </p>
            </div>
            <div className="subscription-user-chart">
              <Bar data={subscriptionTierData} options={chartOptions} />
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
                Monthly revenue by subscription tier
              </p>
            </div>
            <div className="subscription-user-chart">
              <Bar data={revenueData} options={chartOptions} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <div
          className={`subscription-analytics-chart-container fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">Subscription Analytics</b>
            <p className="chart-subtitle mb-0">
              Detailed breakdown of subscription data
            </p>
          </div>
          <div className="subscription-analytics">
            {conversionData.slice(0,3).map((item, index) => (
              <div key={index} className="progress-item d-flex gap-3 mb-2 mb-3">
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
      </Row>
    </>
  );
};

export default SubscriptionChartSection;
