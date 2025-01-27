import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { Pie, Bar } from "react-chartjs-2"; // Import chart components

const AiReferenceCard = ({ title, count, description, bgColor, icon }) => {
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
  // Function to determine the status color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return { color: "green", fontWeight: "300" };
      case "Pending":
        return { color: "#F8BD00", fontWeight: "300" };
      case "In Progress":
        return { color: "blue", fontWeight: "300" }; // you can change blue if needed
      default:
        return { color: "black" }; // Default color if the status is unknown
    }
  };

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

  // Data for the column chart
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Completed References",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40], // Example data
      },
      {
        label: "Pending References",
        backgroundColor: "rgba(255,99,132,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [28, 48, 40, 19, 86, 27, 90], // Example data
      },
    ],
  };

  return (
    <div className="MockMainDashboard-content">
      <h3 className="mb-3">Dashboard</h3>
      <p>Manage and track your reference check processes.</p>
      <Row>
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
          <h3 className="mb-3">Reference Status Distribution</h3>
          <Pie data={pieData} />
        </Col>
        <Col md="6">
          <h3 className="mb-3">Monthly Reference Checks</h3>
          <Bar data={barData} />
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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Levi Mella</td>
                  <td>Graphic Designer</td>
                  <td>Basic</td>
                  <td style={getStatusColor("Completed")}>Completed</td>
                </tr>
                <tr>
                  <td>Kirk Delagente</td>
                  <td>Prompt Eng.</td>
                  <td>Customized</td>
                  <td style={getStatusColor("Pending")}>Pending</td>
                </tr>
                <tr>
                  <td>Aivan Sumalinog</td>
                  <td>Web Developer</td>
                  <td>Manage Focus</td>
                  <td style={getStatusColor("In Progress")}>In Progress</td>
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
