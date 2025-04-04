import React from "react";
import { Modal } from "react-bootstrap";

const TranscriptionWarning = ({ onClose }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

const translations = {
  English: {
    noResponseDetected: "No response detected. Please speak your answer before submitting.",
    gotIt: "Got it",
  },
  Japanese: {
    noResponseDetected: "応答が検出されませんでした。送信する前に答えを話してください。",
    gotIt: "わかりました",
  },
};
  return (
    <Modal show={true} onHide={onClose} centered backdrop={true}>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div></div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column p-2">
        <p className="text-center">
  {translations[language].noResponseDetected}
</p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
          <button className="btn-yes-delete-job" onClick={onClose}>
  {translations[language].gotIt}
</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TranscriptionWarning;
