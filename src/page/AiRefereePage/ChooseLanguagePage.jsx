import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AiRefereeStyles/ChooseLanguagePage.css";

function ChooseLanguagePage() {
  const [language, setLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check for previously stored language in sessionStorage
  useEffect(() => {
    const storedLanguage = sessionStorage.getItem("preferred-language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Handle language selection and navigate to the next page
  const handleContinue = () => {
    // Log the selected language
    console.log(`Selected language: ${language}`); // Log the selected language

    // Store the selected language in sessionStorage
    sessionStorage.setItem("preferred-language", language);

    // Navigate to the next page
    navigate("/reference-interview-method"); // Replace with your next page route
  };

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle language selection
  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center">
      <div className="choose-language-container d-flex align-items-center justify-content-center flex-column">
        <h3>
          Choose Your <span className="color-orange"> Language </span>
        </h3>
        <p>Please select your preferred language to get started</p>
        {/* Cards Container */}
        <div className="row d-flex justify-content-center align-items-center">
          {/* Custom Dropdown */}
          <div className="custom-dropdown-container-language">
            <div className={`custom-dropdown-language ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
              {language}
            </div>
            {isOpen && (
              <div className="dropdown-options-language">
                <div onClick={() => selectLanguage("English")}>English</div>
                <div onClick={() => selectLanguage("Japanese")}>Japanese</div>
              </div>
            )}
          </div>
        </div>
        {/* Continue Button */}
        <button onClick={handleContinue} className="btn-continue-language mt-3">
          Continue
        </button>
      </div>
    </div>
  );
}

export default ChooseLanguagePage;