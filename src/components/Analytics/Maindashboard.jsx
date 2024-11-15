import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/Analytics.css";

const getResultClass = (score) => {
  if (score <= 1.5) return "result-red";
  if (score <= 5) return "result-yellow";
  if (score <= 7.5) return "result-orange";
  return "result-green";
};

//for testing data
const getDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US"); // For US format
};

const MainDashboard = () => {
  const navigate = useNavigate();
  const data = [
    {
      interviewId: 1,
      type: "Behavioral",
      category: "Information Teqnology",
      diffuclty: "Beginner",
      date: getDate(),
      score: 9.0,
    },
    {
      interviewId: 2,
      type: "Mock",
      category: "Engineering",
      diffuclty: "Intermediate",
      date: getDate(),
      score: 7.0,
    },
    {
      interviewId: 3,
      type: "Behavioral",
      category: "Teamwork",
      diffuclty: "Advanced",
      date: getDate(),
      score: 6.5,
    },
    {
      interviewId: 4,
      type: "Mock",
      category: "Software Engineering",
      diffuclty: "Beginner",
      date: getDate(),
      score: 9.7,
    },
    {
      interviewId: 5,
      type: "Mock",
      category: "Information Teqnology",
      diffuclty: "Advanced",
      date: getDate(),
      score: 7.4,
    },
  ];

  const handleViewResult = (interviewId) => {
    // navigate(`/result/${interviewId}`);
    navigate(`/result`); 
  };

  return (
    <Container className="main-container2 d-flex flex-column">
      <div>
        <h4>Mock Interview</h4>
        <p>Select Professional Career Interview</p>
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
            />
          </Form.Group>

          <Button variant="primary" className="search-button" type="button">
            <FaSearch />
          </Button>
        </Form>
      </div>

      <div className="analytics-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Date</th>
              <th>Overall Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.interviewId}>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>{item.diffuclty}</td>
                <td>{item.date}</td>
                <td className={getResultClass(item.score)}>
                  {item.score} / 10
                </td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleViewResult(item.interviewId)}
                  >
                    View Full Result
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MainDashboard;
