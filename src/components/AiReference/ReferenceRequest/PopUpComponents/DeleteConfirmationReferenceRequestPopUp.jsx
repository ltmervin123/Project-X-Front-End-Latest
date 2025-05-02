import React from "react";
import { Modal } from "react-bootstrap";

// Define language
const language = sessionStorage.getItem("preferred-language") || "English";

// Translation dictionary
const TRANSLATIONS = {
  English: {
    deleteConfirmation: "Would you like to confirm to delete this reference request?",
    yes: "Yes",
    no: "No"
  },
  Japanese: {
    deleteConfirmation: "このリファレンス依頼を削除してもよろしいですか？",
    yes: "はい",
    no: "いいえ"
  }
};

const DeleteConfirmationReferenceRequestPopUp = ({
  onClose,
  onConfirmDelete,
  isDeleting,
}) => {
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
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">
            {TRANSLATIONS[language].deleteConfirmation}
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-delete"
              onClick={onConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                TRANSLATIONS[language].yes
              )}
            </button>
            <button className="btn-no-delete" onClick={onClose}>
              {TRANSLATIONS[language].no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationReferenceRequestPopUp;
