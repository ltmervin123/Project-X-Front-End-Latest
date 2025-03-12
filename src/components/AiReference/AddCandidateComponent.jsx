import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddCandidateComponent = ({ onProceed, refetch }) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOther, setIsOther] = useState(false);

  const formRef = useRef(null); // Add this line

  const [positions, setPositions] = useState(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const lastJob = jobs[jobs.length - 1];
    return lastJob ? [{ name: lastJob.jobName, _id: lastJob._id }] : [];
  });
  const [position, setPosition] = useState("");
  const isFormValid = name && email && position;

  //Set the position when positions is loaded
  useEffect(() => {
    setPosition(positions[0]?.name);
  }, [positions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({}); // Reset error messages

    // Validation
    const newErrorMessages = {};
    if (name.length < 2) {
      newErrorMessages.name = "Candidate name must be at least 2 characters.";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrorMessages.email = "Invalid email address.";
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return; // Stop submission if there are validation errors
    }

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
        await refetch();
        onProceed();
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
        <h3 className="mb-0">
          Add New <span className="color-blue">Candidate</span>{" "}
        </h3>
        <p className="mb-2">Enter the details of the new candidate below.</p>
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
            <div className="w-100 position-relative">
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
              {errorMessages.name && (
                <div className="px-3 py-1 text-danger">{errorMessages.name}</div>
              )}
            </div>
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
            <div className="w-100 position-relative">
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sample@hrhatch.com"
                required
              />
              {errorMessages.email && (
                <div className="px-3 py-1 text-danger">{errorMessages.email}</div>
              )}
            </div>
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
            <Form.Select value={position} disabled required>
              {positions.map((position) => (
                <option key={position._id} value={position.name}>
                  {position.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </div>

      <div className="d-flex justify-content-end my-3">
        <button
          className="btn-proceed"
          type="button"
          onClick={handleProceed}
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Adding..." : "Proceed"}{" "}
        </button>
      </div>
    </>
  );
};

export default AddCandidateComponent;
