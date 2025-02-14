import React, { useState, useEffect } from "react";
import "../styles/ReferenceCheckQuestionnairePage.css";
import { useLocation, useNavigate } from "react-router-dom";

function ReferenceCheckQuestionnairePage() {
  const location = useLocation();
  const selectedMethod = location.state?.selectedMethod; // Access 'selectedMethod' from the state
  const navigate = useNavigate(); // Initialize useNavigate

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
  const [transcription, setTranscription] = useState("");
  const [answers, setAnswers] = useState(new Array(questions.length).fill("")); // Store answers for each question
  const [answered, setAnswered] = useState(new Array(questions.length).fill(false)); // Track whether a question has been answered

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

  const handleStart = () => {
    if (transcription.trim()) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = transcription; // Save the answer for the current question
      setAnswers(updatedAnswers);
      setAnswered((prevAnswered) => {
        const updatedAnswered = [...prevAnswered];
        updatedAnswered[currentQuestionIndex] = true; // Mark current question as answered
        return updatedAnswered;
      });
      setTranscription(""); // Reset the transcription input field
    } else {
      alert("Please answer the question before moving to the next one.");
    }
  };

  const handleFinish = () => {
    if (transcription.trim()) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = transcription; // Save the last answer
      setAnswers(updatedAnswers);
    }
  
    // Log the questions and answers when finishing the questionnaire
    console.log("Questions and Answers:");
    questions.forEach((question, index) => {
      console.log(`${question}: ${answers[index]}`);
    });
  
    navigate("/ReviewYourReferenceCheckPage", {
      state: { questions: questions, answers: answers }, // Pass the questions and answers
    });
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
            disabled={!answered[currentQuestionIndex]} // Disable 'Next' if the current question is not answered
            className="d-flex align-items-center justify-content-center"
          >
            Next
          </button>
        </div>
      </div>

      <div className="transcription-answer-container">
        <h4>{selectedMethod === "Voice Response" ? "Transcription:" : "Answer:"}</h4>
        <textarea
          value={answered[currentQuestionIndex] ? answers[currentQuestionIndex] : transcription} // Show transcription or saved answer
          onChange={handleTranscriptionChange}
          rows="4"
          placeholder={
            selectedMethod === "Voice Response"
              ? "Transcription will appear here...."
              : "Type your answer..."
          }
        />
        <div className="d-flex justify-content-center">
          {currentQuestionIndex === questions.length - 1 ? (
            <button onClick={handleFinish}>Finish</button> // Show Finish button on last question
          ) : (
            <button onClick={handleStart}>Start</button> // Start button to save answer and move to next question
          )}
        </div>
      </div>
    </div>
  );
}

export default ReferenceCheckQuestionnairePage;
