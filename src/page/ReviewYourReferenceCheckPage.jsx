import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ReviewYourReferenceCheckPage.css";

function ReviewYourReferenceCheckPage() {
  const location = useLocation();
  const [uploadedFile, setUploadedFile] = useState(null); // Track the uploaded file
  const [signatureMethod, setSignatureMethod] = useState("Select Drawing"); // Track signature method

  const handleSelectChange = (e) => {
    setSignatureMethod(e.target.value);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const { questions, answers } = location.state || {
    questions: [],
    answers: [],
  };

  const updatedQuestions = questions.map((question, index) => ({
    ...question,
    id: index + 1, // Use the index as a unique id
    text: question || "",
    originalAnswer: answers[index] || "", // Add original answer
  }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track the current question
  const [isDrawing, setIsDrawing] = useState(false); // Track if drawing is in progress
  const [editedAnswer, setEditedAnswer] = useState(""); // Track the edited answer for the question

  const canvasRef = useRef(null); // Ref to access canvas element directly

  const handleSubmit = () => {
    // Handle submit logic
  };

  // Handle next question navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < updatedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question navigation
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = updatedQuestions[currentQuestionIndex];

  // Clear drawing function that clears both the canvas and drawing state
  const clearDrawing = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear the canvas content
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Reset drawing state to false, so new drawings start fresh
    setIsDrawing(false);
  };

  // Function to start drawing
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Get canvas position relative to the document
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  // Function to draw on canvas
  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Get canvas position relative to the document
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // Function to stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Handle editing answer
  const handleEditAnswer = () => {
    setEditedAnswer(currentQuestion.originalAnswer); // Populate the text field with the original answer
  };

  const handleAnswerChange = (e) => {
    setEditedAnswer(e.target.value); // Update the edited answer
  };

  const handleSaveAnswer = () => {
    // Logic to save the edited answer (e.g., update state or send to backend)
    updatedQuestions[currentQuestionIndex].originalAnswer = editedAnswer;
    // Go back to the review screen after saving
  };

  return (
    <div className="container-fluid main-container login-page-container d-flex flex-column align-items-center justify-content-center">
      <h2 className="referencecheckquestiontitle text-left mb-2">
        Review Your Responses
      </h2>
      <div className="ReviewYourReferenceCheck-container">
        <div>
          <h3>Select or Upload Image</h3>
          <div className="selection-container">
            <p>Signature Method</p>
            <select
              name="signature-method"
              id="signature-method"
              className="mb-3"
              onChange={handleSelectChange}
            >
              <option value="Select Drawing">Select Drawing</option>
              <option value="Upload Image">Upload Image</option>
            </select>
          </div>

          {signatureMethod === "Select Drawing" ? (
            <div className="drawing-container">
              <p>Drawing container area</p>
              <div className="drawing-container-box">
                <canvas
                  ref={canvasRef}
                  width={1000}
                  height={300}
                  style={{ border: "1px solid black" }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
            </div>
          ) : (
            <div className="file-upload-container">
              <p>Drag & Drop Signature</p>
              <div
                className="file-upload-area d-flex align-items-center justify-content-center flex-column"
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                style={{
                  border: "1px solid black",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                {uploadedFile ? (
                  <p>File uploaded: {uploadedFile.name}</p>
                ) : (
                  <p>Drop your file here or click to select</p>
                )}
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
                <button
                  onClick={() =>
                    document.getElementById("file-upload").click()
                  }
                >
                  Select File
                </button>
              </div>
            </div>
          )}

          <div className="ReviewYourReferenceCheck-button-controls d-flex gap-5 w-100 justify-content-center m-2">
            <button onClick={clearDrawing}>Clear</button>
            <button>Submit</button>
          </div>
        </div>

      </div>
      
      <div className="orange-bg-bottom"></div>
        <div className="orange-bg-top"></div>
        <div className="blue-bg-left"></div>
        <div className="blue-bg-right"></div>
    </div>
  );
}

export default ReviewYourReferenceCheckPage;
