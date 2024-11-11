import React, { useState }, { useState } from "react";
import { Container, Row, Col, Card, Button, Button } from "react-bootstrap";
import "../../styles/Analytics.css";

const ResultSection = () => {
  const [criteriaScores, setCriteriaScores] = useState([
    {
      criterion: "Grammar level",
      score: "8.5 / 10",
    },
    {
      criterion: "Demonstrated skill level",
      score: "7.5 / 10",
    },
    {
      criterion: "Pronounciation",
      score: "9 / 10",
    },
    {
      criterion: "Experience shown",
      score: "7 / 10",
    },
    {
      criterion: "Relevance to question",
      score: "8.5 / 10",
    },
    {
      criterion: "Filler words used",
      score: "9.5 / 10",
    },
  ]);
  // Sample data for questions, answers, and feedback
  const questionsFeedback = [
    {
      question:
        "Tanaka-san, could you share an example of a challenging problem you encountered while developing web applications at Tech Solutions, and how you approached solving it?",
      answer:
        "I faced a challenge with form validation in a web app. I struggled with handling edge cases but improved by reading documentation and tutorials. With my supervisor's feedback, I added error handling, making the form more reliable.",
      feedback:
        "Your response demonstrates a good understanding of web development challenges. You've shown initiative in self-learning and openness to feedback. Consider providing more specific details about the edge cases and the error handling techniques you implemented to showcase your technical depth.",
    },
    {
      question:
        "How do you typically collaborate with your team members during software testing processes, and what strategies have you found most effective for ensuring smooth communication",
      answer:
        "I use Slack and Trello to communicate with my team during testing. Detailed comments help others understand issues, and regular check-ins ensure we stay aligned. Being open about challenges has been very helpful.",
      feedback:
        "Your answer highlights effective use of collaboration tools and good communication practices. To strengthen your response, you could mention specific examples of how these strategies improved testing outcomes or resolved complex issues.",
    },
    {
      question:
        "Can you walk me through a situation where you had to manage a MySQL database for a client project, highlighting any optimizations or improvements you implemented?",
      answer:
        "In a project, I set up a customer database in MySQL. To improve speed, I learned about indexing and applied it to frequently used columns, which helped queries run faster.",
      feedback:
        "Your response shows initiative in learning and applying database optimization techniques. To enhance your answer, consider discussing the specific types of indexes you used, the performance improvements achieved, and any other optimizations you implemented beyond indexing.",
    },
  ];

  // State to track the current question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle "Next" and "Prev" button clicks
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questionsFeedback.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + questionsFeedback.length) % questionsFeedback.length
    );
  };

  // Get current question, answer, and feedback
  const { question, answer, feedback } = questionsFeedback[currentIndex];

  return (
    <Container className="result-container shadow-sm p-4">
      <Row>
        {/* Left Section */}
        <Col md={4}>
          <Card className="interview-result-container d-flex">
            <h4>Interview Results</h4>
            <div className="score-section">
              {criteriaScores.map((scoreItem, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <p>{scoreItem.criterion}</p>
                  <p>{scoreItem.score}</p>
                </div>
              ))}
            </div>
          </Card>
        </Col>

                {/* Right Section */}
                <Col md={8}>
                    <Card className="analytics-container p-4 position-relative">
                        <div>
                            <strong>Question {currentIndex + 1}:</strong>
                            <p>{question}</p>
                        </div>
                        <div>
                            <strong>Answer:</strong>
                            <p>{answer}</p>
                        </div>
                        <div>
                            <strong>Feedback:</strong>
                            <p>{feedback}</p>
                        </div>

                        {/* Prev and Next buttons */}
                        <div className="d-flex justify-content-between position-absolute w-10" style={{ bottom: '10px', left: '10px', right: '10px' }}>
                            <Button variant="secondary" onClick={handlePrev}>
                                Prev
                            </Button>
                            <Button variant="primary" onClick={handleNext}>
                                Next
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ResultSection;
