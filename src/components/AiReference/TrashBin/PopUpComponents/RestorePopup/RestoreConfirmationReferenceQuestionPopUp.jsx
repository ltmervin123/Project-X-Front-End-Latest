import React from "react";
import { Modal } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    confirmMessage: 'Would you like to restore',
    singleItem: 'this reference question sets',
    allItems: 'all these reference questions sets',
    selectedItems: 'these reference question sets',
    actionMessage: 'This action will move',
    theSingleItem: 'the reference question sets',
    theAllItems: 'all these reference questions sets',
    theSelectedItems: 'these reference question sets',
    destination: 'back to the Reference Question list',
    yes: 'Yes',
    no: 'No'
  },
  Japanese: {
    confirmMessage: '復元してもよろしいですか',
    singleItem: 'この推薦状質問セット',
    allItems: 'これらすべての推薦状質問セット',
    selectedItems: 'これらの推薦状質問セット',
    actionMessage: 'この操作により',
    theSingleItem: '推薦状質問セット',
    theAllItems: 'すべての推薦状質問セット',
    theSelectedItems: 'これらの推薦状質問セット',
    destination: 'が推薦状質問リストに戻ります',
    yes: 'はい',
    no: 'いいえ'
  }
};

const RestoreConfirmationReferenceQuestionPopUp = ({
  onClose,
  onConfirmRestore,
  selectedCount,
  isAll,
  isSingleItem,
  isRestoringReferenceQuestions,
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
            {TRANSLATIONS[language].confirmMessage}{" "}
            {isSingleItem || selectedCount === 1
              ? TRANSLATIONS[language].singleItem
              : isAll
              ? TRANSLATIONS[language].allItems
              : TRANSLATIONS[language].selectedItems}{" "}
            ? {TRANSLATIONS[language].actionMessage}{" "} 
            {isSingleItem || selectedCount === 1
              ? TRANSLATIONS[language].theSingleItem
              : isAll
              ? TRANSLATIONS[language].theAllItems
              : TRANSLATIONS[language].theSelectedItems}{" "}
            {TRANSLATIONS[language].destination}.
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

export default RestoreConfirmationReferenceQuestionPopUp;
