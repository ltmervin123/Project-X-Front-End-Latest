import { React, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/Analytics.css";
import { useNavigate } from "react-router-dom";

const ResultSection = ({ interviewId }) => {
  // Retrieve analytics data from local storage
  const analytics = JSON.parse(localStorage.getItem("analytics")) || [];
  const navigate = useNavigate();

  // Find the specific interview details based on the provided interviewId
  const interviewDetails = analytics.find((item) => item._id === interviewId);
  console.log(interviewDetails);
  const question = interviewDetails.interviewDetails[0].question;
  const answer = interviewDetails.interviewDetails[0].answer;
  const feedback = interviewDetails.feedback;
  const overallFeedback = interviewDetails.overallFeedback;
  const improvedAnswer = interviewDetails.improvedAnswer;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Utility function to get result color class based on score
  const getResultClass = (score) => {
    if (score >= 0 && score <= 1.5) return "result-red";
    if (score > 1.5 && score <= 5.0) return "result-yellow";
    if (score > 5.0 && score <= 7.5) return "result-orange";
    return "result-green";
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + question.length) % question.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % question.length);
  };

  const handleReturn = () => {
    navigate(-1); // Go back to the previous page
  };

  return interviewDetails ? (
    <Container className="result-container shadow-sm p-3">
      <Row>
        <Col md={4}>
          <Card className="interview-result-container d-flex align-items-center">
            <h4>INTERVIEW RESULT</h4>
            <div className="score-section">
              <div className="d-flex justify-content-between align-items-center">
                <p className="rating-name">Grammar</p>
                <p className={getResultClass(overallFeedback.grammar)}>
                  {overallFeedback.grammar || 0}/10
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="rating-name">Skills</p>
                <p className={getResultClass(overallFeedback.gkills)}>
                  {overallFeedback.gkills || 0}/10
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="rating-name">Experience</p>
                <p className={getResultClass(overallFeedback.experience)}>
                  {overallFeedback.experience || 0}/10
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="rating-name">Relevance</p>
                <p className={getResultClass(overallFeedback.relevance)}>
                  {overallFeedback.relevance || 0}/10
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="rating-name">Filler Count</p>
                <p className={getResultClass(overallFeedback.fillerCount)}>
                  {overallFeedback.fillerCount || 0}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="rating-name-overall">Overall Performance</p>
                <p
                  className={getResultClass(overallFeedback.overallPerformance)}
                >
                  {overallFeedback.overallPerformance || 0}/10
                </p>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="interview-container p-4 position-relative">
            <h4>
              Question {currentIndex + 1} of {question.length}
            </h4>
            <div>
              <strong>Question:</strong>
              <p>{question[currentIndex]}</p>
            </div>
            <div>
              <strong>Your Answer:</strong>
              {/* <p>{answer[currentIndex]}</p> */}
              {answer[currentIndex] ? (
                <p>{answer[currentIndex]}</p>
              ) : (
                <p>No answer provided</p>
              )}
            </div>
            <div>
              <strong>Enhance Response:</strong>
              <p>{improvedAnswer[currentIndex]}</p>
              {/* Replace Enhance Ans/response */}
            </div>
            <div>
              <strong>Feedback:</strong>
              <p>{feedback[currentIndex]}</p>
            </div>

            {/* Pagination display at the bottom center */}
            <div className="d-flex justify-content-center question-navination">
              <span
                className="prev"
                onClick={handlePrev}
                style={{ cursor: "pointer", marginRight: "10px" }}
              >
                &lt;
              </span>
              <h4 className="pageNum">{currentIndex + 1}</h4>
              <span
                className="next"
                onClick={handleNext}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              >
                &gt;
              </span>
            </div>
          </Card>
        </Col>
        <div className="w-100 d-flex justify-content-end">
          <button
            className="btn btn-secondary btnReturn"
            onClick={handleReturn}
          >
            Back to analytics
          </button>
        </div>
      </Row>
    </Container>
  ) : (
    <Container className="result-container shadow-sm p-4">
      <h4>No data found for the selected interview</h4>
    </Container>
  );
};

export default ResultSection;
