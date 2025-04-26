import React from "react";
import { Modal } from "react-bootstrap";

const SubmitConfirmationPopUp = ({ onClose, onConfirmSubmit }) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">
            Kindly review the information provided. Do you wish to proceed?
          </p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-submit-request"
              onClick={onConfirmSubmit}
            >
              Yes
            </button>
            <button className="btn-no-submit-request" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubmitConfirmationPopUp;
