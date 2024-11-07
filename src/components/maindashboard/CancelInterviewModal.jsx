import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CancelInterviewModal = ({ show, onClose, onConfirm }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Body className="text-center">
                <h5>Do you want to cancel the interview?</h5>
                <div className="d-flex justify-content-center mt-4">
                    <Button variant="danger" onClick={onConfirm} className="me-3">Yes</Button>
                    <Button variant="secondary" onClick={onClose} >No</Button>
                    
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default CancelInterviewModal;
