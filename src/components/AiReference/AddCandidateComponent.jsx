import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const AddCandidateComponent = ({ onProceed, refetch, totalVacancies }) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [positions, setPositions] = useState(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const lastJob = jobs[jobs.length - 1];
    return lastJob ? [{ name: lastJob.jobName, _id: lastJob._id }] : [];
  });
 const isFormValid = candidates.every(candidate => 
  candidate.name.trim() !== "" && 
  candidate.email.trim() !== "" && 
  candidate.position.trim() !== ""
);
  useEffect(() => {
    if (positions.length > 0 && totalVacancies > 0) {
      const newCandidates = Array.from({ length: totalVacancies }, () => ({
        name: "", // Set name to an empty string
        email: "", // Set email to an empty string
        position: positions[0]?.name || "", // Ensure position is set correctly
      }));
      setCandidates(newCandidates);
    }
  }, [positions, totalVacancies]);

  const handleInputChange = (index, field, value) => {
    setCandidates((prev) => {
      const updatedCandidates = [...prev];
      updatedCandidates[index][field] = value;
      return updatedCandidates;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});
    const newErrorMessages = {};
    const currentCandidate = candidates[currentCandidateIndex];

    if (currentCandidate.name.length < 2) {
      newErrorMessages.name = "Candidate name must be at least 2 characters.";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(currentCandidate.email)) {
      newErrorMessages.email = "Invalid email address.";
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    const URL = `${API}/api/ai-referee/company-candidates/create-candidate`;
    const status = "New";
    setIsLoading(true);
    try {
      const task = candidates.map(async (candidate) => {
        const payload = {
          name: candidate.name,
          email: candidate.email,
          position: candidate.position,
          status,
        };
        const response = await axios.post(URL, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      });

      const responses = await Promise.all(task);

      if (responses.every((response) => response.status === 201)) {
        await refetch();
        onProceed(candidates); 
            }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentCandidateIndex > 0) {
      setCurrentCandidateIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      <div>
        <h3>Add New Candidate</h3>
        <p>Enter the details of the new candidate below.</p>
      </div>
      <div className="job-container-form d-flex align-items-center justify-content-center w-100">
        <Form onSubmit={handleSubmit}>
          <p>
            Candidate {currentCandidateIndex + 1} of {totalVacancies}
            <span> * Fill in the required Information</span>
          </p>
          <Form.Group
            controlId="formHiringManager"
            className="d-flex align-items-center mb-4"
          >
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
              Position
            </Form.Label>
            <Form.Select
              value={candidates[currentCandidateIndex]?.position || ""}
              onChange={(e) =>
                handleInputChange(
                  currentCandidateIndex,
                  "position",
                  e.target.value
                )
              }
              required
              disabled
            >
              {positions.map((position) => (
                <option key={position._id} value={position.name}>
                  {position.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div key={currentCandidateIndex} className="candidate-container mb-4">
            <Form.Group
              controlId={`formJobName${currentCandidateIndex}`}
              className="d-flex align-items-center mb-4"
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
                  onChange={(e) =>
                    handleInputChange(
                      currentCandidateIndex,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder={`Candidate ${currentCandidateIndex + 1}`}                  required
                />
                {errorMessages.name && (
                  <div className="px-3 py-1 text-danger">
                    {errorMessages.name}
                  </div>
                )}
              </div>
            </Form.Group>

            <Form.Group
              controlId={`formVacancies${currentCandidateIndex}`}
              className="d-flex align-items-center mb-4"
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
                  onChange={(e) =>
                    handleInputChange(
                      currentCandidateIndex,
                      "email",
                      e.target.value
                    )
                  }
                  placeholder={`candidate${currentCandidateIndex + 1}@example.com`}                  required
                />
                {errorMessages.email && (
                  <div className="px-3 py-1 text-danger">
                    {errorMessages.email}
                  </div>
                )}
              </div>
            </Form.Group>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3 my-3 add-candidate-controller">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentCandidateIndex === 0}
            >
              <svg
                width="16"
                height="26"
                viewBox="0 0 16 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.887082 11.5348L12.1048 0.12528L14.9566 2.92921L5.14091 12.9128L15.1245 22.7285L12.3205 25.5804L0.911051 14.3627C0.532944 13.9908 0.318009 13.484 0.313514 12.9537C0.309019 12.4234 0.515332 11.913 0.887082 11.5348Z"
                  fill="#F46A05"
                />
              </svg>
            </button>
            <span className="d-flex align-items-center">
              {currentCandidateIndex + 1}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentCandidateIndex === candidates.length - 1}
            >
              <svg
                width="16"
                height="26"
                viewBox="0 0 16 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.517 14.5231L3.203 25.8371L0.375 23.0091L10.275 13.1091L0.375 3.2091L3.203 0.381104L14.517 11.6951C14.8919 12.0702 15.1026 12.5788 15.1026 13.1091C15.1026 13.6394 14.8919 14.148 14.517 14.5231Z"
                  fill="#F46A05"
                />
              </svg>
            </button>
          </div>
        </Form>
      </div>

      <div className="d-flex justify-content-end my-3">
        <button
          className="btn-proceed"
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Adding..." : "Proceed"}
        </button>
      </div>
    </>
  );
};

export default AddCandidateComponent;