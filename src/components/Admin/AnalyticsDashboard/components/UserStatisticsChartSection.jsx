import React from 'react';
import { Row, Col } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";

const UserStatisticsChartSection = ({ 
  isLineChartVisible, 
  isBarChartVisible, 
  doubleBarData, 
  doubleBarOptions, 
  barData, 
  barOptions,
  getUserRolesData,
  calculateLabelPosition,
  circleChartOptions 
}) => {
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
