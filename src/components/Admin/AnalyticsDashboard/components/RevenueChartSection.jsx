import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";

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
    const value = tooltipModel.dataPoints[0]?.parsed?.y ?? tooltipModel.dataPoints[0]?.parsed;
    const content = `
      <tr>
        <td style="font-weight: 500;font-size: 13px;">${label}: ¥${value?.toLocaleString() || 0}</td>
      </tr>
    `;

    tooltipElement.querySelector("table").innerHTML = content;
  },
});

const RevenueTrendSection = ({ isVisible }) => {
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] || [""],
    datasets: [
      {
        label: "Weekly Revenue",
        data: [15000, 21000, 18000, 24000, 23000, 12000, 10927] || [0],
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
        <p className="chart-subtitle mb-0">Revenue breakdown by day of the week</p>
      </div>
      <div className="revenue-bar-chart">
        <Bar data={weeklyData} options={barOptions} />
      </div>
      <div className="d-flex justify-content-between">
        <p>Total Weekly Revenue</p>
        <p className="text-primary">¥123,927</p>
      </div>
    </div>
  );
};

const SubscriptionTierSection = ({ isVisible }) => {
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const chartRef = useRef(null);

  const subscriptionBreakdownData = [
    { type: 'Basic', revenue: 45000, pricing: 10000, users: 1200, reference: 100 },
    { type: 'Premium', revenue: 55327, pricing: 15000, users: 30000, reference: 400 },
    { type: 'Enterprise', revenue: 23600, pricing: 20000, users: 4506, reference: 500 },
  ];

  useEffect(() => {
    const updateChartSize = () => {
      if (chartRef.current) {
        const { width, height } = chartRef.current.getBoundingClientRect();
        setChartSize({ width, height });
      }
    };

    updateChartSize();
    window.addEventListener("resize", updateChartSize);
    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

  const calculateAutoLabelPosition = (percentage, index, total) => {
    const startAngle = -Math.PI / 1;
    let cumulativePercentage = 0;
    for (let i = 0; i < index; i++) {
      cumulativePercentage += subscriptionData.datasets[0].data[i];
    }
    const currentAngle =
      startAngle + (cumulativePercentage / total) * (2 * Math.PI);
    const segmentAngle = (percentage / total) * (2 * Math.PI);
    const midAngle = currentAngle + segmentAngle / 2;

    const radius = Math.min(chartSize.width, chartSize.height) / 2;
    const labelDistanceRatio = 1.2;
    const labelDistance = radius * labelDistanceRatio;

    const x = Math.cos(midAngle) * labelDistance;
    const y = Math.sin(midAngle) * labelDistance;

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: "translate(-50%, -50%)",
      position: "absolute",
      textAlign: "center",
      width: "120px",
      fontSize: `${Math.max(radius * 0.04, 12)}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };
  };

  const subscriptionData = {
    labels: subscriptionBreakdownData.map(item => item.type),
    datasets: [{
      label: "Subscription Revenue",
      data: subscriptionBreakdownData.map(item => item.revenue),
      backgroundColor: ["#1706ac", "#f46a05", "#FFCE56"],
      borderColor: "transparent",
      borderWidth: 0,
    }],
  };

  const doughnutOptions = {
    rotation: -90,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: createCustomTooltip(),
    },
    cutout: "65%",
  };

  return (
    <div className="revenue-subcription-content-container">
      <div className="chart-content">
        <b className="chart-title mb-0">Revenue by Subscription Tier</b>
        <p className="chart-subtitle mb-0">Revenue breakdown by subscription tier</p>
      </div>
      <div className="d-flex subsrcription-circle-chart mt-3">
        <div className="w-50 mt-2" ref={chartRef} style={{ position: 'relative' }}>
          <div className="percentage-labels" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
            {subscriptionBreakdownData.map((item, index) => {
              const total = subscriptionBreakdownData.reduce((acc, curr) => acc + curr.revenue, 0);
              const percentage = ((item.revenue / total) * 100).toFixed(0);
              const position = calculateAutoLabelPosition(Number(percentage), index, total);

              return (
                <div key={index} className="percentage-label" style={{ color: subscriptionData.datasets[0].backgroundColor[index], ...position }}>
                  <p className="mb-0">{`${item.type}: ¥${item.revenue.toLocaleString()}`}</p>
                  <small className="mb-0">{`(${percentage}%)`}</small>
                </div>
              );
            })}
          </div>
          <Doughnut data={subscriptionData} options={doughnutOptions} />
        </div>
        <div className="w-50 d-flex align-items-center justify-content-center flex-column">
          <div className="subscription-breakdown w-100 d-flex align-items-center justify-content-center flex-column gap-2">
            {subscriptionBreakdownData.map((item, index) => (
              <div key={index} className="d-flex justify-content-between w-100">
                <span>{item.type}</span>
                <span>¥{item.revenue.toLocaleString()}</span>
              </div>
            ))}
            <div className="d-flex justify-content-between w-100">
              <strong>Total Revenue</strong>
              <strong>¥{subscriptionBreakdownData.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubscriptionAgreementSection = ({ isVisible }) => {
  const subscriptionBreakdownData = [
    { type: 'Basic', revenue: 45000, pricing: 10000, users: 1200, reference: 100 },
    { type: 'Premium', revenue: 55327, pricing: 15000, users: 30000, reference: 400 },
    { type: 'Enterprise', revenue: 23600, pricing: 20000, users: 4506, reference: 500 },
  ];

  return (
    <div className="revenue-subcription-content-container">
      <div className="chart-content">
        <b className="chart-title mb-0">Subscription Agreement Revenue</b>
        <p className="chart-subtitle mb-0">
          Revenue breakdown by subscription based agreement
        </p>
      </div>
      <div className="d-flex subsrcription-circle-chart mt-3">
        <table className="w-100 mt-3">
          <thead>
            <tr>
              <th>Subscription</th>
              <th>Pricing</th>
              <th>No. of users</th>
              <th>Total Reference</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionBreakdownData.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>¥{item.pricing.toLocaleString()}</td>
                <td>{item.users.toLocaleString()}</td>
                <td>{item.reference}</td>
                <td>¥{item.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RevenueChartSection = ({ isVisible }) => {
  return (
    <Row>
      <Col md="6">
        <RevenueTrendSection isVisible={isVisible} />
      </Col>
      <Col
        md="6"
        className="d-flex align-items-center justify-content-start flex-column gap-4"
      >
        <SubscriptionTierSection isVisible={isVisible} />
        <SubscriptionAgreementSection isVisible={isVisible} />
      </Col>
    </Row>
  );
};

export default RevenueChartSection;
