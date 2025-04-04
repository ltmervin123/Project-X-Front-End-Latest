import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AiRefereeStyles/LanguageSelectionConfirmationPage.css";

function LanguageSelectionConfirmationPage() {
  const navigate = useNavigate();
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      title: "Language Selection ",
      coloredTitle: "Confirmation",
      reviewText: "Please review your language selection before proceeding.",
      importantInfo: "Important Information",
      confirmationText: "You've chosen <span class='color-orange'>English</span> as your preferred language. Voice responses will be provided and answered in English only throughout the reference session. Please note that this setting cannot be changed once the session begins.",
      backButton: "Back",
      confirmButton: "Confirm",
    },
    Japanese: {
      title: "言語選択の確認",
      reviewText: "進む前に言語選択を確認してください。",
      importantInfo: "重要な情報",
      confirmationText: "あなたは<span class='color-orange'>英語</span>を優先言語として選択しました。音声応答は、参照セッション中に英語でのみ提供され、回答されます。この設定は、セッションが始まると変更できないことに注意してください。",
      backButton: "戻る",
      confirmButton: "確認",
    },
  };

  const handleBack = () => {
    navigate("/reference-instructions");
  };

  const handleConfirm = () => {
    navigate("/reference-questionnaire");
  };

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center">
      <div className="confirmation-container d-flex align-items-center justify-content-center flex-column ">
        <h3>
          {translations[language].title}
          <span className="color-orange">{translations[language].coloredTitle}</span>
        </h3>
        <small>{translations[language].reviewText}</small>

        <div className="row d-flex justify-content-center align-items-center mt-4 px-3">
          <h5>{translations[language].importantInfo}</h5>
          <p dangerouslySetInnerHTML={{ __html: translations[language].confirmationText }} />

          <div className="d-flex gap-4 justify-content-center mt-3">
            <button 
              className="btn-back-instructions" 
              onClick={handleBack} 
              aria-label={translations[language].backButton}
            >
              {translations[language].backButton}
            </button>
            <button 
              className="btn-confirmation-to-questionaire" 
              onClick={handleConfirm} 
              aria-label={translations[language].confirmButton}
            >
              {translations[language].confirmButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageSelectionConfirmationPage;