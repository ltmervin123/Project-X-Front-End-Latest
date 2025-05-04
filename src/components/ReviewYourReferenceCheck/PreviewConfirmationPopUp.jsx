import React from "react";
import { Modal } from "react-bootstrap";

const PreviewConfirmationPopUp = ({ onClose, onConfirmPreview }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      confirmationMessage: "Would you like to review your selected answers?",
      yes: "Yes",
      no: "No",
    },
    Japanese: {
      confirmationMessage: "選択した回答を確認しますか？",
      yes: "はい",
      no: "いいえ",
    },
  };

  return (
    <Modal show={true} onHide={onClose} centered backdrop={true}>
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">
            {translations[language].confirmationMessage}
          </p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button className="btn-yes-preview" onClick={onConfirmPreview}>
              {translations[language].yes}
            </button>
            <button className="btn-no-preview" onClick={onClose}>
              {translations[language].no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PreviewConfirmationPopUp;
