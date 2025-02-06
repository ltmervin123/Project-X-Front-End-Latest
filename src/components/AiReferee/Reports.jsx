import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from 'react-chartjs-2'; // Example if you use Chart.js for the chart

const Reports = () => {
  const [activeButton, setActiveButton] = useState('Overview');  // Default active button

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);  // Set the active button when clicked
  };

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Completed',
        data: [20, 35, 50, 45, 60, 75], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Pending',
        data: [15, 10, 30, 20, 25, 25], // Example data
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ],
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-4">
      <div>
        <h3>Analytics & Reports</h3>
        <p>Gain insights into your reference checking process and hiring efficiency.</p>
      </div>

      <Row >
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
              <Card.Text className="text-success">+5% from last month</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Avg. Response Time</Card.Title>
              <Card.Text>2.3 days</Card.Text>
              <Card.Text className="text-danger">-0.5 days from last month</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 4 */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Positive Feedbacks</Card.Title>
              <Card.Text>78%</Card.Text>
              <Card.Text className="text-success">+3% from last month</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-center gap-5 button-controls-report">
        <button
          className={`btn-custom ${activeButton === 'Overview' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Overview')}
        >
          Overview
        </button>
        <button
          className={`btn-custom ${activeButton === 'Reports' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Reports')}
        >
          Reports
        </button>
        <button
          className={`btn-custom ${activeButton === 'Candidates' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Candidates')}
        >
          Candidates
        </button>
      </div>

      <div className="AiReference-report-container position-relative">
        {activeButton === 'Reports' ? (
          <div>
            <h5>Recent Reports</h5>
            <p>Download or view detailed reports</p>
          </div>
        ) : (
          <div>
            <h5>Reference Check Analytics</h5>
            <p>Overview of completed and pending reference checks</p>
            <Bar data={chartData} options={{ responsive: true, scales: { x: { stacked: true }, y: { stacked: true } } }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
