import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2"; // Example if you use Chart.js for the chart

const Reports = () => {
  const [activeButton, setActiveButton] = useState("Overview"); // Default active button

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the active button when clicked
  };

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Completed",
        data: [20, 35, 50, 45, 60, 75], // Example data
        backgroundColor: "#1877F2",
      },
      {
        label: "Pending",
        data: [15, 10, 30, 20, 25, 25], // Example data
        backgroundColor: "#F8BD00",
      },
    ],
  };

  const candidateChartData = {
    labels: ["Leadership", "Communication", "Technical Skills", "Teamwork", "Problem-solving"],
    datasets: [
      {
        label: "Candidate Evaluation",
        data: [8, 7, 9, 6, 7], // Example scores
        backgroundColor: "#1877F2",
      },
    ],
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-4">
      <div>
        <h3>Analytics & Reports</h3>
        <p>
          Gain insights into your reference checking process and hiring
          efficiency.
        </p>
      </div>

      <Row>
        {/* Card 1 */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total References</Card.Title>
              <Card.Text>257</Card.Text>
              <Card.Text className="text-success">+2 from last week</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2 */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Completion Rate</Card.Title>
              <Card.Text>89%</Card.Text>
              <Card.Text className="text-success">
                +5% from last month
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Avg. Response Time</Card.Title>
              <Card.Text>2.3 days</Card.Text>
              <Card.Text className="text-danger">
                -0.5 days from last month
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 4 */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Positive Feedbacks</Card.Title>
              <Card.Text>78%</Card.Text>
              <Card.Text className="text-success">
                +3% from last month
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-center gap-5 button-controls-report">
        <button
          className={`btn-custom ${activeButton === "Overview" ? "active" : ""}`}
          onClick={() => handleButtonClick("Overview")}
        >
          Overview
        </button>
        <button
          className={`btn-custom ${activeButton === "Reports" ? "active" : ""}`}
          onClick={() => handleButtonClick("Reports")}
        >
          Reports
        </button>
        <button
          className={`btn-custom ${activeButton === "Candidates" ? "active" : ""}`}
          onClick={() => handleButtonClick("Candidates")}
        >
          Candidates
        </button>
      </div>

      <div className="AiReference-report-container position-relative">
        {activeButton === "Reports" ? (
          <div>
            <h5>Recent Reports</h5>
            <p>Download or view detailed reports</p>
          </div>
        ) : activeButton === "Candidates" ? (
          <>
            <div>
              <h5>Candidate Evaluation Summaries</h5>
              <p>Average scores across key competencies</p>
            </div>
            <Row>
              <Col md={8}>
                <div className="chart-container-report">
                  <Bar
                    data={candidateChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      indexAxis: "y", // This makes the chart horizontal
                      scales: {
                        x: {
                          ticks: {
                            beginAtZero: true,
                          },
                          max: 10, // Set the max value to 10
                        },
                        y: {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false, // This removes the legend from the canvas
                        },
                      },
                    }}
                  />
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <div>
              <h5>Reference Check Analytics</h5>
              <p>Overview of completed and pending reference checks</p>
            </div>
            <Row>
              <Col md={8}>
                <div className="chart-container-report">
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // This is important for full size
                      indexAxis: "x", // This makes the chart horizontal
                      scales: {
                        x: { stacked: true },
                        y: { stacked: true },
                      },
                      plugins: {
                        legend: {
                          display: false, // This removes the legend from the canvas
                        },
                      },
                    }}
                  />
                </div>
              </Col>
              <Col md={4}>
                {/* Custom legend below the chart */}
                <div className="custom-legend h-100 d-flex flex-column align-items-center justify-content-center">
                  <ul>
                    <li>
                      <div className="legend-box completed"></div>
                      Completed
                    </li>
                    <li>
                      <div className="legend-box pending"></div>
                      Pending
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;
