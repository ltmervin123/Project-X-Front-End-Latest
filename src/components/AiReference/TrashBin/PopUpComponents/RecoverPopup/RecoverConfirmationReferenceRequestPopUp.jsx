import React from "react";
import { Modal } from "react-bootstrap";

const RecoverConfirmationReferenceRequestPopUp = ({
  onClose,
  onConfirmRecover,
  selectedCount,
  isAll,
  isSingleItem,
  isRecoveringReferenceRequest,
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
            Would you like to recover{" "} <strong>
            {isSingleItem || selectedCount === 1
              ? "this reference request"
              : isAll
              ? "all"
              : "selected"}{" "}</strong>
          ? This action will move{" "} <strong>
            {isSingleItem || selectedCount === 1
              ? "the reference request"
              : isAll
              ? "all reference requests"
              : `the selected reference requests`}</strong>
           {" "} back to the reference request list.
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-recover"
              onClick={onConfirmRecover}
              disabled={isRecoveringReferenceRequest}
            >
              {isRecoveringReferenceRequest ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "Yes"
              )}
            </button>
            <button className="btn-no-recover" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RecoverConfirmationReferenceRequestPopUp;
