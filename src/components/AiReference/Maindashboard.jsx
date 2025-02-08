import React, { useState } from "react"; // Import useState
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { Pie, Bar } from "react-chartjs-2"; // Import chart components
import { Chart, registerables } from "chart.js"; // Import Chart.js and registerables
import default_avatar_img from "../../assets/default.png"; // Import default avatar image

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
 
        >
          {title}
        </p>
      </div>
      <p className="count">{count}</p>
      <p className="description">{description}</p>
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
      </div>

      <Row>
        <Col md="6">
          <div className="pie-bar-chart-container d-flex justify-content-center align-items-center position-relative">
            <p className="mb-3 pie-title-overlay">Reference Check Status</p>
            <div className="pie-chart">
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
      <LogContainer logData={logData} />
    </div>
  );
};

export default MainDashboard;
