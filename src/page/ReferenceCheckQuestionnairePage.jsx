import React, { useState, useEffect } from "react";
import "../styles/ReferenceCheckQuestionnairePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaMicrophone,
  FaMicrophoneAltSlash,
  FaMicrophoneSlash,
} from "react-icons/fa";

function ReferenceCheckQuestionnairePage() {
  const location = useLocation();
  const selectedMethod = location.state?.selectedMethod; // Access 'selectedMethod' from the state
  const navigate = useNavigate(); // Initialize useNavigate
  const referenceQuestions =
    JSON.parse(localStorage.getItem("referenceQuestions")) || {};

  const getQuestions = () => {
    switch (referenceQuestions.formatType) {
      case "HR-HATCH-FORMAT":
        return Object.values(referenceQuestions?.questions || {}).flat();
      case "CUSTOM_FORMAT":
        return referenceQuestions?.questions || [];
      default:
        return [];
    }
  };
  const [question, setQuestion] = useState(getQuestions);
  useEffect(() => {}, [selectedMethod]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [answers, setAnswers] = useState(new Array(question.length).fill("")); // Store answers for each question
  const [answered, setAnswered] = useState(
    new Array(question.length).fill(false)
  ); // Track whether a question has been answered

  const [isRecording, setIsRecording] = useState(false); // Track if recording is in progress

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleTranscriptionChange = (event) => {
    setTranscription(event.target.value);
  };

  const handleSubmit = () => {
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
    question.forEach((question, index) => {
      console.log(`${question}: ${answers[index]}`);
    });

    navigate("/reference-review", {
      state: { questions: question, answers: answers }, // Pass the questions and answers
    });
  };

  const startRecording = () => {
    setIsRecording(true);
    // Implement your start recording logic here
    console.log("Recording started...");
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Implement your stop recording logic here
    console.log("Recording stopped...");
    // You can update the transcription with the recorded content here
  };

  // Prevent user from leaving the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?"; // Standard message for modern browsers
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center flex-column positio-relative">
      <h2 className="referencecheckquestiontitle text-left mb-2">
        Reference Check Questionnaire
      </h2>

      <div className="referencecheckquestion-container mb-5">
        <div className="question-container">
          <p className="question-title">
            Question {currentQuestionIndex + 1} of {question.length}
          </p>
          <p>{question[currentQuestionIndex]}</p>
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
        <h4>
          {selectedMethod === "Voice Response" ? "Transcription:" : "Answer:"}
        </h4>
        <textarea
          value={
            selectedMethod === "Voice Response"
              ? transcription
              : answered[currentQuestionIndex]
              ? answers[currentQuestionIndex]
              : transcription
          } // Show transcription or saved answer
          onChange={handleTranscriptionChange}
          rows="4"
          placeholder={
            selectedMethod === "Voice Response"
              ? "Transcription will appear here...."
              : "Type your answer..."
          }
          disabled={selectedMethod === "Voice Response"} // Disable input for Voice Response
        />
        <div className="d-flex justify-content-center">
          {selectedMethod === "Voice Response" ? (
            <div>
              {isRecording ? (
                <button
                  className="d-flex gap-2 align-items-center justify-content"
                  onClick={stopRecording}
                >
                  <FaMicrophoneAltSlash />
                  Stop Recording
                </button>
              ) : (
                <button
                  className="d-flex gap-2 align-items-center justify-content"
                  onClick={startRecording}
                >
                  <FaMicrophone />
                  Start Recording
                </button>
              )}
            </div>
          ) : currentQuestionIndex === question.length - 1 ? (
            <button onClick={handleFinish}>Finish</button> // Show Finish button on last question
          ) : (
            <button
              onClick={handleSubmit}
              disabled={answered[currentQuestionIndex]} // Disable submit button after answering
              className={answered[currentQuestionIndex] ? "disabled" : ""}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="orange-bg-bottom"></div>
      <div className="orange-bg-top"></div>
      <div className="blue-bg-left"></div>
      <div className="blue-bg-right"></div>
    </div>
  );
}

export default ReferenceCheckQuestionnairePage;
