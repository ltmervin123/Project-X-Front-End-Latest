import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    title: "Select the type of answer you want in the remaining questions",
    confirm: "Confirm",
    originalAnswer: "Original Answer",
    aiEnhancedAnswer: "AI Enhanced Answer",
  },
  Japanese: {
    title: "残りの質問で使用する回答の種類を選択してください",
    confirm: "確認",
    originalAnswer: "元の回答",
    aiEnhancedAnswer: "AI強化回答",
  },
};

const SkipConfirmationPopUp = ({ onClose, onConfirmSkip }) => {
  const [selectedType, setSelectedType] = useState("Original Answer");
  const language = sessionStorage.getItem("selectedLanguage") || "English";

  const handleConfirm = () => {
    if (selectedType) {
      onConfirmSkip(selectedType);
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      className="custom-modal-skip-confirmation"
      centered
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <div className="d-flex justify-content-between align-items-center w-100 mb-3">
            <p className=" mb-0">{TRANSLATIONS[language].title}</p>
            <Button
              className="closebtn"
              variant="link"
              onClick={onClose}
              style={{ fontSize: "1.5rem", textDecoration: "none" }}
            >
              &times;
            </Button>
          </div>
          <div className="d-flex align-items-center justify-content-center gap-2 w-100 mb-4">
            <button
              className={`answer-type-btn ${
                selectedType === "Original Answer" ? "selected" : ""
              }`}
              onClick={() => setSelectedType("Original Answer")}
            >
              {TRANSLATIONS[language].originalAnswer}
            </button>
            <button
              className={`answer-type-btn ${
                selectedType === "AI Enhanced Answer" ? "selected" : ""
              }`}
              onClick={() => setSelectedType("AI Enhanced Answer")}
            >
              {TRANSLATIONS[language].aiEnhancedAnswer}
            </button>
          </div>
          <button
            className="btn-no-skip"
            onClick={handleConfirm}
            disabled={!selectedType}
          >
            {TRANSLATIONS[language].confirm}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SkipConfirmationPopUp;
