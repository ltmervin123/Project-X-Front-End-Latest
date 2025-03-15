import React, { useState } from "react";
import axios from "axios";

const QuestionDisplay = ({
  currentQuestionIndex,
  questions,
  answers,
  aiEnhancedAnswers,
  showBothAnswers,
  setShowBothAnswers,
  isEditing,
  editedAnswer,
  setEditedAnswer,
  setAnswers,
  setIsEditing,
  handleUpdateEnhanceAnswer,
  handlePreviousQuestion,
  handleNextQuestion,
}) => {
  const API = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");
  const [updating, setUpdating] = useState(false);

  const handleSave = async () => {
    // Save edited answer
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = editedAnswer;
      return newAnswers;
    });

    // Fetch normalized answer from API
    await handleNormalizedAnswers();

    setEditedAnswer("");
    setIsEditing(false);
  };

  // Fetch normalized answer from API
  const handleNormalizedAnswers = async () => {
    try {
      setUpdating(true);

      const response = await axios.post(
        `${API}/api/ai-referee/reference/normalized-answer`,
        { answer: editedAnswer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        handleUpdateEnhanceAnswer(response?.data?.normalizedAnswer);
      }
    } catch (error) {
      console.error("Error fetching normalized answer:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="ReviewYourReferenceCheck-box-item h-100">
      <div className="question-container m-0">
        <p className="question-text ">
          <strong>Question {currentQuestionIndex + 1}:</strong>{" "}
          {questions[currentQuestionIndex]}
        </p>
        <div className="d-flex justify-content-end gap-3">
          <span>
            {showBothAnswers ? "Edit Original Answer  " : "Show Both Answers"}
          </span>
          <label className="question-option-switch">
            <input
              type="checkbox"
              checked={!showBothAnswers}
              onChange={() => setShowBothAnswers(!showBothAnswers)}
            />
            <span className="question-option-slider"></span>
          </label>
        </div>
      </div>

      {!showBothAnswers ? (
        <>
          <p className="orig-label">
            <strong>Original Answer:</strong>
          </p>
          <div className="answer-container mb-3">
            <p>{answers[currentQuestionIndex]}</p>
          </div>
          <p className="ai-enhanced-label">
            <strong>AI Enhanced Answer:</strong>
          </p>
          <div className="ai-enhanced-answer-container mb-3">
            <p>{aiEnhancedAnswers[currentQuestionIndex]}</p>
          </div>
        </>
      ) : (
        <>
          <p className="orig-label">
            <strong>Original Answer:</strong>
          </p>
          <div className="answer-container-extended mb-3">
            {isEditing ? (
              <textarea
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                rows={8}
                className="answer-textarea"
              />
            ) : (
              <p>{answers[currentQuestionIndex]}</p>
            )}
          </div>
          <div className="edit-save-button-container">
            {isEditing ? (
              <button
                className="btn-save"
                onClick={handleSave}
                disabled={updating}
              >
                {updating ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                className="btn-edit"
                onClick={() => {
                  setEditedAnswer(answers[currentQuestionIndex]);
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            )}
          </div>
        </>
      )}
      {/* Navigation Buttons */}
      {/* <div className="d-flex justify-content-center align-items-center gap-3 my-3 add-candidate-controller">
        <button
          type="button"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <svg
            width="16"
            height="26"
            viewBox="0 0 16 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.887082 11.5348L12.1048 0.12528L14.9566 2.92921L5.14091 12.9128L15.1245 22.7285L12.3205 25.5804L0.911051 14.3627C0.532944 13.9908 0.318009 13.484 0.313514 12.9537C0.309019 12.4234 0.515332 11.913 0.887082 11.5348Z"
              fill="#F46A05"
            />
          </svg>
        </button>
        <span className="d-flex align-items-center">
          {currentQuestionIndex + 1}
        </span>
        <button
          type="button"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          <svg
            width="16"
            height="26"
            viewBox="0 0 16 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.517 14.5231L3.203 25.8371L0.375 23.0091L10.275 13.1091L0.375 3.2091L3.203 0.381104L14.517 11.6951C14.8919 12.0702 15.1026 12.5788 15.1026 13.1091C15.1026 13.6394 14.8919 14.148 14.517 14.5231Z"
              fill="#F46A05"
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default QuestionDisplay;
