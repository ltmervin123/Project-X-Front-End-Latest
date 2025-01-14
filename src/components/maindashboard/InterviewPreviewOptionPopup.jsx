import React from "react";
import { Modal, Button } from "react-bootstrap";

const InterviewPreviewOptionPopup = ({ show, onHide, onPreview }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static" // This prevents closing when clicking outside
      keyboard={false} // This prevents closing with keyboard
      centered
      dialogClassName="interviewpreview-modal-width"
    >
      <Modal.Body className="d-flex align-items-center flex-column position-relative">
        <p>Would you like to preview your interview?</p>
        <div className="d-flex justify-content-center gap-2">
          <Button onClick={onHide}>Cancel</Button>
          <Button onClick={onPreview}>Preview</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InterviewPreviewOptionPopup;
