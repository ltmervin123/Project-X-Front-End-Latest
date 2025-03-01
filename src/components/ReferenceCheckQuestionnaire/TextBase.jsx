import React from "react";
import "../../styles/ReferenceCheckQuestionnairePage.css";

const TextBase = ({
  setAnswer,
  handleSubmit,
  answer,
  loading,
  isSpeaking,
  isSubmitted,
}) => {
  //Handle text base answer change
  const handleInputedTextChange = (event) => {
    setAnswer(event.target.value);
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
        <button
          onClick={handleSubmit}
          disabled={!answer || loading || isSpeaking || isSubmitted} // Add isSubmitted here
          className={
            !answer || loading || isSpeaking || isSubmitted ? "disabled" : ""
          } // Update className condition
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default TextBase;
