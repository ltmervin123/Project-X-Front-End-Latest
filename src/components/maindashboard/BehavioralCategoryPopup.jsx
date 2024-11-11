import React, { useEffect } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';

const BehavioralCategoryPopup = ({ show, onClose, category, onSkillSelect }) => {
    useEffect(() => {
        if (show) {
            console.log("Selected Category:", category); // Log the category when the modal is shown
        }
    }, [show, category]);

    const handleSkillClick = (skill) => {
        console.log("Selected Behavioral Skill:", skill); // Log the selected skill
        onSkillSelect(); // Trigger the skill selection and open the Behavioral Video Recording
    };

    const behavioralSkills = ['Teamwork', 'Adaptability', 'Communication', 'Stress Management'];

    return (
        <Modal show={show} onHide={onClose} centered dialogClassName="custom-modal-width" backdrop={false}>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="m-0">Choose Behavioral Skill</h5>
                    <Button variant="link" onClick={onClose} style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
                        &times;
                    </Button>
                </div>
                <Row className="d-flex justify-content-center align-items-center position-relative">
                    {behavioralSkills.map((skill, index) => (
                        <Col key={index} md={5} className="mb-4">
                            <div
                                className="behavioral-card d-flex justify-content-center"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSkillClick(skill)} // Handle skill selection
                            >
                                <p className="card-title">{skill}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default BehavioralCategoryPopup;
