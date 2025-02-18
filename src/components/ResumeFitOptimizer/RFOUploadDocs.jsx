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
          <div className="upload-docs-container d-flex flex-column gap-2">
            <Row className="upload-docs-content d-flex justify-content-around align-items-center flex-row gap-2">
              <Col className="upload-docs-content-col">
                <div className="ResumeFitOptimizer-uploadDocs-content d-flex flex-column gap-2">
                    <div className="header-text">
                        <h5>Upload Your Resume</h5>
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
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleBrowseFiles}
                                accept=".doc, .docx"
                                multiple
                            />
                            <i className="support-file-text">Supports DOC, DOCX</i>
                            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        </div>
                    </div>
                    <div className="ResumeFitOptimizer-uploadDocs-job-description uploadDocs-job-description d-flex flex-column gap-2">
                        <div
                            className="d-flex flex-column align-items-center mb-3 upload-area"
                            onDrop={handleFileDrop}
                            onDragOver={(event) => event.preventDefault()}
                        >
                            <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7891 3.08594H26.2057C27.4324 3.08594 28.6087 3.57321 29.4761 4.44057C30.3435 5.30792 30.8307 6.48431 30.8307 7.71094V29.2943C30.8307 30.5209 30.3435 31.6973 29.4761 32.5646C28.6087 33.432 27.4324 33.9193 26.2057 33.9193H10.7891C9.56244 33.9193 8.38605 33.432 7.51869 32.5646C6.65134 31.6973 6.16406 30.5209 6.16406 29.2943V7.71094C6.16406 6.48431 6.65134 5.30792 7.51869 4.44057C8.38605 3.57321 9.56244 3.08594 10.7891 3.08594ZM10.7891 6.16927C10.3802 6.16927 9.98806 6.3317 9.69894 6.62081C9.40982 6.90993 9.2474 7.30206 9.2474 7.71094V29.2943C9.2474 29.7031 9.40982 30.0953 9.69894 30.3844C9.98806 30.6735 10.3802 30.8359 10.7891 30.8359H26.2057C26.6146 30.8359 27.0067 30.6735 27.2959 30.3844C27.585 30.0953 27.7474 29.7031 27.7474 29.2943V7.71094C27.7474 7.30206 27.585 6.90993 27.2959 6.62081C27.0067 6.3317 26.6146 6.16927 26.2057 6.16927H10.7891ZM13.8724 7.71094H23.1224C23.5313 7.71094 23.9234 7.87336 24.2125 8.16248C24.5016 8.4516 24.6641 8.84373 24.6641 9.2526C24.6641 9.66148 24.5016 10.0536 24.2125 10.3427C23.9234 10.6318 23.5313 10.7943 23.1224 10.7943H13.8724C13.4635 10.7943 13.0714 10.6318 12.7823 10.3427C12.4932 10.0536 12.3307 9.66148 12.3307 9.2526C12.3307 8.84373 12.4932 8.4516 12.7823 8.16248C13.0714 7.87336 13.4635 7.71094 13.8724 7.71094ZM13.8724 26.2109H16.9557C17.3646 26.2109 17.7567 26.3734 18.0459 26.6625C18.335 26.9516 18.4974 27.3437 18.4974 27.7526C18.4974 28.1615 18.335 28.5536 18.0459 28.8427C17.7567 29.1318 17.3646 29.2943 16.9557 29.2943H13.8724C13.4635 29.2943 13.0714 29.1318 12.7823 28.8427C12.4932 28.5536 12.3307 28.1615 12.3307 27.7526C12.3307 27.3437 12.4932 26.9516 12.7823 26.6625C13.0714 26.3734 13.4635 26.2109 13.8724 26.2109ZM13.8724 20.0443H23.1224C23.5313 20.0443 23.9234 20.2067 24.2125 20.4958C24.5016 20.7849 24.6641 21.1771 24.6641 21.5859C24.6641 21.9948 24.5016 22.3869 24.2125 22.6761C23.9234 22.9652 23.5313 23.1276 23.1224 23.1276H13.8724C13.4635 23.1276 13.0714 22.9652 12.7823 22.6761C12.4932 22.3869 12.3307 21.9948 12.3307 21.5859C12.3307 21.1771 12.4932 20.7849 12.7823 20.4958C13.0714 20.2067 13.4635 20.0443 13.8724 20.0443ZM13.8724 13.8776H23.1224C23.5313 13.8776 23.9234 14.04 24.2125 14.3291C24.5016 14.6183 24.6641 15.0104 24.6641 15.4193C24.6641 15.8281 24.5016 16.2203 24.2125 16.5094C23.9234 16.7985 23.5313 16.9609 23.1224 16.9609H13.8724C13.4635 16.9609 13.0714 16.7985 12.7823 16.5094C12.4932 16.2203 12.3307 15.8281 12.3307 15.4193C12.3307 15.0104 12.4932 14.6183 12.7823 14.3291C13.0714 14.04 13.4635 13.8776 13.8724 13.8776Z" fill="#686868"/>
                            </svg>

                
                            <p>Drag & Drop Job Description</p>
                            <Button
                            className="btn btn-secondary"
                            onClick={() => document.getElementById("fileInput").click()}
                            >
                            Select File
                            </Button>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleBrowseFiles}
                                accept=".doc, .docx"
                                multiple
                            />
                            <i className="support-file-text">Supports DOC, DOCX</i>
                            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        </div>
                    </div>
                </div>
              </Col>
              <Col className="upload-docs-content-col">
                <div className="ResumeFitOptimizer-aiResumeInsightsSummary-content d-flex flex-column gap-2">
                    <div className="header-text">
                        <h5>AI Resume Snapshot</h5>
                        <p>Quick summary of key resume insights</p>
                    </div>
                    <div className="aiResume-insights-summary-content">
                      <div className="aiResume-insights-summary d-flex flex-column gap-2">
                      </div>
                    </div>
                </div>
              </Col>
            </Row>
            <Row>
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
