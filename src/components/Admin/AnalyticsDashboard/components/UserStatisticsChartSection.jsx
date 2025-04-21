import React from 'react';
import { Row, Col } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";

const UserStatisticsChartSection = ({ 
  isLineChartVisible, 
  isBarChartVisible, 
  selectedCompany,
  companies,
  calculateLabelPosition,
  circleChartOptions 
}) => {
  const getCompanyData = () => {
    if (selectedCompany === "All Company") {
      return {
        activeInactive: {
          active: [8, 12, 15, 10, 9, 5, 3],
          inactive: [4, 6, 8, 5, 7, 10, 12]
        },
        monthlyNewUsers: [55, 42, 58, 50, 62, 48, 55],
        userRoles: [40, 60] // Premium, Regular
      };
    }

    const companySpecificData = {
      "HR-HΛTCH": {
        activeInactive: {
          active: [6, 10, 12, 8, 7, 4, 2],
          inactive: [3, 5, 6, 4, 5, 8, 10]
        },
        monthlyNewUsers: [45, 38, 50, 42, 55, 40, 48],
        userRoles: [35, 65]
      },
      "TechCorp": {
        activeInactive: {
          active: [10, 15, 18, 12, 11, 6, 4],
          inactive: [5, 7, 9, 6, 8, 12, 14]
        },
        monthlyNewUsers: [60, 45, 65, 55, 70, 52, 58],
        userRoles: [45, 55]
      },
      "GlobalHR": {
        activeInactive: {
          active: [7, 11, 14, 9, 8, 5, 3],
          inactive: [4, 6, 7, 5, 6, 9, 11]
        },
        monthlyNewUsers: [50, 40, 55, 45, 58, 44, 52],
        userRoles: [38, 62]
      }
    };

    return companySpecificData[selectedCompany] || companySpecificData["HR-HΛTCH"];
  };

  const companyData = getCompanyData();

  const doubleBarData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Users",
        data: companyData.activeInactive.active,
        backgroundColor: "#f46a05",
        borderRadius: 4,
      },
      {
        label: "Inactive Users",
        data: companyData.activeInactive.inactive,
        backgroundColor: "#1706ac",
        borderRadius: 4,
      },
    ],
  };

  const barData = {
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "New Users",
        backgroundColor: "#1706ac",
        borderColor: "transparent",
        borderWidth: 2,
        data: companyData.monthlyNewUsers,
        borderRadius: 10,
      },
    ],
  };

  const doubleBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, beginAtZero: true }
    },
    barPercentage: 0.7,
    categoryPercentage: 0.8,
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: "#000" }
      },
      y: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: "#000" }
      }
    }
  };

  const getUserRolesData = () => {
    const [premium, regular] = companyData.userRoles;
    return {
      labels: ["Premium", "Regular"],
      datasets: [{
        data: [premium, regular],
        backgroundColor: ["#f46a05", "#1706ac"],
        borderWidth: 0,
      }]
    };
  };

  return (
    <Row className='mb-3'>
      <Col md="6">
        <div className={`active-chart-container mb-4 fade-in ${isLineChartVisible ? "visible" : ""}`}>
          <div className="chart-content">
            <b className="chart-title mb-0">Active & Inactive Users</b>
            <p className="chart-subtitle mb-0">Active and inactive users over time</p>
          </div>
          <div className="active-inactive-user-chart">
            <Bar data={doubleBarData} options={doubleBarOptions} />
          </div>
        </div>
        <div className={`monthly-user-chart-container fade-in ${isBarChartVisible ? "visible" : ""}`}>
          <div className="chart-content">
            <b className="chart-title mb-0">Monthly New Users</b>
            <p className="chart-subtitle mb-0">New user registrations</p>
          </div>
          <div className="monthly-users-chart">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </Col>
      <Col md="6">
        <div className={`user-by-role-chart-container fade-in ${isBarChartVisible ? "visible" : ""}`}>
          <div className="chart-content">
            <b className="chart-title mb-0">Users by Role</b>
            <p className="chart-subtitle mb-0">Distribution of users by role type across all companies</p>
          </div>
          <div className="pie-chart-wrapper position-relative" style={{ height: "400px", width: "100%", position: "relative" }}>
            <div className="percentage-labels" style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
              {getUserRolesData().datasets[0].data.map((value, index) => {
                const total = getUserRolesData().datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(0);
                const label = getUserRolesData().labels[index];
                const color = getUserRolesData().datasets[0].backgroundColor[index];
                const position = calculateLabelPosition(Number(percentage), index, total);

                return (
                  <div key={index} className="percentage-label" style={{ color, ...position }}>
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
