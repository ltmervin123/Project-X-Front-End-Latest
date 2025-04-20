import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationCandidatePopUp = ({
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
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          {/* <p>Would you like to confirm to delete this applicant?</p> */}
          <p className="text-center m-0">
            Are you sure you want to delete this applicant? Deleting this
            applicant will also remove all associated reference records.
          </p>
          {/* <p>This action will also delete all associated reference records.</p> */}
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-delete-applicant"
              disabled={isDeleting}
              onClick={onConfirmDelete}
            >
              {isDeleting ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "Yes"
              )}
            </button>
            <button
              className="btn-no-delete-applicant"
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

export default DeleteConfirmationCandidatePopUp;
