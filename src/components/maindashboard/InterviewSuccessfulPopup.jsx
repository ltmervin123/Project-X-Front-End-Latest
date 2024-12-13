import React from "react";
import { Modal, Button } from "react-bootstrap";
import SuccessAvatar from '../../assets/logo.png';

const InterviewSuccessfulPopup = () => {
  return (
    <Modal
      show={true}
      centered
      dialogClassName="interviewsuccess-modal-width"
      backdrop={true}
    >
      <Modal.Body className="d-flex align-items-center flex-column position-relative">
        <img src={SuccessAvatar} alt="" />
        <p>Congratulations! Your interview was successfully recorded.</p>
        <div className="d-flex gap-2">
          <Button className="btn-analytics"
            onClick={() => (window.location.href = "/HR_HATCH/analytics")}
          >
            View Your Results
          </Button>
          <Button className="btn-return-maindashboard"
            onClick={() => (window.location.href = "/HR_HATCH/maindashboard")}
          >
            Back for Interview
          </Button>
        </div>
        
      </Modal.Body>
    </Modal>
  );
};

export default InterviewSuccessfulPopup;
