import React from "react";
import { Modal } from "react-bootstrap";

const SuspendedUserPopUp = ({ onClose, onConfirm, username, isProcessing }) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-edit-user"
      backdrop="static"
      keyboard={false}
    >

      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center gap-2 flex-column p-2 py-3">
        <h3 className="text-center mb-3">Suspended User</h3>

          <p className="text-center m-0">
            Suspend {username}'s account? They will be temporarily restricted from 
            accessing their account until you lift the suspension.
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-submit-request"
              disabled={isProcessing}
              onClick={onConfirm}
            >
              {isProcessing ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "Yes"
              )}
            </button>
            <button
              className="btn-no-submit-request"
              disabled={isProcessing}
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuspendedUserPopUp;
