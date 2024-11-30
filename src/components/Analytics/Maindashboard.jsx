import { React, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/Analytics.css";
import { useAnalytics } from "../../hook/useAnalytics";
import { useAnalyticsContext } from "../../hook/useAnalyticsContext";

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

const MainDashboard = () => {
  const { dispatch, analytics } = useAnalyticsContext();
  const { getAnalytics, isloaading, error } = useAnalytics();
  const navigate = useNavigate();

  const interviewHistory = JSON.parse(localStorage.getItem("analytics")) || [];
  
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    getAnalytics();
  }, [dispatch]);

  const handleViewResult = (interviewId) => {
    navigate(`/result/${interviewId}`);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter interview history based on search term
  const filteredInterviewHistory = interviewHistory.filter(item => {
    const category = item.interviewDetails[0].category.toLowerCase();
    return category.includes(searchTerm.toLowerCase());
  });

  return (
    <Container className="d-flex flex-column">
      <div className="analytic-container-header">
        <h4>Analytics</h4>
      </div>

      <div className="analytics-search-container d-flex mb-4">
        <Form className="analytics-search d-flex ">
          <Form.Group
            controlId="analytics"
            className="careerSelect position-relative me-2"
          >
            <Form.Control as="select">
              <option>Category</option>
            </Form.Control> 
            <span className="dropdown-icon">
              <FaChevronDown />
            </span>
          </Form.Group>

          <Form.Group className="me-2 search-container w-100">
            <Form.Control
              type="text"
              placeholder="Search Category"
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>

          <Button variant="primary" className="search-button" type="button">
            <FaSearch />
          </Button>
        </Form>
      </div>

      <div className="analytics-container">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
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
                          View Full Result
                        </Button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6" className ="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default MainDashboard;