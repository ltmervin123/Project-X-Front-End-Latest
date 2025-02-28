import React from "react";
import { Modal } from "react-bootstrap";
import SuccessAvatar from "../../assets/logo1.png";
import "../../styles/Error.css";

const ErrorAccessCam = ({ onRetry }) => {
  return (
    <Modal show={true} centered dialogClassName="custom-modal-width1">
      <Modal.Body className="custom-modal">
        <div className="d-flex justify-content-end align-items-center mb-3"></div>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img src={SuccessAvatar} alt="" />
          <p>
            Camera access failed. Please review your camera settings and
            permissions, then try again.
          </p>
          <div className="d-flex justify-content-center gap-3 error">
            <button className="btn-analytics" onClick={onRetry}>
              Try Again
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorAccessCam;
