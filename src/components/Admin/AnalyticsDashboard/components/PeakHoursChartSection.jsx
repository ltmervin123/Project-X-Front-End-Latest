import React from 'react';
import { Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const PeakHoursChartSection = ({ isVisible }) => {
  const peakHoursData = {
    labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'],
    datasets: [{
      label: 'Activity Level',
      data: [30, 45, 60, 35, 25, 50, 70, 55, 40],
      borderColor: '#f46a05',
      backgroundColor: 'rgba(244, 106, 5, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        },
        beginAtZero: true
      }
    }
  };

  const topUsers = [
    { name: 'Sarah Johnson', checks: 145, company: 'HR Solutions Inc.' },
    { name: 'Michael Chen', checks: 132, company: 'TalentFirst' },
    { name: 'Emma Williams', checks: 128, company: 'StaffLink Pro' },
    { name: 'David Miller', checks: 115, company: 'RecruitRight' },
    { name: 'Lisa Thompson', checks: 98, company: 'HR Partners' }
  ];

  return (
    <Row className='mb-4'>
      <Col md="6">
        <div className={`usage-chart-container fade-in ${isVisible ? "visible" : ""}`}>
          <div className="chart-content">
            <b className="chart-title mb-0">Peak Hours</b>
            <p className="chart-subtitle mb-0">Busiest times by hour of day for <span className='color-orange'>HR</span>-HΛTCH</p>
          </div>
          <div className="usage-user-chart">
            <Line data={peakHoursData} options={options} />
          </div>
        </div>
      </Col>
      <Col md="6">
        <div className={`usage-chart-container fade-in ${isVisible ? "visible" : ""}`}>
          <div className="chart-content">
            <b className="chart-title mb-0">Top Active Users</b>
            <p className="chart-subtitle mb-0">Ranked by reference checks for <span className='color-orange'>HR</span>-HATCH</p>
          </div>
          <div className="total-reference-check-data mt-3">
            {topUsers.map((user, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <p className="mb-0 fw-bold">{user.name}</p>
                  <p className="mb-0 text-muted small">{user.company}</p>
                </div>
                <div className="text-end">
                  <p className="mb-0">{user.checks}</p>
                  <p className="mb-0 text-muted small">checks</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PeakHoursChartSection;
