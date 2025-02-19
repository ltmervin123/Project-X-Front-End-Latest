import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "../../styles/ResumeFitOrganizer.css";
import { Button, Row, Col } from "react-bootstrap";

function UploadDocs() {

  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  
  
  const onUploadComplete = (file) => {
    setUploadedFile(file);
  };
  const handleFileDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.filter((file) =>
      [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    );

    if (validFiles.length !== files.length) {
      setErrorMessage("Only DOC, and DOCX files are allowed.");
    } else {
      setErrorMessage("");
      onUploadComplete(validFiles[0]);
    }
  };

  const handleBrowseFiles = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) =>
      [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    );

    if (validFiles.length !== files.length) {
      setErrorMessage("Only DOC, and DOCX files are allowed.");
    } else {
      setErrorMessage("");
      onUploadComplete(validFiles[0]);
    }
  };

  return (
    <>
      <div className="ResumeFitOptimizer-contentainer d-flex flex-column gap-2">

        <div className="ResumeFitOptimizer-content d-flex flex-column gap-2">
          <div className="header d-flex justify-content-center align-items-center">
            <h4>Resume Fit Optimizer</h4>
          </div>
          <div className="upload-docs-container d-flex justify-content-center align-items-center flex-column  gap-3">
            <Row className="upload-docs-content d-flex justify-content-around align-items-center flex-row gap-2">
              <Col className="upload-docs-content-col">
                <div className="ResumeFitOptimizer-uploadDocs-content d-flex flex-column gap-2">
                    <div className="header-text">
                        <h5>Upload Documents</h5>
                        <p>Drag and drop or click to upload your resume and job description</p>
                    </div>
                    <div className="ResumeFitOptimizer-uploadDocs-resume uploadDocs-resume d-flex flex-column gap-2">
                        <div
                            className="d-flex flex-column align-items-center mb-3 upload-area"
                            onDrop={handleFileDrop}
                            onDragOver={(event) => event.preventDefault()}
                        >
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.7526 31.1651C3.67552 31.1651 2.7538 30.782 1.98744 30.0156C1.22108 29.2492 0.837243 28.3269 0.835938 27.2485V23.3318C0.835938 22.7769 1.02394 22.3122 1.39994 21.9375C1.77594 21.5628 2.24072 21.3748 2.79427 21.3735C3.34783 21.3722 3.81326 21.5602 4.19056 21.9375C4.56787 22.3148 4.75522 22.7796 4.7526 23.3318V27.2485H28.2526V23.3318C28.2526 22.7769 28.4406 22.3122 28.8166 21.9375C29.1926 21.5628 29.6574 21.3748 30.2109 21.3735C30.7645 21.3722 31.2299 21.5602 31.6072 21.9375C31.9845 22.3148 32.1719 22.7796 32.1693 23.3318V27.2485C32.1693 28.3256 31.7861 29.2479 31.0197 30.0156C30.2534 30.7833 29.331 31.1664 28.2526 31.1651H4.7526ZM14.5443 7.37138L10.8724 11.0433C10.4807 11.4349 10.016 11.6229 9.47806 11.6073C8.94017 11.5916 8.47474 11.3873 8.08177 10.9943C7.72274 10.6026 7.53474 10.1457 7.51777 9.62347C7.5008 9.10124 7.6888 8.6443 8.08177 8.25263L15.1318 1.20263C15.3276 1.0068 15.5398 0.868412 15.7682 0.787467C15.9967 0.706523 16.2415 0.665398 16.5026 0.664093C16.7637 0.662787 17.0085 0.703912 17.237 0.787467C17.4655 0.871023 17.6776 1.00941 17.8734 1.20263L24.9234 8.25263C25.3151 8.6443 25.5031 9.10124 25.4874 9.62347C25.4718 10.1457 25.2838 10.6026 24.9234 10.9943C24.5318 11.386 24.067 11.5903 23.5291 11.6073C22.9912 11.6242 22.5258 11.4362 22.1328 11.0433L18.4609 7.37138V21.3735C18.4609 21.9283 18.2729 22.3938 17.8969 22.7698C17.5209 23.1458 17.0562 23.3331 16.5026 23.3318C15.949 23.3305 15.4843 23.1425 15.1083 22.7678C14.7323 22.3931 14.5443 21.9283 14.5443 21.3735V7.37138Z" fill="#686868"/>
                            </svg>
                
                            <p>Drag & Drop Resume</p>
                            <Button
                            className="btn btn-secondary"
                            onClick={() => document.getElementById("fileInput").click()}
                            >
                            Select File
                            </Button>
                            <i className="support-file-text">Supports DOC, DOCX</i>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleBrowseFiles}
                                accept=".doc, .docx"
                                multiple
                            />
                            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        </div>
                    </div>
                    <div className="ResumeFitOptimizer-uploadDocs-job-description uploadDocs-job-description d-flex flex-column gap-2">
                      <div className="textarea-wrapper">
                          <textarea 
                            name="job-description" 
                            id="job-description" 
                            placeholder="Type job description....."
                          ></textarea>
                      </div>
                    </div>
                </div>
              </Col>
            </Row>
            <Row className="upload-docs-content d-flex justify-content-around align-items-center flex-row gap-2 w-100">
              <div className="upload-docs-btn d-flex justify-content-end align-items-center">
                  <button 
                      className="btn-continue-optimization btn-primary"
                      onClick={() => window.location.href = "/ResumeFitOptimizer/AIResumeOptimizationAnalysis"}
                  >
                      Continue to Optimization
                  </button>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadDocs;
