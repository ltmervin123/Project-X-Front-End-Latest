import React from "react";
import { Modal, Button } from "react-bootstrap";
import SuccessAvatar from "../../../assets/logo.png";
import '../../../styles/Error.css';

const ErrorAccessCam = ({ onRetry, onClose }) => {
  return (
    <Modal show={true} centered 
    dialogClassName="custom-modal-width1"
    >
      <Modal.Body className="custom-modal">
      <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0"></h5>
          <Button
            className='closebtn'
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img src={SuccessAvatar} alt="" />
          {/* <h4>Error: Unable to Detect Camera</h4> */}
          <p>
            Camera access failed. Please review your camera settings and
            permissions, then try again.
          </p>
          <div className="d-flex justify-content-center gap-3 error">
            <Button className="btn-analytics" onClick={onRetry}>
              Try Again
            </Button>
          </div>
        </div>
        
      </Modal.Body>
    </Modal>
  );
};

export default ErrorAccessCam;
