import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Result.css";
import { useNavigate } from "react-router-dom";

const ResultSection = ({ interviewId }) => {
  // Retrieve analytics data from local storage
  const analytics = JSON.parse(localStorage.getItem("analytics")) || [];
  const navigate = useNavigate();

  // Find the specific interview details based on the provided interviewId
  const interviewDetails = analytics.find((item) => item._id === interviewId);
  
  // Destructure interview details for easier access
  const {
    interviewDetails: [{ question, answer }],
    feedback,
    overallFeedback,
    improvedAnswer,
  } = interviewDetails;

  const [currentIndex, setCurrentIndex] = useState(0);

  // List of filler words
  const fillerWords = (
    overallFeedback.list || [
      "um,", "uh", "hmm", "ah", "um", "like", "you know", "basically",
      "you see", "kind of", "most likely", "as well as", "actually",
      "sort of", "I mean", "well", "so", "right", "okay", "just",
      "literally", "anyway", "probably", "maybe", "in a way",
      "to be honest", "you know what I mean", "let's say", "for example",
      "at the end of the day", "like I said", "you know what I'm saying",
      "erm", "uh-huh", "uh-oh", "like, you know", "I guess", "sorta",
      "kinda", "right?", "y'know", "basically", "I suppose",
      "you know what I mean?", "to be fair", "if you will", "I reckon",
      "you know what I'm talking about", "let me think", "let's see",
      "I mean, like", "you know what I'm saying", "for real", "honestly",
      "seriously", "like seriously", "you know what I mean, right?",
      "I mean, you know", "I mean, honestly",
    ]
  ).map((word) => word.toLowerCase());
  const highlightFillerWords = (text) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const lowerWord = word.toLowerCase().replace(/[.,!?]/g, "");
      if (fillerWords.includes(lowerWord)) {
        return (
          <span key={index} className="filler-red">
            {word  + " "}
          </span>
        );
      }
      return <span key={index}>{word + " "}</span>;
    });
  };

  // Utility function to get result color class based on score
  const getResultClass = (scores, type) => {
    if (type === "fillerCount") {
      const score = parseInt(scores, 10);
      let colorClass = '';
      
      if (score >= 0 && score <= 3) colorClass = "result-green-bg";
      else if (score > 3 && score <= 6) colorClass = "result-yellow-bg";
      else if (score > 6 && score <= 9) colorClass = "result-orange-bg";
      else colorClass = "result-red-bg";
      
      console.log(`Filler Count Score: ${score}`);
      console.log(`Filler Count Color Class: ${colorClass}`);
      return colorClass;
    }
    
    // For other scores
    let resultClass = '';
    if (scores >= 0 && scores <= 1.5) resultClass = "result-red";
    else if (scores > 1.5 && scores <= 5.0) resultClass = "result-orange";
    else if (scores > 5.0 && scores <= 7.5) resultClass = "result-yellow";
    else resultClass = "result-green";
    
    console.log(`Score: ${scores}`);
    console.log(`Color Class: ${resultClass}`);
    return resultClass;
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + question.length) % question.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % question.length);
  };

  const handleReturn = () => {
    navigate(-1); // Go back to the previous page
  };

  const handlePractice = () => {
    navigate("/mockInterview");
  };

  return interviewDetails ? (
    <Container className="result-container shadow-sm d-flex flex-column">
      <h4>Interview Result</h4>
      <div className="score-section gap-2">
        <Row className="d-flex align-items-center justify-content-center ">
          <Col md={6} xs={12}>
            {/* Grammar Score */}
            <div className="d-flex  align-items-center justify-content-center">
              <p className="rating-name">Grammar</p>
              <div className="progress-bar-container" style={{ width: '100%' }}>
                <div 
                  className={`progress-bar ${getResultClass(overallFeedback.grammar)}`} 
                  style={{ width: `${(overallFeedback.grammar || 0) * 10}%` }} 
                >
                  <span className="score-text">{overallFeedback.grammar || 0}</span>
                </div>
                <p className="score-out-of1">{`${10}`}</p>
              </div>
            </div>
            {/* Experience Score */}
            <div className="d-flex  align-items-center justify-content-center">
              <p className="rating-name">Experience</p>
              <div className="progress-bar-container" style={{ width: '100%' }}>
                <div 
                  className={`progress-bar ${getResultClass(overallFeedback.experience)}`} 
                  style={{ width: `${(overallFeedback.experience || 0) * 10}%` }} 
                >
                  <span className="score-text">{overallFeedback.experience || 0}</span>
                </div>
                <p className="score-out-of1">{`${10}`}</p>
              </div>
            </div>
          </Col>
          <Col md={6} xs={12}>
            {/* Skills Score */}
            <div className="d-flex  align-items-center justify-content-center">
              <p className="rating-name">Skills</p>
              <div className="progress-bar-container" style={{ width: '100%' }}>
                <div 
                  className={`progress-bar ${getResultClass(overallFeedback.skill)}`} 
                  style={{ width: `${(overallFeedback.skill || 0) * 10}%` }} 
                >
                  <span className="score-text">{overallFeedback.skill || 0}</span>
                </div>
                <p className="score-out-of1">{`${10}`}</p>
              </div>
            </div>
            {/* Relevance Score */}
            <div className="d-flex justify-content-center align-items-center">
              <p className="rating-name">Relevance</p>
              <div className="progress-bar-container" style={{ width: '100%' }}>
                <div 
                  className={`progress-bar ${getResultClass(overallFeedback.relevance)}`} 
                  style={{ width: `${(overallFeedback.relevance || 0) * 10}%` }} 
                >
                  <span className="score-text">{overallFeedback.relevance || 0}</span>
                </div>
                <p className="score-out-of1">{`${10}`}</p>
              </div>
            </div>
          </Col>
        </Row>
        {/* Overall Performance Score */}
        <div className="d-flex justify-content-center align-items-center gap-3 overall-performance-container">
          <div className="d-flex justify-content-between align-items-center">
            <p className="rating-name">Overall Performance</p>
            <div className="progress-bar-container" style={{ width: '100%' }}>
              <div 
                className={`progress-bar ${getResultClass(overallFeedback.overallPerformance)}`} 
                style={{ width: `${(overallFeedback.overallPerformance || 0) * 10}%` }} 
              >
                <span className="score-text">{overallFeedback.overallPerformance || 0}</span>
              </div>
              <p className="score-out-of1">{`${10}`}</p>
            </div>
          </div>
        </div>
        {/* Filler Count */}
        <div className="d-flex justify-content-center align-items-center flex-column filler-container">
          <p className="rating-name">Filler Count</p>
          <p className={getResultClass(overallFeedback.fillerCount || 0, "fillerCount")}>
            {overallFeedback.fillerCount}
          </p>
        </div>
        <div className="interview-container flex-column w-100">
          <div className="interview-data">
            <h5>
              Question {currentIndex + 1} of {question.length}
            </h5>
            <div>
              <strong>Question:</strong>
              <p>{question[currentIndex]}</p>
            </div>
            <div>
              <strong>Your Answer:</strong>
              <p>
                {answer[currentIndex]
                  ? highlightFillerWords(answer[currentIndex])
                  : "No answer provided"}
              </p>
            </div>
            <div>
              <strong>Enhance Answer:</strong>
              <p>{improvedAnswer[currentIndex]}</p>
            </div>
            <div>
              <strong>Feedback:</strong>
              <p>{feedback[currentIndex]}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center question-navigation">
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
        </div>
      </div>

      <div className="w-100 d-flex justify-content-center gap-3 button-container">
        <button className="btn btnPractice" onClick={handlePractice}>
          Practice Again
        </button>
        <button className="btn btnReturnAnalytics" onClick={handleReturn}>
          Back to analytics
        </button>
      </div>
    </Container>
  ) : (
    <Container className="result-container shadow-sm p-4">
      <h5>No data found for the selected interview</h5>
    </Container>
  );
};

export default ResultSection;
