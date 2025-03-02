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
        referees: referees.map((referee) => ({
          name: referee.name,
          email: referee.email,
          questionId: referee.questionId,
          questionFormat: referee.questionFormat,
        })),
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

  const handleDeleteReferee = (index) => {
    setReferees((prevReferees) => {
      const newReferees = [...prevReferees];
      newReferees.splice(index, 1);
      return newReferees;
    });
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
                    className="referee-input "
                  />
                  <button
                    onClick={() => handleDeleteReferee(index)}
                    disabled={referees.length <= 1} // Disable if there's only one referee
                  >
                    <svg
                      width="20"
                      height="24"
                      viewBox="0 0 30 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.86408 33.6667C4.93769 33.6667 4.14533 33.3368 3.48699 32.6771C2.82866 32.0174 2.4988 31.2264 2.49741 30.3042V4.5H1.45574C1.15991 4.5 0.912688 4.4 0.714077 4.2C0.515466 4 0.415466 3.75208 0.414077 3.45625C0.412688 3.16042 0.512688 2.91319 0.714077 2.71458C0.915466 2.51597 1.16269 2.41667 1.45574 2.41667H8.74741C8.74741 1.98611 8.90713 1.61111 9.22658 1.29167C9.54602 0.972222 9.92102 0.8125 10.3516 0.8125H19.6432C20.0738 0.8125 20.4488 0.972222 20.7682 1.29167C21.0877 1.61111 21.2474 1.98611 21.2474 2.41667H28.5391C28.8349 2.41667 29.0821 2.51667 29.2807 2.71667C29.4794 2.91667 29.5794 3.16458 29.5807 3.46042C29.5821 3.75625 29.4821 4.00347 29.2807 4.20208C29.0794 4.40069 28.8321 4.5 28.5391 4.5H27.4974V30.3021C27.4974 31.2271 27.1676 32.0187 26.5078 32.6771C25.8481 33.3354 25.0564 33.6653 24.1328 33.6667H5.86408ZM25.4141 4.5H4.58074V30.3021C4.58074 30.6757 4.70088 30.9826 4.94116 31.2229C5.18144 31.4632 5.48908 31.5833 5.86408 31.5833H24.1328C24.5064 31.5833 24.8134 31.4632 25.0537 31.2229C25.2939 30.9826 25.4141 30.6757 25.4141 30.3021V4.5ZM11.4724 27.4167C11.7682 27.4167 12.0162 27.3167 12.2162 27.1167C12.4162 26.9167 12.5155 26.6694 12.5141 26.375V9.70833C12.5141 9.4125 12.4141 9.16528 12.2141 8.96667C12.0141 8.76806 11.7662 8.66806 11.4703 8.66667C11.1745 8.66528 10.9273 8.76528 10.7287 8.96667C10.53 9.16806 10.4307 9.41528 10.4307 9.70833V26.375C10.4307 26.6708 10.5307 26.9181 10.7307 27.1167C10.9307 27.3167 11.178 27.4167 11.4724 27.4167ZM18.5245 27.4167C18.8203 27.4167 19.0675 27.3167 19.2662 27.1167C19.4648 26.9167 19.5641 26.6694 19.5641 26.375V9.70833C19.5641 9.4125 19.4641 9.16528 19.2641 8.96667C19.0641 8.76667 18.8169 8.66667 18.5224 8.66667C18.2266 8.66667 17.9787 8.76667 17.7787 8.96667C17.5787 9.16667 17.4794 9.41389 17.4807 9.70833V26.375C17.4807 26.6708 17.5807 26.9181 17.7807 27.1167C17.9807 27.3153 18.2287 27.4153 18.5245 27.4167Z"
                        fill="#686868"
                      />
                    </svg>
                  </button>
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
