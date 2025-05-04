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
      "Choose Method",
      "Questionnaire",
      "Reference Completed",
    ],
    question: "Question",
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
    steps: ["基本情報", "方法選択", "アンケート", "参照完了"],
    question: "質問",
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
                      /\$\{candidateName\}|\(candidate name\)|\(applicant name\)/g,
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
                    /\$\{candidateName\}|\(candidate name\)|\(applicant name\)/g,
                    candidateName
                  )
                : q
            ),
            answers: Array(qs.length).fill(""),
            normalizedAnswers: Array(qs.length).fill(""),
            assessmentRating: null,
          }));

      default:
        return [];
    }
  };

  const getQuestions = () => {
    const replaceCandidateName = (q) =>
      typeof q === "string"
        ? q.replace(
            /\$\{candidateName\}|\(candidate name\)|\(applicant name\)/g,
            candidateName
          )
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
    //old
    // navigate("/reference-thankyou-msg");
    // new
    navigate("/reference-review");

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

  // Add this new helper function
  const getCategoryForQuestionIndex = (questionIndex) => {
    const question = questions[questionIndex];
    const category = referenceQuestionsData.find((cat) =>
      cat.questions.includes(question)
    );
    return category ? category.category : null;
  };

  // Add this helper function to determine if a bullet is an assessment
  const isAssessmentBullet = (index) => {
    const category = getCategoryForQuestionIndex(index);
    const prevCategory =
      index > 0 ? getCategoryForQuestionIndex(index - 1) : null;

    return (
      category !== prevCategory &&
      CATEGORY_TO_RATE.includes(prevCategory) &&
      index > 0
    );
  };

  // Add this helper function to calculate total questions including assessments
  const getTotalCount = () => {
    let count = questions.length; // Start with total questions

    // Add assessment count for each category that needs rating
    referenceQuestionsData.forEach((category) => {
      if (CATEGORY_TO_RATE.includes(category.category)) {
        count++; // Add one for each category that needs assessment
      }
    });

    return count;
  };

  // Add this helper to get all items (questions + assessments) in order
  const getAllProgressItems = () => {
    const items = [];
    let questionCount = 0;

    referenceQuestionsData.forEach((category) => {
      // Add all questions for this category
      category.questions.forEach((question) => {
        items.push({
          type: "question",
          category: category.category,
          question,
          index: questionCount++,
        });
      });

      // Add assessment item if category needs rating
      if (CATEGORY_TO_RATE.includes(category.category)) {
        items.push({
          type: "assessment",
          category: category.category,
        });
      }
    });

    return items;
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
    if (referenceQuestions?.formatType === "CUSTOM-FORMAT") {
      return;
    }
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

  // Add this helper function before the return statement
  const isCategoryCompleted = (category) => {
    const categoryData = referenceQuestionsData.find(
      (c) => c.category === category
    );
    return (
      categoryData && categoryData.answers.every((answer) => answer !== "")
    );
  };

  // Add this function before the return statement
  const groupProgressItems = (items) => {
    const groups = [];
    let currentGroup = null;

    items.forEach((item, index) => {
      if (
        !currentGroup ||
        currentGroup.category !== item.category ||
        item.type === "assessment"
      ) {
        // Create new group
        currentGroup = {
          category: item.category,
          type: item.type,
          startIndex: index,
          items: [],
        };
        groups.push(currentGroup);
      }
      currentGroup.items.push(item);
    });

    return groups;
  };

  // Add this helper function before the groupProgressItems function
  const getCategoryBulletLine = (groupItems) => {
    if (groupItems.length === 0 || groupItems[0].type === "assessment") {
      return null;
    }

    return (
      <div
        className="bullet-line-connector"
        style={{
          position: "absolute",
          height: "1.5px",
          backgroundColor: "#000000",
          top: "29px",
          left: "30px",
          right: "30px",
          transform: "translateY(-50%)",
          zIndex: 0,
        }}
      />
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
      <div className="reference-progress-indicator mt-3">
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
          <h4
            className="referencecheckquestiontitle text-left mb-2"
            style={{ display: hideQuestionSection ? "none" : "block" }}
          >
            {TRANSLATIONS[language].referenceCheckQuestionnaire}
          </h4>

          <div
            className="referencecheckquestion-container mb-5"
            style={{ display: hideQuestionSection ? "none" : "block" }}
          >
            <div className="question-container">
              <h5 className="question-title w-100 d-flex justify-content-between">
                {currentQuestionCategory || TRANSLATIONS[language].question}

                <span>
                  {" "}
                  <span className="color-orange">
                    {" "}
                    {getCurrentCategoryQuestionInfo().current}
                  </span>{" "}
                  / {getCurrentCategoryQuestionInfo().total}
                </span>
              </h5>
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

      <div className="category-progress-container mt-3">
        <div className="bullet-progress d-flex gap-3 align-items-center justify-content-center">
          {(() => {
            const items = getAllProgressItems();
            const groups = groupProgressItems(items);

            return groups.map((group, groupIndex) => (
              <div key={groupIndex} className="bullet-group position-relative">
                {/* {getCategoryBulletLine(group.items)} */}
                {group.items.map((item, itemIndex) => {
                  const absoluteIndex = group.startIndex + itemIndex;
                  const isCurrentItem =
                    item.type === "question"
                      ? item.index === currentQuestionIndex
                      : hideQuestionSection &&
                        getQuestionCategory() === item.category;
                  const isCompleted =
                    item.type === "question"
                      ? item.index < currentQuestionIndex
                      : getQuestionCategory() !== item.category &&
                        currentQuestionIndex > group.startIndex;
                  const isFirstBullet = itemIndex === 0;
                  const isLastBullet = itemIndex === group.items.length - 1;

                  return (
                    <>
                      <div key={absoluteIndex} className="bullet-item">
                        <div
                          className={`${
                            item.type === "assessment"
                              ? `bullet-circle ${
                                  hideQuestionSection && isCurrentItem
                                    ? "active"
                                    : isCompleted ||
                                      (getQuestionCategory() !==
                                        item.category &&
                                        referenceQuestionsData.find(
                                          (c) => c.category === item.category
                                        )?.assessmentRating)
                                    ? "completed"
                                    : ""
                                }`
                              : `bullet ${
                                  !hideQuestionSection && isCurrentItem
                                    ? "active"
                                    : isCompleted ||
                                      isCategoryCompleted(item.category)
                                    ? "completed"
                                    : ""
                                }`
                          }`}
                        />
                        {/* {(isFirstBullet || isLastBullet) && item.type !== 'assessment' && (
                          <div className="bullet-line"></div>
                        )} */}
                      </div>
                      {isFirstBullet && (
                        <div className="bullet-label w-100 mt-2">
                          {item.type === "assessment"
                            ? ""
                            : TRANSLATIONS[language].questionCategory[
                                item.category
                              ]}
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
};

export default ReferenceCheckQuestionnairePage;
