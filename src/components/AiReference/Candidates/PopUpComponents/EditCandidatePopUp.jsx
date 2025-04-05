import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditCandidatePopUp = ({
  onClose,
  onUpdateCandidate,
  candidateDetails,
}) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const isFormValid = firstName && lastName && email && position;
  const [positions, setPositions] = useState(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    return jobs.map((job) => job.jobName);
  });

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    if (candidateDetails) {
      setFirstName(candidateDetails.name.firstName);
      setLastName(candidateDetails.name.lastName);
      setEmail(candidateDetails.email);
      setPosition(candidateDetails.position);
    }
  }, [candidateDetails]);

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
    const URL = `${API}/api/ai-referee/company-candidates/update-candidate-by-id/${candidateDetails._id}`;
    setIsLoading(true);
    try {
      const payload = {
        name: {
          firstName: capitalizeWords(firstName),
          lastName: capitalizeWords(lastName),
        },
        email,
        position,
      };
      const response = await axios.put(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await onUpdateCandidate();
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
            <h5 className="m-0">Edit Candidate</h5>
            <small>Update the details of the candidate below.</small>
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
            controlId="formCandidateFirstName"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
              Candidate
            </Form.Label>
            <div className="d-flex gap-2 w-100">
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
              />

              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </Form.Group>
          <Form.Group
            controlId="formCandidateEmail"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
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
            controlId="formCandidatePosition"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
              Position
            </Form.Label>
            <Form.Select
              value={position}
              onChange={handlePositionChange}
              required
              disabled={true}
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
              className="btn-create-job"
              type="submit"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? "Updating..." : "Update Candidate"}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCandidatePopUp;
