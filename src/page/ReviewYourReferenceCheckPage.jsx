import { useEffect, useRef, useState, useLayoutEffect } from "react";
import "../styles/ReviewYourReferenceCheckPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReviewYourReferenceCheckPage() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const referenceQuestionsData =
    JSON.parse(localStorage.getItem("referenceQuestionsData")) || [];
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [signatureMethod, setSignatureMethod] = useState("Draw Signature");
  const [imagePreview, setImagePreview] = useState(null);
  const [showSignatureSection, setShowSignatureSection] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

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
  useLayoutEffect(() => {
    if (signatureMethod === "Draw Signature") {
      console.log("Canvas resize");

      const intervalId = setInterval(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          resizeCanvas();
          clearInterval(intervalId); // Stop checking once the canvas is available
        } else {
          console.log("Canvas not yet available, checking again...");
        }
      }, 100); // Check every 100ms

      return () => {
        clearInterval(intervalId); // Cleanup on unmount
      };
    }
  }, [signatureMethod]);

  // Convert Base64 to Blob
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

  const submitReferenceCheck = async () => {
    const URL = `${API}/api/ai-referee/reference/create-reference`;
    const REFERENCE_DATA =
      JSON.parse(localStorage.getItem("refereeData")) || {};
    const REFERENCE_QUESTIONS_DATA =
      JSON.parse(localStorage.getItem("referenceQuestions")) || [];
    const TOKEN = localStorage.getItem("token");
    const { referenceId, positionTitle, relationship, companyWorkedWith } =
      REFERENCE_DATA;
    const referenceQuestion = referenceQuestionsData;
    const { format } = REFERENCE_QUESTIONS_DATA;
    const canvas = canvasRef.current;
    try {
      setSubmitting(true);
      const signatureDataURL = canvas.toDataURL("image/png");
      const signatureBlob = dataURLtoBlob(signatureDataURL);
      const formdata = new FormData();
      formdata.append("referenceRequestId", referenceId);
      formdata.append("refereeTitle", positionTitle);
      formdata.append("refereeRelationshipWithCandidate", relationship);
      formdata.append("referenceQuestion", JSON.stringify(referenceQuestion));
      formdata.append("questionFormat", format);
      formdata.append("companyWorkedWith", companyWorkedWith);
      formdata.append("file", signatureBlob, "signature.png");

      const response = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (response.status === 201) {
        //Remove datas from localstorage
        localStorage.removeItem("refereeData");
        localStorage.removeItem("referenceQuestions");
        localStorage.removeItem("referenceQuestionsData");
        localStorage.removeItem("token");
        //Navigate to reference completed page
        navigate("/reference-completed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

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
                        <svg
                          width="47"
                          height="47"
                          viewBox="0 0 47 47"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.7487 39.1666C10.6716 39.1666 9.74989 38.7834 8.98353 38.0171C8.21717 37.2507 7.83334 36.3283 7.83203 35.2499V31.3333C7.83203 30.7784 8.02003 30.3136 8.39603 29.9389C8.77203 29.5642 9.23681 29.3762 9.79036 29.3749C10.3439 29.3736 10.8094 29.5616 11.1867 29.9389C11.564 30.3162 11.7513 30.781 11.7487 31.3333V35.2499H35.2487V31.3333C35.2487 30.7784 35.4367 30.3136 35.8127 29.9389C36.1887 29.5642 36.6535 29.3762 37.207 29.3749C37.7606 29.3736 38.226 29.5616 38.6033 29.9389C38.9806 30.3162 39.168 30.781 39.1654 31.3333V35.2499C39.1654 36.327 38.7822 37.2494 38.0158 38.0171C37.2495 38.7847 36.3271 39.1679 35.2487 39.1666H11.7487ZM21.5404 15.3728L17.8685 19.0447C17.4768 19.4364 17.012 19.6244 16.4742 19.6087C15.9363 19.5931 15.4708 19.3887 15.0779 18.9958C14.7188 18.6041 14.5308 18.1472 14.5139 17.6249C14.4969 17.1027 14.6849 16.6458 15.0779 16.2541L22.1279 9.2041C22.3237 9.00827 22.5359 8.86988 22.7643 8.78893C22.9928 8.70799 23.2376 8.66686 23.4987 8.66556C23.7598 8.66425 24.0046 8.70538 24.2331 8.78893C24.4615 8.87249 24.6737 9.01088 24.8695 9.2041L31.9195 16.2541C32.3112 16.6458 32.4992 17.1027 32.4835 17.6249C32.4679 18.1472 32.2799 18.6041 31.9195 18.9958C31.5279 19.3874 31.0631 19.5918 30.5252 19.6087C29.9873 19.6257 29.5219 19.4377 29.1289 19.0447L25.457 15.3728V29.3749C25.457 29.9298 25.269 30.3952 24.893 30.7712C24.517 31.1472 24.0523 31.3346 23.4987 31.3333C22.9451 31.332 22.4804 31.144 22.1044 30.7693C21.7284 30.3946 21.5404 29.9298 21.5404 29.3749V15.3728Z"
                            fill="#686868"
                          />
                        </svg>

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
              <button onClick={submitReferenceCheck} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </button>
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
