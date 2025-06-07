import React from "react";
import { Modal } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    confirmationMessage: "Would you like to preview your selected answers?",
    yes: "Yes",
    no: "No",
  },
  Japanese: {
    confirmationMessage: "選択した回答をプレビューしますか？",
    yes: "はい",
    no: "いいえ",
  },
};

const PreviewConfirmationPopUp = ({ onClose, onConfirmPreview }) => {
  const language = sessionStorage.getItem("selectedLanguage") || "English";

  return (
    <Modal show={true} onHide={onClose} centered backdrop={true}>
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">
            {TRANSLATIONS[language].confirmationMessage}
          </p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button className="btn-yes-preview" onClick={onConfirmPreview}>
              {TRANSLATIONS[language].yes}
            </button>
            <button className="btn-no-preview" onClick={onClose}>
              {TRANSLATIONS[language].no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PreviewConfirmationPopUp;
