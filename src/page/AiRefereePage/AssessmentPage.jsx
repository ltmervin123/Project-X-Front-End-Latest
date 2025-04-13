import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AiRefereeStyles/LanguageSelectionConfirmationPage.css";

function LanguageSelectionConfirmationPage() {

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