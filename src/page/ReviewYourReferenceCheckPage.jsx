import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ReviewYourReferenceCheckPage.css";

function ReviewYourReferenceCheckPage() {
  const referenceQuestionsData =
    JSON.parse(localStorage.getItem("referenceQuestionsData")) || [];
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null); // Track the uploaded file
  const [signatureMethod, setSignatureMethod] = useState("Draw Signature"); // Track signature method
  const [imagePreview, setImagePreview] = useState(null); // Track the preview of the uploaded image
  const [showSignatureSection, setShowSignatureSection] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false); // Track if drawing is in progress
  const canvasRef = useRef(null); // Ref to access canvas element directly

  //Set questions and answer to render on the UI
  useEffect(() => {
    if (referenceQuestionsData.length > 0) {
      // Extract all questions and answers from referenceQuestionsData
      const allQuestions = referenceQuestionsData.flatMap(
        (item) => item.questions || []
      );
      const allAnswers = referenceQuestionsData.flatMap(
        (item) => item.answers || []
      );

      setQuestions(allQuestions);
      setAnswers(allAnswers);
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
      setUploadedFile(file);

      // Create a FileReader to read the file and display the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);

      // Create a FileReader to read the file and display the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle next question navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < answers.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle previous question navigation
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Clear drawing function that clears both the canvas and drawing state
  const clearDrawing = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear the canvas content
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Reset drawing state to false, so new drawings start fresh
    setIsDrawing(false);
    resizeCanvas();
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas is not available.");
      return; // Ensure canvasRef is not null
    }

    const container = canvas.parentElement;
    if (!container) {
      console.log("Container is not available.");
      return; // Ensure parent element exists
    }

    const context = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1; // Use DPR for higher quality on high-res screens
    const width = container.clientWidth * scale;
    const height = container.clientHeight * scale;

    // Set the canvas size to ensure it matches the scaled size
    canvas.width = width;
    canvas.height = height;

    // Scale the context to match the device pixel ratio
    context.scale(scale, scale);

    // Redraw the signature if necessary
    context.lineWidth = 2 * scale; // Line width scaled for higher resolution
    context.lineCap = "round"; // Smooth end of lines
    context.lineJoin = "round"; // Smooth corners of lines
    context.strokeStyle = "black"; // Ensure stroke style remains consistent
    console.log("Canvas resized to", width, "x", height);
  };
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true); // Set isDrawing to true to stop resizeCanvas from running
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Get canvas position relative to the document
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width); // Adjust for actual canvas size
    const y = (e.clientY - rect.top) * (canvas.height / rect.height); // Adjust for actual canvas size

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };
  // useLayoutEffect(() => {
  //   if (signatureMethod === "Draw Signature") {
  //     console.log("Canvas resize");

  //     const intervalId = setInterval(() => {
  //       const canvas = canvasRef.current;
  //       if (canvas) {
  //         resizeCanvas();
  //         clearInterval(intervalId); // Stop checking once the canvas is available
  //       } else {
  //         console.log("Canvas not yet available, checking again...");
  //       }
  //     }, 100); // Check every 100ms

  //     return () => {
  //       clearInterval(intervalId); // Cleanup on unmount
  //     };
  //   }
  // }, [signatureMethod]);
  return (
    <div className="container-fluid main-container login-page-container d-flex flex-column align-items-center justify-content-center">
      <h2 className="referencecheckquestiontitle text-left mb-2">
        Review Your Responses
      </h2>

      <div className="ReviewYourReferenceCheck-container">
        {!showSignatureSection ? (
          <>
            {/* Question Indicator */}
            <div className="question-indicator mb-3">
              <p className="m-0">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            {/* Question Display */}
            <div className="ReviewYourReferenceCheck-box-item h-100">
              <div className="question-container">
                <p className="question-text">
                  <strong>Question {currentQuestionIndex + 1}:</strong>{" "}
                  {questions[currentQuestionIndex]}
                </p>
              </div>

              {/* Standardized Answer Section */}
              <p className="stndard-label">
                <strong>Normalize Answer:</strong>
              </p>
              <div className="answer-container">
                <p>{answers[currentQuestionIndex]}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="navigation-buttons gap-4 position-relative">
              <>
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
                {currentQuestionIndex === answers.length - 1 && (
                  <button className="proceed-btn" onClick={handleProceed}>
                    Proceed
                  </button>
                )}
              </>
            </div>
          </>
        ) : (
          <div>
            {/* Signature Section */}
            <h3>Select or Upload Image</h3>
            <div className="selection-container">
              <p>Signature Method</p>
              <select
                name="signature-method"
                id="signature-method"
                className="mb-3"
                onChange={handleSelectChange}
              >
                {/* <option>Select Type of Signature</option> */}
                <option value="Draw Signature">Draw Signature</option>
                <option value="Upload Signature">Upload Signature</option>
              </select>
            </div>

            {signatureMethod === "Draw Signature" ? (
              <div className="drawing-container">
                <p>Drawing container area</p>
                <div
                  className="drawing-container-box w-100"
                  style={{ width: "100%", height: "280px" }}
                >
                  <canvas
                    ref={canvasRef}
                    style={{
                      border: "1px solid black",
                      width: "100%",
                      height: "100%",
                    }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                </div>
              </div>
            ) : (
              signatureMethod === "Upload Signature" && (
                <div className="file-upload-container">
                  <p>Drag & Drop Signature</p>
                  <div
                    className="file-upload-area d-flex align-items-center justify-content-center flex-column"
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    style={{
                      border: "1px solid black",
                      padding: "20px",
                      height: "280px",
                      textAlign: "center",
                    }}
                  >
                    {uploadedFile ? (
                      <div>
                        {imagePreview && (
                          <>
                            <img
                              src={imagePreview}
                              alt="Uploaded preview"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "200px",
                                marginTop: "10px",
                              }}
                            />
                            <p>File uploaded: {uploadedFile.name}</p>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        <p>Drop your signature image here or click to select</p>
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
                      </>
                    )}
                  </div>
                </div>
              )
            )}

            <div className="ReviewYourReferenceCheck-button-controls d-flex gap-5 w-100 justify-content-center m-2">
              <button onClick={clearDrawing}>Clear</button>
              <button>Submit</button>
            </div>
          </div>
        )}
      </div>

      <div className="orange-bg-bottom"></div>
      <div className="orange-bg-top"></div>
      <div className="blue-bg-left"></div>
      <div className="blue-bg-right"></div>
    </div>
  );
}

export default ReviewYourReferenceCheckPage;
