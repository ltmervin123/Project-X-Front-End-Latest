import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import "../../styles/AiRefereeStyles/ReviewYourReferenceCheckPage.css";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QuestionDisplay from "../../components/ReviewYourReferenceCheck/QuestionDisplay";
import SignatureSection from "../../components/ReviewYourReferenceCheck/SignatureSection";
import IdUploadSection from "../../components/ReviewYourReferenceCheck/IdUploadSection";
import SkipConfirmationPopUp from "../../components/ReviewYourReferenceCheck/SkipConfirmationPopUp";
import { socket } from "../../utils/socket/socketSetup";

function ReviewYourReferenceCheckPage() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [aiEnhancedAnswers, setAiEnhancedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [signatureMethod, setSignatureMethod] = useState("Draw Signature");
  const [imagePreview, setImagePreview] = useState(null);
  const [showSignatureSection, setShowSignatureSection] = useState(false);
  const [showIdUploadSection, setShowIdUploadSection] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
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
  const [frontIdFile, setFrontIdFile] = useState(null);
  const [backIdFile, setBackIdFile] = useState(null);
  const [savedSignature, setSavedSignature] = useState(null);
  const [isCanvaEmpty, setIsCanvaEmpty] = useState(true);
  const [checked, setChecked] = useState(null);
  const [editedAnswer, setEditedAnswer] = useState(
    answers[currentQuestionIndex]
  );
  const referenceQuestionsData =
    JSON.parse(sessionStorage.getItem("referenceQuestionsData")) || [];

  const handleSkip = () => {
    setShowSkipConfirmation(true);
  };

  const handleConfirmSkip = () => {
    const remainingOriginalAnswer = questions
      .slice(currentQuestionIndex)
      .map((_, index) => ({
        question: questions[currentQuestionIndex + index],
        answer: answers[currentQuestionIndex + index],
        preferredAnswerType: selectedAnswers[currentQuestionIndex + index],
      }));

    setSubmittedAnswers((prev) => [...prev, ...remainingOriginalAnswer]);
    setShowSignatureSection(true);
    setShowSkipConfirmation(false);
  };

  // Update the saveAnswer function
  const saveAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedType = selectedAnswers[currentQuestionIndex];

    if (selectedType === null) {
      return;
    }

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
    };

    setSubmittedAnswers((prev) => [...prev, newAnswer]);

    // Always move to next question if not last
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
    setShowSignatureSection(true);
  };

  const handleSelectChange = (e) => {
    setSignatureMethod(e.target.value);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (isValidFileType(file)) {
        setUploadedFile(file);
        setErrorMessage("");
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setErrorMessage(
          "Invalid file type. Please upload a PNG, JPG, JPEG, or JFIF file."
        );
      }
    }
  };
  const isValidFileType = (file) => {
    const validTypes = ["image/png", "image/jpeg", "image/jfif"];
    return validTypes.includes(file.type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect({ target: { files } });
    }
  };
  const clearImage = () => {
    setUploadedFile(null);
    setImagePreview(null);
    setErrorMessage("");
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

  const clearDrawing = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setIsDrawing(false);
    setIsCanvaEmpty(true);
  };

  const startDrawing = (e) => {
    setIsCanvaEmpty(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  useLayoutEffect(() => {
    if (signatureMethod === "Draw Signature") {
      const intervalId = setInterval(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          resizeCanvas();
          clearInterval(intervalId);
        }
      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [signatureMethod]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    const context = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;
    const width = container.clientWidth * scale;
    const height = container.clientHeight * scale;
    canvas.width = width;
    canvas.height = height;
    context.scale(scale, scale);
    context.lineWidth = 2 * scale;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
  };

  // const getReferenceQuestionData = () => {
  //   //Attach the submitted answers to its respective question
  //   const organizedReferenceQuestionData = referenceQuestionsData.map(
  //     (categoryItem) => {
  //       const updatedAnswers = [...categoryItem.answers];

  //       submittedAnswers.forEach(({ question, answer }) => {
  //         const questionIndex = categoryItem.questions.findIndex(
  //           (q) => q.trim() === question.trim()
  //         );
  //         if (questionIndex !== -1) {
  //           updatedAnswers[questionIndex] = answer;
  //         }
  //       });

  //       return {
  //         ...categoryItem,
  //         answers: updatedAnswers,
  //       };
  //     }
  //   );

  //   //return organizedReferenceQuestionData and exclude the normalizedAnswers
  //   return organizedReferenceQuestionData.map(
  //     ({ normalizedAnswers, ...rest }) => rest
  //   );
  // };

  const getReferenceQuestionData = () => {
    // Attach the submitted answers and their preferred answer types to their respective questions
    const organizedReferenceQuestionData = referenceQuestionsData.map(
      (categoryItem) => {
        // Initialize arrays for answers and preferredAnswerType
        const updatedAnswers = [...categoryItem.answers];
        const updatedPreferredAnswerTypes = new Array(
          updatedAnswers.length
        ).fill("");

        submittedAnswers.forEach(
          ({ question, answer, preferredAnswerType }) => {
            const questionIndex = categoryItem.questions.findIndex(
              (q) => q.trim() === question.trim()
            );
            if (questionIndex !== -1) {
              updatedAnswers[questionIndex] = answer;
              updatedPreferredAnswerTypes[questionIndex] = preferredAnswerType;
            }
          }
        );

        return {
          ...categoryItem,
          answers: updatedAnswers,
          preferredAnswerType: updatedPreferredAnswerTypes,
        };
      }
    );

    // Return the updated data, excluding normalizedAnswers
    return organizedReferenceQuestionData.map(
      ({ normalizedAnswers, ...rest }) => rest
    );
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
    if (isCanvaEmpty) {
      return;
    }
    if (canvasRef.current) {
      const signatureDataURL = canvasRef.current.toDataURL("image/png");
      setSavedSignature(signatureDataURL);
    }
    setShowSignatureSection(false);
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
      positionTitle,
      relationship,
      companyWorkedWith,
      endDate,
      startDate,
      companyId,
    } = REFERENCE_DATA;
    const referenceQuestion = getReferenceQuestionData();

    const { format } = REFERENCE_QUESTIONS_DATA;
    const workDuration = { endDate, startDate };
    try {
      setSubmitting(true);
      const formdata = new FormData();
      if (signatureMethod === "Draw Signature") {
        const signatureBlob = dataURLtoBlob(savedSignature);
        formdata.append("referenceRequestId", referenceId);
        formdata.append("refereeTitle", positionTitle);
        formdata.append("refereeRelationshipWithCandidate", relationship);
        formdata.append("referenceQuestion", JSON.stringify(referenceQuestion));
        formdata.append("questionFormat", format);
        formdata.append("companyWorkedWith", companyWorkedWith);
        formdata.append("workDuration", JSON.stringify(workDuration));
        formdata.append("signatureFile", signatureBlob, "signature.png");
        formdata.append("frontIdFile", frontIdFile);
        // formdata.append("backIdFile", backIdFile);
      } else {
        formdata.append("referenceRequestId", referenceId);
        formdata.append("refereeTitle", positionTitle);
        formdata.append("refereeRelationshipWithCandidate", relationship);
        formdata.append("referenceQuestion", JSON.stringify(referenceQuestion));
        formdata.append("questionFormat", format);
        formdata.append("companyWorkedWith", companyWorkedWith);
        formdata.append("workDuration", JSON.stringify(workDuration));
        formdata.append("signatureFile", uploadedFile);
        formdata.append("frontIdFile", frontIdFile);
        // formdata.append("backIdFile", backIdFile);
      }
      const response = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (response.status === 201) {
        //Remove data from localstorage
        sessionStorage.removeItem("refereeData");
        sessionStorage.removeItem("referenceQuestions");
        sessionStorage.removeItem("referenceQuestionsData");
        sessionStorage.removeItem("token");
        // Emit event to server
        socket.emit("referenceCheckCompleted", { companyId });
        //Navigate to reference completed page
        navigate("/reference-completed");
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

  const handleAnswerSelection = (type) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = type;
    setSelectedAnswers(newSelectedAnswers);

    setChecked(type);

    const isAnyAnswerSelected =
      newSelectedAnswers[currentQuestionIndex] !== null;
    setIsSubmitEnabled(isAnyAnswerSelected);
  };

  return (
    <div className="ReviewYourReferenceCheck d-flex flex-column align-items-center justify-content-center">
      <Row className="ReviewYourReferenceCheck-Row">
        <h5 className="referencecheckquestiontitle text-left mb-2">
          Review Your Responses
        </h5>
        {showSignatureSection ? (
          <Col md={12}>
            <SignatureSection
              signatureMethod={signatureMethod}
              canvasRef={canvasRef}
              startDrawing={startDrawing}
              draw={draw}
              stopDrawing={stopDrawing}
              clearDrawing={clearDrawing}
              handleProceedIDUpload={handleProceedIDUpload}
              submitting={submitting}
              handleFileDrop={handleFileDrop}
              handleDragOver={handleDragOver}
              uploadedFile={uploadedFile}
              imagePreview={imagePreview}
              errorMessage={errorMessage}
              clearImage={clearImage}
              setSignatureMethod={setSignatureMethod}
              handleFileSelect={handleFileSelect}
              isCanvaEmpty={isCanvaEmpty}
            />
          </Col>
        ) : showIdUploadSection ? (
          <>
            <IdUploadSection
              frontIdFile={frontIdFile}
              backIdFile={backIdFile}
              handleFrontIdSelect={handleFrontIdSelect}
              handleBackIdSelect={handleBackIdSelect}
              clearFrontId={clearFrontId}
              clearBackId={clearBackId}
              submitIdUpload={submitIdUpload}
              submitting={submitting}
            />
          </>
        ) : (
          <>
            <Col md={!showBothAnswers ? 9 : 12}>
              <div className="ReviewYourReferenceCheckAnswer-left-container">
                <div className="question-indicator mb-2">
                  <p className="m-0">
                    Question {currentQuestionIndex + 1} of {questions.length}
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
                />
              </div>
            </Col>
            {/* Conditionally render the right column based on isEditing */}
            {!showBothAnswers && (
              <Col md={3}>
                <div className="ReviewYourReferenceCheckAnswer-right-container">
                  <div className="answer-indicator-container">
                    <div className="question-indicator mb-0">
                      <p className="m-0">
                        Answer {currentQuestionIndex + 1} to {questions.length}
                      </p>
                    </div>
                    <p className="my-2">
                      Please choose how you'd like the answer to be presented
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
                            className="form-check-input"
                            id="originalAnswer"
                            checked={checked === "Original Answer"}
                            onChange={() => {
                              handleAnswerSelection(
                                selectedAnswers[currentQuestionIndex] ===
                                  "Original Answer"
                                  ? null
                                  : "Original Answer"
                              );
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="originalAnswer"
                          >
                            Original Answer
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="aiEnhancedAnswer"
                            checked={checked === "AI Enhanced Answer"}
                            onChange={() => {
                              handleAnswerSelection(
                                selectedAnswers[currentQuestionIndex] ===
                                  "AI Enhanced Answer"
                                  ? null
                                  : "AI Enhanced Answer"
                              );
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="aiEnhancedAnswer"
                          >
                            AI Enhanced Answer
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="button-controller-container d-flex align-items-center justify-content-end flex-column gap-2">
                    <small className="mb-2 w-100">
                      You can click 'Skip' to use your original answers for the
                      remaining questions, except for those that have already
                      been submitted.
                    </small>
                    <button
                      onClick={() => {
                        handleSkip();
                      }}
                      disabled={allQuestionsAnswered}
                    >
                      Skip
                    </button>

                    {allQuestionsAnswered ? (
                      <button
                        className="btn-proceed-submit"
                        onClick={handleProceed}
                      >
                        Proceed
                      </button>
                    ) : (
                      <button
                        className="btn-proceed-submit"
                        onClick={saveAnswer}
                        disabled={!isSubmitEnabled}
                      >
                        Submit
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
    </div>
  );
}

export default ReviewYourReferenceCheckPage;
