// AddJobPopUp.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddCandidatePopUp = ({ onClose, onAddCandidate }) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const isFormValid = name && email && position;

  const [positions, setPositions] = useState(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    return jobs.map((job) => job.jobName);
  });

  const handlePositionChange = (e) => {
    const value = e.target.value;
    setPosition(value);
    if (value === "Others") {
      setIsOther(true);
    } else {
      setIsOther(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${API}/api/ai-referee/company-candidates/create-candidate`;
    const status = "New";
    setIsLoading(true);
    try {
      const payload = { name, email, position, status };
      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        onAddCandidate();
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
          <Form.Group
            controlId="formJobName"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Name
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formVacancies"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sample@hrhatch.com"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formHiringManager"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Position
            </Form.Label>
            <Form.Select
              value={position}
              onChange={handlePositionChange}
              required
            >
              <option value="" disabled>
                Select a position
              </option>
              {positions.map((pos, index) => (
                <option key={index} value={pos}>
                  {pos}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <button
              className="btn-add-candidate"
              type="submit"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? "Adding..." : "Add Candidate"}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCandidatePopUp;
