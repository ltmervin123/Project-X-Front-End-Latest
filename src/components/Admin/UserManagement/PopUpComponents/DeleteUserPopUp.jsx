import React from "react";
import { Modal } from "react-bootstrap";

const DeleteUserPopUp = ({ onClose, onConfirm, username, isProcessing, language = "English" }) => {
  const translations = {
    English: {
      title: "Delete User",
      message: (username) => `Are you sure you want to delete this user ${username}? This action cannot be undone.`,
      yes: "Yes",
      no: "No"
    },
    Japanese: {
      title: "ユーザーの削除",
      message: (username) => `このユーザー ${username} を削除してもよろしいですか？この操作は取り消せません。`,
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

export default DeleteUserPopUp;
