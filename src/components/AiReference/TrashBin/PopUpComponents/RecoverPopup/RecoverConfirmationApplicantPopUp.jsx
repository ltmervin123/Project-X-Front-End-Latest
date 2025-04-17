import React from "react";
import { Modal } from "react-bootstrap";

const RecoverConfirmationApplicantPopUp = ({ onClose, onConfirmRecover, selectedCount, isAll, isSingleItem }) => {
  return (
    <Modal show={true} onHide={onClose} centered backdrop={true}>
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">
            Would you like to recover {isSingleItem ? 'this candidate' : isAll ? 'all candidates' : `selected candidates`}? 
            This action will move all candidates back to the candidate list.
                      </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button className="btn-yes-recover" onClick={onConfirmRecover}>
              Yes
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

export default RecoverConfirmationApplicantPopUp;
