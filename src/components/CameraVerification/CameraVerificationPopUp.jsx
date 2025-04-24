import React, { useRef } from "react";
import CameraVerification from "./CameraVerification";
import { Modal, Button, Form } from "react-bootstrap";

const CameraVerificationPopUp = ({
  isOpen,
  onClose,
  setSelfie,
  submitIdUpload,
  submitting,
}) => {
  const [currentImage, setCurrentImage] = React.useState(null);
  const cameraRef = useRef(null);

  const handleClear = () => {
    if (cameraRef.current) {
      cameraRef.current.clearImage();
      setCurrentImage(null); // Reset currentImage state
    }
  };

  const handleDone = () => {
    if (currentImage) {
      // Convert the data URL to a File object
      fetch(currentImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });
          submitIdUpload(file);
        });
    }
  };

  if (!isOpen) return null;
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
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
                ? translations[language].verificationPreview
                : translations[language].takePhoto}
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
            onImageChange={setCurrentImage}
            onClearImage={() => setCurrentImage(null)}
            onPreview={() => {}}
          />
          <div className="guidelines-container mt-3">
            <b>{translations[language].guidelines}</b>
            <ul>
              <li>{translations[language].faceVisible}</li>
              <li>{translations[language].idReadable}</li>
              <li>{translations[language].noGlare}</li>
              <li>{translations[language].notBlurry}</li>
            </ul>
   
              <div className="preview-controls d-flex gap-3 mt-3 w-100 justify-content-center">
                <button
                  className="btn-try-again"
                  onClick={handleClear}
                  disabled={!currentImage} // Disabled when no image
                >
                  {translations[language].tryAgain}
                </button>
                {currentImage && (
                  <button
                    className="btn-done"
                    onClick={handleDone}
                    disabled={!currentImage}
                  >
                    {translations[language].done}
                  </button>
                )}
              </div>
            
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CameraVerificationPopUp;
