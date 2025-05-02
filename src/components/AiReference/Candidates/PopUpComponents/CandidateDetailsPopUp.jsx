// CandidateDetailsPopUp.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    ApplicantId: "Applicant ID:",
    Status: "Status:",
    Position: "Position:",
    Email: "Email:",
    AppliedDate: "Applied Date:",
    ReferenceFormat: "Reference Format:",
    Edit: "Edit",
    SendEmail: "Send Email",
    NA: "N/A"
  },
  Japanese: {
    ApplicantId: "応募者ID:",
    Status: "ステータス:",
    Position: "職位:",
    Email: "メール:",
    AppliedDate: "応募日:",
    ReferenceFormat: "リファレンス形式:",
    Edit: "編集",
    SendEmail: "メール送信",
    NA: "該当なし"
  }
};

const CandidateDetailsPopUp = ({ candidates, onClose, onEdit }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "#319F43";
      case "Completed":
        return "#1877F2";
      case "Failed":
        return "#FF0000";
      default:
        return "black";
    }
  };

  const formatDate = (date) => {
    return date.split("T")[0];
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-job"
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5
              className="m-0 color-orange"
              style={{ textTransform: "capitalize" }}
            >
              {typeof candidates.name === "string"
                ? candidates.name
                : `${candidates.name.firstName} ${candidates.name.lastName}`}
            </h5>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p className="m-0 candidate-id">
              <strong>{TRANSLATIONS[language].ApplicantId}</strong> {candidates._id}
            </p>

            <Button
              className="closebtn"
              variant="link"
              onClick={onClose}
              style={{ fontSize: "1.5rem", textDecoration: "none" }}
            >
              &times;
            </Button>
          </div>
        </div>

        <div className="d-flex gap-4 flex-column">
          <div className="d-flex justify-content-start gap-3 applicant-details">
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-2 align-items-center">
                {TRANSLATIONS[language].Status}
              </strong>{" "}
              <span style={{ color: getStatusColor(candidates.status) }}>
                {" "}
                {candidates.status}
              </span>
            </p>
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-2 align-items-center">
                {TRANSLATIONS[language].Position}
              </strong>{" "}
              <span>{candidates.position || TRANSLATIONS[language].NA}</span>
            </p>
          </div>
          <div className="d-flex justify-content-start gap-3 applicant-details">
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-2 align-items-center">
                {TRANSLATIONS[language].Email}
              </strong>{" "}
              <span>{candidates.email}</span>
            </p>
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-2 align-items-center">
                {TRANSLATIONS[language].AppliedDate}
              </strong>{" "}
              <span>{formatDate(candidates.createdAt) || TRANSLATIONS[language].NA}</span>
            </p>
          </div>
          <div className="d-flex justify-content-start gap-3 applicant-details mb-2">
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-2 align-items-center">
                {TRANSLATIONS[language].ReferenceFormat}
              </strong>{" "}
              <span>{candidates.questionName || TRANSLATIONS[language].NA}</span>
            </p>
          </div>
        </div>

        <div className="candidate-button-controller w-100 d-flex justify-content-center align-items-center gap-3">
          <button onClick={onEdit}>{TRANSLATIONS[language].Edit}</button>
          <button>{TRANSLATIONS[language].SendEmail}</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CandidateDetailsPopUp;
