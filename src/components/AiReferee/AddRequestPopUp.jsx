// AddJobPopUp.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddRequestPopUp = ({ onClose, onAddJob }) => {
  const [candidateName, setCandidateName] = useState("");
  const [refereeEmail, setRefereeEmail] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddJob({ candidateName, refereeEmail, position });
    onClose();
  };

  return (
    <Modal       
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-job"
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="m-0">New Reference Request</h5>
            <small>Create a new reference request for a candidate.</small>
          </div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <Form onSubmit={handleSubmit}>
          {/* Candidate Name input */}
          <Form.Group controlId="formCandidateName" className="d-flex align-items-center mb-3">
            <Form.Label className="me-2" style={{ width: "150px" }}>Candidate</Form.Label>
            <Form.Control
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </Form.Group>

          {/* Referee's Name input */}
          <Form.Group controlId="formRefereeName" className="d-flex align-items-center mb-3">
            <Form.Label className="me-2" style={{ width: "150px" }}>Referee Name</Form.Label>
            <Form.Control
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </Form.Group>
          {/* Referee's Email input */}
          <Form.Group controlId="formRefereeEmail" className="d-flex align-items-center mb-3">
            <Form.Label className="me-2" style={{ width: "150px" }}>Referee's Email</Form.Label>
            <Form.Control
              type="email"
              value={refereeEmail}
              onChange={(e) => setRefereeEmail(e.target.value)}
              placeholder="sample@hrhatch.com"
              required
            />
          </Form.Group>

          {/* Position input */}
          <Form.Group controlId="formPosition" className="d-flex align-items-center mb-3">
            <Form.Label className="me-2" style={{ width: "150px" }}>Position</Form.Label>
            <Form.Control
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Manager"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <button className="btn-add-candidate" type="submit">
              Send Request
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRequestPopUp;
