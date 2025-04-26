import React from "react";
import { Modal } from "react-bootstrap";

const DeleteConfirmationReferenceRequestPopUp = ({
  onClose,
  onConfirmDelete,
  isAll,
  isSingleItem,
  isDeletingReferenceRequest,
}) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      className="custom-modal-edit-user"
      centered
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">
            Are you sure you want to permanently delete{" "}
            {isSingleItem
              ? "this reference request"
              : isAll
              ? "all reference requests"
              : `selected reference requests`}
            ? This action cannot be undone.{" "}
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-delete"
              onClick={onConfirmDelete}
              disabled={isDeletingReferenceRequest}
            >
              {isDeletingReferenceRequest ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "Yes"
              )}
            </button>
            <button className="btn-no-delete" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationReferenceRequestPopUp;
