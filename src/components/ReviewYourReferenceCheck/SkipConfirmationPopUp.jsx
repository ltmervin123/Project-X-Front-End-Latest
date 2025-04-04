import React from "react";
import { Modal, Button } from "react-bootstrap";

const SkipConfirmationPopUp = ({ onClose, onConfirmSkip }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      confirmationMessage: "Would you like to proceed with all of your original answers for the remaining questions?",
      yes: "Yes",
      no: "No",
    },
    Japanese: {
      confirmationMessage: "残りの質問に対してすべての元の回答を進めますか？",
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
            <button className="btn-yes-skip" onClick={onConfirmSkip}>
              {translations[language].yes}
            </button>
            <button className="btn-no-skip" onClick={onClose}>
              {translations[language].no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SkipConfirmationPopUp;