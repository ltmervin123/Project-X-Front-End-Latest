import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import "../styles/ReviewYourReferenceCheckPage.css";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QuestionDisplay from "../components/ReviewYourReferenceCheck/QuestionDisplay";
import SignatureSection from "../components/ReviewYourReferenceCheck/SignatureSection";
import { socket, disconnectSocket } from "../utils/socket/socketSetup";

function ReviewYourReferenceCheckPage() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const referenceQuestionsData =
    JSON.parse(sessionStorage.getItem("referenceQuestionsData")) || [];
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [normalizedAnswers, setNormalizedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [signatureMethod, setSignatureMethod] = useState("Draw Signature");
  const [imagePreview, setImagePreview] = useState(null);
  const [showSignatureSection, setShowSignatureSection] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showBothAnswers, setShowBothAnswers] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(
    answers[currentQuestionIndex]
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [activeAnswerType, setActiveAnswerType] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [isLastAnswerSaved, setIsLastAnswerSaved] = useState(false);

  const handleSkip = () => {
    const newAnswer = questions.map((question, index) => {
      return {
        question,
        answer: answers[index],
      };
    });
    setSubmittedAnswers(newAnswer);
    setShowSignatureSection(true);
  };

  const saveAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer =
      activeAnswerType === "Original Answer"
        ? answers[currentQuestionIndex]
        : normalizedAnswers[currentQuestionIndex];

    const newAnswer = {
      question: currentQuestion,
      answer: selectedAnswer,
    };

    setSubmittedAnswers((prev) => [...prev, newAnswer]);

    // Check if this is the last question
    if (currentQuestionIndex === answers.length - 1) {
      setIsLastAnswerSaved(true);
    } else {
      // Move to the next question
      setCurrentQuestionIndex((prev) => prev + 1);
    }

    setActiveAnswerType(null);
    setIsSubmitEnabled(false);
  };

  useEffect(() => {
    console.log(submittedAnswers);
  }, [submittedAnswers]);

  useEffect(() => {
    if (referenceQuestionsData.length > 0) {
      const allQuestions = referenceQuestionsData.flatMap(
        (item) => item.questions || []
      );
      const allAnswers = referenceQuestionsData.flatMap(
        (item) => item.answers || []
      );
      const allNormalizedAnswers = referenceQuestionsData.flatMap(
        (item) => item.normalizedAnswers || []
      );
      setQuestions(allQuestions);
      setAnswers(allAnswers);
      setNormalizedAnswers(allNormalizedAnswers);
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
  };

  const startDrawing = (e) => {
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

  const getReferenceQuestionData = () => {
    return referenceQuestionsData.map((categoryItem, index) => {
      const questionIndex = categoryItem.questions.indexOf(
        submittedAnswers[index].question
      );
      if (questionIndex !== -1) {
        categoryItem.answers[questionIndex] = submittedAnswers[index].answer;
      }
      return { ...categoryItem };
    });
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
    const canvas = canvasRef.current;
    const workDuration = { endDate, startDate };
    try {
      setSubmitting(true);
      const formdata = new FormData();
      if (signatureMethod === "Draw Signature") {
        const signatureDataURL = canvas.toDataURL("image/png");
        const signatureBlob = dataURLtoBlob(signatureDataURL);
        formdata.append("referenceRequestId", referenceId);
        formdata.append("refereeTitle", positionTitle);
        formdata.append("refereeRelationshipWithCandidate", relationship);
        formdata.append("referenceQuestion", JSON.stringify(referenceQuestion));
        formdata.append("questionFormat", format);
        formdata.append("companyWorkedWith", companyWorkedWith);
        formdata.append("workDuration", JSON.stringify(workDuration));
        formdata.append("file", signatureBlob, "signature.png");
      } else {
        formdata.append("referenceRequestId", referenceId);
        formdata.append("refereeTitle", positionTitle);
        formdata.append("refereeRelationshipWithCandidate", relationship);
        formdata.append("referenceQuestion", JSON.stringify(referenceQuestion));
        formdata.append("questionFormat", format);
        formdata.append("companyWorkedWith", companyWorkedWith);
        formdata.append("workDuration", JSON.stringify(workDuration));
        formdata.append("file", uploadedFile);
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

        // Disconnect socket
        disconnectSocket();
        //Navigate to reference completed page
        navigate("/reference-completed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
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

  const handleAnswerSelection = (type) => {
    setActiveAnswerType(type);
    setIsSubmitEnabled(true);
  };

  return (
    <div className="main-container d-flex flex-column align-items-center justify-content-center">
      {!showSignatureSection ? (
        <Row className="ReviewYourReferenceCheck-Row">
          <h5 className="referencecheckquestiontitle text-left mb-2">
            Review Your Responses
          </h5>
          <Col md={9}>
            <div className="ReviewYourReferenceCheckAnswer-left-container">
              <div className="question-indicator mb-2">
                <p className="m-0">
                  Question {currentQuestionIndex + 1} to {questions.length}
                </p>
              </div>
              <QuestionDisplay
                currentQuestionIndex={currentQuestionIndex}
                questions={questions}
                answers={answers}
                normalizedAnswers={normalizedAnswers}
                showBothAnswers={showBothAnswers}
                setShowBothAnswers={setShowBothAnswers}
                isEditing={isEditing}
                editedAnswer={editedAnswer}
                setEditedAnswer={setEditedAnswer}
                setAnswers={setAnswers}
                setIsEditing={setIsEditing} // Pass the setIsEditing function here
              />
              {/* <div className="navigation-buttons gap-4 m-0 position-relative">
                <button
                  className="prev-btn"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  &lt;
                </button>
                <p className="m-0">{currentQuestionIndex + 1}</p>
                <button
                  className="next-btn"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === answers.length - 1}
                >
                  &gt;
                </button>
              </div> */}
            </div>
          </Col>
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
              <div className="buttons-container d-flex align-items-center justify-content-start flex-column gap-5">
                <button
                  className={`d-flex align-items-center p-2 ${
                    activeAnswerType === "Original Answer" ? "active" : ""
                  }`}
                  onClick={() => handleAnswerSelection("Original Answer")}
                >
                  <p className="m-0">Original Answer</p>
                </button>
                <button
                  className={`d-flex align-items-center p-2 ${
                    activeAnswerType === "Normalize Answer" ? "active" : ""
                  }`}
                  onClick={() => handleAnswerSelection("Normalize Answer")}
                >
                  <p className="m-0">Normalize Answer</p>
                </button>
              </div>
              <div className="button-controller-container d-flex align-items-center justify-content-end flex-column gap-2">
                <small>
                  Clicking the skip button will select all answers from the
                  original response
                </small>
                <button
                  onClick={() => {
                    handleSkip();
                  }}
                >
                  Skip
                </button>

                {isLastAnswerSaved ? (
                  <button
                    className="btn-proceed-submit"
                    onClick={() => {
                      handleProceed();
                    }}
                  >
                    Proceed
                  </button>
                ) : (
                  <button
                    className="btn-proceed-submit"
                    onClick={() => {
                      saveAnswer();
                    }}
                    disabled={!isSubmitEnabled}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <SignatureSection
          signatureMethod={signatureMethod}
          canvasRef={canvasRef}
          startDrawing={startDrawing}
          draw={draw}
          stopDrawing={stopDrawing}
          clearDrawing={clearDrawing}
          submitReferenceCheck={submitReferenceCheck}
          submitting={submitting}
          handleFileDrop={handleFileDrop}
          handleDragOver={handleDragOver}
          uploadedFile={uploadedFile}
          imagePreview={imagePreview}
          errorMessage={errorMessage}
          clearImage={clearImage}
          setSignatureMethod={setSignatureMethod}
          handleFileSelect={handleFileSelect}
        />
      )}
    </div>
  );
}

export default ReviewYourReferenceCheckPage;
