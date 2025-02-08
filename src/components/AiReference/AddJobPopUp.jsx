// AddJobPopUp.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddJobPopUp = ({ onClose, onAddJob }) => {
  const [jobName, setJobName] = useState("");
  const [vacancies, setVacancies] = useState(0);
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
          <h5 className="m-0">Create New Job</h5>
          <small>Add a new job opening to the system. Fill out the details below.</small>
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
            <Form.Label className="me-2" style={{ width: "150px" }}>Job Name</Form.Label>
            <Form.Control
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder=""
              required
            />
          </Form.Group>
          <Form.Group controlId="formVacancies" className="d-flex align-items-center mb-3">
            <Form.Label className="me-2" style={{ width: "150px" }}>Vacancies</Form.Label>
            <Form.Control
              type="number"
              value={vacancies}
              onChange={(e) => setVacancies(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formHiringManager" className="d-flex align-items-center mb-3">
            <Form.Label className="me-2" style={{ width: "150px" }}>Hiring Manager</Form.Label>
            <Form.Control
              type="text"
              value={hiringManager}
              onChange={(e) => setHiringManager(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button  className="btn-create-job" type="submit">
              Create Job
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddJobPopUp;