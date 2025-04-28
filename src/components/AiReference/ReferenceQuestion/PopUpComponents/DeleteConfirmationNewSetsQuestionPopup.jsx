import React from "react";
import { Modal, Button } from "react-bootstrap";

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
            Are you sure you want to delete this set of questions? Deleting this set will also remove all associated responses and records.
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-delete-questions"
              disabled={isDeleting}
              onClick={onConfirmDelete}
            >
              {isDeleting ? "Deleting..." : "Yes"}
            </button>
            <button
              className="btn-no-delete-questions"
              disabled={isDeleting}
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationNewSetsQuestionPopup;