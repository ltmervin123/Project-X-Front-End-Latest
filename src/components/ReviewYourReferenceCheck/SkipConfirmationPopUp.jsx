import React from "react";
import { Modal, Button } from "react-bootstrap";

const SkipConfirmationPopUp = ({ onClose, onConfirmSkip }) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            {/* You can add a title or icon here if needed */}
          </div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <p>Would you like to proceed with all of your original answers?</p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button className="btn-no-skip" onClick={onClose}>
              No
            </button>
            <button className="btn-yes-skip" onClick={onConfirmSkip}>
              Yes
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SkipConfirmationPopUp;