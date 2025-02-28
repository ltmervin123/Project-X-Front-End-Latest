import React from 'react';

const SignatureSection = ({ signatureMethod, canvasRef, startDrawing, draw, stopDrawing, clearDrawing, submitReferenceCheck, submitting }) => {
  return (
    <div className="ReviewYourReferenceCheck-container">
      <h3>Select or Upload Image</h3>
      <div className="selection-container">
        <p>Signature Method</p>
        <select name="signature-method" id="signature-method" className="mb-3">
          <option value="Draw Signature">Draw Signature</option>
          <option value="Upload Signature">Upload Signature</option>
        </select>
      </div>

      {signatureMethod === "Draw Signature" ? (
        <>
          <div className="drawing-container">
            <p>Drawing container area</p>
            <div className="drawing-container-box w-100" style={{ width: "100%", height: "260px" }}>
              <canvas
                ref={canvasRef}
                style={{ border: "1px solid black", width: "100%", height: "100%" }}
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
        // Upload Signature Logic Here
        <div>Upload Signature Logic</div>
      )}
    </div>
  );
};

export default SignatureSection;