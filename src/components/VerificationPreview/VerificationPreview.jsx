import React from "react";
import "../../styles/AiRefereeStyles/VerificationPreview.css";

const VerificationPreview = ({ image, onRetake, onSubmit, submitting }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      verificationPreview: "Verification Preview",
      guidelines: "Verification Guidelines:",
      faceVisible: "Your face is clearly visible and well-lit",
      idReadable: "Your ID document is readable and all corners are visible",
      noGlare: "There is no glare or shadow obscuring important information",
      notBlurry: "The images are not blurry or pixelated",
      privacyNotice:
        "Please rest assured that all information provided will be treated with utmost confidentiality and handled in full compliance with our data protection policies.",
      retake: "Retake",
      submit: "Submit",
      submitting: "Submitting...",
    },
    Japanese: {
      verificationPreview: "確認プレビュー",
      guidelines: "確認ガイドライン：",
      faceVisible: "顔がはっきりと見え、十分な明るさがあること",
      idReadable: "身分証明書が読みやすく、すべての角が見えること",
      noGlare: "重要な情報を隠す光の反射や影がないこと",
      notBlurry: "画像がぼやけておらず、ピクセル化していないこと",
      privacyNotice:
        "提供された情報は、最高レベルの機密性を持って取り扱われ、当社のデータ保護方針に完全に準拠して管理されることをご安心ください。",
      retake: "再撮影",
      submit: "送信",
      submitting: "送信中...",
    },
  };

  return (
    <div className="d-flex justify-content-center w-100">
      <div className="verification-preview d-flex justify-content-center align-items-center flex-column">
        <b>{translations[language].verificationPreview}</b>

        <div className="preview-image-container mt-2">
          <img src={image} alt={translations[language].verificationPreview} />
        </div>

        <div className="guidelines-container">
          <b>{translations[language].guidelines}</b>
          <ul>
            <li>{translations[language].faceVisible}</li>
            <li>{translations[language].idReadable}</li>
            <li>{translations[language].noGlare}</li>
            <li>{translations[language].notBlurry}</li>
          </ul>

          <div className="privacy-notice d-flex gap-3 align-items-center mb-3 justify-content-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 15C10.2833 15 10.521 14.904 10.713 14.712C10.905 14.52 11.0007 14.2827 11 14V10C11 9.71667 10.904 9.47933 10.712 9.288C10.52 9.09667 10.2827 9.00067 10 9C9.71733 8.99933 9.48 9.09533 9.288 9.288C9.096 9.48067 9 9.718 9 10V14C9 14.2833 9.096 14.521 9.288 14.713C9.48 14.905 9.71733 15.0007 10 15ZM10 7C10.2833 7 10.521 6.904 10.713 6.712C10.905 6.52 11.0007 6.28267 11 6C10.9993 5.71733 10.9033 5.48 10.712 5.288C10.5207 5.096 10.2833 5 10 5C9.71667 5 9.47933 5.096 9.288 5.288C9.09667 5.48 9.00067 5.71733 9 6C8.99933 6.28267 9.09533 6.52033 9.288 6.713C9.48067 6.90567 9.718 7.00133 10 7ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20Z"
                fill="#F46A05"
              />
            </svg>
            <p className="m-0">{translations[language].privacyNotice}</p>
          </div>
        </div>

        <div className="preview-actions">
          <button
            className="btn-retake"
            onClick={onRetake}
            disabled={submitting}
          >
            {translations[language].retake}
          </button>
          <button
            className="btn-submit"
            onClick={onSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className="spinner-border spinner-border-sm text-light me-2"
                  role="status"
                ></div>
                <span>{translations[language].submitting}</span>
              </div>
            ) : (
              translations[language].submit
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPreview;
