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
  if (score <= 1.5) return "result-red-analytic";
  if (score <= 5) return "result-yellow-analytic";
  if (score <= 7.5) return "result-orange-analytic";
  return "result-green-analytic";
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
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Performance',
        data: scores,
        borderColor: '#FF6F20',
        backgroundColor: 'rgba(255, 111, 32, 0.3)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#FF6F20',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
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
      <Row className="button-container-analytics d-flex justify-content-end gap-3">
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
      </Row>


      <Row className="chart-container justify-content-center align-items-center  " >

        <Col md={9} className="h-100">
          <Row className="justify-content-center">
            {chartData.map((item) => (
              <Col key={item.name} xs={6} md={3} className="chart-col">
                <div className="chart-name">{item.name}</div>
                <div className="doughnut-chart" style={{ width: '100%' }}>
                  <Doughnut
                    className="doughnut"
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
                      cutout: "70%",
                      maintainAspectRatio: true,
                      responsive: true
                    }}
                  />
                </div>
                <div className="chart-score">
                  <div>{item.score}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={3} className="overall-performance">
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>4.6</div>
          <h5>Overall Performance</h5>
        </Col>
      </Row>
      {/* New Line Chart Slider Section */}
      <Row className="chart-line-container ">
        {/* Line Chart Container */}
        <Col md={6} className="line-chart-container d-flex justify-content-center align-items-center">
          <div className="carousel-controls">


            <Carousel className="chart-card-line-container" ref={carouselRef} controls={false} indicators={false} interval={null}>
              {/* Conditional Rendering of Line Charts */}
              {selectedChart === "overall" && (
                <Carousel.Item>
                  <div className="chart-card">
                    <h5>Your Overall Performance</h5>
                    <Line 
                      data={createCategoryChartData(categoryScores.overall)} 
                      options={{ 
                        responsive: true, 
                        scales: { 
                          y: { 
                            min: 1, 
                            max: 10,
                            grid: {
                              color: 'rgba(0, 0, 0, 0.1)',
                            },
                          },
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                        plugins: {
                          legend: { display: false },
                          tooltip: {
                            backgroundColor: '#FF6F20',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            callbacks: {
                              label: (tooltipItem) => {
                                return `${tooltipItem.raw[0]}`;
                              },
                            },
                          },
                        },
                        elements: {
                          point: {
                            radius: 0,
                          },
                          line: {
                            fill: true,
                          },
                        },
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
                        scales: { 
                          y: { 
                            min: 1, 
                            max: 10,
                            grid: {
                              color: 'rgba(0, 0, 0, 0.1)',
                            },
                          },
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                        plugins: {
                          legend: { display: false },
                          tooltip: {
                            backgroundColor: '#FF6F20',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            callbacks: {
                              label: (tooltipItem) => {
                                return `${tooltipItem.raw[0]}`;
                              },
                            },
                          },
                        },
                        elements: {
                          point: {
                            radius: 6,
                            hoverRadius: 8,
                          },
                        },
                        annotation: {
                          annotations: {
                            line: {
                              type: 'line',
                              xMin: 2,
                              xMax: 2,
                              borderColor: 'rgba(0, 0, 0, 0.5)',
                              borderWidth: 1,
                              label: {
                                content: '4.6',
                                enabled: true,
                                position: 'top',
                                backgroundColor: '#FF6F20',
                                color: '#fff',
                                font: {
                                  size: 14,
                                },
                              },
                            },
                          },
                        },
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
                        scales: { 
                          y: { 
                            min: 1, 
                            max: 10,
                            grid: {
                              color: 'rgba(0, 0, 0, 0.1)',
                            },
                          },
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                        plugins: {
                          legend: { display: false },
                          tooltip: {
                            backgroundColor: '#FF6F20',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            callbacks: {
                              label: (tooltipItem) => {
                                return `${tooltipItem.raw[0]}`;
                              },
                            },
                          },
                        },
                        elements: {
                          point: {
                            radius: 6,
                            hoverRadius: 8,
                          },
                        },
                        annotation: {
                          annotations: {
                            line: {
                              type: 'line',
                              xMin: 2,
                              xMax: 2,
                              borderColor: 'rgba(0, 0, 0, 0.5)',
                              borderWidth: 1,
                              label: {
                                content: '4.6',
                                enabled: true,
                                position: 'top',
                                backgroundColor: '#FF6F20',
                                color: '#fff',
                                font: {
                                  size: 14,
                                },
                              },
                            },
                          },
                        },
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
                        scales: { 
                          y: { 
                            min: 1, 
                            max: 10,
                            grid: {
                              color: 'rgba(0, 0, 0, 0.1)',
                            },
                          },
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                        plugins: {
                          legend: { display: false },
                          tooltip: {
                            backgroundColor: '#FF6F20',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                          },
                        },
                      }} 
                    />
                  </div>
                </Carousel.Item>
              )}
            </Carousel>


          </div>
        </Col>

        {/* Analytics Container */}
        <Col md={6} className="analytics-container "> {/* 40% width */}
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
