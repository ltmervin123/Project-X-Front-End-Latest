import React from "react";
import { Modal } from "react-bootstrap";

const PurchaseConfirmationPopUp = ({ onClose, onConfirmPurchase, creditsToAdd, amount }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const TRANSLATIONS = {
    English: {
      confirmMessage: "Are you sure you want to purchase",
      credits: "credits",
      amount: "Amount",
      confirmPurchase: "Confirm",
      cancel: "Cancel"
    },
    Japanese: {
      confirmMessage: "購入してもよろしいですか",
      credits: "クレジット",
      amount: "金額",
      confirmPurchase: "確認",
      cancel: "キャンセル"
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdrop="true"
      keyboard={false}
      className="purchase-confirmation-modal"
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-3 py-4">
          <p className="text-center mb-2">
            {TRANSLATIONS[language].confirmMessage}
          </p>
          <p className="text-center mb-3 color-orange">
            <strong>{creditsToAdd} {TRANSLATIONS[language].credits}</strong>
          </p>
          <p className="text-center mb-4">
            <strong>{TRANSLATIONS[language].amount}: ¥{amount}</strong>
          </p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-2">
            <button
              className="btn-confirm-purchase"
              onClick={onConfirmPurchase}
            >
              {TRANSLATIONS[language].confirmPurchase}
            </button>
            <button 
              className="btn-cancel-purchase" 
              onClick={onClose}
            >
              {TRANSLATIONS[language].cancel}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PurchaseConfirmationPopUp;
