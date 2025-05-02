import React from "react";
import { Modal, Button } from "react-bootstrap";

// Define language
const language = sessionStorage.getItem("preferred-language") || "English";

// Translation dictionary
const TRANSLATIONS = {
  English: {
    deleteConfirmation: "Are you sure you want to delete this set of questions? Deleting this set will also remove all associated responses and records.",
    yes: "Yes",
    no: "No",
    deleting: "Deleting...",
  },
  Japanese: {
    deleteConfirmation: "この質問セットを削除してもよろしいですか？このセットを削除すると、関連するすべての回答と記録も削除されます。",
    yes: "はい",
    no: "いいえ",
    deleting: "削除中...",
  }
};

const DeleteConfirmationNewSetsQuestionPopup = ({
  onClose,
  onConfirmDelete,
  isDeleting,
}) => {
  return (
    <Modal show={true}
    className="custom-modal-edit-user"
    onHide={onClose} centered backdrop="static">
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">
            {TRANSLATIONS[language].deleteConfirmation}
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-delete-questions"
              disabled={isDeleting}
              onClick={onConfirmDelete}
            >
              {isDeleting ? TRANSLATIONS[language].deleting : TRANSLATIONS[language].yes}
            </button>
            <button
              className="btn-no-delete-questions"
              disabled={isDeleting}
              onClick={onClose}
            >
              {TRANSLATIONS[language].no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationNewSetsQuestionPopup;