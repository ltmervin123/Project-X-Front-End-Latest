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

        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">Would you like to proceed with all of your original answers for the remaining questions?</p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
          <button className="btn-yes-skip" onClick={onConfirmSkip}>
              Yes
            </button>
            <button className="btn-no-skip" onClick={onClose}>
              No
            </button>
   
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SkipConfirmationPopUp;