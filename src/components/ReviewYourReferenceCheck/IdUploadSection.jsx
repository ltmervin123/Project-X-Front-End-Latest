import React, { useState } from "react";

const IdUploadSection = ({
  frontIdFile,
  handleFrontIdSelect,
  clearFrontId,
  submitIdUpload,
  submitting,
}) => {
  const [selectedIdType, setSelectedIdType] = useState("");

  // Function to trigger the file input click
  const triggerFrontFileInput = () => {
    document.getElementById("frontIdInput").click();
  };

  // Function to clear the front ID file
  const clearId = () => {
    clearFrontId();
  };

  // Handle change in the preferred ID dropdown
  const handleIdTypeChange = (event) => {
    setSelectedIdType(event.target.value);
  };

  const hasNoId = () => {
    return !frontIdFile;
  };

  return (
    <div className="ReviewYourReferenceCheck-container d-flex flex-column align-items-center justify-content-center w-100">
      <div className="preferred-id-container mb-3">
        <p>Preferred ID</p>
        <select
          name="preferred-id"
          id="preferred-id"
          className="mb-3 form-select"
          value={selectedIdType}
          onChange={handleIdTypeChange}
        >
          <option value="">Select ID</option>
          <option value="Passport">Passport</option>
          <option value="Driver's License">Driver's License</option>
          <option value="National ID">National ID</option>
        </select>
      </div>

      <div className="upload-id-container">
        <p>Upload Your ID</p>

        <div className="front-id-container mb-3">
          <p>Front ID page</p>
          <div className="d-flex justify-content-between w-100">
            {frontIdFile ? (
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="front-id-img-container d-flex align-items-center ">
                  <img
                    src={URL.createObjectURL(frontIdFile)}
                    alt="Front ID"
                    style={{
                      maxWidth: "50px",
                      maxHeight: "50px",
                    }}
                  />
                  <p className="m-0">File uploaded: {frontIdFile.name}</p>
                </div>
                <button
                  onClick={triggerFrontFileInput}
                  disabled={!selectedIdType}
                >
                  Select File
                </button>
                <input
                  type="file"
                  id="frontIdInput"
                  accept="image/*"
                  onChange={handleFrontIdSelect}
                  style={{ display: "none" }} // Hide the file input
                />
              </div>
            ) : (
              <>
                <div className="front-id-img-container d-flex"></div>
                <button
                  onClick={triggerFrontFileInput}
                  disabled={!selectedIdType}
                >
                  Select File
                </button>
                <input
                  type="file"
                  id="frontIdInput"
                  accept="image/*"
                  onChange={handleFrontIdSelect}
                  style={{ display: "none" }} // Hide the file input
                />
              </>
            )}
          </div>
        </div>

        
        <div className="back-id-container mb-3">
          {/* <p>Back ID page</p>
          <div className="d-flex justify-content-between w-100">
            {backIdFile ? (
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="back-id-img-container d-flex align-items-center ">
                  <img
                    src={URL.createObjectURL(backIdFile)}
                    alt="Back ID"
                    style={{
                      maxWidth: "50px",
                      maxHeight: "50px",
                    }}
                  />
                  <p className="m-0">File uploaded: {backIdFile.name}</p>
                </div>
                <button
                  onClick={triggerBackFileInput}
                  disabled={!selectedIdType}
                >
                  Select File
                </button>
                <input
                  type="file"
                  id="backIdInput"
                  accept="image/*"
                  onChange={handleBackIdSelect}
                  style={{ display: "none" }} // Hide the file input
                />
              </div>
            ) : (
              <>
                <div className="back-id-img-container d-flex"></div>
                <button
                  onClick={triggerBackFileInput}
                  disabled={!selectedIdType}
                >
                  Select File
                </button>
                <input
                  type="file"
                  id="backIdInput"
                  accept="image/*"
                  onChange={handleBackIdSelect}
                  style={{ display: "none" }} // Hide the file input
                />
              </>
            )}
          </div> */}
        </div>
       
      </div>

      <div className="IdUploadSection-button-controls d-flex gap-3 my-3 w-100 justify-content-center">
        <button onClick={clearId} disabled={submitting || hasNoId()}>
          Clear
        </button>

        <button onClick={submitIdUpload} disabled={submitting || hasNoId()}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default IdUploadSection;