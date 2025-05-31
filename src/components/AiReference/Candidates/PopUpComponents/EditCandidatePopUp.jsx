import { useState, useEffect, useMemo, useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useUpdateCandidate } from "../../../../hook/useCandidate";
import {
  formatUpdateCandidatePayload,
  translateQuestionName,
} from "../utils/helper";
import { useGetCustomQuestions } from "../../../../hook/useCustomQuestion";

const EditCandidatePopUp = ({ onClose, candidateDetails, labels, user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const isFormValid = firstName && lastName && email && position;
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isHrHatchOpen, setIsHrHatchOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const { data: customQuestion = [], isPending: isFetchingQuestionSets } =
    useGetCustomQuestions(user);
  const { mutate: UpdateCandidate, isPending: isUpdating } = useUpdateCandidate(
    user,
    {
      onSettled: () => onClose(),
    }
  );

  const hrHatchQuestion = useMemo(() => {
    return [
      {
        name: labels.StandardFormat,
        value: "STANDARD",
        _id: "67b404a91eb4c9da22cff68e",
      },
      {
        name: labels.ManagementFormat,
        value: "MANAGEMENT",
        _id: "67b405191eb4c9da22cff690",
      },
      {
        name: labels.ExecutiveFormat,
        value: "EXECUTIVE",
        _id: "67b405a41eb4c9da22cff691",
      },
    ];
  }, [labels]);

  const handleQuestionSelect = useCallback(
    (question, format) => {
      const translatedQuestion = {
        ...question,
        name: translateQuestionName(format, question.value, labels),
      };
      setSelectedQuestion(translatedQuestion);
      setSelectedFormat(format);
      setIsHrHatchOpen(false);
      setIsCustomOpen(false);
    },
    [labels]
  );

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

  const handlePositionChange = useCallback((e) => {
    const value = e.target.value;
    setPosition(value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const payload = formatUpdateCandidatePayload({
        firstName,
        lastName,
        email,
        selectedFormat,
        selectedQuestion,
      });
      const candidateId = candidateDetails._id;

      await UpdateCandidate({ candidateId, payload });
    },
    [
      UpdateCandidate,
      firstName,
      lastName,
      email,
      selectedFormat,
      selectedQuestion,
      candidateDetails._id,
    ]
  );

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
            <h5 className="m-0">{labels.EditApplicant}</h5>
            <small>{labels.UpdateDetails}</small>
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
              {labels.jobName}
            </Form.Label>
            <Form.Control
              type="text"
              value={position}
              onChange={handlePositionChange}
              required
              disabled={true}
            />
          </Form.Group>
          <Form.Group controlId="formReferenceFormat" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px", opacity: "0.5" }}
            >
              {labels.ReferenceFormat}
            </Form.Label>
            <div
              className="w-100 reference-question-format-container d-flex gap-3"
              style={{ opacity: "0.5", pointerEvents: "none" }}
            >
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
                    ? selectedQuestion.name === "Standard Format"
                      ? labels.StandardFormat
                      : selectedQuestion.name === "Management Format"
                      ? labels.ManagementFormat
                      : selectedQuestion.name === "Executive Format"
                      ? labels.ExecutiveFormat
                      : selectedQuestion.name
                    : labels.hrHatch}
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
                    : labels.custom}
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
                        {labels.NoCustomQuestions}
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
              {labels.Applicant}
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
              {labels.Email}
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
              disabled={isUpdating || !isFormValid}
            >
              {isUpdating ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                labels.UpdateCandidate
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCandidatePopUp;
