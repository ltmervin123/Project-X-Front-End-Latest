import React from "react";
import { Modal } from "react-bootstrap";

const TranscriptionWarning = ({ onClose }) => {
  return (
    <Modal show={true} onHide={onClose} centered backdrop={true}>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div></div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column p-2">
          <p className="text-center">
            No response detected. Please speak your answer before submitting.
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button className="btn-yes-delete-job" onClick={onClose}>
              Got it
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TranscriptionWarning;
