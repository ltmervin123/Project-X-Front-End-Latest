import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationJobPopUp = ({
  onClose,
  onConfirmDelete,
  isDeleting,
}) => {
  return (
    <Modal show={true} onHide={onClose} centered backdrop={true}>
      <Modal.Body>

        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
        <p className="text-center m-0">
        Are you sure you want to delete this job? Deleting this job will
            also remove all associated candidates and their reference records.
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
          <button
              className="btn-yes-delete-job"
              disabled={isDeleting}
              onClick={onConfirmDelete}
            >
              {isDeleting ? "Deleting..." : "Yes"}
            </button>
            <button
              className="btn-no-delete-job"
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

export default DeleteConfirmationJobPopUp;
