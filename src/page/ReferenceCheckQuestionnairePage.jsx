import React, { useState, useEffect } from "react";
import "../styles/ReferenceCheckQuestionnairePage.css";
import { useLocation } from "react-router-dom";

function ReferenceCheckQuestionnairePage() {
  const location = useLocation();
  const selectedMethod = location.state?.selectedMethod; // Access 'selectedMethod' from the state

  useEffect(() => {
    console.log("Selected Method:", selectedMethod);
  }, [selectedMethod]);

  const questions = [
    "How long have you known the candidate and in what capacity?",
    "What are the candidate’s main strengths?",
    "Can you provide an example of the candidate’s ability to work under pressure?",
    "How would you describe the candidate’s communication skills?",
    "What are the candidate’s areas for improvement?",
    "How does the candidate handle conflict or criticism?",
    "How does the candidate work in a team?",
    "Can you describe the candidate’s work ethic?",
    "What motivates the candidate?",
    "Would you recommend the candidate for this position?",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcription, setTranscription] = useState("Transcription will appear here....");

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleTranscriptionChange = (event) => {
    setTranscription(event.target.value);
  };

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center flex-column positio-relative">
      <h1 className="referencecheckquestiontitle text-left mb-5">
        Reference Check Questionnaire
      </h1>

      <div className="referencecheckquestion-container mb-5">
        <div className="question-container">
          <p className="question-title">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p>{questions[currentQuestionIndex]}</p>
        </div>

        <div className="button-container d-flex align-items-center justify-content-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="d-flex align-items-center justify-content-center"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className="d-flex align-items-center justify-content-center"
          >
            Next
          </button>
        </div>
      </div>

      <div className="transcription-answer-container">
        <h4>{selectedMethod === "Voice Response" ? "Transcription:" : "Answer:"}</h4>
        <textarea
          value={transcription}
          onChange={handleTranscriptionChange}
          rows="4"
          placeholder={selectedMethod === "Voice Response" ? "Transcription will appear here...." : "Type your answer..."}
        />
        <div className="d-flex justify-content-center">
          <button>Start</button>
        </div>
      </div>
    </div>
  );
}

export default ReferenceCheckQuestionnairePage;
