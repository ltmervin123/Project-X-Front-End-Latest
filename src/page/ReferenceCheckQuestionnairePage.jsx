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
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [inputedText, setInputedText] = useState("");
  const [referenceQuestionsData, setReferenceQuestionsData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleTranscriptionChange = (event) => {
    setTranscription(event.target.value);
  };

  const handleInputedTextChange = (event) => {
    setInputedText(event.target.value);
  };

  const handleSubmit = (event) => {
    // if (transcription.trim()) {
    //   const updatedAnswers = [...answers];
    //   updatedAnswers[currentQuestionIndex] = transcription; // Save the answer for the current question
    //   setAnswers(updatedAnswers);
    //   setAnswered((prevAnswered) => {
    //     const updatedAnswered = [...prevAnswered];
    //     updatedAnswered[currentQuestionIndex] = true; // Mark current question as answered
    //     return updatedAnswered;
    //   });
    //   setTranscription(""); // Reset the transcription input field
    // } else {
    //   alert("Please answer the question before moving to the next one.");
    // }

    const updatedAnswers = [...answered]; // Create a new copy of the array
    updatedAnswers[currentQuestionIndex] = inputedText; // Update the specific index
    setAnswered(updatedAnswers); // Update state
    setInputedText(""); // Clear the input field
  };

  const handleFinish = () => {
    // if (transcription.trim()) {
    //   const updatedAnswers = [...answers];
    //   updatedAnswers[currentQuestionIndex] = transcription; // Save the last answer
    //   setAnswers(updatedAnswers);
    // }

    // // Log the questions and answers when finishing the questionnaire
    // console.log("Questions and Answers:");
    // question.forEach((question, index) => {
    //   console.log(`${question}: ${answers[index]}`);
    // });

    navigate("/reference-review", {
      state: { questions: questions, answers: answers },
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

  useEffect(() => {
    console.log("referenceQuestionsData", referenceQuestionsData);
  }, [referenceQuestionsData]);

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
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center flex-column positio-relative">
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

        <div className="button-container d-flex align-items-center justify-content-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className="d-flex align-items-center justify-content-center"
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={answered[currentQuestionIndex] === ""} // Disable 'Next' if the current question is not answered
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
              value={inputedText} // Show transcription or saved answer
              onChange={handleInputedTextChange}
              rows="4"
              placeholder={"Type your answer..."}
            />
            <div className="d-flex justify-content-center">
              <button
                onClick={handleSubmit}
                disabled={!inputedText}
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
