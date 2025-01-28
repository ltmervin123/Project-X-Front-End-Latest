// AddJobPopUp.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddCandidatePopUp = ({ onClose, onAddJob }) => {
  const [jobName, setJobName] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [hiringManager, setHiringManager] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddJob({ name: jobName, vacancies, hiringManager });
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
          <h5 className="m-0">Add New Candidate</h5>
          <small>Enter the details of the new candidate below.</small>
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
          <Form.Group controlId="formJobName" className="d-flex align-items-center mb-3">
            <Form.Label className="me-2" style={{ width: "150px" }}>Name</Form.Label>
            <Form.Control
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </Form.Group>
          <Form.Group controlId="formVacancies" className="d-flex align-items-center mb-3">
            <Form.Label className="me-2" style={{ width: "150px" }}>Email</Form.Label>
            <Form.Control
              type="email"
              value={vacancies}
              onChange={(e) => setVacancies(e.target.value)}
              placeholder="sample@hrhatch.com"
              required
            />
          </Form.Group>
          <Form.Group controlId="formHiringManager" className="d-flex align-items-center mb-3">
            <Form.Label className="me-2" style={{ width: "150px" }}>Position</Form.Label>
            <Form.Control
              type="text"
              value={hiringManager}
              onChange={(e) => setHiringManager(e.target.value)}
              placeholder="Manager"
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button  className="btn-add-candidate" type="submit">
            Add Candidate
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCandidatePopUp;