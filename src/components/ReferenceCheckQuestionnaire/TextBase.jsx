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
  isLastQuestion,
  handleProceed,
  nextQuestion,
}) => {
  const handleInputedTextChange = (event) => {
    setTextBaseAnswer(event.target.value);
  };

  const handleReTry = () => {
    onReTrySubmit(false);
    setTextBaseAnswer("");
  };
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      answer: "Answer:",
      placeholder: "Type your answer...",
      retry: "Retry",
      proceed: "Proceed",
      next: "Next",
      submit: "Submit",
      submitting: "Submitting...",
    },
    Japanese: {
      answer: "回答:",
      placeholder: "回答を入力してください...",
      retry: "再試行",
      proceed: "進む",
      next: "次",
      submit: "送信",
      submitting: "送信中...",
    },
  };
  return (
    <div className="transcription-answer-container">
     <h4>{translations[language].answer}</h4>
     <textarea
  value={answer}
  disabled={loading || isSubmitted || reTry}
  onChange={handleInputedTextChange}
  rows="4"
  placeholder={translations[language].placeholder}
/>
      <div className="d-flex justify-content-center align-items-center my-2 mb-2">
        <div className="d-flex justify-content-center gap-3">
        {reTry ? (
  <>
    <button onClick={handleReTry}>{translations[language].retry}</button>
    {isLastQuestion ? (
      <button onClick={handleProceed}>{translations[language].proceed}</button>
    ) : (
      <button onClick={nextQuestion}>{translations[language].next}</button>
    )}
  </>
) : (
  <>
    <button
      onClick={handleTextBaseSubmit}
      disabled={!answer || loading || isSpeaking || isSubmitted}
      className={
        !answer || loading || isSpeaking || isSubmitted ? "disabled" : ""
      }
    >
      {loading ? translations[language].submitting : translations[language].submit}
    </button>
  </>
)}
        </div>
      </div>
    </div>
  );
};

export default TextBase;
