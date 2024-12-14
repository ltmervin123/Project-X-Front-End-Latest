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

  // List of filler words
  const fillerWords = [
    "um",
    // "Um",
    "uh", 
    "Uh",
    "hmm", 
    "Hmm",
    "ah", 
    "Ah", 
    "like", 
    "Like", 
    "you know", 
    "You know", 
    "basically", 
    "Basically", 
    "you see",
    "You see",  
    "kind of", 
    "Kind of", 
    "most likely", 
    "Most likely", 
    "as well as", 
    "As well as", 
    "actually", 
    "sort of", 
    "i mean", 
    "I mean",  
    "well",
    "Well",  
    "so", 
    "So", 
    "right", 
    "okay",
    "Right", 
    "Okay",  
    "just", 
    "literally", 
    "anyway", 
    "probably", 
    "maybe", 
    "in a way", 
    "to be honest", 
    "you know what I mean", 
    "let's say", 
    "for example", 
    "at the end of the day", 
    "like I said", 
    "you know what I'm saying",
    "erm", 
    "uh-huh", 
    "uh-oh", 
    "like, you know", 
    "I guess", 
    "sorta", 
    "kinda", 
    "right?", 
    "y'know", 
    "basically", 
    "I suppose", 
    "you know what I mean?", 
    "to be fair", 
    "if you will", 
    "I reckon", 
    "you know what I'm talking about", 
    "let me think", 
    "let's see", 
    "I mean, like", 
    "you know what I'm saying", 
    "for real", 
    "honestly", 
    "Honestly", 
    "seriously", 
    "Seriously", 
    "like seriously", 
    "you know what I mean, right?", 
    "I mean, you know", 
    "I mean, honestly"
  ];


  // Function to highlight filler words in the answer
  const highlightFillerWords = (text) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      // Remove punctuation from the word for comparison
      const cleanWord = word.replace(/[.,!?;:]/g, "").toLowerCase();
      
      if (fillerWords.includes(cleanWord)) {
        return <span key={index} className="filler-red">{word}</span>;
      }
      return <span key={index}> {word} </span>; // Add space after each word
    });
  };
  // Utility function to get result color class based on score
  const getResultClass = (score, type) => {
    if (type === "fillerCount") {
      if (score >= 0 && score <= 3) return "result-green";
      if (score > 3 && score <= 6) return "result-yellow";
      if (score > 6 && score <= 9) return "result-orange";
      return "result-red"; // for score 10 and above
    }

    // Existing logic for other scores
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
                <p className={getResultClass(overallFeedback.fillerCount, "fillerCount")}>
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
            <div className="interview-data">
              <div>
                <strong>Question:</strong>
                <p>{question[currentIndex]}</p>
              </div>
              <div>
              <strong>Your Answer:</strong>
              <p>
                {answer[currentIndex] ? highlightFillerWords(answer[currentIndex]) : "No answer provided"}
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