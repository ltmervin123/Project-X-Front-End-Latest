import React, { useState, useEffect, useRef } from "react";
import "../../styles/AiRefereeStyles/ReferenceCheckQuestionnairePage.css";
import { useNavigate } from "react-router-dom";
import ErrorAccessMic from "../../components/Error/ErrorAccessMic";
import TextBase from "../../components/ReferenceCheckQuestionnaire/TextBase";
import AudioBase from "../../components/ReferenceCheckQuestionnaire/AudioBase";
import OverAllAssesment from "../../components/ReferenceCheckQuestionnaire/Assessment/OverAllAssesment";
import PacedRating from "../../components/ReferenceCheckQuestionnaire/Assessment/PacedRating";
import loadingAnimation from "../../assets/loading.gif";
import axios from "axios";
import { useLabels } from "./hooks/uselabel";
import { getCategoryOrder, getCategoryToRate } from "./utils/helper";

const ReferenceCheckQuestionnairePage = () => {
  // Constants
  const API = process.env.REACT_APP_API_URL;
  const CATEGORY_ORDER = getCategoryOrder();
  const CATEGORY_TO_RATE = getCategoryToRate();
  const CURRENT_STEP = 3;
  const navigate = useNavigate();
  const selectedMethod = sessionStorage.getItem("interview-method");
  const language = sessionStorage.getItem("selectedLanguage") || "English";
  const { labels } = useLabels(language);
  const STEPS = labels.steps;
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
  const [isPacedRatingSubmitted, setIsPacedRatingSubmitted] = useState(false);
  const [showRatingAfterNext, setShowRatingAfterNext] = useState(false);

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
              paceRating: null,
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
            paceRating: null,
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

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const handleProceed = () => {
    // Save reference questions data
    sessionStorage.setItem(
      "referenceQuestionsData",
      JSON.stringify(referenceQuestionsData)
    );

    // Only store workEthicAndBehavior category data
    // const workEthicCategory = referenceQuestionsData.find(
    //   (category) => category.category === "workEthicAndBehavior"
    // );

    // if (workEthicCategory) {
    //   // Save only workEthicAndBehavior assessment data
    //   const assessmentData = {
    //     workEthicAndBehavior: workEthicCategory.assessmentRating,
    //   };
    //   sessionStorage.setItem("assessmentData", JSON.stringify(assessmentData));
    // }

    // Navigate to review page
    navigate("/reference-review");
  };

  // Prevent accidental page exit
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = labels.leavePageConfirmation;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [language]);

  //Add a warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(labels.goBackConfirmation);
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
      if (questions.length > 0 && selectedMethod === "VOICE_BASE") {
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
      labels.questionCategory[currentQuestionCategory]
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
            normalizedAnswer || "No normalized answer available";
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

  const handleAssessmentSubmit = (rating) => {
    if (referenceQuestions?.formatType === "CUSTOM-FORMAT") {
      return;
    }
    setAssessmentRating(rating);

    // Update referenceQuestionsData with the assessment rating
    setReferenceQuestionsData((prevData) =>
      prevData.map((categoryItem) => {
        if (categoryItem.category === "workEthicAndBehavior") {
          return {
            ...categoryItem,
            assessmentRating: rating,
          };
        }
        return categoryItem;
      })
    );

    setIsAssessmentSubmitted(true);
    setHideQuestionSection(false);

    // Move to next question after assessment is submitted
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRatingSubmit = (selectedValues, selectedRating) => {
    const currentQuestion = questions[currentQuestionIndex];

    setReferenceQuestionsData((prevData) =>
      prevData.map((categoryItem) => {
        const questionIndex = categoryItem.questions.indexOf(currentQuestion);
        if (questionIndex !== -1) {
          categoryItem.answers[questionIndex] = selectedValues;
          categoryItem.normalizedAnswers[questionIndex] =
            "No normalized answer available";
          return {
            ...categoryItem,
            paceRating: selectedRating,
          };
        }
        return { ...categoryItem };
      })
    );
    setAnswered((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = selectedValues;
      return updatedAnswers;
    });
    nextQuestion();
    setIsPacedRatingSubmitted(true);
    setShowRatingAfterNext(false);
    setHideQuestionSection(false);
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

      // Add assessment item only for workEthicAndBehavior category
      if (category.category === "workEthicAndBehavior") {
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
      return (
        response.data?.normalizedAnswer || "No normalized answer available"
      );
    } catch (error) {
      console.error("Error fetching normalized answer:", error);
      return "No normalized answer available";
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
      if (currentCategory === "workEthicAndBehavior") {
        // Show assessment after last question in workEthicAndBehavior
        setHideQuestionSection(true);
        setIsAssessmentSubmitted(false); // Reset assessment submission state
      } else {
        // For other categories, just move to next question
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
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

  const shouldShowAssessment = () => {
    const currentCategory = getQuestionCategory();
    const { current, total } = getCurrentCategoryQuestionInfo();

    // Show assessment when we're at the last question of workEthicAndBehavior
    return currentCategory === "workEthicAndBehavior" && current === total;
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

  const shouldShowPacedRating = () => {
    const currentCategory = getQuestionCategory();
    const { current } = getCurrentCategoryQuestionInfo();
    const isCurrentQuestionAnswered = answered[currentQuestionIndex] !== "";

    return (
      currentCategory === "workEthicAndBehavior" &&
      current === 1 && // Show at first question of the category
      !isPacedRatingSubmitted &&
      !isCurrentQuestionAnswered
    ); // Show before answering any questions
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
          <p>{labels.reattemptingCamera}</p>
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
              className={`step ${CURRENT_STEP >= index + 1 ? "active" : ""}`}
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
      ) : shouldShowPacedRating() ? (
        <PacedRating
          onSubmit={handleRatingSubmit}
          candidateName={candidateName}
        />
      ) : (
        <>
          <h4
            className="referencecheckquestiontitle text-left mb-2"
            style={{ display: hideQuestionSection ? "none" : "block" }}
          >
            {labels.referenceCheckQuestionnaire}
          </h4>

          <div
            className="referencecheckquestion-container mb-5"
            style={{ display: hideQuestionSection ? "none" : "block" }}
          >
            <div className="question-container">
              <h5 className="question-title w-100 d-flex justify-content-between">
                {currentQuestionCategory || labels.question}

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

          <div className="category-progress-container mt-3">
            <div className="bullet-progress d-flex gap-3 align-items-center justify-content-center">
              {(() => {
                const items = getAllProgressItems();
                const groups = groupProgressItems(items);

                return groups.map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="bullet-group position-relative"
                  >
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
                                              (c) =>
                                                c.category === item.category
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
                          </div>
                          {isFirstBullet && (
                            <div className="bullet-label w-100 mt-2">
                              {item.type === "assessment"
                                ? ""
                                : labels.questionCategory[item.category]}
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
        </>
      )}
    </div>
  );
};

export default ReferenceCheckQuestionnairePage;
