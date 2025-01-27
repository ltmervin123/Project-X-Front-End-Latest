import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { Pie, Bar } from "react-chartjs-2"; // Import chart components
import { Chart, registerables } from "chart.js"; // Import Chart.js and registerables

// Register all necessary components
Chart.register(...registerables);

const AiReferenceCard = ({ title, count, description, bgColor }) => {
  return (
    <div
      className="AiReferenceCard"
      style={{
        backgroundColor: bgColor,
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div>
        <p
          className="d-flex justify-content-between align-items-center"
          style={{ margin: 0 }}
        >
          {title}
        </p>
      </div>
      <p className="count">{count}</p>
      <p className="description">{description}</p>
    </div>
  );
};

const MainDashboard = () => {
  // Data for the pie chart
  const pieData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        data: [159, 12, 86], // Example data
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  // Options for the pie chart to hide labels
  const pieOptions = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Disable tooltips if you want to hide them as well
      },
    },
  };

  // Data for the column chart
  const barData = {
    labels: ["December", "January"], // Updated to represent only November to March
    datasets: [
      {
        label: "Week 1",
        backgroundColor: "#319F43",
        borderColor: "transparent",
        borderWidth: 2,
        data: [110, 100], // Example data for November to March
      },
      {
        label: "Week 2",
        backgroundColor: "#1877F2",
        borderColor: "transparent",
        borderWidth: 2,
        data: [90, 80], // Example data for November to March
      },
      {
        label: "Week 3",
        backgroundColor: "#F8BD00",
        borderColor: "transparent",
        borderWidth: 2,
        data: [150, 140], // Example data for November to March
      },
      {
        label: "Week 4",
        backgroundColor: "#686868",
        borderColor: "transparent",
        borderWidth: 2,
        data: [130, 120], // Example data for November to March
      },
    ],
  };

  return (
    <div className="MockMainDashboard-content">
      <h3 className="mb-3">Dashboard</h3>
      <p>Manage and track your reference check processes.</p>
      <Row className="mb-3">
        <Col md={3}>
          <AiReferenceCard
            title="Active Jobs"
            count="257"
            description="+2 from last week"
            bgColor="#319F43"
          />
        </Col>
        <Col md={3}>
          <AiReferenceCard
            title="Pending References"
            count="12"
            description="-3 from last week"
            bgColor="#1877F2"
          />
        </Col>
        <Col md={3}>
          <AiReferenceCard
            title="Completed References"
            count="159"
            description="+15 from last week"
            bgColor="#F8BD00"
          />
        </Col>
        <Col md={3}>
          <AiReferenceCard
            title="Total Candidates"
            count="7"
            description="+28 from last month"
            bgColor="#686868"
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <div className="pie-bar-chart-container d-flex justify-content-center align-items-center position-relative">
            <p className="mb-3 pie-title-overlay">Reference Check Status</p>

            <div className="pie-chart">
              {/* Pass the options to the Pie chart */}
              <Pie data={pieData} options={pieOptions} />
              <div className="pie-labels ms-3">
                <ul>
                  {pieData.labels.map((label, index) => (
                    <li
                      key={index}
                      style={{
                        color: pieData.datasets[0].backgroundColor[index],
                      }}
                    >
                      <p> {label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="pie-bar-chart-container d-flex justify-content-center align-items-center position-relative">
            <p className="mb-3 bar-title-overlay">Overview of Active Jobs</p>
            <div className="bar-chart">
              <Bar
                data={barData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          <div className="CheckContainer my-4">
            <h3 className="mb-3">Recent Reference Checks</h3>
            <p>Overview of the latest reference check requests</p>
            <table className="table">
              <thead className="no-border">
                <tr>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Levi Mella</td>
                  <td>Graphic Designer</td>
                  <td>Basic</td>
                </tr>
                <tr>
                  <td>Kirk Delagente</td>
                  <td>Prompt Eng.</td>
                  <td>Customized</td>
                </tr>
                <tr>
                  <td>Aivan Sumalinog</td>
                  <td>Web Developer</td>
                  <td>Manage Focus</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainDashboard;
