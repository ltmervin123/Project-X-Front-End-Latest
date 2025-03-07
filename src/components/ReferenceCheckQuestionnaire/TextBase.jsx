import React from "react";
import "../../styles/ReferenceCheckQuestionnairePage.css";

const TextBase = ({
  setTextBaseAnswer,
  handleTextBaseSubmit,
  answer,
  loading,
  isSpeaking,
  isSubmitted,
  reTry,
  onReTrySubmit,
}) => {
  const handleInputedTextChange = (event) => {
    setTextBaseAnswer(event.target.value);
  };

  const handleReTry = () => {
    onReTrySubmit(false);
    setTextBaseAnswer("");
  };

  return (
    <div className="transcription-answer-container">
      <h4>Answer:</h4>
      <textarea
        value={answer}
        disabled={loading || isSubmitted} // Update this line
        onChange={handleInputedTextChange}
        rows="4"
        placeholder={"Type your answer..."}
      />
      <div className="d-flex justify-content-center">
        {reTry ? (
          <button onClick={handleReTry}>Retry</button>
        ) : (
          <button
            onClick={handleTextBaseSubmit}
            disabled={!answer || loading || isSpeaking || isSubmitted} // Add isSubmitted here
            className={
              !answer || loading || isSpeaking || isSubmitted ? "disabled" : ""
            }
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextBase;
