import React, { useState, useEffect, useRef, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRequestComponent = () => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER.token;
  const [positions, setPositions] = useState(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const lastJob = jobs[jobs.length - 1];
    return lastJob ? [{ jobName: lastJob.jobName, _id: lastJob._id }] : [];
  });
  const [candidates, setCandidates] = useState(() => {
    const candidate = JSON.parse(localStorage.getItem("candidates")) || [];
    const lastCandidate = candidate[candidate.length - 1];
    return lastCandidate
      ? [{ name: lastCandidate.name, _id: lastCandidate._id }]
      : [];
  });

  //States

  const [selectedPosition, setSelectedPosition] = useState(
    positions[0]?.jobName
  );
  const [selectedPositionId, setSelectedPositionId] = useState(
    positions[0]?._id
  );
  const [selectedCandidate, setSelectedCandidate] = useState(
    candidates[0]?.name
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState(
    candidates[0]?._id
  );
  const [referees, setReferees] = useState([
    { name: "", email: "", questionFormat: "" },
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [refereeName, setRefereeName] = useState("");
  const [refereeEmail, setRefereeEmail] = useState("");
  const [questionFormatType, setQuestionFormatType] = useState("");
  const [isCustomQuestion, setIsCustomQuestion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceCreated, setReferenceCreated] = useState(false);

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

  const isFormValid = useMemo(() => {
    return (
      selectedCandidate &&
      refereeName &&
      refereeEmail &&
      selectedPosition &&
      questionFormatType
    );
  }, [
    selectedCandidate,
    refereeName,
    refereeEmail,
    selectedPosition,
    questionFormatType,
  ]);

  const handleQuestionFormatChange = (event) => {
    const questionName = event.target.value;
    const selectedQuestion = isCustomQuestion
      ? customQuestion.find((question) => question.name === questionName)
      : hrHatchQuestion.find((question) => question.name === questionName);
    setSelectedQuestionId(selectedQuestion._id);
    setSelectedQuestion(questionName);
  };

  const handleSelectFormatTypeChanges = (event) => {
    const format = event.target.value;
    switch (format) {
      case "HR-HATCH-FORMAT":
        setIsCustomQuestion(false);
        break;
      case "CUSTOM_FORMAT":
        setIsCustomQuestion(true);
        break;
      default:
        setIsCustomQuestion(false);
        break;
    }
    setQuestionFormatType(format);
  };

  // Create a ref for the form
  const formRef = useRef(null);
  //To Do
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReferenceRequest();
  };

  const createReferenceRequest = async () => {
    try {
      setIsLoading(true);
      const URL = `${API}/api/ai-referee/company-request-reference/create-reference-request`;
      const payload = {
        positionId: selectedPositionId,
        positionName: selectedPosition,
        candidateId: selectedCandidateId,
        candidateName: selectedCandidate,
        refereeName,
        refereeEmail,
        questionId: selectedQuestionId,
        formatType: questionFormatType,
      };

      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setReferenceCreated(true);
        navigate("/AiReferenceRequestEmailSent", { state: { refereeEmail } });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    if (isFormValid) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  };
  return (
    <>
      <div>
        <h3 className="m-0">New Reference Request</h3>
        <p>Create a new reference request for a candidate.</p>
      </div>
      <div className="job-container-form d-flex align-items-center justify-content-center w-100">
        <Form ref={formRef} onSubmit={handleSubmit}>
          {/* Position input */}
          <Form.Group
            controlId="formPosition"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "220px" }}>
              Position
            </Form.Label>
            <Form.Select
              value={positions}
              // onChange={handlePositionChange}
              disabled
              required
            >
              {/* <option value="" disabled>
                Select Position
              </option> */}
              {positions.map((pos) => (
                <option key={pos._id} value={pos.jobName}>
                  {pos.jobName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Candidate Name input */}
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
              className={`add-referee ${
                referees.length >= 3 ? "disabled" : ""
              }`}
              onClick={() => {
                if (referees.length < 3) {
                  setReferees([
                    ...referees,
                    { name: "", email: "", questionFormat: "" },
                  ]);
                }
              }}
              disabled={referees.length >= 3}
            >
              Add Referee
            </button>
          </div>
          <div className="referees-list-container">
            {referees.map((referee, index) => (
              <div key={index}>
                {/* Referee's Name input */}
                <Form.Group
                  controlId={`formRefereeName${index}`}
                  className="d-flex align-items-center mb-3"
                >
                  <Form.Label className="me-2" style={{ width: "220px" }}>
                    Referee Name {index + 1}{" "}
                    {/* Display index + 1 for a 1-based index */}
                  </Form.Label>
                  <Form.Control
                    value={referee.name}
                    onChange={(e) => {
                      const newReferees = [...referees];
                      newReferees[index].name = e.target.value;
                      setReferees(newReferees);
                    }}
                    placeholder="Enter Referee Name"
                    required
                  />
                </Form.Group>

                {/* Referee's Email input */}
                <Form.Group
                  controlId={`formRefereeEmail${index}`}
                  className="d-flex align-items-center mb-3"
                >
                  <Form.Label className="me-2" style={{ width: "220px" }}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    // value={refereeEmail}
                    value={referee.email}
                    onChange={(e) => {
                      const newReferees = [...referees];
                      newReferees[index].email = e.target.value;
                      setReferees(newReferees);
                    }}
                    placeholder="johndoe@gmail.com"
                    required
                  />
                </Form.Group>

                {/* Reference Question dropdown */}
                <Form.Group
                  controlId={`formQuestionFormat${index}`}
                  className="d-flex align-items-center mb-3"
                >
                  <Form.Label className="me-2" style={{ width: "220px" }}>
                    Reference Question
                  </Form.Label>

                  {!questionFormatType ? (
                    <Form.Select
                      // value={questionFormatType}
                      value={referee.questionFormat}
                      onChange={(e) => {
                        const newReferees = [...referees];
                        newReferees[index].questionFormat = e.target.value;
                        setReferees(newReferees);
                      }}
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
                      {isCustomQuestion ? (
                        <Form.Select
                          value={selectedQuestion}
                          onChange={handleQuestionFormatChange}
                          required
                        >
                          <option value="" disabled>
                            Choose Custom Question
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
                          value={selectedQuestion}
                          onChange={handleQuestionFormatChange}
                          required
                        >
                          <option value="" disabled>
                            Choose HR-HATCH Question
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
          onClick={handleProceed} // Call handleProceed on click
          // disabled={isLoading}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Sending..." : "Send Reference Requests"}
        </button>
      </div>
    </>
  );
};

export default AddRequestComponent;
