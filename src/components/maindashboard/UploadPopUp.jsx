import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

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
      onUploadComplete(validFiles[0]); // Trigger to close UploadPopUp and open JobDescriptionPopup
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
      onUploadComplete(validFiles[0]); //Pass the files to the parent component
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
            className="closebtn"
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
          <svg
            width="47"
            height="47"
            viewBox="0 0 47 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5413 31.3333V15.3728L16.4497 20.4645L13.708 17.6249L23.4997 7.83325L33.2913 17.6249L30.5497 20.4645L25.458 15.3728V31.3333H21.5413ZM11.7497 39.1666C10.6726 39.1666 9.75087 38.7834 8.98451 38.017C8.21815 37.2507 7.83431 36.3283 7.83301 35.2499V29.3749H11.7497V35.2499H35.2497V29.3749H39.1663V35.2499C39.1663 36.327 38.7832 37.2494 38.0168 38.017C37.2504 38.7847 36.3281 39.1679 35.2497 39.1666H11.7497Z"
              fill="#F46A05"
            />
          </svg>

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
          <i>Supported Files: DOC, DOCX, PDF</i>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadPopUp;
