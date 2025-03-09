import React from "react";

const QuestionDisplay = ({
  currentQuestionIndex,
  questions,
  answers,
  normalizedAnswers,
  showBothAnswers,
  setShowBothAnswers,
  isEditing,
  editedAnswer,
  setEditedAnswer,
  setAnswers,
  setIsEditing,
}) => {
  const handleSave = () => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = editedAnswer;
      return newAnswers;
    });
    setEditedAnswer("");
    setIsEditing(false);
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
            {showBothAnswers ? "Show Both Answer " : "Original Answer"}
          </span>
          <label className="question-option-switch">
            <input
              type="checkbox"
              checked={showBothAnswers}
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
          <p className="normalize-label">
            <strong>Normalize Answer:</strong>
          </p>
          <div className="normalize-answer-container mb-3">
            <p>{normalizedAnswers[currentQuestionIndex]}</p>
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
              <button onClick={handleSave}>Save</button>
            ) : (
              <button
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
