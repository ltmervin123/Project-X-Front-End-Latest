import React from "react";

const TextBase = ({
  setTextBaseAnswer,
  handleTextBaseSubmit,
  answer,
  loading,
  isSpeaking,
  isSubmitted,
  reTry,
  onReTrySubmit,
  nextQuestion, // Add this line
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
        disabled={loading || isSubmitted || reTry}
        onChange={handleInputedTextChange}
        rows="4"
        placeholder={"Type your answer..."}
      />
      <div className="d-flex justify-content-center align-items-center my-2 mb-2">
        <div className="d-flex justify-content-center gap-3">
          {reTry ? (
            <>
              {" "}
              <button onClick={handleReTry}>Retry</button>
              <button
                onClick={nextQuestion} // Ensure you have access to nextQuestion function

              >
                Next
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleTextBaseSubmit}
                disabled={!answer || loading || isSpeaking || isSubmitted}
                className={
                  !answer || loading || isSpeaking || isSubmitted
                    ? "disabled"
                    : ""
                }
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextBase;
