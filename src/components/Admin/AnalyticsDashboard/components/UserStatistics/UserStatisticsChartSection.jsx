import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { getUserStatistic } from "../../../../../api/ai-reference/admin/admin-api";
import { useQuery } from "@tanstack/react-query";

const UserStatisticsChartSection = ({
  isLineChartVisible,
  isBarChartVisible,
}) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      activeInactiveUsers: "Active & Inactive Users",
      activeInactiveDesc: "Active and inactive users over time for all companies",
      monthlyNewUsers: "Monthly New Users",
      monthlyNewUsersDesc: "New user registrations for all companies",
      usersByRole: "Users by Role",
      usersByRoleDesc: "Distribution of users by role type for all companies",
      activeUsers: "Active Users",
      inactiveUsers: "Inactive Users",
      newUsers: "New Users",
    },
    Japanese: {
      activeInactiveUsers: "アクティブ・非アクティブユーザー",
      activeInactiveDesc: "全企業のアクティブ・非アクティブユーザーの推移",
      monthlyNewUsers: "月間新規ユーザー",
      monthlyNewUsersDesc: "全企業の新規ユーザー登録状況",
      usersByRole: "役割別ユーザー",
      usersByRoleDesc: "全企業の役割タイプ別ユーザー分布",
      activeUsers: "アクティブユーザー",
      inactiveUsers: "非アクティブユーザー",
      newUsers: "新規ユーザー",
    },
  };

  const t = translations[language];

  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const chartRef = useRef(null);

  const { data: userStatistics, a } = useQuery({
    queryKey: ["adminDashboardUserStatistics"],
    queryFn: getUserStatistic,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
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
      cumulativePercentage += companyTierData().datasets[0].data[i];
    }

    const currentAngle =
      startAngle + (cumulativePercentage / total) * (2 * Math.PI);
    const segmentAngle = (percentage / total) * (2 * Math.PI);
    const midAngle = currentAngle + segmentAngle / 2;

    // Dynamic label distance calculation
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

  const userWeeklyStatData = {
    labels: userStatistics?.dailyActiveAndInactiveCompanies?.days || [""],
    datasets: [
      {
        label: t.activeUsers,
        data: userStatistics?.dailyActiveAndInactiveCompanies?.active || [0],
        backgroundColor: "#f46a05",
        borderRadius: 4,
      },
      {
        label: t.inactiveUsers,
        data: userStatistics?.dailyActiveAndInactiveCompanies?.inactive || [0],
        backgroundColor: "#1706ac",
        borderRadius: 4,
      },
    ],
  };

  const monthlyNewUserData = {
    labels: userStatistics?.monthlyCreatedCompanies?.month || [""],
    datasets: [
      {
        label: t.newUsers,
        backgroundColor: "#1706ac",
        borderColor: "transparent",
        borderWidth: 2,
        data: userStatistics?.monthlyCreatedCompanies?.count || [0],
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

  const companyTierData = () => {
    const companyTier = {
      labels: userStatistics?.companyTierDistribution?.companyTier || [],
      data: userStatistics?.companyTierDistribution?.percentage || [],
    };
    return {
      labels: companyTier.labels,
      datasets: [
        {
          data: companyTier.data,
          backgroundColor:
            userStatistics?.companyTierDistribution?.colors || [],
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
    <Row className="mb-3 user-stats-container">
      <Col md="6">
        <div
          className={`active-chart-container 1 mb-4 fade-in ${
            isLineChartVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">{t.activeInactiveUsers}</b>
            <p className="chart-subtitle mb-0">{t.activeInactiveDesc}</p>
          </div>
          <div className="active-inactive-user-chart">
            <Bar data={userWeeklyStatData} options={doubleBarOptions} />
          </div>
        </div>
        <div
          className={`monthly-user-chart-container fade-in ${
            isBarChartVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">{t.monthlyNewUsers}</b>
            <p className="chart-subtitle mb-0">{t.monthlyNewUsersDesc}</p>
          </div>
          <div className="monthly-users-chart">
            <Bar data={monthlyNewUserData} options={barOptions} />
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
            <b className="chart-title mb-0">{t.usersByRole}</b>
            <p className="chart-subtitle mb-0">{t.usersByRoleDesc}</p>
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
              {companyTierData().datasets[0].data.map((value, index) => {
                const total = companyTierData().datasets[0].data.reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(0);
                const label = companyTierData().labels[index];
                const color =
                  companyTierData().datasets[0].backgroundColor[index];
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
              <Pie data={companyTierData()} options={circleChartOptions} />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default UserStatisticsChartSection;
