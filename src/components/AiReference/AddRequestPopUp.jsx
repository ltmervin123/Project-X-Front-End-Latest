import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRequestPopUp = ({ onClose, onAddRequest }) => {
  //Constants
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER.token;

  //States
  const [candidates, setCandidates] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedPositionId, setSelectedPositionId] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [referees, setReferees] = useState([
    {
      name: "",
      email: "",
      questionFormat: "",
      questionId: "",
      questionName: "",
      hasSelectedQuestionFormat: false,
      isCustomQuestion: false,
    },
  ]);

  //Memoized values
  const positions = useMemo(() => {
    const activeJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    return activeJobs.map((job) => ({
      jobName: job.jobName,
      _id: job._id,
    }));
  }, []);

  const customQuestion = useMemo(() => {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    return questions.map((question) => ({
      name: question.name,
      _id: question._id,
    }));
  }, []);

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

  //Effects
  useEffect(() => {
    if (!selectedPosition) {
      setCandidates([]);
      return;
    }
    const allCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
    const filteredCandidates = allCandidates
      .filter((candidate) => candidate.position === selectedPosition)
      .map((candidate) => candidate.name);

    setCandidates(filteredCandidates);
  }, [selectedPosition]);

  const validateReferees = useMemo(() => {
    return referees.every(
      (referee) =>
        referee.name &&
        referee.email &&
        referee.questionFormat &&
        referee.questionId &&
        referee.questionName
    );
  }, [referees]);

  //Utils
  const isFormValid = useMemo(() => {
    return selectedCandidate && validateReferees && selectedPosition;
  }, [selectedCandidate, selectedPosition, validateReferees]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];
    const filteredCandidates = candidates
      .filter((candidate) => candidate.position === selectedPosition)
      .map((candidate) => ({
        name: candidate.name,
        _id: candidate._id,
      }));
    setCandidates(filteredCandidates);
  }, [selectedPosition]);

  //Functions
  const createReferenceRequest = async () => {
    try {
      setIsLoading(true);
      const URL = `${API}/api/ai-referee/company-request-reference/create-reference-request`;
      const payload = {
        positionId: selectedPositionId,
        positionName: selectedPosition,
        candidateId: selectedCandidateId,
        candidateName: selectedCandidate,
        referees,
      };

      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        onAddRequest();
        navigate("/AiReferenceRequestEmailSent");
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Handlers
  const handlePositionChange = (e) => {
    const jobName = e.target.value;
    const selectedPosition = positions.find(
      (position) => position.jobName === jobName
    );
    const selectedPositionId = selectedPosition._id;
    setSelectedPositionId(selectedPositionId);
    setSelectedPosition(jobName);
  };

  const handleCandidateChange = (e) => {
    const candidateName = e.target.value;
    const selectedCandidate = candidates.find(
      (candidate) => candidate.name === candidateName
    );
    setSelectedCandidate(candidateName);
    setSelectedCandidateId(selectedCandidate._id);
  };

  const handleQuestionFormatChange = (event, index) => {
    const question = event.target.value;

    if (event.target.value === "change-format") {
      setReferees((prevReferees) => {
        const newReferees = [...prevReferees];
        newReferees[index] = {
          ...newReferees[index],
          questionFormat: "",
          questionName: "",
          questionId: "",
          hasSelectedQuestionFormat: false,
        };
        return newReferees;
      });

      return;
    }

    const selectedQuestion = referees[index].isCustomQuestion
      ? customQuestion.find((q) => q.name === question)
      : hrHatchQuestion.find((q) => q.name === question);

    setReferees((prevReferees) => {
      const newReferees = [...prevReferees];
      newReferees[index] = {
        ...newReferees[index],
        questionName: selectedQuestion.name,
        questionId: selectedQuestion._id,
      };
      return newReferees;
    });
  };

  const handleSelectFormatTypeChanges = (format) => {
    switch (format) {
      case "HR-HATCH-FORMAT":
        return false;
      case "CUSTOM_FORMAT":
        return true;
      default:
        return false;
    }
  };

  const handleRefereeQuestionFormatChange = (event, index) => {
    const format = event.target.value;
    const newReferees = [...referees];
    newReferees[index].questionFormat = format;
    newReferees[index].hasSelectedQuestionFormat = true;
    newReferees[index].isCustomQuestion = handleSelectFormatTypeChanges(format);
    setReferees(newReferees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReferenceRequest();
  };

  const handleAddRefereeDisabled = () => {
    return referees.length >= 3;
  };

  const handleAddReferee = () => {
    if (referees.length < 3) {
      setReferees([...referees, { name: "", email: "", questionFormat: "" }]);
    }
  };

  const handleRefereeNameChange = (event, index) => {
    const newReferees = [...referees];
    newReferees[index].name = event.target.value;
    setReferees(newReferees);
  };

  const handleRefereeEmailChange = (event, index) => {
    const newReferees = [...referees];
    newReferees[index].email = event.target.value;
    setReferees(newReferees);
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-job d-flex align-items-center justify-content-center"
      backdrop={true}
    >
      <Modal.Body className="w-100">
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
          <Form.Group
            controlId="formPosition"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "220px" }}>
              Position
            </Form.Label>
            <Form.Select
              value={selectedPosition}
              onChange={handlePositionChange}
              required
            >
              <option value="" disabled>
                Select Position
              </option>
              {positions.map((pos) => (
                <option key={pos._id} value={pos.jobName}>
                  {pos.jobName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            controlId="formCandidateName"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "220px" }}>
              Candidate
            </Form.Label>
            <Form.Select
              value={selectedCandidate}
              onChange={handleCandidateChange}
              disabled={!selectedPosition}
              required
            >
              <option value="">Select Candidate</option>
              {candidates && candidates.length > 0 ? (
                candidates.map((candidate) => (
                  <option key={candidate._id} value={candidate.name}>
                    {candidate.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {selectedPosition
                    ? "No candidates available"
                    : "Select position first"}
                </option>
              )}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-between mb-3">
            <p className="mb-0" style={{ width: "220px" }}>
              Referees
            </p>
            <button
              type="button"
              className={`add-referee ${
                handleAddRefereeDisabled() ? "disabled" : ""
              }`}
              onClick={handleAddReferee}
              disabled={handleAddRefereeDisabled()}
            >
              Add Referee
            </button>
          </div>
          <div className="referees-list-container">
            {referees.map((referee, index) => (
              <div key={index}>
                <Form.Group
                  controlId={`formRefereeName${index}`}
                  className="d-flex align-items-center mb-3"
                >
                  <Form.Label className="me-2" style={{ width: "220px" }}>
                    Referee Name {index + 1}{" "}
                  </Form.Label>
                  <Form.Control
                    value={referee.name}
                    onChange={(e) => handleRefereeNameChange(e, index)}
                    placeholder="Enter Referee Name"
                    required
                  />
                </Form.Group>

                <Form.Group
                  controlId={`formRefereeEmail${index}`}
                  className="d-flex align-items-center mb-3"
                >
                  <Form.Label className="me-2" style={{ width: "220px" }}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={referee.email}
                    onChange={(e) => handleRefereeEmailChange(e, index)}
                    placeholder="johndoe@gmail.com"
                    required
                  />
                </Form.Group>

                <Form.Group
                  controlId={`formQuestionFormat${index}`}
                  className="d-flex align-items-center mb-3"
                >
                  <Form.Label className="me-2" style={{ width: "220px" }}>
                    Reference Question
                  </Form.Label>

                  {!referee.hasSelectedQuestionFormat ? (
                    <Form.Select
                      value={referee?.questionFormat || ""}
                      onChange={(e) =>
                        handleRefereeQuestionFormatChange(e, index)
                      }
                      required
                    >
                      <option value="" disabled>
                        Choose Question Format
                      </option>
                      <option value="HR-HATCH-FORMAT">HR-HATCH Format</option>
                      <option value="CUSTOM_FORMAT">Custom Format</option>
                    </Form.Select>
                  ) : (
                    <>
                      {referee.isCustomQuestion ? (
                        <Form.Select
                          value={referee?.questionName || ""}
                          onChange={(e) => handleQuestionFormatChange(e, index)}
                          required
                        >
                          <option value="" disabled>
                            Choose Custom Question
                          </option>
                          <option value="change-format">
                            Change Question Format
                          </option>
                          {customQuestion && customQuestion.length > 0 ? (
                            customQuestion.map((question) => (
                              <option key={question._id} value={question.name}>
                                {question.name}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>
                              No custom questions available
                            </option>
                          )}
                        </Form.Select>
                      ) : (
                        <Form.Select
                          value={referee?.questionName || ""}
                          onChange={(e) => handleQuestionFormatChange(e, index)}
                          required
                        >
                          <option value="" disabled>
                            Choose HR-HATCH Question
                          </option>
                          <option value="change-format">
                            Change Question Format
                          </option>
                          {hrHatchQuestion.map((question) => (
                            <option key={question._id} value={question.name}>
                              {question.name}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                    </>
                  )}
                </Form.Group>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn-add-candidate"
              type="submit"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Sending..." : "Send Request"}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRequestPopUp;
