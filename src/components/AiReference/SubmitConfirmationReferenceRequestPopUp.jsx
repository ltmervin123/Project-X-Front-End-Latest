import React from "react";
import { Modal, Button } from "react-bootstrap";

const SubmitConfirmationReferenceRequestPopUp = ({ onClose, onConfirmSubmit }) => {
  return (
    <Modal show={true} onHide={onClose} centered backdrop={true}>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div></div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column p-2">
          <p className="text-center">
            Would you like to send the request? You can’t edit the information once it is submitted.
          </p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button className="btn-no-submit-request" onClick={onClose}>
              No
            </button>
            <button
              className="btn-yes-submit-request"
              onClick={onConfirmSubmit}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubmitConfirmationReferenceRequestPopUp;