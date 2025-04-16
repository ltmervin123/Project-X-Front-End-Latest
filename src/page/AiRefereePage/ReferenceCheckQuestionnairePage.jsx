import React, { useState, useEffect, useRef } from "react";
import "../../styles/AiRefereeStyles/ReferenceCheckQuestionnairePage.css";
import { useNavigate } from "react-router-dom";
import ErrorAccessMic from "../../components/Error/ErrorAccessMic";
import TextBase from "../../components/ReferenceCheckQuestionnaire/TextBase";
import AudioBase from "../../components/ReferenceCheckQuestionnaire/AudioBase";
import OverAllAssesment from "../../components/Assessment/OverAllAssesment";
import loadingAnimation from "../../assets/loading.gif";
import AssessmentModal from "../../components/Assessment/OverAllAssesment.jsx";
import axios from "axios";

const CATEGORY_ORDER = {
  "Standard Format": [
    "relationship",
    "jobResponsibilitiesAndPerformance",
    "skillAndCompetencies",
    "workEthicAndBehavior",
    "closingQuestions",
  ],
  "Management Format": [
    "relationship",
    "jobResponsibilitiesAndPerformance",
    "leadershipAndManagementSkills",
    "workEthicAndBehavior",
    "closingQuestions",
  ],
  "Executive Format": [
    "relationship",
    "jobResponsibilitiesAndPerformance",
    "strategicLeadershipAndVision",
    "businessImpactAndResults",
    "teamLeadershipAndOrganizationalDevelopment",
    "decisionMakingAndProblemSolving",
    "innovationAndGrowth",
    "closingQuestions",
  ],
};

const CATEGORY_TO_RATE = [
  "jobResponsibilitiesAndPerformance",
  "skillAndCompetencies",
  "workEthicAndBehavior",
  "leadershipAndManagementSkills",
  "strategicLeadershipAndVision",
  "businessImpactAndResults",
  "teamLeadershipAndOrganizationalDevelopment",
  "decisionMakingAndProblemSolving",
  "innovationAndGrowth",
];

const TRANSLATIONS = {
  English: {
    referenceCheckQuestionnaire: "Reference Check Questionnaire",
    questionCategory: {
      relationship: "Relationship",
      jobResponsibilitiesAndPerformance: "Job Responsibilities and Performance",
      skillAndCompetencies: "Skills and Competencies",
      workEthicAndBehavior: "Work Ethic and Behavior",
      leadershipAndManagementSkills: "Leadership and Management Skills",
      strategicLeadershipAndVision: "Strategic Leadership and Vision",
      businessImpactAndResults: "Business Impact and Results",
      teamLeadershipAndOrganizationalDevelopment:
        "Team Leadership and Organizational Development",
      decisionMakingAndProblemSolving: "Decision Making and Problem Solving",
      innovationAndGrowth: "Innovation and Growth",
      closingQuestions: "Closing Questions",
    },
    leavePageConfirmation: "Are you sure you want to leave this page?",
    goBackConfirmation:
      "Are you sure you want to go back? Your progress will be lost.",
    reattemptingCamera: "Reattempting access to camera...",
    steps: [
      "Basic Information",
      "Select Language",
      "Choose Method",
      "Questionnaire",
      "Reference Completed",
    ],
  },
  Japanese: {
    referenceCheckQuestionnaire: "リファレンスチェック質問票",
    questionCategory: {
      relationship: "関係性",
      jobResponsibilitiesAndPerformance: "職務責任と実績",
      skillAndCompetencies: "スキルと能力",
      workEthicAndBehavior: "職業倫理と行動",
      leadershipAndManagementSkills: "リーダーシップとマネジメントスキル",
      strategicLeadershipAndVision: "戦略的リーダーシップとビジョン",
      businessImpactAndResults: "ビジネスへの影響と成果",
      teamLeadershipAndOrganizationalDevelopment:
        "チームリーダーシップと組織開発",
      decisionMakingAndProblemSolving: "意思決定と問題解決",
      innovationAndGrowth: "イノベーションと成長",
      closingQuestions: "最終質問",
    },
    leavePageConfirmation: "このページから移動してもよろしいですか？",
    goBackConfirmation: "前に戻ってもよろしいですか？進行状況は失われます。",
    reattemptingCamera: "カメラへのアクセスを再試行しています...",
    steps: ["基本情報", "言語選択", "方法選択", "アンケート", "参照完了"],
  },
};

const CURRENT_STEP = 4;

const ReferenceCheckQuestionnairePage = () => {
  // Constants
  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const selectedMethod = sessionStorage.getItem("interview-method");
  const language = sessionStorage.getItem("preferred-language") || "English";
  const STEPS = TRANSLATIONS[language].steps;
  const REFEREE = JSON.parse(sessionStorage.getItem("refereeData")) || {};
  const candidateName = REFEREE?.candidateName || "N/A";
  const referenceQuestions =
    JSON.parse(sessionStorage.getItem("referenceQuestions")) || {};

  // States
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [referenceQuestionsData, setReferenceQuestionsData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isReattemptingCamera, setIsReattemptingCamera] = useState(false);
  const [micError, setMicError] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reTry, setReTry] = useState(false);
  const [currentQuestionCategory, setCurrentQuestionCategory] = useState(null);
  const [hideQuestionSection, setHideQuestionSection] = useState(false);
  const [isAssessmentSubmitted, setIsAssessmentSubmitted] = useState(false);

  //Refs
  const audioRef = useRef(null);
  const streamRef = useRef(null);
  const assessmentRating = useRef(null);

  const setAssessmentRating = (rating) => {
    assessmentRating.current = rating;
  };

  const resetAssessmentRating = () => {
    assessmentRating.current = null;
  };

  const handleSubmitRating = (rating) => {
    setAssessmentRating(rating);
    setIsAssessmentSubmitted(false);
  };

  const formatReferenceQuestions = () => {
    if (
      referenceQuestions?.formatType !== "HR-HATCH-FORMAT" &&
      referenceQuestions?.formatType !== "CUSTOM-FORMAT"
    )
      return [];

    switch (referenceQuestions.formatType) {
      case "HR-HATCH-FORMAT":
        const format = referenceQuestions.format;
        const orderedCategories = CATEGORY_ORDER[format] || [];

        // Filter out categories base on the question format
        return orderedCategories
          .map((category) => {
            const qs = referenceQuestions.questions[category];
            if (!qs) return null;

            return {
              category,
              questions: qs.map((q) =>
                typeof q === "string"
                  ? q.replace(
                      /\$\{candidateName\}|\(candidate name\)/g,
                      candidateName
                    )
                  : q
              ),
              answers: Array(qs.length).fill(""),
              normalizedAnswers: Array(qs.length).fill(""),
              assessmentRating: null,
            };
          })
          .filter(Boolean);
      case "CUSTOM-FORMAT":
        return Object.entries(referenceQuestions.questions || {})
          .filter(([_, qs]) => Array.isArray(qs))
          .map(([category, qs]) => ({
            category,
            questions: qs.map((q) =>
              typeof q === "string"
                ? q.replace(
                    /\$\{candidateName\}|\(candidate name\)/g,
                    candidateName
                  )
                : q
            ),
            answers: Array(qs.length).fill(""),
            normalizedAnswers: Array(qs.length).fill(""),
            assessmentRating: Array(qs.length).fill("Not Available"),
          }));

      default:
        return [];
    }
  };

  const getQuestions = () => {
    const replaceCandidateName = (q) =>
      typeof q === "string"
        ? q.replace(/\$\{candidateName\}|\(candidate name\)/g, candidateName)
        : q;

    switch (referenceQuestions.formatType) {
      case "HR-HATCH-FORMAT": {
        const format = referenceQuestions.format;
        const orderedCategories = CATEGORY_ORDER[format];

        if (!orderedCategories) return [];

        return orderedCategories.flatMap(
          (category) =>
            referenceQuestions.questions[category]?.map(replaceCandidateName) ||
            []
        );
      }

      case "CUSTOM-FORMAT":
        return Array.isArray(referenceQuestions.questions)
          ? referenceQuestions.questions.map(replaceCandidateName).flat()
          : Object.values(referenceQuestions.questions || {})
              .flat()
              .map(replaceCandidateName);

      default:
        return [];
    }
  };

  const speak = async (text) => {
    const token = sessionStorage.getItem("token");
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

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      audioRef.current = audioElement;

      return new Promise((resolve) => {
        audioElement.onended = resolve;
        audioElement.onerror = (e) => {
          resolve();
        };
        audioElement.play().catch((err) => {
          resolve();
        });
      });
    } catch (error) {
      console.error("Error fetching audio:", error);
      return Promise.resolve();
    }
  };

  const initializeQuestions = () => {
    const formattedQuestions = getQuestions();
    setQuestions(formattedQuestions);
    setAnswered(Array(formattedQuestions.length).fill(""));
    setReferenceQuestionsData(formatReferenceQuestions());
  };

  //Audio clean up
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleProceed = () => {
    sessionStorage.setItem(
      "referenceQuestionsData",
      JSON.stringify(referenceQuestionsData)
    );
    navigate("/reference-thankyou-msg");
  };

  // Prevent accidental page exit
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = TRANSLATIONS[language].leavePageConfirmation;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [language]);

  //Add a warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(
        TRANSLATIONS[language].goBackConfirmation
      );
      if (!userConfirmed) {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname); // Push state to prevent immediate back
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  // Initialize microphone permission when voice-based method is selected
  useEffect(() => {
    const initializeMicPermissionWhenRender = async () => {
      // Check if selected method is voice-based and initialize microphone permission and questions
      if (selectedMethod === "VOICE_BASE") {
        await initializeMicPermission();
        return;
      }
      // Initialize questions when method is not voice-based
      initializeQuestions();
    };

    initializeMicPermissionWhenRender();
  }, []);

  //Convert question into text to speech when their is a question
  useEffect(() => {
    //Only speak when their is question
    const speakQuestion = async () => {
      if (questions.length > 0) {
        setIsSpeaking(true);
        try {
          await speak(questions[currentQuestionIndex]);
        } catch (error) {
          console.error("Error speaking question:", error);
        } finally {
          setIsSpeaking(false);
        }
      }
    };
    // Set the current question category based on the current question index
    const currentQuestionCategory = getQuestionCategory();
    setCurrentQuestionCategory(
      TRANSLATIONS[language].questionCategory[currentQuestionCategory]
    );

    // Speak the question when the component mounts or when the question changes
    speakQuestion();
  }, [questions, currentQuestionIndex]);

  //Function that asks for permission to use microphone
  const initializeMicPermission = async () => {
    setIsReattemptingCamera(true);
    setMicError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Initialize questions after user allow microphone access
      initializeQuestions();
    } catch (error) {
      setMicError(true);
    } finally {
      setIsReattemptingCamera(false);
    }
  };

  const handleTextBaseSubmit = async () => {
    setIsSubmitting(true);
    await attachAnswer(currentAnswer);
    setAnswered((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = currentAnswer;
      return updatedAnswers;
    });
    setIsSubmitting(false);

    setReTry(true);
  };

  const handleAudioBaseSubmit = async (answer) => {
    setIsSubmitting(true);
    await attachAnswer(answer);
    setAnswered((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = answer;
      return updatedAnswers;
    });
    setIsSubmitting(false);
  };

  // Attach answer to referenceQuestionsData
  const attachAnswer = async (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const normalizedAnswer = await handleNormalizedAnswers(answer);

    setReferenceQuestionsData((prevData) =>
      prevData.map((categoryItem) => {
        const questionIndex = categoryItem.questions.indexOf(currentQuestion);
        if (questionIndex !== -1) {
          categoryItem.answers[questionIndex] = answer;
          categoryItem.normalizedAnswers[questionIndex] =
            normalizedAnswer || "No Normalized Answer Available";
        }
        return { ...categoryItem };
      })
    );

    // Check if the current question is the last question in the category
    handleAssessmentRating();
  };

  const handleAssessmentRating = () => {
    //Check here if the category is in the list of categories to rate and category last question
    const CURRENT_QUESTION_CATEGORY = getQuestionCategory();
    const CURRENT_QUESTION = questions[currentQuestionIndex];

    if (CATEGORY_TO_RATE.includes(CURRENT_QUESTION_CATEGORY)) {
      const retrievedCurrentQuestion = referenceQuestionsData.find(
        (item) => item.category === CURRENT_QUESTION_CATEGORY
      );
      const categoryLastQuestionIndex =
        retrievedCurrentQuestion.questions.length - 1;
      const categoryLastQuestion =
        retrievedCurrentQuestion.questions[categoryLastQuestionIndex];
      if (CURRENT_QUESTION === categoryLastQuestion) {
        setIsAssessmentSubmitted(true);
      }
    }
  };

  const getQuestionCategory = () => {
    //Current question
    const currentQuestion = questions[currentQuestionIndex];

    //Reference Question data
    const currentQuestionCategory = referenceQuestionsData.find((category) =>
      category.questions.includes(currentQuestion)
    );
    return currentQuestionCategory ? currentQuestionCategory.category : null;
  };

  // Fetch normalized answer from API
  const handleNormalizedAnswers = async (answer) => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `${API}/api/ai-referee/reference/normalized-answer`,
        { answer: answer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.normalizedAnswer || "No Normalized Answer Available";
    } catch (error) {
      console.error("Error fetching normalized answer:", error);
      return "No Normalized Answer Available";
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    setReTry(false);
    setCurrentAnswer("");
    setIsSubmitting(false);

    const { current, total } = getCurrentCategoryQuestionInfo();
    const currentCategory = getQuestionCategory();

    // If we're at the end of a category
    if (current === total) {
      // For relationship and closingQuestions, just move to next question
      if (
        currentCategory === "relationship" ||
        currentCategory === "closingQuestions"
      ) {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      } else {
        // For other categories, show assessment
        setHideQuestionSection(true);
        setIsAssessmentSubmitted(false);
      }
    } else {
      // If not at the end of category, just move to next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }
  };

  const setTextBaseAnswer = (answer) => {
    setCurrentAnswer(answer);
  };

  const setAudioBaseAnswer = (answer) => {
    setCurrentAnswer(answer);
  };

  const handleRetry = (value) => {
    setReTry(value);
    setAnswered((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = "";
      return updatedAnswers;
    });
  };

  const getCurrentCategoryQuestionInfo = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const categoryData = referenceQuestionsData.find((category) =>
      category.questions.includes(currentQuestion)
    );

    if (!categoryData) return { current: 0, total: 0 };

    const questionIndex = categoryData.questions.indexOf(currentQuestion);
    return {
      current: questionIndex + 1,
      total: categoryData.questions.length,
    };
  };

  const handleAssessmentSubmit = (rating) => {
    setAssessmentRating(rating);

    const currentQuestion = questions[currentQuestionIndex];

    setReferenceQuestionsData((prevData) =>
      prevData.map((categoryItem) => {
        const questionIndex = categoryItem.questions.indexOf(currentQuestion);
        if (questionIndex !== -1) {
          return {
            ...categoryItem,
            assessmentRating: rating,
          };
        }
        return { ...categoryItem };
      })
    );
    setIsAssessmentSubmitted(true);
    setHideQuestionSection(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const shouldShowAssessment = () => {
    const currentCategory = getQuestionCategory();
    return (
      currentCategory !== "relationship" &&
      currentCategory !== "closingQuestions"
    );
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
          <p>{TRANSLATIONS[language].reattemptingCamera}</p>
        </div>
      </div>
    );
  }

  if (micError) {
    return <ErrorAccessMic onRetry={initializeMicPermission} />;
  }

  return (
    <div className="container-fluid login-page-container main-container d-flex align-items-center justify-content-center flex-column positio-relative">
      <div className="reference-progress-indicator mt-5">
        {STEPS.map((step, index) => (
          <div key={index} className="reference-step-container">
            <div
              className={`step ${CURRENT_STEP >= index + 1 ? "active" : ""}`} // Change here
            >
              <div className="bullet">{index + 1}</div>
              {index < STEPS.length - 1 && <div className="line" />}{" "}
            </div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>

      {hideQuestionSection && shouldShowAssessment() ? (
        <OverAllAssesment
          onSubmit={handleAssessmentSubmit}
          category={currentQuestionCategory}
        />
      ) : (
        <>
          <h2
            className="referencecheckquestiontitle text-left mb-2"
            style={{ display: hideQuestionSection ? "none" : "block" }}
          >
            {TRANSLATIONS[language].referenceCheckQuestionnaire}
          </h2>

          <div
            className="referencecheckquestion-container mb-5"
            style={{ display: hideQuestionSection ? "none" : "block" }}
          >
            <div className="question-container">
              <p className="question-title w-100 d-flex justify-content-between">
                {currentQuestionCategory}

                <span>
                  {" "}
                  <span className="color-orange">
                    {" "}
                    {getCurrentCategoryQuestionInfo().current}
                  </span>{" "}
                  / {getCurrentCategoryQuestionInfo().total}
                </span>
              </p>
              <p>{questions[currentQuestionIndex]}</p>
            </div>
          </div>
        </>
      )}

      <>
        {selectedMethod === "VOICE_BASE" ? (
          <AudioBase
            setAudioBaseAnswer={setAudioBaseAnswer}
            handleAudioBaseSubmit={handleAudioBaseSubmit}
            reTry={reTry}
            onReTryRecording={handleRetry}
            isSubmitting={isSubmitting}
            answer={currentAnswer}
            isSpeaking={isSpeaking}
            streamRef={streamRef}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            handleProceed={handleProceed}
            nextQuestion={nextQuestion}
            hideQuestionSection={hideQuestionSection}
          />
        ) : (
          <TextBase
            setTextBaseAnswer={setTextBaseAnswer}
            handleTextBaseSubmit={handleTextBaseSubmit}
            answer={currentAnswer}
            loading={loading}
            isSpeaking={isSpeaking}
            isSubmitted={isSubmitting}
            reTry={reTry}
            onReTrySubmit={handleRetry}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            handleProceed={handleProceed}
            nextQuestion={nextQuestion}
            hideQuestionSection={hideQuestionSection}
          />
        )}
      </>
    </div>
  );
};

export default ReferenceCheckQuestionnairePage;
