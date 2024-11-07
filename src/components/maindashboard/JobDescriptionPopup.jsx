import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const JobDescriptionPopup = ({ show, onClose, onSubmit }) => {
    const [description, setDescription] = useState('');
    const charLimit = 255;

    const handleDescriptionChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= charLimit) {
            setDescription(inputText);
        }
    };

    const handleSubmit = () => {
        console.log('Submitted Description:', description);
        onSubmit(); // Call onSubmit to open the VideoRecording component
    };

    return (
        <Modal show={show} onHide={onClose} centered dialogClassName="custom-modal-width" backdrop={false}>
            <Modal.Body className="job-description-modal ">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="m-0">Job Description</h5>
                    <Button variant="link" onClick={onClose} style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
                        &times;
                    </Button>
                </div>
                <div className="textarea-container position-relative mb-3">
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={8}
                        placeholder="Enter job description..."
                    />
                    <p className="char-count">{description.length}/{charLimit}</p>
                </div>
                <div className="submit-job-description d-flex align-items-center">
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default JobDescriptionPopup;
