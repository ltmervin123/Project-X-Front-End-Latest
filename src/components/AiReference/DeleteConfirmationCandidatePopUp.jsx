import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationCandidatePopUp = ({ onClose, onConfirmDelete }) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
          </div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <p>Would you like to confirm to delete this candidate?</p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button className="btn-no-delete-candidate" onClick={onClose}>
              No
            </button>
            <button className="btn-yes-delete-candidate" onClick={onConfirmDelete}>
              Yes
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationCandidatePopUp;