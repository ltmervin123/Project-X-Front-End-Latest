import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const TRANSLATIONS = {
  English: {
    EditApplicant: "Edit Applicant",
    UpdateDetails: "Update the details of the applicant below.",
    jobName: "Job Name",
    SelectPosition: "Select a position",
    ReferenceFormat: "Reference Format",
    NoCustomQuestions: "No custom questions available",
    Applicant: "Applicant",
    Email: "Email",
    UpdateCandidate: "Update Applicant",
    hrHatch: "HR-HATCH",
    custom: "Custom Questionnaire",
    StandardFormat: "Standard Format",
    ManagementFormat: "Management Format",
    ExecutiveFormat: "Executive Format",
    FormatValues: {
      STANDARD: "Standard Format",
      MANAGEMENT: "Management Format",
      EXECUTIVE: "Executive Format",
    },
  },
  Japanese: {
    EditApplicant: "応募者を編集",
    UpdateDetails: "以下の応募者の詳細を更新してください。",
    jobName: "職位",
    SelectPosition: "職位を選択",
    ReferenceFormat: "リファレンス形式",
    NoCustomQuestions: "カスタム質問はありません",
    Applicant: "応募者",
    Email: "メール",
    UpdateCandidate: "応募者を更新",
    hrHatch: "HRハッチ",
    custom: "カスタムアンケート",
    StandardFormat: "標準フォーマット",
    ManagementFormat: "管理職フォーマット",
    ExecutiveFormat: "エグゼクティブフォーマット",
    FormatValues: {
      STANDARD: "標準フォーマット",
      MANAGEMENT: "管理職フォーマット",
      EXECUTIVE: "エグゼクティブフォーマット",
    },
  },
};

const EditCandidatePopUp = ({
  onClose,
  onUpdateCandidate,
  candidateDetails,
}) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;

  const language = sessionStorage.getItem("preferred-language") || "English";

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
        name: TRANSLATIONS[language].StandardFormat,
        value: "STANDARD",
        _id: "67b404a91eb4c9da22cff68e",
      },
      {
        name: TRANSLATIONS[language].ManagementFormat,
        value: "MANAGEMENT",
        _id: "67b405191eb4c9da22cff690",
      },
      {
        name: TRANSLATIONS[language].ExecutiveFormat,
        value: "EXECUTIVE",
        _id: "67b405a41eb4c9da22cff691",
      },
    ];
  }, [language]);

  const customQuestion = useMemo(() => {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    return questions.map((question) => ({
      name: question.name,
      _id: question._id,
    }));
  }, []);

  const getTranslatedQuestionName = (format, originalName) => {
    if (format === "HR-HATCH-FORMAT") {
      return TRANSLATIONS[language].FormatValues[originalName] || originalName;
    }
    return originalName;
  };

  const handleQuestionSelect = (question, format) => {
    const translatedQuestion = {
      ...question,
      name: getTranslatedQuestionName(format, question.value),
    };
    setSelectedQuestion(translatedQuestion);
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
        questionName: selectedQuestion?.value || selectedQuestion?.name,
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
            <h5 className="m-0">{TRANSLATIONS[language].EditApplicant}</h5>
            <small>{TRANSLATIONS[language].UpdateDetails}</small>
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
              {TRANSLATIONS[language].jobName}
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
              {TRANSLATIONS[language].ReferenceFormat}
            </Form.Label>
            <div className="w-100 reference-question-format-container d-flex gap-3" style={{ opacity: "0.5", pointerEvents: "none" }}>
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
                      ? TRANSLATIONS[language].StandardFormat
                      : selectedQuestion.name === "Management Format"
                      ? TRANSLATIONS[language].ManagementFormat
                      : selectedQuestion.name === "Executive Format"
                      ? TRANSLATIONS[language].ExecutiveFormat
                      : selectedQuestion.name
                    : TRANSLATIONS[language].hrHatch}
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
                    : TRANSLATIONS[language].custom}
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
                        {TRANSLATIONS[language].NoCustomQuestions}
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
              {TRANSLATIONS[language].Applicant}
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
              {TRANSLATIONS[language].Email}
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
                TRANSLATIONS[language].UpdateCandidate
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCandidatePopUp;
