import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const TRANSLATIONS = {
    English: {
      selectLanguage: "Select your desired",
      language: "language",
      continue: "Continue",
      languages: {
        English: "English",
        Japanese: "Japanese"
      }
    },
    Japanese: {
      selectLanguage: "希望する",
      language: "言語を選択",
      continue: "続行",
      languages: {
        English: "英語",
        Japanese: "日本語"
      }
    }
  };
  

const SelectionLanguagePopUp = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(
    sessionStorage.getItem("preferred-language") || "English"
  );
  const [isLoading, setIsLoading] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      sessionStorage.setItem("preferred-language", language);
      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event("storage"));
      if (onContinue) {
        await onContinue(language);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={true}
      centered
      backdrop="static"
      className="custom-modal-edit-user"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center gap-4 flex-column">
          <h4>
            {TRANSLATIONS[language].selectLanguage}{" "}
            <span className="color-orange">
              {TRANSLATIONS[language].language}
            </span>
          </h4>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="custom-dropdown-container-language">
              <div
                className={`custom-dropdown-language ${isOpen ? "open" : ""}`}
                onClick={toggleDropdown}
              >
                  {TRANSLATIONS[language].languages[language]}
              </div>
              {isOpen && (
                <div className="dropdown-options-language">
                  <div
                    className={language === "English" ? "selected" : ""}
                    onClick={() => selectLanguage("English")}
                  >
                    {TRANSLATIONS[language].languages.English}
                    {language === "English" && (
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.99625 11.1698L1.82625 6.99984L0.40625 8.40984L5.99625 13.9998L17.9963 1.99984L16.5863 0.589844L5.99625 11.1698Z"
                          fill="#F46A05"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className={language === "Japanese" ? "selected" : ""}
                    onClick={() => selectLanguage("Japanese")}
                  >
                    {TRANSLATIONS[language].languages.Japanese}
                    {language === "Japanese" && (
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.99625 11.1698L1.82625 6.99984L0.40625 8.40984L5.99625 13.9998L17.9963 1.99984L16.5863 0.589844L5.99625 11.1698Z"
                          fill="#F46A05"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="btn-continue-language mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
            ) : (
              TRANSLATIONS[language].continue
            )}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SelectionLanguagePopUp;
