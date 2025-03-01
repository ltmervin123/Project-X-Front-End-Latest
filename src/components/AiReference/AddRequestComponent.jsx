import React, { useState, useEffect, useRef, useMemo } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddRequestComponent = () => {
  //Constants
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER.token;

  //States
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [positionName, setPositionName] = useState("");
  const [positionId, setPositionId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateId, setCandidateId] = useState("");
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

  //Refs
  const formRef = useRef(null);

  //Effects
  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];

    if (jobs.length > 0) {
      const lastJob = jobs[jobs.length - 1];
      setPositions([{ jobName: lastJob.jobName, _id: lastJob._id }]);
      setPositionName(lastJob.jobName);
      setPositionId(lastJob._id);
    }

    if (candidates.length > 0) {
      const lastCandidate = candidates[candidates.length - 1];
      setCandidates([{ name: lastCandidate.name, _id: lastCandidate._id }]);
      setCandidateName(lastCandidate.name);
      setCandidateId(lastCandidate._id);
    }
  }, []);

  //Memoized values
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

  //Utilities
  const isFormValid = useMemo(() => {
    return candidateName && validateReferees && positionName;
  }, [candidateName, positionName, validateReferees]);

  //Functions
  const createReferenceRequest = async () => {
    try {
      setIsLoading(true);
      const URL = `${API}/api/ai-referee/company-request-reference/create-reference-request`;
      const payload = {
        positionId,
        positionName,
        candidateId,
        candidateName,
        referees,
      };

      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        navigate("/AiReferenceRequestEmailSent"); //To be created
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    if (formRef.current.checkValidity()) {
      formRef.current.requestSubmit(); // Ensures built-in validation before submission
    } else {
      formRef.current.reportValidity(); // Triggers native validation messages
    }
  };

  const handleQuestionFormatChange = (event, index) => {
    const question = event.target.value;

    // Check if the user wants to change the question format
    if (question === "change-format") {
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

    if (!selectedQuestion) return;

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

  const handleAddReferee = () => {
    if (referees.length < 3) {
      setReferees([...referees, { name: "", email: "", questionFormat: "" }]);
    }
  };

  const handleAddRefereeDisabled = () => {
    return referees.length >= 3;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReferenceRequest();
  };

  return (
    <>
      <div>
        <h3 className="m-0">New Reference Request</h3>
        <p>Create a new reference request for a candidate.</p>
      </div>
      <div className="job-container-form d-flex align-items-center justify-content-center w-100">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Form.Group
            controlId="formPosition"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "220px" }}>
              Position
            </Form.Label>
            <Form.Select value={positions} disabled required>
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
            <Form.Select value={candidates.name} disabled required>
              {candidates.map((candidate) => (
                <option key={candidate._id} value={candidate.name}>
                  {candidate.name}
                </option>
              ))}
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
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
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
        </Form>
      </div>
      <div className="d-flex justify-content-end my-3">
        <button
          className="btn-proceed"
          type="button"
          onClick={handleProceed}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Sending..." : "Send Reference Requests"}
        </button>
      </div>
    </>
  );
};

export default AddRequestComponent;
