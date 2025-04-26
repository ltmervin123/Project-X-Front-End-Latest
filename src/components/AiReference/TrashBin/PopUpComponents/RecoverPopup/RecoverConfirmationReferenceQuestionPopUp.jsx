import React from "react";
import { Modal } from "react-bootstrap";

const RecoverConfirmationReferenceQuestionPopUp = ({
  onClose,
  onConfirmRecover,
  isAll,
  isSingleItem,
  isRecoveringReferenceQuestions,
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
            Would you like to recover{" "}
            {isSingleItem
              ? "this reference question"
              : isAll
              ? "all"
              : "selected"}{" "}
            reference questions? This action will move all questions back to the
            reference questions list.{" "}
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-recover"
              onClick={onConfirmRecover}
              disabled={isRecoveringReferenceQuestions}
            >
              {isRecoveringReferenceQuestions ? (
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

export default RecoverConfirmationReferenceQuestionPopUp;
