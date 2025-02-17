import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ReviewYourReferenceCheckPage.css";

function ReviewYourReferenceCheckPage() {
  const location = useLocation();
  const { questions, answers } = location.state || {
    questions: [],
    answers: [],
  };

  const updatedQuestions = questions.map((question, index) => ({
    ...question,
    id: index + 1, // Use the index as a unique id
    text: question || "",
    originalAnswer: answers[index] || "", // Add original answer
  }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track the current question
  const [editedAnswers, setEditedAnswers] = useState(
    updatedQuestions.reduce((acc, question) => {
      acc[question.id] = question.enhancedAnswer;
      return acc;
    }, {})
  );

  const handleEnhancedAnswerChange = (e, id) => {
    setEditedAnswers((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log("Form submitted", editedAnswers);
  };

  // Handle next question navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < updatedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question navigation
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = updatedQuestions[currentQuestionIndex];

  return (
    <div className="container-fluid main-container login-page-container d-flex flex-column align-items-center justify-content-center">
      <h1 className="referencecheckquestiontitle text-left mb-5">
        Review Your Responses
      </h1>
      <div className="ReviewYourReferenceCheck-container">
        {/* Question Indicator */}
        <div className="question-indicator mb-3">
          <p className="m-0">
            Question {currentQuestion.id} of {updatedQuestions.length}
          </p>
        </div>

        {/* Question Display */}
        <div className="ReviewYourReferenceCheck-box-item">
          <div className="question-container">
            <p className="question-text">
              <strong>Question {currentQuestion.id}:</strong>{" "}
              {currentQuestion.text}
            </p>
          </div>

          {/* Original Answer Section */}
          <p className="orig-label">
            <strong>Your Original Answer:</strong>
          </p>
          <div className="answer-container">
            <p>{currentQuestion.originalAnswer}</p>
          </div>

          {/* Standardized Answer Section */}
          <p className="stndard-label">
            <strong>Standardized Answer:</strong>
          </p>
          <div className="standardized-answer-container">
            <p></p>
          </div>

          {/* Edit or Submit Button */}
          <div className="edit-btn-container">
            <button className="edit-answer-btn">Edit Answer</button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons gap-4">
          {currentQuestion.id === 10 ? (
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <>
              {" "}
              {/* Previous Question Button */}
              <button
                className="prev-btn"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                &lt;
              </button>
              <p className="m-0">{currentQuestion.id}</p>
              {/* Next Question Button */}
              <button
                className="next-btn"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === updatedQuestions.length - 1}
              >
                &gt;
              </button>
            </>
          )}
        </div>
      </div>
      <div className="orange-bg-bottom"></div>
      <div className="orange-bg-top"></div>
      <div className="blue-bg-left"></div>
      <div className="blue-bg-right"></div>{" "}
    </div>
  );
}

export default ReviewYourReferenceCheckPage;
