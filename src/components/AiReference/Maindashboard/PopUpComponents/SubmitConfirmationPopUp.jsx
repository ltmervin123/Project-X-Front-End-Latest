import React from "react";
import { Modal } from "react-bootstrap";

const SubmitConfirmationPopUp = ({ onClose, onConfirmSubmit }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const TRANSLATIONS = {
    English: {
      confirmMessage: "Kindly review the information provided. Do you wish to proceed?",
      yes: "Yes",
      no: "No"
    },
    Japanese: {
      confirmMessage: "提供された情報を確認してください。続行しますか？",
      yes: "はい",
      no: "いいえ"
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">
            {TRANSLATIONS[language].confirmMessage}
          </p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-submit-request"
              onClick={onConfirmSubmit}
            >
              {TRANSLATIONS[language].yes}
            </button>
            <button className="btn-no-submit-request" onClick={onClose}>
              {TRANSLATIONS[language].no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubmitConfirmationPopUp;
