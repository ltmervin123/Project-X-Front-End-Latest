import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const AddCandidateComponent = ({
  onProceed,
  refetch,
  setAddedCandidate,
  addedJob,
}) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Utility function to capitalize the first letter of each word
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const isFormValid = candidates.every(
    (candidate) =>
      candidate.firstName.trim() !== "" &&
      candidate.lastName.trim() !== "" &&
      candidate.email.trim() !== "" &&
      candidate.position.trim() !== ""
  );
  useEffect(() => {
    const newCandidates = Array.from({ length: addedJob.vacancies }, () => ({
      firstName: "",
      lastName: "",
      email: "",
      position: addedJob.positionName,
      positionId: addedJob.positionId,
    }));
    setCandidates(newCandidates);
  }, []);

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

    if (currentCandidate.firstName.length < 2) {
      newErrorMessages.firstName = "First name must be at least 2 characters.";
    }
    if (currentCandidate.lastName.length < 2) {
      newErrorMessages.lastName = "Last name must be at least 2 characters.";
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
      const task = candidates.map((candidate) => {
        const payload = {
          name: `${capitalizeWords(candidate.firstName)} ${capitalizeWords(
            candidate.lastName
          )}`,
          email: candidate.email.toLowerCase(),
          position: candidate.position,
          positionId: candidate.positionId,
          status,
        };
        return axios.post(URL, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });

      const responses = await Promise.all(task);

      if (responses.every((response) => response.status === 201)) {
        setAddedCandidate(
          responses.map((response) => response.data?.createdCandidate)
        );
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

  // Prevent accidental page exit
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  //Add a warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(
        "Are you sure you want to go back? Your progress will be lost."
      );
      if (!userConfirmed) {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <>
      <div>
        <h3 className="mb-0">Add New Candidate</h3>
        <p className="mb-2">Enter the details of the new candidate below.</p>
      </div>
      <div className="job-container-form d-flex align-items-center justify-content-center w-100 flex-column">
        <b className="d-flex justify-content-start">
          Candidate {currentCandidateIndex + 1} of {addedJob?.vacancies}
          <span>&nbsp; * Fill in the required Information</span>
        </b>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlId="formHiringManager"
            className="d-flex align-items-center  mb-4"
          >
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Position
            </Form.Label>
            <Form.Control
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
            />
          </Form.Group>

          <div key={currentCandidateIndex} className="candidate-container mb-4">
            {/* <Form.Group
              controlId={`formJobName${currentCandidateIndex}`}
              className="d-flex align-items-center mb-4"
            >
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                Name
              </Form.Label>
              <div className="w-100 position-relative">
                <Form.Control
                  value={candidates[currentCandidateIndex]?.name}
                  type="text"
                  onChange={(e) =>
                    handleInputChange(
                      currentCandidateIndex,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder={`Candidate ${currentCandidateIndex + 1}`}
                  required
                />
                {errorMessages.name && (
                  <div className="px-3 py-1 text-danger">
                    {errorMessages.name}
                  </div>
                )}
              </div>
            </Form.Group> */}

            <Form.Group
              controlId={`formFirstName${currentCandidateIndex}`}
              className="d-flex align-items-center mb-4"
            >
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                Candidate 
              </Form.Label>
              <div className="d-flex gap-2 w-100">
                <div className="positiom-relative w-50">
                  <Form.Control
                    value={candidates[currentCandidateIndex]?.firstName}
                    type="text"
                    onChange={(e) =>
                      handleInputChange(
                        currentCandidateIndex,
                        "firstName",
                        e.target.value
                      )
                    }
                    placeholder={`First Name`}
                    required
                  />
                  {errorMessages.firstName && (
                    <div className="px-3 py-1 text-danger">
                      {errorMessages.firstName}
                    </div>
                  )}
                </div>
                <div className="positiom-relative w-50">
                  <Form.Control
                    value={candidates[currentCandidateIndex]?.lastName}
                    type="text"
                    onChange={(e) =>
                      handleInputChange(
                        currentCandidateIndex,
                        "lastName",
                        e.target.value
                      )
                    }
                    placeholder={`Last Name`}
                    required
                  />
                  {errorMessages.lastName && (
                    <div className="px-3 py-1 text-danger">
                      {errorMessages.lastName}
                    </div>
                  )}
                </div>
              </div>
            </Form.Group>

            <Form.Group
              controlId={`formVacancies${currentCandidateIndex}`}
              className="d-flex align-items-center mb-4"
            >
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                Email
              </Form.Label>
              <div className="w-100 position-relative">
                <Form.Control
                  value={candidates[currentCandidateIndex]?.email}
                  type="email"
                  onChange={(e) =>
                    handleInputChange(
                      currentCandidateIndex,
                      "email",
                      e.target.value
                    )
                  }
                  placeholder={`candidate${
                    currentCandidateIndex + 1
                  }@example.com`}
                  required
                />
                {errorMessages.email && (
                  <div className="px-3 py-1 text-danger">
                    {errorMessages.email}
                  </div>
                )}
              </div>
            </Form.Group>
          </div>
        </Form>
        <div className="d-flex justify-content-center align-items-center gap-3  add-candidate-controller">
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
      </div>

      <div className="d-flex justify-content-end mt-3">
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
