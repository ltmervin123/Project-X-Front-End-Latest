import React from "react";

const SignatureSection = ({
  signatureMethod,
  canvasRef,
  startDrawing,
  draw,
  stopDrawing,
  clearDrawing,
  submitReferenceCheck,
  submitting,
  handleFileDrop, 
  handleDragOver, 
  uploadedFile, 
  imagePreview, 
  errorMessage, 
  clearImage, 
  setSignatureMethod,
  handleFileSelect,
}) => {
  return (
    <div className="ReviewYourReferenceCheck-container">
      <h3>Select or Upload Image</h3>
      <div className="selection-container">
        <p>Signature Method</p>
        <select
          name="signature-method"
          id="signature-method"
          className="mb-3"
          onChange={(e) => setSignatureMethod(e.target.value)} // Ensure this is defined in the parent
          value={signatureMethod}
        >
          <option value="Draw Signature">Draw Signature</option>
          <option value="Upload Signature">Upload Signature</option>
        </select>
      </div>

      {signatureMethod === "Draw Signature" ? (
        <>
          <div className="drawing-container">
            <p>Drawing container area</p>
            <div
              className="drawing-container-box w-100"
              style={{ width: "100%", height: "260px" }}
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
          <div className="ReviewYourReferenceCheck-button-controls d-flex gap-5 w-100 justify-content-center m-2">
            <button onClick={clearDrawing}>Clear</button>
            <button onClick={submitReferenceCheck} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="file-upload-container">
            <p>Drag & Drop Signature</p>
            <div
              className="file-upload-area d-flex align-items-center justify-content-center flex-column"
              onDrop={handleFileDrop} // Ensure this is defined in the parent
              onDragOver={handleDragOver} // Ensure this is defined in the parent
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

                  <p>
                    Drop your signature image here or click to select
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    accept=".png, .jpg, .jpeg, .jfif" // Restrict file types
                    onChange={handleFileSelect} // Ensure this is defined in the parent
                    style={{ display: "none" }}
                  />
                  <button
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                  >
                    Select File
                  </button>
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p> // Ensure this is defined in the parent
                  )}
                  <i className="py-3">
                    Supported Files: JPG, PNG, JPEG, JFIF.
                  </i>
                </>
              )}
            </div>
          </div>
          <div className="ReviewYourReferenceCheck-button-controls d-flex gap-5 w-100 justify-content-center m-2">
            <button onClick={clearImage}>Clear</button> {/* Ensure this is defined in the parent */}
            <button
              onClick={submitReferenceCheck}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignatureSection;