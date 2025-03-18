import React, { useState } from "react";
import axios from "axios";

const QuestionDisplay = ({
  currentQuestionIndex,
  questions,
  answers,
  aiEnhancedAnswers,
  setAnswers,
  setIsEditing,
  handleUpdateEnhanceAnswer,
  isEditing,
}) => {
  const API = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");
  const [updating, setUpdating] = useState(false);
  const [editedOriginalAnswer, setEditedOriginalAnswer] = useState("");
  const [editedAIEnhancedAnswer, setEditedAIEnhancedAnswer] = useState("");
  const [editingType, setEditingType] = useState(null);

  const handleSaveOriginalAnswer = async () => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = editedOriginalAnswer;
      return newAnswers;
    });
    await handleNormalizedAnswers();
    setEditedOriginalAnswer("");
    setEditedAIEnhancedAnswer("");
    setIsEditing(false);
    setEditingType(null);
  };

  const handleSaveAIEnhancedAnswer = () => {
    handleUpdateEnhanceAnswer(editedAIEnhancedAnswer);
    setEditedOriginalAnswer("");
    setEditedAIEnhancedAnswer("");
    setIsEditing(false);
    setEditingType(null);
  };

  const handleDiscard = () => {
    setEditedOriginalAnswer("");
    setEditedAIEnhancedAnswer("");
    setIsEditing(false);
    setEditingType(null);
  };

  const handleNormalizedAnswers = async () => {
    try {
      setUpdating(true);

      const response = await axios.post(
        `${API}/api/ai-referee/reference/normalized-answer`,
        { answer: editedOriginalAnswer },
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
      </div>

      <p className="orig-label d-flex justify-content-between align-items-center">
        <strong>Original Answer:</strong>
        {isEditing && editingType === "original" ? null : (
          <button
            className="btn-edit"
            onClick={() => {
              setEditedOriginalAnswer(answers[currentQuestionIndex]);
              setIsEditing(true);
              setEditingType("original"); // Set editing type to original
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 5H3C2.46957 5 1.96086 5.21071 1.58579 5.58579C1.21071 5.96086 1 6.46957 1 7V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H12C12.5304 18 13.0391 17.7893 13.4142 17.4142C13.7893 17.0391 14 16.5304 14 16V15"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 3.00011L16 6.00011M17.385 4.58511C17.7788 4.19126 18.0001 3.65709 18.0001 3.10011C18.0001 2.54312 17.7788 2.00895 17.385 1.61511C16.9912 1.22126 16.457 1 15.9 1C15.343 1 14.8088 1.22126 14.415 1.61511L6 10.0001V13.0001H9L17.385 4.58511Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Edit Answers
          </button>
        )}
      </p>
      <div className={`answer-container mb-3 ${isEditing ? "edit" : ""}`}>
        {" "}
        {isEditing && editingType === "original" ? (
          <textarea
            value={editedOriginalAnswer}
            onChange={(e) => setEditedOriginalAnswer(e.target.value)}
            rows={2}
            className="answer-textarea"
          />
        ) : (
          <p>{answers[currentQuestionIndex]}</p>
        )}
      </div>

      {isEditing && editingType === "original" && (
        <div className="action-buttons d-flex gap-3 mb-3">
          <button
            className={`btn-save ${updating ? "disabled" : ""}`}
            onClick={handleSaveOriginalAnswer}
            disabled={updating}
          >
            {updating ? "Saving..." : "Save"}
          </button>
          <button
            className={`btn-discard ${updating ? "disabled" : ""}`}
            onClick={handleDiscard}
            disabled={updating}
          >
            Discard
          </button>
        </div>
      )}

      <p className="ai-enhanced-label d-flex justify-content-between align-items-center">
        <strong>AI Enhanced Answer:</strong>
        {isEditing && editingType === "aiEnhanced" ? null : (
          <button
            className="btn-edit"
            onClick={() => {
              setEditedAIEnhancedAnswer(
                aiEnhancedAnswers[currentQuestionIndex]
              );
              setIsEditing(true);
              setEditingType("aiEnhanced");
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 5H3C2.46957 5 1.96086 5.21071 1.58579 5.58579C1.21071 5.96086 1 6.46957 1 7V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H12C12.5304 18 13.0391 17.7893 13.4142 17.4142C13.7893 17.0391 14 16.5304 14 16V15"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 3.00011L16 6.00011M17.385 4.58511C17.7788 4.19126 18.0001 3.65709 18.0001 3.10011C18.0001 2.54312 17.7788 2.00895 17.385 1.61511C16.9912 1.22126 16.457 1 15.9 1C15.343 1 14.8088 1.22126 14.415 1.61511L6 10.0001V13.0001H9L17.385 4.58511Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Edit Answers
          </button>
        )}
      </p>
      <div
        className={`ai-enhanced-answer-container mb-3 ${
          isEditing ? "edit" : ""
        }`}
      >
        {" "}
        {isEditing && editingType === "aiEnhanced" ? (
          <textarea
            value={editedAIEnhancedAnswer}
            onChange={(e) => setEditedAIEnhancedAnswer(e.target.value)}
            rows={2}
            className="answer-textarea"
          />
        ) : (
          <p>{aiEnhancedAnswers[currentQuestionIndex]}</p>
        )}
      </div>

      {isEditing && editingType === "aiEnhanced" && (
        <div className="action-buttons d-flex gap-3 mb-3">
          <button className="btn-save" onClick={handleSaveAIEnhancedAnswer}>
            Save
          </button>
          <button className="btn-discard" onClick={handleDiscard}>
            Discard
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
