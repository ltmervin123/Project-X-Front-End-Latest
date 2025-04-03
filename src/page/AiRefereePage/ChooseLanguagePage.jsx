import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AiRefereeStyles/ChooseLanguagePage.css";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const TOKEN = sessionStorage.getItem("token") || null;
const URL = `${API}/api/ai-referee/reference/translate-question`;

const REFERENCE_QUESTIONS =
  JSON.parse(sessionStorage.getItem("referenceQuestions")) || {};
const QUESTIONS = REFERENCE_QUESTIONS?.questions || {};
const { candidateName: CANDIDATE_NAME } =
  JSON.parse(sessionStorage.getItem("refereeData")) || {};

const translateQuestion = async (questions, targetLanguage) => {
  const requestBody = {
    questions,
    targetLanguage,
  };

  const requestHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return await axios.post(URL, requestBody, requestHeader);
};

const replaceCandidateName = (questions, candidateName) => {
  const replaceInArray = (arr) => {
    return arr.map((q) =>
      q
        .replace(/\$\{candidateName\}/g, candidateName)
        .replace(/\(candidate name\)/g, candidateName)
    );
  };

  return Object.fromEntries(
    Object.entries(questions).map(([key, value]) => [
      key,
      replaceInArray(value),
    ])
  );
};

const getLanguageCode = (language) => {
  switch (language) {
    case "English":
      return "en";
    case "Japanese":
      return "ja";
    default:
      return "en";
  }
};

function ChooseLanguagePage() {
  const [language, setLanguage] = useState(
    sessionStorage.getItem("preferred-language") || "English"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      if (language === "Japanese") {
        await handleTranslateQuestion();
      }
      sessionStorage.setItem("preferred-language", language);
      navigate("/reference-interview-method");
    } catch (error) {
      console.error("Error during translation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslateQuestion = async () => {
    const questions = replaceCandidateName(QUESTIONS, CANDIDATE_NAME);
    const targetLanguage = getLanguageCode(language);
    const response = await translateQuestion(questions, targetLanguage);

    if (response.status === 200) {
      const translatedQuestions = response.data?.translatedQuestions;
      const translatedReferenceQuestions = {
        ...REFERENCE_QUESTIONS,
        questions: translatedQuestions,
      };
      sessionStorage.setItem(
        "referenceQuestions",
        JSON.stringify(translatedReferenceQuestions)
      );
    }
  };

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center">
      <div className="choose-language-container d-flex align-items-center justify-content-center flex-column">
        <h3>
          Choose Your <span className="color-orange"> Language </span>
        </h3>
        <p>Please select your preferred language to get started</p>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="custom-dropdown-container-language">
            <div
              className={`custom-dropdown-language ${isOpen ? "open" : ""}`}
              onClick={toggleDropdown}
            >
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

        <button
          onClick={handleContinue}
          className="btn-continue-language mt-3"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
}

export default ChooseLanguagePage;
