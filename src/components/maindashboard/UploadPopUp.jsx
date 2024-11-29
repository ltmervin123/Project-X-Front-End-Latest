import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";

const UploadPopUp = ({ show, onClose, onUploadComplete }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.filter((file) =>
      [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
      ].includes(file.type)
    );

    if (validFiles.length !== files.length) {
      setErrorMessage("Only DOC, DOCX, and PDF files are allowed.");
    } else {
      setErrorMessage("");

      console.log("Uploaded Files (via Drag and Drop):", validFiles); // Log files to console
      onUploadComplete(validFiles[0]);// Trigger to close UploadPopUp and open JobDescriptionPopup
    }
  };

  const handleBrowseFiles = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) =>
      [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
      ].includes(file.type)
    );

    if (validFiles.length !== files.length) {
      setErrorMessage("Only DOC, DOCX, and PDF files are allowed.");
    } else {
      setErrorMessage("");
      onUploadComplete(validFiles[0]);//Pass the files to the parent component
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-modal-width"
      backdrop={false}
    >
      <Modal.Body className="upload-modal">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Upload Resume File</h5>
          <Button
          className='closebtn'
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>

        <div
          className="d-flex flex-column align-items-center mb-3 upload-area"
          onDrop={handleFileDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <FaUpload size={24} />
          <p>Drag and Drop files to upload</p>
          <p>or</p>
          <Button
            className="btn btn-primary"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Browse
          </Button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleBrowseFiles}
            accept=".doc, .docx, .pdf"
            multiple
          />
          <p>Supported Files: DOC, DOCX, PDF</p>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadPopUp;
