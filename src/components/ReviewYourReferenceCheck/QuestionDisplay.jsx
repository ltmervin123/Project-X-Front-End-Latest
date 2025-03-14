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
            {" "}
            {/* Changed label */}
            <strong>AI Enhanced Answer:</strong> {/* Changed label */}
          </p>
          <div className="ai-enhanced-answer-container mb-3">
            {" "}
            {/* Changed class name */}
            <p>{aiEnhancedAnswers[currentQuestionIndex]}</p>{" "}
            {/* Changed variable */}
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
    </div>
  );
};

export default QuestionDisplay;
