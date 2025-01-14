import { React, useEffect, useState, useRef } from "react";
import { Container, Form, Button, Row, Col, Carousel } from "react-bootstrap";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/Analytics.css";
import { useAnalytics } from "../../hook/useAnalytics";
import { useAuthContext } from "../../hook/useAuthContext";
import { Doughnut } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
} from "chart.js";
import {
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
} from "recharts";

Chart.register(ArcElement);
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Legend);

const MainDashboard = () => {
  const { getAnalytics, isLoading, error } = useAnalytics();
  const navigate = useNavigate();
  const interviewHistory = JSON.parse(localStorage.getItem("analytics")) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { user } = useAuthContext();
  const carouselRef = useRef(null);
  const [selectedChart, setSelectedChart] = useState("overall"); // Default to overall

  // Helper function
  const getResultClass = (score) => {
    if (score <= 1.5) return "result-red-analytic";
    if (score <= 5) return "result-orange-analytic";
    if (score <= 7.5) return "result-yellow-analytic";
    return "result-green-analytic";
  };

  // For testing date
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

  // Function to get category scores with date and time
  const getCategoryScoresWithDate = () => {
    const categoryScores = {
      basic: [],
      behavioral: [],
      expert: [],
      overall: [],
    };

    // Define the categories to check against
    const categoriesToCheck = ["basic", "behavioral", "expert"];

    interviewHistory.forEach((item) => {
      const updatedAt = item.updatedAt; // Accessing the date
      const overallPerformance = parseFloat(
        item.recordType === "old record"
          ? item.overallFeedback.overallPerformance
          : item.overAllScore
      ); // Accessing the score

      // Get the category and type from the interview details
      const category = item.interviewDetails[0].category.toLowerCase();
      const type = item.interviewDetails[0].type.toLowerCase();

      // Check if the category matches any of the specified categories
      if (categoriesToCheck.includes(category)) {
        // Push the score and date into the appropriate category
        categoryScores[category].push({
          date: updatedAt,
          score: overallPerformance,
        });
      }

      // Check if the type matches any of the specified categories
      if (categoriesToCheck.includes(type)) {
        // Push the score and date into the appropriate category
        categoryScores[type].push({
          date: updatedAt,
          score: overallPerformance,
        });
      }

      // Always push to overall
      categoryScores.overall.push({
        date: updatedAt,
        score: overallPerformance,
      });
    });

    return categoryScores;
  };

  // Example usage
  const categoryScoresWithDate = getCategoryScoresWithDate();

  // Function to get dynamic chart data from local storage
  const getDynamicChartData = (category) => {
    const filteredData = interviewHistory.filter(
      (item) =>
        item.interviewDetails[0].category.toLowerCase() ===
          category.toLowerCase() ||
        item.interviewDetails[0].type.toLowerCase() === category.toLowerCase()
    );

    // Extract scores for each specific feedback category
    const grammarScores = filteredData.map((item) =>
      parseFloat(
        item.recordType === "old record"
          ? item.overallFeedback.grammar
          : item.grammar.overAllScore
      )
    );

    const skillsScores = filteredData.map((item) =>
      parseFloat(
        item.recordType === "old record"
          ? item.overallFeedback.skill
          : item.skill.overAllScore
      )
    ); // Fixed typo from 'gkills' to 'skills'
    const experienceScores = filteredData.map((item) =>
      parseFloat(
        item.recordType === "old record"
          ? item.overallFeedback.experience
          : item.experience.overAllScore
      )
    );
    const relevanceScores = filteredData.map((item) =>
      parseFloat(
        item.recordType === "old record"
          ? item.overallFeedback.relevance
          : item.relevance.overAllScore
      )
    );

    // Calculate average scores for each category
    const averageGrammarScore =
      grammarScores.length > 0
        ? (
            grammarScores.reduce((a, b) => a + b, 0) / grammarScores.length
          ).toFixed(1)
        : 0;
    const averageSkillsScore =
      skillsScores.length > 0
        ? (
            skillsScores.reduce((a, b) => a + b, 0) / skillsScores.length
          ).toFixed(1)
        : 0;
    const averageExperienceScore =
      experienceScores.length > 0
        ? (
            experienceScores.reduce((a, b) => a + b, 0) /
            experienceScores.length
          ).toFixed(1)
        : 0;
    const averageRelevanceScore =
      relevanceScores.length > 0
        ? (
            relevanceScores.reduce((a, b) => a + b, 0) / relevanceScores.length
          ).toFixed(1)
        : 0;

    return [
      { name: "Grammar", score: averageGrammarScore, color: "#FF6060" },
      { name: "Skills", score: averageSkillsScore, color: "#4F52F4" },
      { name: "Experience", score: averageExperienceScore, color: "#04CF52" },
      { name: "Relevance", score: averageRelevanceScore, color: "#FFCA56" },
    ];
  };

  // Function to get overall scores by aggregating other categories
  const getOverallChartData = () => {
    const categories = ["Basic", "Behavioral", "Expert"];
    const overallScores = {
      grammar: [],
      skills: [],
      experience: [],
      relevance: [],
    };

    categories.forEach((category) => {
      const categoryData = getDynamicChartData(category);
      overallScores.grammar.push(parseFloat(categoryData[0].score));
      overallScores.skills.push(parseFloat(categoryData[1].score));
      overallScores.experience.push(parseFloat(categoryData[2].score));
      overallScores.relevance.push(parseFloat(categoryData[3].score));
    });

    // Calculate overall averages
    const averageGrammarScore =
      overallScores.grammar.length > 0
        ? (
            overallScores.grammar.reduce((a, b) => a + b, 0) /
            overallScores.grammar.length
          ).toFixed(1)
        : 0;
    const averageSkillsScore =
      overallScores.skills.length > 0
        ? (
            overallScores.skills.reduce((a, b) => a + b, 0) /
            overallScores.skills.length
          ).toFixed(1)
        : 0;
    const averageExperienceScore =
      overallScores.experience.length > 0
        ? (
            overallScores.experience.reduce((a, b) => a + b, 0) /
            overallScores.experience.length
          ).toFixed(1)
        : 0;
    const averageRelevanceScore =
      overallScores.relevance.length > 0
        ? (
            overallScores.relevance.reduce((a, b) => a + b, 0) /
            overallScores.relevance.length
          ).toFixed(1)
        : 0;

    return [
      { name: "Grammar", score: averageGrammarScore, color: "#FF6060" },
      { name: "Skills", score: averageSkillsScore, color: "#4F52F4" },
      { name: "Experience", score: averageExperienceScore, color: "#04CF52" },
      { name: "Relevance", score: averageRelevanceScore, color: "#FFCA56" },
    ];
  };

  // Data for each category's Doughnut Chart
  const chartData = {
    overall: getOverallChartData(),
    behavioral: getDynamicChartData("Behavioral"),
    basic: getDynamicChartData("Basic"),
    expert: getDynamicChartData("Expert"),
  };

  // New function to create chart data for Doughnut
  const createDoughnutData = (score, color) => ({
    datasets: [
      {
        data: [score, 10 - score], // Assuming a scale of 10
        backgroundColor: [color, "#36434E"], // Use the specified color and remaining color
        borderColor: "#36434E",
      },
    ],
  });

  const transformScoresForChart = (scores) => {
    return scores.map((item) => ({
      Day: new Date(item.date).toLocaleDateString(), // Format the date as needed
      score: item.score,
    }));
  };

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tool-tip"
          style={{
            backgroundColor: "#f46a05",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <p>{`Date: ${payload[0].payload.Day}`}</p>
          <p>{`Score: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  // Reusable AreaChart component
  const AreaChartComponent = ({ title, data }) => {
    return (
      <div className="chart-card">
        <h5>{title}</h5>
        {data.length === 0 ? ( // Check if data is empty
          <div className="no-data-message">No Data Available</div>
        ) : (
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={data}>
              <XAxis dataKey="Day" />
              {/* Use the custom tooltip here */}
              <RechartsTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#686868"
                fill="url(#colorUv)"
                isAnimationActive={false}
              />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="#F46A05" stopOpacity={0.8} />
                  <stop offset="94%" stopColor="#f46a05" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  };

  return (
    <div className="d-flex flex-column MockMainDashboard-content gap-3">
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
          className={`btn-overall-analytics ${
            selectedChart === "overall" ? "btn-active" : ""
          }`}
          onClick={() => setSelectedChart("overall")}
        >
          Overall Performance
        </Button>
        <Button
          className={`btn-behavioral-analytics ${
            selectedChart === "behavioral" ? "btn-active" : ""
          }`}
          onClick={() => setSelectedChart("behavioral")}
        >
          Behavioral
        </Button>
        <Button
          className={`btn-basic-analytics ${
            selectedChart === "basic" ? "btn-active" : ""
          }`}
          onClick={() => setSelectedChart("basic")}
        >
          Basic
        </Button>
        <Button
          className={`btn-expert-analytics ${
            selectedChart === "expert" ? "btn-active" : ""
          }`}
          onClick={() => setSelectedChart("expert")}
        >
          Expert
        </Button>
      </Row>

      <Row className="chart-container justify-content-center align-items-center">
        <Col md={9}>
          <Row className="justify-content-center">
            {chartData[selectedChart].map(
              (
                item // Use selectedChart to get the right data
              ) => (
                <Col key={item.name} xs={6} md={3} className="chart-col">
                  <div className="chart-name">{item.name}</div>
                  <div className="doughnut-chart" style={{ width: "100%" }}>
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
                              },
                            },
                          },
                        },
                        rotation: -90,
                        circumference: 180,
                        cutout: "70%",
                        maintainAspectRatio: true,
                        responsive: true,
                      }}
                    />
                  </div>
                  <div className="chart-score">
                    <div>{item.score}</div>
                  </div>
                </Col>
              )
            )}
          </Row>
        </Col>
        <Col md={3} className="overall-performance">
          <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            {Math.max(
              ...chartData[selectedChart].map((item) => item.score)
            ).toFixed(1)}{" "}
            {/* Update to reflect max score */}
          </div>
          <h5>Overall Performance</h5>
        </Col>
      </Row>
      {/* New Area Chart Slider Section */}
      <Row className="chart-area-container ">
        {/* Area Chart Container */}
        <Col
          md={6}
          className="area-chart-container d-flex justify-content-center align-items-center"
        >
          <div className="carousel-controls">
            <Carousel
              className="chart-card-area-container"
              controls={false}
              indicators={false}
              interval={null}
            >
              {selectedChart === "overall" && (
                <Carousel.Item>
                  <AreaChartComponent
                    title="Your Overall Performance"
                    data={transformScoresForChart(
                      categoryScoresWithDate.overall
                    )}
                  />
                </Carousel.Item>
              )}
              {selectedChart === "behavioral" && (
                <Carousel.Item>
                  <AreaChartComponent
                    title="Behavioral"
                    data={transformScoresForChart(
                      categoryScoresWithDate.behavioral
                    )}
                  />
                </Carousel.Item>
              )}
              {selectedChart === "basic" && (
                <Carousel.Item>
                  <AreaChartComponent
                    title="Basic"
                    data={transformScoresForChart(categoryScoresWithDate.basic)}
                  />
                </Carousel.Item>
              )}
              {selectedChart === "expert" && (
                <Carousel.Item>
                  <AreaChartComponent
                    title="Expert"
                    data={transformScoresForChart(
                      categoryScoresWithDate.expert
                    )}
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </div>
        </Col>

        {/* Analytics Container */}
        <Col md={6} className="analytics-container">
          {" "}
          {/* 40% width */}
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Topics/Job Description</th>
                  <th>Date</th>
                  <th>Overall Result</th>
                  <th className="action-t-center-text">Action</th>
                </tr>
              </thead>
              <tbody className="list">
                {isLoading ? (
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
                            parseFloat(
                              item.recordType === "old record"
                                ? item.overallFeedback.overallPerformance
                                : item.overAllScore
                            )
                          )}
                        >
                          {item.recordType === "old record"
                            ? item.overallFeedback.overallPerformance
                            : item.overAllScore}
                          /10
                        </td>
                        <td className="action-t-center">
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
    </div>
  );
};

export default MainDashboard;
