import React from "react";
import { Modal, Button } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    DeleteConfirmation: "Are you sure you want to delete this agency partner? Deleting this agency will also remove all associated records.",
    Yes: "Yes",
    No: "No"
  },
  Japanese: {
    DeleteConfirmation: "この代理店パートナーを削除してもよろしいですか？この代理店を削除すると、関連するすべての記録も削除されます。",
    Yes: "はい",
    No: "いいえ"
  }
};

const DeleteConfirmationAgencyPartners = ({ onClose, onConfirmDelete, isDeleting }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  
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
            {TRANSLATIONS[language].DeleteConfirmation}
          </p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-delete-agency"
              disabled={isDeleting}
              onClick={onConfirmDelete}
            >
              {isDeleting ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                TRANSLATIONS[language].Yes
              )}
            </button>
            <button
              className="btn-no-delete-agency"
              disabled={isDeleting}
              onClick={onClose}
            >
              {TRANSLATIONS[language].No}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationAgencyPartners;
