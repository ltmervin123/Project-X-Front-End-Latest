import React, { useState, useEffect, useRef } from "react";
import "../styles/ReferenceCheckQuestionnairePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorAccessCam from "../components/Error/ErrorAccessCam";
import TextBase from "../components/ReferenceCheckQuestionnaire/TextBase";
import AudioBase from "../components/ReferenceCheckQuestionnaire/AudioBase";
import loadingAnimation from "../assets/loading.gif";

import axios from "axios";
const ReferenceCheckQuestionnairePage = () => {
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
  const [questions, setQuestions] = useState([]); //State the hold answers in array form
  const [answered, setAnswered] = useState([]); //State that hold ans
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [referenceQuestionsData, setReferenceQuestionsData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isReattemptingCamera, setIsReattemptingCamera] = useState(false);
  const [micError, setMicError] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  //Refs
  const audioRef = useRef(null);

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

  const speak = async (text) => {
    setIsSpeaking(true);
    const token = localStorage.getItem("token");
    const voice = "stella";
    try {
      const voiceType = voice.toLowerCase();
      const payload = { text, voiceType };
      const response = await axios.post(
        `${API}/api/ai-referee/reference/question-to-audio`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { audio } = response.data;

      const audioBlob = new Blob(
        [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
        {
          type: "audio/mp3",
        }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);

      audioRef.current = audioElement;

      // Return a promise that resolves when the audio ends
      return new Promise((resolve, reject) => {
        audioElement.onended = () => {
          resolve();
        };
        audioElement.onerror = reject;
        audioElement.play().catch(reject);
      });
    } catch (error) {
      console.error("Error fetching audio:", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  //Audio clean up
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [questions, currentQuestionIndex]);

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

  // Prevent accidental page exit
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  //Add a warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(
        "Are you sure you want to go back? Your progress will be lost."
      );
      if (!userConfirmed) {
        window.history.pushState(null, "", window.location.pathname); // Prevent going back
      }
    };

    window.history.pushState(null, "", window.location.pathname); // Push state to prevent immediate back
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  // Load questions on mount
  useEffect(() => {
    const formattedQuestions = getQuestions();
    setQuestions(formattedQuestions);
    setAnswered(Array(formattedQuestions.length).fill(""));
    setReferenceQuestionsData(formatReferenceQuestions());
  }, []);

  useEffect(() => {
    const initializeMicPermissionWhenRender = async () => {
      if (selectedMethod === "VOICE_BASE") {
        await initializeMicPermission();
      }
    };

    initializeMicPermissionWhenRender();
  }, []);

  //Convert question into text to speech when thier is a question
  useEffect(() => {
    //Only speak when thier is question
    const speakQuestion = async () => {
      if (questions.length > 0) {
        await speak(questions[currentQuestionIndex]);
      }
    };

    speakQuestion();
  }, [questions, currentQuestionIndex]);

  //Function that asks for permission to use microphone
  const initializeMicPermission = async () => {
    setIsReattemptingCamera(true);
    setMicError(false);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      setMicError(true);
    } finally {
      setIsReattemptingCamera(false);
    }
  };

  // Handle answer submission
  const handleSubmit = async () => {
    await attachAnswer();
    setAnswered((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = currentAnswer;
      return updatedAnswers;
    });

  };

  // Attach answer to referenceQuestionsData
  const attachAnswer = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const normalizedAnswer = await handleNormalizedAnswers();

    setReferenceQuestionsData((prevData) =>
      prevData.map((categoryItem) => {
        const questionIndex = categoryItem.questions.indexOf(currentQuestion);
        if (questionIndex !== -1) {
          categoryItem.answers[questionIndex] = currentAnswer;
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
        { answer: currentAnswer },
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

  // Navigation handlers
  const prevQuestion = () =>
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));

  const nextQuestion = () =>{
    setCurrentAnswer("");
    setCurrentQuestionIndex((prev) =>
      prev < questions.length - 1 ? prev + 1 : prev
    );

  }

  const handleSetAnswer = (answer) => {
    setCurrentAnswer(answer);
  };

  if (isReattemptingCamera) {
    return (
      <div className="container-fluid d-flex align-items-center justify-content-center flex-column positio-relative">
        <div className="camera-retry-overlay">
          <img
            className="loadinganimation"
            animation="border"
            role="status"
            src={loadingAnimation}
            alt="loading..."
          />
          <p>Reattempting access to camera...</p>
        </div>
      </div>
    );
  }

  if (micError) {
    return <ErrorAccessCam onRetry={initializeMicPermission} />;
  }

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
          <AudioBase
            setAnswer={handleSetAnswer}
            handleSubmit={handleSubmit}
            answer={currentAnswer}
            loading={loading}
            isSpeaking={isSpeaking}
          />
        ) : (
          <TextBase
            setAnswer={handleSetAnswer}
            handleSubmit={handleSubmit}
            answer={currentAnswer}
            loading={loading}
            isSpeaking={isSpeaking}
          />
        )}
      </>

      <div className="orange-bg-bottom"></div>
      <div className="orange-bg-top"></div>
      <div className="blue-bg-left"></div>
      <div className="blue-bg-right"></div>
    </div>
  );
};

export default ReferenceCheckQuestionnairePage;
