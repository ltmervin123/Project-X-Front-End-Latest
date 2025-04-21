import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const SystemUsageChartSection = ({ isVisible }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getLabels = () => {
    switch (selectedPeriod) {
      case "Daily":
        return ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"];
      case "Weekly":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "Monthly":
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      default:
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    }
  };

  const systemUsageData = {
    labels: getLabels(),
    datasets: [
      {
        label: "System Usage",
        data: [30, 25, 45, 80, 75, 65, 35],
        borderColor: "#f46a05",
        backgroundColor: "rgba(244, 106, 5, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
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
  };
  // Sample data for total reference checks
  const totalReferenceChecksData = [
    { period: "Today", value: 1234 },
    { period: "Yesterday", value: 1100 },
    { period: "Last 7 Days", value: 8500 },
    { period: "Last 30 Days", value: 32000 },
    { period: "Last 90 Days", value: 122000 },

  ];
    // Sample data for average usage per user
    const averageUsageData = [
        { average: "22.1 checks", peakTime: "December" },
        { average: "18.5 checks", peakTime: "January" },
        { average: "20.3 checks", peakTime: "February" },
        { average: "25.0 checks", peakTime: "March" },
      ];

  return (
    <Row>
      <Col md="6">
        <div
          className={`usage-chart-container mb-4 fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <b className="chart-title mb-0">Usage Trends</b>
                <p className="chart-subtitle mb-0">
                  Reference checks processed over time cross all companies
                </p>
              </div>
              <div className="custom-dropdown">
                <div
                  className={`dropdown-header ${
                    isDropdownOpen ? "dropdown-open" : ""
                  }`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedPeriod}</span>
                  {/* <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i> */}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-options">
                    {["Daily", "Weekly", "Monthly"].map((period) => (
                      <div
                        key={period}
                        className={`dropdown-item ${
                          selectedPeriod === period ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedPeriod(period);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {period}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="usage-user-chart">
            <Line data={systemUsageData} options={options} />
          </div>
        </div>
      </Col>
      <Col
        md="6"
        className="d-flex align-items-center justify-content-start flex-column gap-4"
      >
        <div
          className={`total-reference-check-chart-container fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">Total Reference Checks</b>
            <p className="chart-subtitle mb-0">
              Processed in current period across all companies
            </p>
          </div>
          <div className="total-reference-check-data mt-3">
            {totalReferenceChecksData.slice(0, 4).map((data, index) => (
              <div className="d-flex justify-content-between" key={index}>
                <p className="total-reference-check-value mb-1">
                  {data.period}
                </p>
                <p className="total-reference-check-value mb-1">
                  {data.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`total-reference-check-chart-container fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="chart-content">
            <b className="chart-title mb-0">Average Usage per User</b>
            <p className="chart-subtitle mb-0">
              Reference checks per user across all companies
            </p>
          </div>
          <div className="total-reference-check-data mt-4">
            <div className="d-flex justify-content-between">
              <p className="total-reference-check-header mb-1">
                Average Usage
              </p>
              <p className="total-reference-check-header mb-1">Peak Time</p>
            </div>
            {averageUsageData.slice(0, 3).map((data, index) => (
              <div className="d-flex justify-content-between" key={index}>
                <p className="total-reference-check-value mb-1">
                  {data.average}
                </p>
                <p className="total-reference-check-value mb-1">
                  {data.peakTime}
                </p>
              </div>
            ))}
   
            
          </div>

        </div>
      </Col>
    </Row>
  );
};

export default SystemUsageChartSection;
