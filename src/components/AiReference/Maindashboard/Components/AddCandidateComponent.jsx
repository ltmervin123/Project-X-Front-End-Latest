import React, { useState, useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCandidateComponent = ({
  onProceed,
  refetch,
  setAddedCandidate,
  addedJob,
  onCancel,
  // setShowAddCandidate,
  // setShowJobForm,
}) => {
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isHrHatchOpen, setIsHrHatchOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const hrHatchQuestion = useMemo(() => {
    return [
      {
        name: "Standard Format",
        value: "STANDARD",
        _id: "67b404a91eb4c9da22cff68e",
      },
      {
        name: "Management Format",
        value: "MANAGEMENT",
        _id: "67b405191eb4c9da22cff690",
      },
      {
        name: "Executive Format",
        value: "EXECUTIVE",
        _id: "67b405a41eb4c9da22cff691",
      },
    ];
  }, []);

  const customQuestion = useMemo(() => {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    return questions.map((question) => ({
      name: question.name,
      _id: question._id,
    }));
  }, []);

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

  const handleQuestionSelect = (question, format) => {
    setSelectedQuestion(question);
    setSelectedFormat(format);
    setIsHrHatchOpen(false);
    setIsCustomOpen(false);
    // Update all candidates with the selected question format
    setCandidates((prev) =>
      prev.map((candidate) => ({
        ...candidate,
        questionFormat: format,
        questionId: question._id,
        questionName: question.name,
      }))
    );
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

    if (!selectedQuestion) {
      newErrorMessages.question = "Please select a question format";
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    const URL = `${API}/api/ai-referee/company-candidates/create-candidate`;
    const status = "New";
    setIsLoading(true);
    try {
      const payload = candidates.map((candidate) => {
        return {
          name: {
            firstName: capitalizeWords(candidate.firstName),
            lastName: capitalizeWords(candidate.lastName),
          },
          email: candidate.email,
          position: candidate.position,
          positionId: candidate.positionId,
          status,
          questionFormat: candidate.questionFormat,
          questionId: candidate.questionId,
          questionName: candidate.questionName,
        };
      });

      const response = await axios.post(
        URL,
        { payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/AiReferenceRequestEmailSent");
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

  // Add a warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(
        "Are you sure you want to go back? Your progress will be lost."
      );
      if (!userConfirmed) {
        // window.history.pushState(null, "", window.location.pathname);
        onCancel();
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleCancel = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to cancel? Your progress will be lost."
    );
    if (userConfirmed) {
      onCancel();
    }
  };

  return (
    <>
      <div>
        <h3 className="mb-0">Add New Candidate</h3>
        <p className="mb-2">Enter the details of the new candidate below.</p>
      </div>
      <div className="job-container-form d-flex align-items-center justify-content-center  flex-column">
        <div className="candidate-bg-behind"></div>

        <div className=" w-100 candidate-header mb-4">
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex align-items-end">
              <h4 className="d-flex gap-2 mb-0 ">
                <div className="candidate-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 7C9.45963 7 9.91475 6.90947 10.3394 6.73358C10.764 6.55769 11.1499 6.29988 11.4749 5.97487C11.7999 5.64987 12.0577 5.26403 12.2336 4.83939C12.4095 4.41475 12.5 3.95963 12.5 3.5C12.5 3.04037 12.4095 2.58525 12.2336 2.16061C12.0577 1.73597 11.7999 1.35013 11.4749 1.02513C11.1499 0.700121 10.764 0.442313 10.3394 0.266422C9.91475 0.0905301 9.45963 -9.6859e-09 9 0C8.07174 1.95616e-08 7.1815 0.368749 6.52513 1.02513C5.86875 1.6815 5.5 2.57174 5.5 3.5C5.5 4.42826 5.86875 5.3185 6.52513 5.97487C7.1815 6.63125 8.07174 7 9 7ZM0 17.4V18H18V17.4C18 15.16 18 14.04 17.564 13.184C17.1805 12.4314 16.5686 11.8195 15.816 11.436C14.96 11 13.84 11 11.6 11H6.4C4.16 11 3.04 11 2.184 11.436C1.43139 11.8195 0.819488 12.4314 0.436 13.184C1.19209e-07 14.04 0 15.16 0 17.4Z"
                      fill="white"
                    />
                  </svg>
                </div>
                Candidate {currentCandidateIndex + 1} of {candidates.length}
              </h4>
            </div>
            <div className="fill-req-container">
              * Fill in the required information
            </div>
          </div>

          <div
            className="progress mt-2"
            style={{ height: "6px", width: "100%" }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${
                  ((currentCandidateIndex + 1) / candidates.length) * 100
                }%`,
                backgroundColor: "#F46A05",
              }}
              aria-valuenow={
                ((currentCandidateIndex + 1) / candidates.length) * 100
              }
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formHiringManager" className=" mb-4">
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

          <Form.Group controlId="formReferenceFormat" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Reference Format
            </Form.Label>
            <div className="w-100 reference-question-format-container d-flex gap-2">
              <div className="custom-dropdown-ref-req">
                <div
                  className={`dropdown-header-ref-req ${
                    !isHrHatchOpen && selectedFormat === "HR-HATCH-FORMAT"
                      ? "active"
                      : ""
                  } ${isHrHatchOpen ? "dropdown-open" : ""}`}
                  onClick={() => {
                    setIsHrHatchOpen(!isHrHatchOpen);
                    setIsCustomOpen(false);
                  }}
                >
                  {selectedFormat === "HR-HATCH-FORMAT" && selectedQuestion
                    ? selectedQuestion.name
                    : "HR-HATCH"}
                </div>
                {isHrHatchOpen && (
                  <div className="dropdown-list-ref-req">
                    {hrHatchQuestion.map((question) => (
                      <div
                        key={question._id}
                        className="dropdown-item-ref-req"
                        onClick={() =>
                          handleQuestionSelect(question, "HR-HATCH-FORMAT")
                        }
                      >
                        {question.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="custom-dropdown-ref-req">
                <div
                  className={`dropdown-header-ref-req ${
                    !isCustomOpen && selectedFormat === "CUSTOM-FORMAT"
                      ? "active"
                      : ""
                  } ${isCustomOpen ? "dropdown-open" : ""}`}
                  onClick={() => {
                    setIsCustomOpen(!isCustomOpen);
                    setIsHrHatchOpen(false);
                  }}
                >
                  {selectedFormat === "CUSTOM-FORMAT" && selectedQuestion
                    ? selectedQuestion.name
                    : "Custom"}
                </div>
                {isCustomOpen && (
                  <div className="dropdown-list-ref-req">
                    {customQuestion.length > 0 ? (
                      customQuestion.map((question) => (
                        <div
                          key={question._id}
                          className="dropdown-item-ref-req"
                          onClick={() =>
                            handleQuestionSelect(question, "CUSTOM-FORMAT")
                          }
                        >
                          {question.name}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item-ref-req" disabled>
                        No custom questions available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {errorMessages.question && (
              <div className="px-3 py-1 text-danger">
                {errorMessages.question}
              </div>
            )}
          </Form.Group>

          <div key={currentCandidateIndex} className="candidate-container mb-4">
            <Form.Group
              controlId={`formFirstName${currentCandidateIndex}`}
              className=" mb-4"
            >
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                Candidate
              </Form.Label>
              <div className="d-flex gap-3 w-100">
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
              className=" mb-4"
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

      <div className="d-flex justify-content-center gap-3 mt-3 job-btn-container">
        <button
          className="btn-cancel-ref-req"
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
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
