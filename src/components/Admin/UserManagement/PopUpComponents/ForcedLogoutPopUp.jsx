import React from "react";
import { Modal } from "react-bootstrap";

const ForcedLogoutPopUp = ({ onClose, onConfirm, isProcessing, language = "English" }) => {
  const translations = {
    English: {
      title: "Forced Logout",
      message: "This will immediately end their current session and require them to log in again. This action does not affect their account status.",
      yes: "Yes",
      no: "No"
    },
    Japanese: {
      title: "強制ログアウト",
      message: "現在のセッションを直ちに終了し、再度ログインが必要になります。この操作はアカウントのステータスには影響しません。",
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
      backdrop="static"
      className="custom-modal-edit-user"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center gap-2 flex-column p-2 py-3">
          <h3 className="text-center mb-3">{t.title}</h3>

          <p className="text-center m-0">
            {t.message}
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-submit-request"
              disabled={isProcessing}
              onClick={onConfirm}
            >
              {isProcessing ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                t.yes
              )}
            </button>
            <button
              className="btn-no-submit-request"
              disabled={isProcessing}
              onClick={onClose}
            >
              {t.no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForcedLogoutPopUp;
