import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddCandidateComponent = ({onProceed }) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const isFormValid = name && email && position;
  const formRef = useRef(null); // Add this line

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
        onProceed();
        console.log("Candidate added successfully:", response.data);

      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleProceed = () => {
    // Add this function
    if (isFormValid) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  };
  return (
    <>
      <div>
        <h3 className="mb-3">Add New Candidate</h3>
        <p>Enter the details of the new candidate below.</p>
      </div>
      <div className="job-container-form d-flex align-items-center justify-content-center w-100">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Form.Group
            controlId="formJobName"
            className="d-flex align-items-center mb-5"
          >
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
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
            className="d-flex align-items-center mb-5"
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
            controlId="formHiringManager"
            className="d-flex align-items-center mb-5"
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
        </Form>
      </div>

      <div className="d-flex justify-content-end my-3">
        <button
          className="btn-proceed"
          type="button" // Change this line
          onClick={handleProceed} // Change this line
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Adding..." : "Proceed"}{" "}
          {/* Changed text to "Proceed" */}
        </button>
      </div>
    </>
  );
};

export default AddCandidateComponent;
