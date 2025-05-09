import React, { useEffect, useState } from "react";
import "../../styles/AiRefereeStyles/ReviewYourReferenceCheckPage.css";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QuestionDisplay from "../../components/ReviewYourReferenceCheck/QuestionDisplay";
import IdUploadSection from "../../components/ReviewYourReferenceCheck/IdUploadSection";
import SkipConfirmationPopUp from "../../components/ReviewYourReferenceCheck/SkipConfirmationPopUp";
import PreviewConfirmationPopUp from "../../components/ReviewYourReferenceCheck/PreviewConfirmationPopUp";
import PreviewSection from "../../components/ReviewYourReferenceCheck/PreviewSection";
import { socket } from "../../utils/socket/socketSetup";

const TRANSLATIONS = {
  English: {
    reviewResponses: "Review Your Responses",
    questionIndicator: "Question {current} of {total}",
    answerIndicator: "Answer {current} to {total}",
    chooseAnswer: "Please choose how you'd like the answer to be presented",
    skipWarning:
      "You can click 'Skip' to use either your original or the AI-enhanced answers for the remaining questions, except for those that have already been submitted.",
    skip: "Skip",
    proceed: "Proceed",
    submit: "Submit",
    editAnswer: "Edit Answer",
    allQuestionsAnswered: "All questions have been answered.",
    confirmSkip: "Are you sure you want to skip?",
    originalAnswer: "Original Answer",
    aiEnhancedAnswer: "AI Enhanced Answer",
    documentVerification: "Referee Identity Verification",
  },
  Japanese: {
    reviewResponses: "回答を確認する",
    questionIndicator: "質問 {current} / {total}",
    answerIndicator: "回答 {current} / {total}",
    chooseAnswer: "回答の提示方法を選択してください",
    skipWarning:
      "「スキップ」をクリックすると、すでに提出されたものを除き、残りの質問に対して元の回答またはAI強化回答のいずれかを使用できます。",
    skip: "スキップ",
    proceed: "進む",
    submit: "送信",
    editAnswer: "回答を編集",
    allQuestionsAnswered: "すべての質問に回答されました。",
    confirmSkip: "本当にスキップしますか？",
    originalAnswer: "元の回答",
    aiEnhancedAnswer: "AI強化回答",
    documentVerification: "推薦者の本人確認",
  },
};

function ReviewYourReferenceCheckPage() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [aiEnhancedAnswers, setAiEnhancedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showIdUploadSection, setShowIdUploadSection] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showBothAnswers, setShowBothAnswers] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [activeAnswerType, setActiveAnswerType] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const allQuestionsAnswered = submittedAnswers.length === questions.length;
  const [showSkipConfirmation, setShowSkipConfirmation] = useState(false);
  const [checked, setChecked] = useState(null);
  const [editedAnswer, setEditedAnswer] = useState(
    answers[currentQuestionIndex]
  );
  const [frontIdFile, setFrontIdFile] = useState(null);
  const [backIdFile, setBackIdFile] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [showPreviewConfirmation, setShowPreviewConfirmation] = useState(false);
  const [showPreviewSection, setShowPreviewSection] = useState(false);
  const referenceQuestionsData =
    JSON.parse(sessionStorage.getItem("referenceQuestionsData")) || [];

  const handleSkip = () => {
    setShowSkipConfirmation(true);
  };

  const language = sessionStorage.getItem("selectedLanguage") || "English";

  const handleConfirmSkip = (selectedType) => {
    const remainingAnswer = questions
      .slice(currentQuestionIndex)
      .map((_, index) => ({
        question: questions[currentQuestionIndex + index],
        answer:
          selectedType === "Original Answer"
            ? answers[currentQuestionIndex + index]
            : aiEnhancedAnswers[currentQuestionIndex + index],
        preferredAnswerType: selectedType,
      }));

    setSubmittedAnswers((prev) => [...prev, ...remainingAnswer]);
    setCurrentQuestionIndex(questions.length - 1);
    setShowSkipConfirmation(false);
  };

  const saveAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedType = selectedAnswers[currentQuestionIndex];

    if (selectedType === null) {
      return;
    }

    // Find the category that contains the current question
    const currentCategory = referenceQuestionsData.find((category) =>
      category.questions.includes(currentQuestion)
    );

    const selectedAnswer =
      selectedType === "Original Answer"
        ? answers[currentQuestionIndex]
        : aiEnhancedAnswers[currentQuestionIndex];

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = selectedType;
    setSelectedAnswers(newSelectedAnswers);

    const newAnswer = {
      question: currentQuestion,
      answer: selectedAnswer,
      preferredAnswerType: selectedAnswers[currentQuestionIndex],
      assessment:
        currentCategory?.assessments?.[
          currentCategory.questions.indexOf(currentQuestion)
        ] || "",
    };

    setSubmittedAnswers((prev) => [...prev, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
    setChecked(null);
    setIsSubmitEnabled(false);
  };

  const handleUpdateEnhanceAnswer = (updatedAnswer) => {
    setAiEnhancedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = updatedAnswer;
      return newAnswers;
    });
  };

  const handleCancelSkip = () => {
    setShowSkipConfirmation(false);
  };

  useEffect(() => {
    if (referenceQuestionsData.length > 0) {
      const allQuestions = referenceQuestionsData.flatMap(
        (item) => item.questions || []
      );
      const allAnswers = referenceQuestionsData.flatMap(
        (item) => item.answers || []
      );
      const allAiEnhancedAnswers = referenceQuestionsData.flatMap(
        (item) => item.normalizedAnswers || []
      );
      setQuestions(allQuestions);
      setAnswers(allAnswers);
      setAiEnhancedAnswers(allAiEnhancedAnswers);
      setSelectedAnswers(Array(allQuestions.length).fill("Original Answer"));
    }
  }, []);

  const handleProceed = () => {
    setShowPreviewConfirmation(true);
  };

  const handleConfirmPreview = () => {
    setShowPreviewConfirmation(false);
    setShowPreviewSection(true);
  };

  const handleCancelPreview = () => {
    setShowPreviewConfirmation(false);
    setShowIdUploadSection(true);
  };

  const handleContinueFromPreview = () => {
    setShowPreviewSection(false);
    setShowIdUploadSection(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < answers.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const getReferenceQuestionData = () => {
    const organizedReferenceQuestionData = referenceQuestionsData.map(
      (categoryItem) => {
        const updatedAnswers = [...categoryItem.answers];
        const updatedPreferredAnswerTypes = new Array(
          updatedAnswers.length
        ).fill("");
        const updatedAssessments = new Array(updatedAnswers.length).fill("");

        submittedAnswers.forEach(
          ({ question, answer, preferredAnswerType, assessment }) => {
            const questionIndex = categoryItem.questions.findIndex(
              (q) => q.trim() === question.trim()
            );
            if (questionIndex !== -1) {
              updatedAnswers[questionIndex] = answer;
              updatedPreferredAnswerTypes[questionIndex] = preferredAnswerType;
              updatedAssessments[questionIndex] = assessment;
            }
          }
        );

        return {
          ...categoryItem,
          answers: updatedAnswers,
          preferredAnswerType: updatedPreferredAnswerTypes,
          assessments: updatedAssessments,
          // Keep the original assessmentRating
          assessmentRating: categoryItem.assessmentRating,
        };
      }
    );

    return organizedReferenceQuestionData;
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: mimeString });
  };

  const handleProceedIDUpload = () => {
    setShowIdUploadSection(true);
  };

  const handleFrontIdSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFrontIdFile(file);
    }
  };

  const handleBackIdSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setBackIdFile(file);
    }
  };

  const clearFrontId = () => {
    setFrontIdFile(null);
  };

  const clearBackId = () => {
    setBackIdFile(null);
  };

  const submitReferenceCheck = async () => {
    const URL = `${API}/api/ai-referee/reference/create-reference`;
    const REFERENCE_DATA =
      JSON.parse(sessionStorage.getItem("refereeData")) || {};
    const REFERENCE_QUESTIONS_DATA =
      JSON.parse(sessionStorage.getItem("referenceQuestions")) || [];
    const TOKEN = sessionStorage.getItem("token");
    const {
      referenceId,
      refereeId,
      positionTitle,
      relationship,
      companyWorkedWith,
      endDate,
      startDate,
      companyId,
      currentCompany,
    } = REFERENCE_DATA;
    const referenceQuestion = getReferenceQuestionData();

    const { format } = REFERENCE_QUESTIONS_DATA;
    const workDuration = { endDate, startDate };
    try {
      setSubmitting(true);
      const formdata = new FormData();
      const selfieBlob = dataURLtoBlob(selfie);

      formdata.append("referenceRequestId", referenceId);
      formdata.append("currentCompany", currentCompany);
      formdata.append("refereeTitle", positionTitle);
      formdata.append("refereeRelationshipWithCandidate", relationship);
      formdata.append("referenceQuestion", JSON.stringify(referenceQuestion));
      formdata.append("questionFormat", format);
      formdata.append("companyWorkedWith", companyWorkedWith);
      formdata.append("workDuration", JSON.stringify(workDuration));
      formdata.append("frontIdFile", frontIdFile);
      formdata.append("backIdFile", backIdFile);
      formdata.append("selfieFile", selfieBlob, "selfie.png");

      const response = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (response.status === 201) {
        socket.emit("referenceCheckCompleted", { companyId });
        navigate("/reference-completed", {
          state: { referenceId, refereeId },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const submitIdUpload = async () => {
    await submitReferenceCheck();
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(TRANSLATIONS[language].confirmSkip);
      if (!userConfirmed) {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleAnswerSelection = (type) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = type;
    setSelectedAnswers(newSelectedAnswers);
    setChecked(type);
    setIsSubmitEnabled(true);
  };

  return (
    <div className="ReviewYourReferenceCheck d-flex flex-column align-items-center justify-content-center">
      <Row className="ReviewYourReferenceCheck-Row">
        {showIdUploadSection ? (
          <>
            <h5 className="referencecheckquestiontitle text-left mb-2">
              {TRANSLATIONS[language].documentVerification}
            </h5>
            <IdUploadSection
              frontIdFile={frontIdFile}
              backIdFile={backIdFile}
              handleFrontIdSelect={handleFrontIdSelect}
              handleBackIdSelect={handleBackIdSelect}
              clearFrontId={clearFrontId}
              clearBackId={clearBackId}
              submitIdUpload={submitIdUpload}
              submitting={submitting}
              setSelfie={setSelfie}
            />
          </>
        ) : showPreviewSection ? (
          <>
            <h5 className="referencecheckquestiontitle text-left mb-2">
              {TRANSLATIONS[language].reviewResponses}
            </h5>
            <PreviewSection
              referenceQuestionsData={referenceQuestionsData}
              submittedAnswers={submittedAnswers}
              onContinue={handleContinueFromPreview}
              language={language}
            />
          </>
        ) : (
          <>
            <h5 className="referencecheckquestiontitle text-left mb-2">
              {TRANSLATIONS[language].reviewResponses}
            </h5>
            <Col md={!showBothAnswers ? 9 : 12} >
              <div className="ReviewYourReferenceCheckAnswer-left-container">
                <div className="question-indicator mb-2">
                  <p className="m-0">
                    {TRANSLATIONS[language].questionIndicator
                      .replace("{current}", currentQuestionIndex + 1)
                      .replace("{total}", questions.length)}
                  </p>
                </div>

                <QuestionDisplay
                  currentQuestionIndex={currentQuestionIndex}
                  questions={questions}
                  answers={answers}
                  aiEnhancedAnswers={aiEnhancedAnswers}
                  showBothAnswers={showBothAnswers}
                  setShowBothAnswers={setShowBothAnswers}
                  isEditing={isEditing}
                  editedAnswer={editedAnswer}
                  setEditedAnswer={setEditedAnswer}
                  setAnswers={setAnswers}
                  setIsEditing={setIsEditing}
                  handleUpdateEnhanceAnswer={handleUpdateEnhanceAnswer}
                  handlePreviousQuestion={handlePreviousQuestion}
                  handleNextQuestion={handleNextQuestion}
                  language={language}
                />
              </div>
            </Col>
            {!showBothAnswers && (
              <Col md={3}>
                <div className="ReviewYourReferenceCheckAnswer-right-container">
                  <div className="answer-indicator-container">
                    <div className="question-indicator mb-0">
                      <p className="my-2">
                        {TRANSLATIONS[language].answerIndicator
                          .replace("{current}", currentQuestionIndex + 1)
                          .replace("{total}", questions.length)}
                      </p>{" "}
                    </div>
                    <p className="my-2">
                      {TRANSLATIONS[language].chooseAnswer}
                    </p>
                  </div>
                  <div className="buttons-container d-flex align-items-start justify-content-start flex-column gap-2">
                    {allQuestionsAnswered ? (
                      <div className="d-flex h-100 w-100 justify-content-center align-items-center">
                        <svg
                          width="129"
                          height="129"
                          viewBox="0 0 129 129"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M64.5 0C28.8779 0 0 28.8779 0 64.5C0 100.124 28.8779 129 64.5 129C100.124 129 129 100.124 129 64.5C129 28.8779 100.124 0 64.5 0ZM64.5 121.064C33.3808 121.064 8.0625 95.6192 8.0625 64.4997C8.0625 33.3805 33.3808 8.06225 64.5 8.06225C95.6192 8.06225 120.938 33.3806 120.938 64.4997C120.938 95.6189 95.6192 121.064 64.5 121.064ZM90.2415 40.899L52.3981 78.9802L35.356 61.9381C33.7817 60.3639 31.23 60.3639 29.6537 61.9381C28.0795 63.5123 28.0795 66.0641 29.6537 67.6383L49.6064 87.593C51.1806 89.1652 53.7324 89.1652 55.3086 87.593C55.49 87.4116 55.6454 87.214 55.7865 87.0085L95.9458 46.6011C97.518 45.0269 97.518 42.4751 95.9458 40.899C94.3696 39.3248 91.8178 39.3248 90.2415 40.899Z"
                            fill="#F46A05"
                          />
                        </svg>
                      </div>
                    ) : (
                      <>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input custom-checkbox"
                            id="originalAnswer"
                            checked={checked === "Original Answer"}
                            onChange={() =>
                              handleAnswerSelection("Original Answer")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="originalAnswer"
                          >
                            {TRANSLATIONS[language].originalAnswer}
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input custom-checkbox"
                            id="aiEnhancedAnswer"
                            checked={checked === "AI Enhanced Answer"}
                            onChange={() =>
                              handleAnswerSelection("AI Enhanced Answer")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="aiEnhancedAnswer"
                          >
                            {TRANSLATIONS[language].aiEnhancedAnswer}
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="button-controller-container d-flex align-items-center justify-content-end flex-column gap-2">
                    <small className="mb-2 w-100">
                      {TRANSLATIONS[language].skipWarning}
                    </small>
                    <button
                      onClick={handleSkip}
                      disabled={allQuestionsAnswered}
                    >
                      {TRANSLATIONS[language].skip}
                    </button>

                    {allQuestionsAnswered ? (
                      <button
                        className="btn-proceed-submit"
                        onClick={handleProceed}
                      >
                        {TRANSLATIONS[language].proceed}
                      </button>
                    ) : (
                      <button
                        className="btn-proceed-submit"
                        onClick={saveAnswer}
                        disabled={!isSubmitEnabled}
                      >
                        {TRANSLATIONS[language].submit}
                      </button>
                    )}
                  </div>
                </div>
              </Col>
            )}
            {showSkipConfirmation && (
              <SkipConfirmationPopUp
                onClose={handleCancelSkip}
                onConfirmSkip={handleConfirmSkip}
              />
            )}
          </>
        )}
      </Row>
      {showPreviewConfirmation && (
        <PreviewConfirmationPopUp
          onClose={handleCancelPreview}
          onConfirmPreview={handleConfirmPreview}
        />
      )}
    </div>
  );
}

export default ReviewYourReferenceCheckPage;
