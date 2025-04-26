import React from "react";
import { Modal } from "react-bootstrap";

const WarnUserPopup = ({ onClose, onConfirm, username, isProcessing }) => {
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
        <h3 className="text-center mb-3">Warn User</h3>
        <p className="text-center m-0">
            Send a warning to {username}? A notification will be sent informing
            them of a policy violation.
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

export default WarnUserPopup;
