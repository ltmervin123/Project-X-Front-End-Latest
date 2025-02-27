import React, { useState, useEffect, use } from "react";
import "../styles/ReferenceCheckQuestionnairePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMicrophone, FaMicrophoneAltSlash } from "react-icons/fa";
import axios from "axios";
function ReferenceCheckQuestionnairePage() {
  const API = process.env.REACT_APP_API_URL;
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
  const [loading, setLoading] = useState(false);
  const [currentNormalizedAnswer, setCurrentNormalizedAnswer] = useState("");
  const [normalizedAnswers, setNormalizedAnswers] = useState([]);

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
        normalizedAnswers: new Array(questions.length).fill(""),
      }));
  };

  const handleFinish = () => {};

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

  const handleSubmit = async () => {
    const updatedAnswers = [...answered];
    updatedAnswers[currentQuestionIndex] = inputedText;
    const updatedNormalizedAnswers = [...normalizedAnswers];
    await handleNormalizedAnswers();
    setAnswered(updatedAnswers);
    attachAnswer();
    nextQuestion();
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
            const updatedNormalizedAnswers = [...normalizedAnswers];

            updatedAnswers.length = questions.length;
            updatedNormalizedAnswers.length = questions.length;
            updatedAnswers[questionIndex] = inputedText;
            updatedNormalizedAnswers[questionIndex] =
              currentNormalizedAnswer || "";
            return { ...categoryItem, answers: [...updatedAnswers] };
          }
          return categoryItem;
        })
        .map((item) => ({ ...item }));
    });
    setInputedText("");
    setCurrentNormalizedAnswer("");
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const handleNormalizedAnswers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const URL = `${API}/api/ai-referee/reference/normalized-answer`;
      const payload = { answer: inputedText };
      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentNormalizedAnswer(response.data.normalizedAnswer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Load questions from local storage
  useEffect(() => {
    if (questions.length === 0) {
      setQuestion(getQuestions());
      setAnswered(new Array(getQuestions().length).fill(""));
      setReferenceQuestionsData(formatReferenceQuestions());
    }
  }, []);

  //Check the last question if answer and navigate to thank you page
  useEffect(() => {
    if (
      currentQuestionIndex === questions.length - 1 &&
      answered[currentQuestionIndex]
    ) {
      // Save data to local storage and navigate to thank you page
      saveReferenceQuestionsData();
      navigate("/reference-thankyou-msg");
    }
  }, [currentNormalizedAnswer, answered]);

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
              // disabled={
              //   currentQuestionIndex === questions.length - 1 &&
              //   answered[currentQuestionIndex]
              // }
              onChange={handleInputedTextChange}
              rows="4"
              placeholder={"Type your answer..."}
            />
            <div className="d-flex justify-content-center">
              <button
                onClick={handleSubmit}
                disabled={!inputedText || loading}
                className={!inputedText || loading ? "disabled" : ""}
              >
                {loading ? "Submitting..." : "Submit"}
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
