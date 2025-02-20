import React, { useState, useEffect } from "react";
import "../styles/ReferenceCheckQuestionnairePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaMicrophone,
  FaMicrophoneAltSlash,
  FaMicrophoneSlash,
} from "react-icons/fa";

function ReferenceCheckQuestionnairePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const REFEREE = JSON.parse(localStorage.getItem("refereeData")) || {};
  const [candidateName, setCandidateName] = useState(
    REFEREE?.candidateName || ""
  );
  const selectedMethod = location.state?.selectedMethod;
  const referenceQuestions =
    JSON.parse(localStorage.getItem("referenceQuestions")) || {};
  const [question, setQuestion] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [inputedText, setInputedText] = useState("");

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getQuestions = () => {
    switch (referenceQuestions.formatType) {
      case "HR-HATCH-FORMAT":
        return Object.values(referenceQuestions?.questions || {})
          .flat()
          .map((q) => q.replace(/\$\{candidateName\}/g, candidateName)); // Replace placeholders
      case "CUSTOM_FORMAT":
        return (referenceQuestions?.questions || []).map((q) =>
          q.replace(/\$\{candidateName\}/g, candidateName)
        );
      default:
        return [];
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

  const handleInputedTextChange = (event) => {
    setInputedText(event.target.value);
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

    console.log("Recording started...");
  };

  const stopRecording = () => {
    setIsRecording(false);

    console.log("Recording stopped...");
  };

  // Load questions from local storage
  useEffect(() => {
    if (question.length === 0) {
      setQuestion(getQuestions);
    }
  }, [referenceQuestions]);

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

      <>
        {selectedMethod === "VOICE_BASE" ? (
          <div className="transcription-answer-container">
            <h4>Transcription:</h4>
            <textarea
              value={transcription}
              onChange={handleTranscriptionChange}
              rows="4"
              placeholder={"Transcription will appear here...."}
              disabled={true}
            />
            <div className="d-flex justify-content-center">
              <div>
                {currentQuestionIndex !== question.length ? (
                  isRecording ? (
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
                  )
                ) : (
                  <button onClick={handleFinish}>Finish</button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="transcription-answer-container">
            <h4>Answer:</h4>
            <textarea
              value={inputedText} // Show transcription or saved answer
              onChange={handleInputedTextChange}
              rows="4"
              placeholder={"Type your answer..."}
            />
            <div className="d-flex justify-content-center">
              <button
                onClick={handleSubmit}
                disabled={answered[currentQuestionIndex]}
                className={!inputedText ? "disabled" : ""}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </>

      <div className="orange-bg-bottom"></div>
      <div className="orange-bg-top"></div>
      <div className="blue-bg-left"></div>
      <div className="blue-bg-right"></div>
    </div>
  );
}

export default ReferenceCheckQuestionnairePage;
