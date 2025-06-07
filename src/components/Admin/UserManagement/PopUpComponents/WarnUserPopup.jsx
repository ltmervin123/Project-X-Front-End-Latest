import React from "react";
import { Modal } from "react-bootstrap";

const WarnUserPopup = ({ onClose, onConfirm, username, isProcessing, language = "English" }) => {
  const translations = {
    English: {
      title: "Warn User",
      message: (username) => `Send a warning to ${username}? A notification will be sent informing them of a policy violation.`,
      yes: "Yes",
      no: "No"
    },
    Japanese: {
      title: "ユーザーに警告",
      message: (username) => `${username}に警告を送信しますか？ポリシー違反の通知が送信されます。`,
      yes: "はい",
      no: "いいえ"
    }
  };

  const t = translations[language];

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-edit-user"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center gap-2 flex-column p-2 py-3">
          <h3 className="text-center mb-3">{t.title}</h3>
          <p className="text-center m-0">
            {t.message(username)}
          </p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button className="btn-yes-submit-request" disabled={isProcessing} onClick={onConfirm}>
              {isProcessing ? (
                <div className="spinner-border spinner-border-sm text-light" role="status"></div>
              ) : t.yes}
            </button>
            <button className="btn-no-submit-request" disabled={isProcessing} onClick={onClose}>
              {t.no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarnUserPopup;
