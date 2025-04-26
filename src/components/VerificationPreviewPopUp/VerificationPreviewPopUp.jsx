import React from "react";
import { Modal, Button } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    verificationPreview: "Verification Preview",
    guidelines: "Verification Guidelines:",
    faceVisible: "Your face is clearly visible and well-lit",
    idReadable: "Your ID document is readable and all corners are visible",
    noGlare: "There is no glare or shadow obscuring important information",
    notBlurry: "The images are not blurry or pixelated",
    tryAgain: "Try Again",
    submit: "Submit",
    loading: "Loading...",
    done: "Done",
  },
  Japanese: {
    verificationPreview: "確認プレビュー",
    guidelines: "確認ガイドライン：",
    faceVisible: "顔がはっきりと見え、十分な明るさがあること",
    idReadable: "身分証明書が読みやすく、すべての角が見えること",
    noGlare: "重要な情報を隠す光の反射や影がないこと",
    notBlurry: "画像がぼやけておらず、ピクセル化していないこと",
    tryAgain: "再試行",
    submit: "送信",
    loading: "読み込み中...",
    done: "完了",
  },
};

const VerificationPreviewPopUp = ({
  isOpen,
  onClose,
  image,
  onRetake,
  onSubmit,
  submitting,
}) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      className="custom-modal-take-picture"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="m-0">
              {TRANSLATIONS[language].verificationPreview}
            </h5>
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

        <div className="camera-verification-container">
          <div className="capture-area d-flex flex-column align-items-center">
            <div className="video-container">
              <div className="preview-image-container">
                <img src={image} alt="Preview" className="preview-image" />
              </div>
            </div>
          </div>
        </div>
        <div className="guidelines-container mt-3">
          <b>{TRANSLATIONS[language].guidelines}</b>
          <ul>
            <li>{TRANSLATIONS[language].faceVisible}</li>
            <li>{TRANSLATIONS[language].idReadable}</li>
            <li>{TRANSLATIONS[language].noGlare}</li>
            <li>{TRANSLATIONS[language].notBlurry}</li>
          </ul>

          <div className="preview-controls d-flex gap-3 mt-3 w-100 justify-content-center">
            <button
              className="btn-submit"
              onClick={onSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {TRANSLATIONS[language].loading}
                </>
              ) : (
                TRANSLATIONS[language].done
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VerificationPreviewPopUp;
