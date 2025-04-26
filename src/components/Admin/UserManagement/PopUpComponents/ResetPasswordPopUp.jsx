import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ResetPasswordPopUp = ({ onClose, onConfirm, email, isProcessing }) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdrop="static"
      className="custom-modal-edit-user"

      keyboard={false}
    >
      <Modal.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className=" mb-0">Reset Password</h3>
              <small>
                Send a password reset link to the user's email.
              </small>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                className="closebtn"
                variant="link"
                onClick={onClose}
                style={{ fontSize: "1.5rem", textDecoration: "none" }}
              >
                &times;
              </Button>
            </div>
          </div>
          <Form.Group controlId="formEmail" className="mb-4 w-100">
            <Form.Control
              type="email"
              placeholder="sample@example.com"
              value={email}
              readOnly
              className="text-center"
            />
          </Form.Group>

          <div className="d-flex justify-content-center gap-3 w-100 mt-3">
            <button
              className="btn-save-changes"
              disabled={isProcessing}
              onClick={onConfirm}
            >
              {isProcessing ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        
      </Modal.Body>
    </Modal>
  );
};

export default ResetPasswordPopUp;
