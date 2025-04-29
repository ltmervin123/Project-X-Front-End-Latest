import React from "react";
import { Modal } from "react-bootstrap";

const RestoreConfirmationReferenceQuestionPopUp = ({
  onClose,
  onConfirmRestore,
  selectedCount,

  isAll,
  isSingleItem,
  isRestoringReferenceQuestions,
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
            Would you like to restore{" "}
            {isSingleItem || selectedCount === 1
              ? "this reference question sets"
              : isAll
              ? "all these reference questions sets"
              : "these reference question sets"}{" "}
            ? This action will move{" "} 
            {isSingleItem || selectedCount === 1
              ? "the reference question sets"
              : isAll
              ? "all these reference questions sets"
              : "these reference question sets"}{" "}
           back to the Reference Question list.
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-recover"
              onClick={onConfirmRestore}
              disabled={isRestoringReferenceQuestions}
            >
              {isRestoringReferenceQuestions ? (
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

export default RestoreConfirmationReferenceQuestionPopUp;
