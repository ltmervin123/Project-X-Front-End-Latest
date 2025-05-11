import React from "react";
import { Modal } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    confirmMessage: 'Would you like to restore',
    singleItem: 'this job',
    allItems: 'all these jobs',
    selectedItems: 'these jobs',
    actionMessage: 'This action will move',
    theSingleItem: 'the job',
    theAllItems: 'all these jobs',
    theSelectedItems: 'these jobs',
    destination: 'back to the Jobs list',
    yes: 'Yes',
    no: 'No'
  },
  Japanese: {
    confirmMessage: '復元してもよろしいですか',
    singleItem: 'この求人',
    allItems: 'これらすべての求人',
    selectedItems: 'これらの求人',
    actionMessage: 'この操作により',
    theSingleItem: '求人',
    theAllItems: 'すべての求人',
    theSelectedItems: 'これらの求人',
    destination: 'が求人リストに戻ります',
    yes: 'はい',
    no: 'いいえ'
  }
};

const RestoreConfirmationJobPopUp = ({
  onClose,
  onConfirmRestore,
  selectedCount,
  isAll,
  isSingleItem,
  isRestoringJobs,
}) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

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
            {TRANSLATIONS[language].confirmMessage} {" "}
            {isSingleItem || selectedCount === 1
              ? TRANSLATIONS[language].singleItem
              : isAll
              ? TRANSLATIONS[language].allItems
              : TRANSLATIONS[language].selectedItems}
            ? {TRANSLATIONS[language].actionMessage} {" "}
            {isSingleItem || selectedCount === 1
              ? TRANSLATIONS[language].theSingleItem
              : isAll
              ? TRANSLATIONS[language].theAllItems
              : TRANSLATIONS[language].theSelectedItems}
            {" "} {TRANSLATIONS[language].destination}.
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-recover"
              onClick={onConfirmRestore}
              disabled={isRestoringJobs}
            >
              {isRestoringJobs ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                TRANSLATIONS[language].yes
              )}
            </button>
            <button className="btn-no-recover" onClick={onClose}>
              {TRANSLATIONS[language].no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RestoreConfirmationJobPopUp;
