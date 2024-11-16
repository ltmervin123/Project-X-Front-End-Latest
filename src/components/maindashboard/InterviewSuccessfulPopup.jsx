import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import avatarImg from '../../assets/login-img.png';

const InterviewSuccessfulPopup = () => {
    return (
        <Modal show={true} centered dialogClassName="interviewsuccess-modal-width" backdrop={true}>
            <Modal.Body className='d-flex align-items-center flex-column'>
                <p>Congratulations! Your interview was successfully recorded.</p>
                <Button  onClick={() => window.location.href = '/analytics'}>
                    View Analytics
                </Button>
                <img src={avatarImg} alt="" />
            </Modal.Body>
        </Modal>
    );
};

export default InterviewSuccessfulPopup;
