import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SuccessAvatar from '../../assets/logo.png';

const ErrorAccessCam = ({ onRetry }) => {
  return (
    <Modal show={true} centered  dialogClassName="interviewsuccess-modal-width">
      <Modal.Body className='d-flex align-items-center flex-column position-relative'>
        <img src={SuccessAvatar} alt="" />
        <h4>Error: Unable to Detect Camera</h4>
        <p>We were unable to access your camera after multiple attempts. Please check your camera settings and permissions.</p>
        <div className="d-flex justify-content-center gap-3 error">
          <Button className='btn-analytics' onClick={onRetry}>
            Try Again
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorAccessCam;