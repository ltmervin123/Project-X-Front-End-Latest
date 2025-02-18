import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddRequestPopUp = ({ onClose, onAddRequest }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedPositionId, setSelectedPositionId] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [refereeName, setRefereeName] = useState("");
  const [refereeEmail, setRefereeEmail] = useState("");
  const [questionFormatType, setQuestionFormatType] = useState("");
  const [isCustomQuestion, setIsCustomQuestion] = useState(false);

  // Memoize positions to avoid unnecessary re-renders
  const positions = useMemo(() => {
    const activeJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    return activeJobs.map((job) => ({
      jobName: job.jobName,
      _id: job._id,
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

  const customQuestion = useMemo(() => {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    return questions.map((question) => ({
      name: question.name,
      _id: question._id,
    }));
  }, []);

  // Update candidates when selectedPosition changes
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

  //To Do
  const handleSubmit = (e) => {
    e.preventDefault();
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
          {/* Position input */}
          <Form.Group
            controlId="formPosition"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
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

          {/* Candidate Name input */}
          <Form.Group
            controlId="formCandidateName"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Candidate
            </Form.Label>
            <Form.Select
              value={selectedCandidate}
              onChange={handleCandidateChange}
              disabled={!selectedPosition} // Disable if no position is selected
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

          {/* Referee's Name input */}
          <Form.Group
            controlId="formRefereeName"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Referee Name
            </Form.Label>
            <Form.Control
              type="text"
              value={refereeName}
              onChange={(e) => setRefereeName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </Form.Group>

          {/* Referee's Email input */}
          <Form.Group
            controlId="formRefereeEmail"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Referee's Email
            </Form.Label>
            <Form.Control
              type="email"
              value={refereeEmail}
              onChange={(e) => setRefereeEmail(e.target.value)}
              placeholder="sample@hrhatch.com"
              required
            />
          </Form.Group>

          {/* Reference Question dropdown */}
          <Form.Group
            controlId="formQuestionFormat"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Reference Question
            </Form.Label>

            {!questionFormatType ? (
              <Form.Select
                value={questionFormatType}
                onChange={handleSelectFormatTypeChanges}
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

          <div className="d-flex justify-content-end">
            <button className="btn-add-candidate" type="submit">
              Send Request
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRequestPopUp;
