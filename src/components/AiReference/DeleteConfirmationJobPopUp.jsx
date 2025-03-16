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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div></div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column p-2">
          <p className="text-center">
            Are you sure you want to delete this job? Deleting this job will
            also remove all associated candidates and their reference records.
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-no-delete-job"
              disabled={isDeleting}
              onClick={onClose}
            >
              No
            </button>
            <button
              className="btn-yes-delete-job"
              disabled={isDeleting}
              onClick={onConfirmDelete}
            >
              {isDeleting ? "Deleting..." : "Yes"}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationJobPopUp;
