import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationCandidatePopUp = ({
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
          {/* <p>Would you like to confirm to delete this candidate?</p> */}
          <p className="text-center">
            Are you sure you want to delete this candidate? Deleting this
            candidate will also remove all associated reference records.
          </p>
          {/* <p>This action will also delete all associated reference records.</p> */}
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-no-delete-candidate"
              disabled={isDeleting}
              onClick={onClose}
            >
              No
            </button>
            <button
              className="btn-yes-delete-candidate"
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

export default DeleteConfirmationCandidatePopUp;
