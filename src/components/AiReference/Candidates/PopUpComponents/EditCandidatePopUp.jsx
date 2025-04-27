import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditCandidatePopUp = ({
  onClose,
  onUpdateCandidate,
  candidateDetails,
}) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const isFormValid = firstName && lastName && email && position;
  const [positions, setPositions] = useState(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    return jobs.map((job) => job.jobName);
  });

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

  const handleQuestionSelect = (question, format) => {
    setSelectedQuestion(question);
    setSelectedFormat(format);
    setIsHrHatchOpen(false);
    setIsCustomOpen(false);
  };

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    if (candidateDetails) {
      setFirstName(candidateDetails.name.firstName);
      setLastName(candidateDetails.name.lastName);
      setEmail(candidateDetails.email);
      setPosition(candidateDetails.position);
      setSelectedFormat(candidateDetails.questionFormat || "");
      setSelectedQuestion({
        name: candidateDetails.questionName,
        _id: candidateDetails.questionId,
      });
    }
  }, [candidateDetails]);

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

    const URL = `${API}/api/ai-referee/company-candidates/update-candidate-by-id/${candidateDetails._id}`;
    setIsLoading(true);
    try {
      const payload = {
        name: {
          firstName: capitalizeWords(firstName),
          lastName: capitalizeWords(lastName),
        },
        email,
        questionFormat: selectedFormat,
        questionId: selectedQuestion?._id,
        questionName: selectedQuestion?.name,
      };

      const response = await axios.put(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await onUpdateCandidate();
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-job"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="m-0">Edit Applicant</h5>
            <small>Update the details of the applicant below.</small>
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
          <Form.Group controlId="formCandidatePosition" className="mb-4">
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
              disabled={true}
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
          <Form.Group controlId="formReferenceFormat" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
              Reference Format
            </Form.Label>
            <div className="w-100 reference-question-format-container d-flex gap-3">
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
          </Form.Group>
          <Form.Group controlId="formCandidateFirstName" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
              Applicant
            </Form.Label>
            <div className="d-flex gap-3 w-100">
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
              />

              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formCandidateEmail" className="mb-4">
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

          <div className="d-flex justify-content-end">
            <button
              className="btn-create-job"
              type="submit"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "Update Candidate"
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCandidatePopUp;
