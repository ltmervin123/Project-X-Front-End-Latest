import React from "react";
import { Modal } from "react-bootstrap";

const language = sessionStorage.getItem("preferred-language") || "English";

const TRANSLATIONS = {
  English: {
    confirmCancel: "Are you sure you want to cancel? Your progress will be lost.",
    yes: "Yes",
    no: "No"
  },
  Japanese: {
    confirmCancel: "キャンセルしてもよろしいですか？進捗状況は失われます。",
    yes: "はい",
    no: "いいえ"
  }
};

const CancelConfirmationPopUp = ({ onClose, onConfirmSubmit: onCancel }) => {
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
            {TRANSLATIONS[language].confirmCancel}
          </p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button className="btn-yes-submit-request" onClick={onCancel}>
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

export default CancelConfirmationPopUp;
