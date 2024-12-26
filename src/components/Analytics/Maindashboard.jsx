import { React, useEffect, useState, useRef } from "react";
import { Container, Form, Button, Row, Col, Carousel } from "react-bootstrap";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/Analytics.css";
import { useAnalytics } from "../../hook/useAnalytics";
import { useAuthContext } from "../../hook/useAuthContext";
import { useAnalyticsContext } from "../../hook/useAnalyticsContext";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, LineElement, PointElement, LinearScale, CategoryScale, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(ArcElement);
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);


const MainDashboard = () => {
  const { getAnalytics, isloaading, error } = useAnalytics();
  const navigate = useNavigate();
  const interviewHistory = JSON.parse(localStorage.getItem("analytics")) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { user } = useAuthContext();
  const carouselRef = useRef(null);
  const [selectedChart, setSelectedChart] = useState("overall"); // Default to overall

  
//Helper function
const getResultClass = (score) => {
  if (score <= 1.5) return "result-red";
  if (score <= 5) return "result-yellow";
  if (score <= 7.5) return "result-orange";
  return "result-green";
};

//for testing date
const getDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US"); // For US format
};
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);


  const handleViewResult = (interviewId) => {
    navigate(`/result/${interviewId}`);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fetch analytics if there are no interviews
  useEffect(() => {
    if (interviewHistory.length === 0) {
      getAnalytics();
    }
  }, []);

  // Filter interview history based on search term
  const filteredInterviewHistory = interviewHistory.filter((item) => {
    const category = item.interviewDetails[0].category.toLowerCase();
    return category.includes(searchTerm.toLowerCase());
  });

  // Data for each category's Doughnut Chart with specified colors
  const chartData = [
    { name: 'Grammar', score: 4.6, color: "#FF6060" },
    { name: 'Skills', score: 4.6, color: "#4F52F4" },
    { name: 'Experience', score: 4.6, color: "#04CF52" },
    { name: 'Relevance', score: 4.6, color: "#FFCA56" },
  ];

  // New function to create chart data for Doughnut
  const createDoughnutData = (score, color) => ({
    datasets: [
      {
        data: [score, 10 - score], // Assuming a scale of 10
        backgroundColor: [color, "#36434E"], // Use the specified color and remaining color
        borderColor: "#36434E"
      }
    ]
  });

  // Example data for each category
  const categoryScores = {
    basic: [4.0, 4.2, 4.5],
    behavioral: [4.5, 4.6, 4.7],
    expert: [4.6, 4.8, 4.9],
    overall: [4.6, 4.7, 4.8],
  };

  // Function to create line chart data for each category
  const createCategoryChartData = (scores) => ({
    labels: ['Week 1', 'Week 2', 'Week 3'],
    datasets: [
      {
        label: 'Performance',
        data: scores,
        borderColor: '#4F52F4',
        backgroundColor: 'rgba(79, 82, 244, 0.2)',
        fill: true,
      },
    ],
  });

  return (
    <Container className="d-flex flex-column MockMainDashboard-content gap-3">


      <div className="dashboard-header">
        {user ? (
          <>
            <h3>Hello, {user.name}</h3>
            <p>Today is {currentDate}</p>
          </>
        ) : (
          <>
            <h3>Hello, Guest</h3>
            <p>Today is {currentDate}</p>
          </>
        )}
      </div>

      {/* New button container */}
      <div className="button-container-analytics d-flex justify-content-end gap-3">
        <Button 
          className={`btn-overall-analytics ${selectedChart === "overall" ? "btn-active" : ""}`} 
          onClick={() => setSelectedChart("overall")}
        >
          Overall Performance
        </Button>
        <Button 
          className={`btn-behavioral-analytics ${selectedChart === "behavioral" ? "btn-active" : ""}`} 
          onClick={() => setSelectedChart("behavioral")}
        >
          Behavioral
        </Button>
        <Button 
          className={`btn-basic-analytics ${selectedChart === "basic" ? "btn-active" : ""}`} 
          onClick={() => setSelectedChart("basic")}
        >
          Basic
        </Button>
        <Button 
          className={`btn-expert-analytics ${selectedChart === "expert" ? "btn-active" : ""}`} 
          onClick={() => setSelectedChart("expert")}
        >
          Expert
        </Button>
      </div>


      <Row className="chart-container justify-content-center align-items-center  " >

        <Col md={9}>
          <Row className="justify-content-center " >
            {chartData.map((item) => (
              <Col key={item.name} xs={6} md={3} className="p-3 chart-col">
                <div className="chart-name">{item.name}</div>
                <Doughnut
                  data={createDoughnutData(item.score, item.color)}
                  options={{
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        enabled: true,
                        callbacks: {
                          label: (tooltipItem) => {
                            const filledValue = tooltipItem.raw[0];
                            return `${item.name}: ${filledValue} filled`;
                          }
                        }
                      }
                    },
                    rotation: -90,
                    circumference: 180,
                    cutout: "60%",
                    maintainAspectRatio: true,
                    responsive: true
                  }}
                />
                <div className="chart-score">
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.score}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={3} className="d-flex align-items-center justify-content-center flex-column overall-performance ">
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>4.6</div>
          <h5>Overall Performance</h5>

        </Col>
      </Row>
      {/* New Line Chart Slider Section */}
      <Row className="chart-line-container ">
        {/* Line Chart Container */}
        <Col md={6} className="line-chart-container d-flex justify-content-center align-items-center">
          <div className="carousel-controls">
            <Button variant="outline-primary" onClick={() => carouselRef.current.prev()}>
            <svg width="21" height="33" viewBox="0 0 21 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 28.5012L8.99816 16.5L21 4.49883L16.5009 -1.96661e-07L1.18611e-06 16.5L16.5009 33L21 28.5012Z" fill="#F46A05"/>
            </svg>

            </Button>

            <Carousel className="chart-card-line-container" ref={carouselRef} controls={false} indicators={false} interval={null}>
              {/* Conditional Rendering of Line Charts */}
              {selectedChart === "overall" && (
                <Carousel.Item>
                  <div className="chart-card">
                    <h5>Overall Performance</h5>
                    <Line 
                      data={createCategoryChartData(categoryScores.overall)} 
                      options={{ 
                        responsive: true, 
                        scales: { y: { min: 1, max: 10 } },
                        plugins: {
                          legend: { display: false } // Hide the legend
                        }
                      }} 
                    />
                  </div>
                </Carousel.Item>
              )}
              {selectedChart === "behavioral" && (
                <Carousel.Item>
                  <div className="chart-card">
                    <h5>Behavioral</h5>
                    <Line 
                      data={createCategoryChartData(categoryScores.behavioral)} 
                      options={{ 
                        responsive: true, 
                        scales: { y: { min: 1, max: 10 } },
                        plugins: {
                          legend: { display: false }
                        }
                      }} 
                    />
                  </div>
                </Carousel.Item>
              )}
              {selectedChart === "basic" && (
                <Carousel.Item>
                  <div className="chart-card">
                    <h5>Basic</h5>
                    <Line 
                      data={createCategoryChartData(categoryScores.basic)} 
                      options={{ 
                        responsive: true, 
                        scales: { y: { min: 1, max: 10 } },
                        plugins: {
                          legend: { display: false }
                        }
                      }} 
                    />
                  </div>
                </Carousel.Item>
              )}
              {selectedChart === "expert" && (
                <Carousel.Item>
                  <div className="chart-card">
                    <h5>Expert</h5>
                    <Line 
                      data={createCategoryChartData(categoryScores.expert)} 
                      options={{ 
                        responsive: true, 
                        scales: { y: { min: 1, max: 10 } },
                        plugins: {
                          legend: { display: false }
                        }
                      }} 
                    />
                  </div>
                </Carousel.Item>
              )}
            </Carousel>

            <Button variant="outline-primary" onClick={() => carouselRef.current.next()}>
              <svg width="21" height="33" viewBox="0 0 21 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-1.24583e-06 4.49883L12.0018 16.5L-1.9665e-07 28.5012L4.49908 33L21 16.5L4.49908 -1.96661e-07L-1.24583e-06 4.49883Z" fill="#F46A05"/>
              </svg>

            </Button>
          </div>
        </Col>

        {/* Analytics Container */}
        <Col md={6} className="analytics-container"> {/* 40% width */}
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  {/* <th>Type</th> */}
                  <th>Activity</th>
                  {/* <th>Category</th> */}
                  <th>Topics/Job Description</th>
                  <th>Date</th>
                  <th>Overall Result</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="list">
                {isloaading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Fetching interview history...
                    </td>
                  </tr>
                ) : filteredInterviewHistory.length > 0 ? (
                  filteredInterviewHistory
                    .slice()
                    .reverse()
                    .map((item) => (
                      <tr key={item._id}>
                        <td>{item.interviewDetails[0].type}</td>
                        <td>{item.interviewDetails[0].category}</td>
                        <td>{getDate(item.createdAt)}</td>
                        <td
                          className={getResultClass(
                            parseFloat(item.overallFeedback.overallPerformance)
                          )}
                        >
                          {item.overallFeedback.overallPerformance}/10
                        </td>
                        <td>
                          <Button
                            variant="link"
                            onClick={() => handleViewResult(item._id)}
                          >
                             Full Summary
                          </Button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Col>



      </Row>
    </Container>
  );
};

export default MainDashboard;
