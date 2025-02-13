import React, { useState } from "react"; // Import useState
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { Line, Bar } from "react-chartjs-2"; // Import Line and Bar chart components
import { Chart, registerables } from "chart.js"; // Import Chart.js and registerables
import default_avatar_img from "../../assets/default.png"; // Import default avatar image

// Register all necessary components
Chart.register(...registerables);

const AiReferenceCard = ({ title, count, textColor }) => {
  return (
    <div
      className="AiReferenceCard"
      style={{
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div>
        <p
          className="d-flex justify-content-between align-items-center"
          style={{
            color: textColor,
          }}
        >
          {title}
        </p>
      </div>
      <p className="count d-flex align-items-center justify-content-center">
        {count}
      </p>
    </div>
  );
};

const LogContainer = ({ logData }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedLogs = showAll ? logData : logData.slice(0, 4);

  return (
    <div className="LogContainer my-4">
      <div className="d-flex justify-content-between align-items-center">
        <b className="mb-3">Recent Activities</b>
        <a href="#" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All"}
        </a>
      </div>
      <div className="list-log-container">
        {displayedLogs.map((log) => (
          <div
            key={log.id}
            className="log-item d-flex align-items-center mb-3 gap-3"
          >
            <img src={log.avatar} alt={log.name} className="me-2" />
            <div>
              <strong>{log.name}</strong> completed a reference check for{" "}
              <strong>{log.referenceFor}</strong>
              <div className="text-muted">{log.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MainDashboard = () => {
  // Data for the line chart
  const lineData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
    ],
    datasets: [
      {
        label: "Total", // Replaced 'Active Jobs' with 'Total'
        data: [300, 320, 350, 380, 410, 440, 470, 500],
        fill: false,
        backgroundColor: "#319F43",
        borderColor: "#319F43",
        tension: 0.1, // Make the line smooth
      },
      {
        label: "Completed",
        data: [120, 140, 160, 180, 200, 220, 240, 260],
        fill: false,
        backgroundColor: "#1877F2",
        borderColor: "#1877F2",
        tension: 0.1, // Make the line smooth
      },
    ],
  };

  // Options for the line chart
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: true, // Disables tooltips
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable grid on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Disable grid on the y-axis
        },
      },
    },
  };

  const barData = {
    labels: ["Engineering", "Sales", "Marketing", "HR", "Finance", "Operation"], // Departments as labels
    datasets: [
      {
        label: "Department References",
        backgroundColor: "#1877F2",
        borderColor: "transparent",
        borderWidth: 2,
        data: [30, 25, 15, 10, 20, 40],
      },
    ],
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: true, // Disables tooltips
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable grid on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Disable grid on the y-axis
        },
      },
    },
  };

  const logData = [
    {
      id: 1,
      name: "John Doe",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 2,
      name: "Kirk Delagente",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 3,
      name: "John Doe",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 4,
      name: "Kirk Delagente",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 5,
      name: "John Doe",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 6,
      name: "Kirk Delagente",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
  ];

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-3">Dashboard</h3>
        <p>Manage and track your reference check processes.</p>
      </div>
      <div>
        <Row className="mb-3">
          <Col md={3}>
            <AiReferenceCard
              title="Active Jobs"
              count="257"
              textColor="#1877F2"
            />
          </Col>
          <Col md={3}>
            <AiReferenceCard
              title="Pending References"
              count="12"
              textColor="#F8BD00"
            />
          </Col>
          <Col md={3}>
            <AiReferenceCard
              title="Completed References"
              count="159"
              textColor="#319F43"
            />
          </Col>
          <Col md={3}>
            <AiReferenceCard
              title="Total Candidates"
              count="7"
              textColor="#686868"
            />
          </Col>
        </Row>
      </div>

      <Row>
        <Col md="6">
          <div className="line-bar-chart-container position-relative">
            <p className="mb-3 line-title-overlay">Reference Check Overview</p>
            <div className="line-chart">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="line-bar-chart-container position-relative">
            <p className="mb-3 bar-title-overlay">By Department</p>
            <div className="bar-chart">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </Col>
      </Row>
      <LogContainer logData={logData} />
    </div>
  );
};

export default MainDashboard;
