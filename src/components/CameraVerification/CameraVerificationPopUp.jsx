import React, { useRef, useState } from "react";
import CameraVerification from "./CameraVerification";
import { Modal, Button, Form } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    guidelines: "Verification Guidelines:",
    faceVisible: "Your face is clearly visible and well-lit",
    idReadable: "Your ID document is readable and all corners are visible",
    noGlare: "There is no glare or shadow obscuring important information",
    notBlurry: "The images are not blurry or pixelated",
    clear: "Clear",
    preview: "Preview",
    tryAgain: "Try Again",
    done: "Done",
    takePhoto: "Take a Photo",
    verificationPreview: "Verification Preview",
  },
  Japanese: {
    guidelines: "確認ガイドライン：",
    faceVisible: "顔がはっきりと見え、十分な明るさがあること",
    idReadable: "身分証明書が読みやすく、すべての角が見えること",
    noGlare: "重要な情報を隠す光の反射や影がないこと",
    notBlurry: "画像がぼやけておらず、ピクセル化していないこと",
    clear: "クリア",
    preview: "プレビュー",
    tryAgain: "再試行",
    done: "完了",
    takePhoto: "写真を撮る",
    verificationPreview: "確認プレビュー",
  },
};

const CameraVerificationPopUp = ({
  isOpen,
  onClose,
  setSelfie,
  submitIdUpload,
  submitting,
  handleImageCapture,
}) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const [selfieImage, setSelfieImage] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [currentImage, setCurrentImage] = React.useState(null);
  const [isRetry, setIsRetry] = useState(false);
  const cameraRef = useRef(null);

  const handleRetry = () => {
    setSelfie(null);
    setSelfieImage(null);
    setIsRetry(true);
  };

  const handleDone = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-take-picture"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div>
            <h5 className="m-0">
              {currentImage
                ? TRANSLATIONS[language].verificationPreview
                : TRANSLATIONS[language].takePhoto}
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

        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
          }}
        >
          <CameraVerification
            ref={cameraRef}
            setSelfie={setSelfie}
            submitIdUpload={submitIdUpload}
            submitting={submitting}
            setIsInitializing={setIsInitializing}
            setCameraError={setCameraError}
            isInitializing={isInitializing}
            cameraError={cameraError}
            setSelfieImage={setSelfieImage}
            setIsRetry={setIsRetry}
            isRetry={isRetry}
            handleImageCapture={handleImageCapture}
          />
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
                className="btn-try-again"
                onClick={handleRetry}
                disabled={cameraError || isInitializing || !selfieImage}
              >
                {TRANSLATIONS[language].tryAgain}
              </button>
              <button
                className="btn-done"
                onClick={handleDone}
                disabled={cameraError || isInitializing || !selfieImage}
              >
                {TRANSLATIONS[language].done}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CameraVerificationPopUp;
