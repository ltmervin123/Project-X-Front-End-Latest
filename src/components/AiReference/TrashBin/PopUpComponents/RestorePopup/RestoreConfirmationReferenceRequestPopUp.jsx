import React from "react";
import { Modal } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    confirmMessage: 'Would you like to restore',
    singleRequest: 'this reference request',
    allRequests: 'all these reference requests',
    selectedRequests: 'these selected reference requests',
    actionMessage: 'This action will move',
    theSingleRequest: 'the reference request',
    theAllRequests: 'all these reference requests',
    theSelectedRequests: 'these selected reference requests',
    destination: 'back to the Reference Request list',
    yes: 'Yes',
    no: 'No'
  },
  Japanese: {
    confirmMessage: '復元してもよろしいですか',
    singleRequest: 'このリファレンスリクエスト',
    allRequests: 'これらすべてのリファレンスリクエスト',
    selectedRequests: '選択されたリファレンスリクエスト',
    actionMessage: 'この操作により',
    theSingleRequest: 'リファレンスリクエスト',
    theAllRequests: 'すべてのリファレンスリクエスト',
    theSelectedRequests: '選択されたリファレンスリクエスト',
    destination: 'がリファレンスリクエストリストに戻ります',
    yes: 'はい',
    no: 'いいえ'
  }
};

const RestoreConfirmationReferenceRequestPopUp = ({
  onClose,
  onConfirmRestore,
  selectedCount,
  isAll,
  isSingleItem,
  isRestoringReferenceRequest,
}) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const t = (key) => TRANSLATIONS[language][key];

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
            {t('confirmMessage')} {" "}
            {isSingleItem || selectedCount === 1
              ? t('singleRequest')
              : isAll
              ? t('allRequests')
              : t('selectedRequests')}
            ? {t('actionMessage')} {" "}
            {isSingleItem || selectedCount === 1
              ? t('theSingleRequest')
              : isAll
              ? t('theAllRequests')
              : t('theSelectedRequests')}
            {" "} {t('destination')}
          </p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-recover"
              onClick={onConfirmRestore}
              disabled={isRestoringReferenceRequest}
            >
              {isRestoringReferenceRequest ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                t('yes')
              )}
            </button>
            <button className="btn-no-recover" onClick={onClose}>
              {t('no')}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RestoreConfirmationReferenceRequestPopUp;
