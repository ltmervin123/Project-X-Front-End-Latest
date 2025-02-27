import React, { useState, useEffect, use } from "react";
import "../styles/ReferenceCheckQuestionnairePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMicrophone, FaMicrophoneAltSlash } from "react-icons/fa";
import {
  socket,
  connectSocket,
  disconnectSocket,
} from "../utils/socket/socketSetup";
import axios from "axios";
function ReferenceCheckQuestionnairePage() {
  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMethod = location.state?.selectedMethod;

  // Retrieve stored data
  const REFEREE = JSON.parse(localStorage.getItem("refereeData")) || {};
  const candidateName = REFEREE?.candidateName || "N/A";
  const referenceQuestions =
    JSON.parse(localStorage.getItem("referenceQuestions")) || {};

  // States
  const [questions, setQuestions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [answered, setAnswered] = useState([]);
  const [inputedText, setInputedText] = useState("");
  const [referenceQuestionsData, setReferenceQuestionsData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Format reference questions
  const formatReferenceQuestions = () => {
    if (referenceQuestions?.formatType !== "HR-HATCH-FORMAT") return [];

    return Object.entries(referenceQuestions.questions || {})
      .filter(([_, qs]) => Array.isArray(qs))
      .map(([category, qs]) => ({
        category,
        questions: qs.map((q) =>
          typeof q === "string"
            ? q.replace(/\$\{candidateName\}/g, candidateName)
            : q
        ),
        answers: Array(qs.length).fill(""),
        normalizedAnswers: Array(qs.length).fill(""),
      }));
  };

  // Get questions based on format type
  const getQuestions = () => {
    switch (referenceQuestions.formatType) {
      case "HR-HATCH-FORMAT":
        return Object.values(referenceQuestions?.questions || {})
          .flat()
          .map((q) => q.replace(/\$\{candidateName\}/g, candidateName));
      case "CUSTOM_FORMAT":
        return (referenceQuestions?.questions || []).map((q) =>
          q.replace(/\$\{candidateName\}/g, candidateName)
        );
      default:
        return [];
    }
  };

  // Navigate to Thank You page when last question is answered
  useEffect(() => {
    if (
      currentQuestionIndex === questions.length - 1 &&
      answered[currentQuestionIndex]
    ) {
      localStorage.setItem(
        "referenceQuestionsData",
        JSON.stringify(referenceQuestionsData)
      );
      navigate("/reference-thankyou-msg");
    }
  }, [
    referenceQuestionsData,
    answered,
    currentQuestionIndex,
    questions.length,
    navigate,
  ]);

  // Connect socket on mount
  useEffect(() => {
    // Connect to the socket when component mounts
    connectSocket();

    socket.on("connect", () => {
      console.log("✅ Connected to the WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Disconnected from the server");
    });

    // Disconnect from the socket when component unmounts
    return () => {
      disconnectSocket();
    };
  }, []);
  
  // Prevent accidental page exit
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Load questions on mount
  useEffect(() => {
    const formattedQuestions = getQuestions();
    setQuestions(formattedQuestions);
    setAnswered(Array(formattedQuestions.length).fill(""));
    setReferenceQuestionsData(formatReferenceQuestions());
  }, []);

  // Handle answer submission
  const handleSubmit = async () => {
    await attachAnswer();
    setAnswered((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = inputedText;
      return updatedAnswers;
    });
    setInputedText("");
    nextQuestion();
  };

  // Attach answer to referenceQuestionsData
  const attachAnswer = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const normalizedAnswer = await handleNormalizedAnswers();

    setReferenceQuestionsData((prevData) =>
      prevData.map((categoryItem) => {
        const questionIndex = categoryItem.questions.indexOf(currentQuestion);
        if (questionIndex !== -1) {
          categoryItem.answers[questionIndex] = inputedText;
          categoryItem.normalizedAnswers[questionIndex] =
            normalizedAnswer || "No Normalized Answer Available";
        }
        return { ...categoryItem };
      })
    );
  };

  // Fetch normalized answer from API
  const handleNormalizedAnswers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API}/api/ai-referee/reference/normalized-answer`,
        { answer: inputedText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.normalizedAnswer || "";
    } catch (error) {
      console.error("Error fetching normalized answer:", error);
      return "";
    } finally {
      setLoading(false);
    }
  };

  //Handle text base answer change
  const handleInputedTextChange = (event) => {
    setInputedText(event.target.value);
  };

  //Start recording
  const startRecording = () => {};

  //Stop recording
  const stopRecording = () => {};

  // Navigation handlers
  const prevQuestion = () =>
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));

  const nextQuestion = () =>
    setCurrentQuestionIndex((prev) =>
      prev < questions.length - 1 ? prev + 1 : prev
    );

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
                  <button onClick={() => navigate("/reference-thankyou-msg")}>
                    Finish
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="transcription-answer-container">
            <h4>Answer:</h4>
            <textarea
              value={inputedText}
              disabled={loading}
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
