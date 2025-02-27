import React, { useState, useEffect, use } from "react";
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
  const selectedMethod = location.state?.selectedMethod;
  const REFEREE = JSON.parse(localStorage.getItem("refereeData")) || {};
  const candidateName = REFEREE?.candidateName || "N/A";
  const referenceQuestions =
    JSON.parse(localStorage.getItem("referenceQuestions")) || {};

  const [questions, setQuestion] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");

  const [answered, setAnswered] = useState([]);
  const [inputedText, setInputedText] = useState("");
  const [referenceQuestionsData, setReferenceQuestionsData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const formatReferenceQuestions = () => {
    // Check if reference questions is not hr-hatch format return an empty array because its an Custom format
    if (
      !referenceQuestions ||
      referenceQuestions.formatType !== "HR-HATCH-FORMAT"
    ) {
      return [];
    }

    if (
      !referenceQuestions.questions ||
      typeof referenceQuestions.questions !== "object"
    ) {
      console.error("Questions object is missing or not valid.");
      return [];
    }

    return Object.entries(referenceQuestions.questions) // Access nested `questions` object
      .filter(([category, questions]) => Array.isArray(questions)) // Ensure values are arrays
      .map(([category, questions]) => ({
        category,
        questions: questions.map((q) =>
          typeof q === "string"
            ? q.replace(/\$\{candidateName\}/g, candidateName)
            : q
        ),
        answers: new Array(questions.length).fill(""),
      }));
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

  const handleTranscriptionChange = (event) => {
    setTranscription(event.target.value);
  };

  const handleInputedTextChange = (event) => {
    setInputedText(event.target.value);
  };

  const handleSubmit = () => {
    const updatedAnswers = [...answered];
    updatedAnswers[currentQuestionIndex] = inputedText;
    setAnswered(updatedAnswers);
    attachAnswer();
  };

  const saveReferenceQuestionsData = () => {
    localStorage.setItem(
      "referenceQuestionsData",
      JSON.stringify(referenceQuestionsData || [])
    );
  };

  const attachAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    setReferenceQuestionsData((prevData) => {
      return prevData
        .map((categoryItem) => {
          const { category, questions, answers } = categoryItem;
          const questionIndex = questions.indexOf(currentQuestion);

          if (questionIndex !== -1) {
            const updatedAnswers = [...answers];

            // ✅ Ensure array length matches questions length
            updatedAnswers.length = questions.length;

            updatedAnswers[questionIndex] = inputedText; // Attach answer

            return { ...categoryItem, answers: [...updatedAnswers] };
          }
          return categoryItem;
        })
        .map((item) => ({ ...item })); // **Ensure new reference**
    });
    setInputedText("");
  };

  const handleFinish = () => {
    saveReferenceQuestionsData();

    navigate("/reference-thankyou-msg");
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
    if (questions.length === 0) {
      setQuestion(getQuestions());
      setAnswered(new Array(getQuestions().length).fill(""));
      setReferenceQuestionsData(formatReferenceQuestions());
    }
  }, []);

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
    <div className="container-fluid main-container d-flex align-items-center justify-content-center flex-column positio-relative">
      <h2 className="referencecheckquestiontitle text-left mb-2">
        Reference Check Questionnaire
      </h2>

      <div className="referencecheckquestion-container mb-5">
        <div className="question-container">
          <p className="question-title">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p>{questions[currentQuestionIndex]}</p>
        </div>
        <div className="d-flex justify-content-end">
          <button
            onClick={nextQuestion}
            disabled={!answered[currentQuestionIndex]} // Disable if no answer is provided
            className={!answered[currentQuestionIndex] ? "disabled" : ""}
          >
            Next
            <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.7071 8.70711C27.0976 8.31658 27.0976 7.68342 26.7071 7.29289L20.3431 0.928932C19.9526 0.538408 19.3195 0.538408 18.9289 0.928932C18.5384 1.31946 18.5384 1.95262 18.9289 2.34315L24.5858 8L18.9289 13.6569C18.5384 14.0474 18.5384 14.6805 18.9289 15.0711C19.3195 15.4616 19.9526 15.4616 20.3431 15.0711L26.7071 8.70711ZM6.6645e-10 9L26 9L26 7L-6.6645e-10 7L6.6645e-10 9Z" fill="white"/>
</svg>

          </button>{" "}
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
                {currentQuestionIndex !== questions.length ? (
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
              value={inputedText}
              disabled={
                currentQuestionIndex === questions.length - 1 &&
                answered[currentQuestionIndex]
              }
              onChange={handleInputedTextChange}
              rows="4"
              placeholder={"Type your answer..."}
            />
            <div className="d-flex justify-content-center">
              {currentQuestionIndex === questions.length - 1 ? (
                <button onClick={handleFinish}>Submit</button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!inputedText}
                  className={!inputedText ? "disabled" : ""}
                >
                  Submit
                </button>
              )}
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
