import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { getWeeklyActivityAndMonthlyNewUsersStats } from "../../../../api/ai-reference/admin/admin-api";
import { useQuery } from "@tanstack/react-query";

const UserStatisticsChartSection = ({
  isLineChartVisible,
  isBarChartVisible,
  selectedCompany,
  companies,
  calculateLabelPosition,
}) => {
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const chartRef = useRef(null);

  const {
    data: weeklyStat,
    isLoading: isLoadingAnalyticsData,
    isError: isErrorAnalyticsData,
  } = useQuery({
    queryKey: ["adminDashboardWeeklyActivity"],
    queryFn: getWeeklyActivityAndMonthlyNewUsersStats,
    staleTime: 1000 * 60 * 1,
  });

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
      cumulativePercentage += getUserRolesData().datasets[0].data[i];
    }

    const currentAngle =
      startAngle + (cumulativePercentage / total) * (2 * Math.PI);
    const segmentAngle = (percentage / total) * (2 * Math.PI);
    const midAngle = currentAngle + segmentAngle / 2;

    // Dynamic label distance calculation
    const radius = Math.min(chartSize.width, chartSize.height) / 2;
    const labelDistanceRatio = 1.2; // 80% of radius - adjust this value to move labels closer or further
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
      fontSize: `${Math.max(radius * 0.04, 12)}px`, // Dynamic font size with minimum of 12px
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };
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

      const dataIndex = tooltipModel.dataPoints?.[0]?.dataIndex;
      if (dataIndex === undefined) {
        tooltipElement.style.opacity = 0;
        return;
      }

      const label = context.chart.data.labels[dataIndex];
      let content = "";

      if (context.chart.data.datasets.length > 1) {
        // For double bar chart
        const activeUsers = context.chart.data.datasets[0].data[dataIndex];
        const inactiveUsers = context.chart.data.datasets[1].data[dataIndex];
        content = `
          <tr>
            <td style="font-weight: 500; font-size: 13px;">${label}</td>
          </tr>
          <tr>
            <td style="color: #f46a05; font-weight: 400; font-size: 13px;" >Active Users: ${activeUsers}</td>
          </tr>
          <tr>
            <td style="color: #1706ac; font-weight: 400;font-size: 13px;">Inactive Users: ${inactiveUsers}</td>
          </tr>
        `;
      } else {
        // For single bar/line/pie chart
        const value =
          tooltipModel.dataPoints[0]?.parsed?.y ??
          tooltipModel.dataPoints[0]?.parsed;
        content = `
          <tr>
            <td style="font-weight: 500;font-size: 13px;">${label}: ${
          value || 0
        }</td>
          </tr>
        `;
      }

      tooltipElement.querySelector("table").innerHTML = content;
    },
  });

  const getCompanyData = () => {
    if (selectedCompany === "All Company") {
      return {
        activeInactive: {
          active: [8, 12, 15, 10, 9, 5, 3],
          inactive: [4, 6, 8, 5, 7, 10, 12],
        },
        monthlyNewUsers: weeklyStat?.monthlyCreatedCompanies?.count || [0],
        userRoles: [40, 60],
      };
    }

    const companySpecificData = {
      "HR-HΛTCH": {
        activeInactive: {
          active: [6, 10, 12, 8, 7, 4, 2],
          inactive: [3, 5, 6, 4, 5, 8, 10],
        },
        monthlyNewUsers: [45, 38, 50, 42, 55, 40, 48],
        userRoles: [35, 65],
      },
      TechCorp: {
        activeInactive: {
          active: [10, 15, 18, 12, 11, 6, 4],
          inactive: [5, 7, 9, 6, 8, 12, 14],
        },
        monthlyNewUsers: [60, 45, 65, 55, 70, 52, 58],
        userRoles: [45, 55],
      },
      GlobalHR: {
        activeInactive: {
          active: [7, 11, 14, 9, 8, 5, 3],
          inactive: [4, 6, 7, 5, 6, 9, 11],
        },
        monthlyNewUsers: [50, 40, 55, 45, 58, 44, 52],
        userRoles: [38, 62],
      },
    };

    return (
      companySpecificData[selectedCompany] || companySpecificData["HR-HΛTCH"]
    );
  };

  const companyData = getCompanyData();

  const doubleBarData = {
    labels: weeklyStat?.dailyActiveAndInactiveCompanies?.days || [""],
    datasets: [
      {
        label: "Active Users",
        data: weeklyStat?.dailyActiveAndInactiveCompanies?.active || [0],
        backgroundColor: "#f46a05",
        borderRadius: 4,
      },
      {
        label: "Inactive Users",
        data: weeklyStat?.dailyActiveAndInactiveCompanies?.inactive || [0],
        backgroundColor: "#1706ac",
        borderRadius: 4,
      },
    ],
  };

  const barData = {
    labels: weeklyStat?.monthlyCreatedCompanies?.month || [""],
    datasets: [
      {
        label: "New Users",
        backgroundColor: "#1706ac",
        borderColor: "transparent",
        borderWidth: 2,
        data: weeklyStat?.monthlyCreatedCompanies?.count || [0],
        borderRadius: 10,
      },
    ],
  };

  const doubleBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: createCustomTooltip(),
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, beginAtZero: true },
    },
    barPercentage: 0.7,
    categoryPercentage: 0.8,
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
        ticks: { font: { size: 12 }, color: "#000" },
      },
    },
  };

  const getUserRolesData = () => {
    const [premium, regular] = companyData.userRoles;
    return {
      labels: ["Premium", "Regular"],
      datasets: [
        {
          data: [premium, regular],
          backgroundColor: ["#f46a05", "#1706ac"],
          borderWidth: 0,
        },
      ],
    };
  };

  const circleChartOptions = {
    rotation: -90,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...createCustomTooltip(),
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(0);
            return `${context.label}: ${percentage}%`;
          },
        },
      },
    },
    cutout: "65%",
  };

  return (
    <Row className="mb-3">
      <Col md="6">
        <div
          className={`active-chart-container mb-4 fade-in ${
            isLineChartVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">Active & Inactive Users</b>
            <p className="chart-subtitle mb-0">
              Active and inactive users over time for{" "}
              {selectedCompany === "All Company" ? (
                "all companies"
              ) : (
                <span className="color-orange">{selectedCompany}</span>
              )}
            </p>
          </div>
          <div className="active-inactive-user-chart">
            <Bar data={doubleBarData} options={doubleBarOptions} />
          </div>
        </div>
        <div
          className={`monthly-user-chart-container fade-in ${
            isBarChartVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">Monthly New Users</b>
            <p className="chart-subtitle mb-0">
              New user registrations for{" "}
              {selectedCompany === "All Company" ? (
                "all companies"
              ) : (
                <span className="color-orange">{selectedCompany}</span>
              )}
            </p>
          </div>
          <div className="monthly-users-chart">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </Col>
      <Col md="6">
        <div
          className={`user-by-role-chart-container fade-in ${
            isBarChartVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">Users by Role</b>
            <p className="chart-subtitle mb-0">
              Distribution of users by role type for{" "}
              {selectedCompany === "All Company" ? (
                "all companies"
              ) : (
                <span className="color-orange">{selectedCompany}</span>
              )}
            </p>
          </div>
          <div
            className="pie-chart-wrapper position-relative"
            style={{ height: "400px", width: "100%", position: "relative" }}
            ref={chartRef}
          >
            <div
              className="percentage-labels"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
              }}
            >
              {getUserRolesData().datasets[0].data.map((value, index) => {
                const total = getUserRolesData().datasets[0].data.reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(0);
                const label = getUserRolesData().labels[index];
                const color =
                  getUserRolesData().datasets[0].backgroundColor[index];
                const position = calculateAutoLabelPosition(
                  Number(percentage),
                  index,
                  total
                );

                return (
                  <div
                    key={index}
                    className="percentage-label"
                    style={{ color, ...position }}
                  >
                    <h3 className="mb-0">{percentage}%</h3>
                    <p className="mb-0">{label}</p>
                  </div>
                );
              })}
              <Pie data={getUserRolesData()} options={circleChartOptions} />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default UserStatisticsChartSection;
