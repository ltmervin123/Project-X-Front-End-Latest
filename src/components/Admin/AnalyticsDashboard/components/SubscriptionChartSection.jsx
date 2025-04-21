import React from "react";
import { Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const SubscriptionChartSection = ({ isVisible, selectedCompany, companies }) => {
  const getCompanyData = () => {
    if (selectedCompany === "All Company") {
      return {
        subscriptionTiers: [30, 45, 20, 5],
        revenue: [300, 4500, 8000, 2500],
        conversions: [20, 20, 20],
      };
    }

    const companySpecificData = {
      "HR-HΛTCH": {
        subscriptionTiers: [35, 40, 15, 10],
        revenue: [350, 4000, 6000, 3000],
        conversions: [25, 15, 18],
      },
      TechCorp: {
        subscriptionTiers: [25, 50, 20, 5],
        revenue: [250, 5000, 8000, 2000],
        conversions: [22, 18, 15],
      },
      GlobalHR: {
        subscriptionTiers: [30, 45, 25, 0],
        revenue: [300, 4500, 10000, 0],
        conversions: [18, 25, 22],
      },
    };

    return companySpecificData[selectedCompany] || companySpecificData["HR-HΛTCH"];
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
          className={`subscription-analytics-chart-container d-flex gap-3 fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div>
            <div className="chart-content">
              <b className="chart-title mb-0">Subscription Analytics</b>
              <p className="chart-subtitle mb-0">
                Detailed breakdown of subscription data
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
