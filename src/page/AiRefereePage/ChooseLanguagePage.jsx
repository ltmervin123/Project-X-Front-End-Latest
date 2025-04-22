import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AiRefereeStyles/ChooseLanguagePage.css";
import axios from "axios";
import { Spinner, Container, Row, Col } from "react-bootstrap";
// const translateQuestion = async (questions, targetLanguage) => {
//   const URL = `${API}/api/ai-referee/reference/translate-question`;
//   const requestBody = {
//     questions,
//     targetLanguage,
//   };

//   const requestHeader = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   };

//   return await axios.post(URL, requestBody, requestHeader);
// };

// const replaceCandidateName = (questions, candidateName) => {
//   const replaceInArray = (arr) => {
//     return arr.map((q) =>
//       q
//         .replace(/\$\{candidateName\}/g, candidateName)
//         .replace(/\(candidate name\)/g, candidateName)
//     );
//   };

//   return Object.fromEntries(
//     Object.entries(questions).map(([key, value]) => [
//       key,
//       replaceInArray(value),
//     ])
//   );
// };

// const getLanguageCode = (language) => {
//   switch (language) {
//     case "English":
//       return "en";
//     case "Japanese":
//       return "ja";
//     default:
//       return "en";
//   }
// };

const CURRENT_STEP = 2;

const STEPS = [
  "Basic Information",
  "Select Language",
  "Choose Method",
  "Questionnaire",
  "Reference Completed",
];

function ChooseLanguagePage() {
  const [language, setLanguage] = useState(
    sessionStorage.getItem("preferred-language") || "English"
  );
  const API = process.env.REACT_APP_API_URL;
  const TOKEN = sessionStorage.getItem("token") || null;
  const REFERENCE_QUESTIONS =
    JSON.parse(sessionStorage.getItem("referenceQuestions")) || {};
  const {
    candidateName: CANDIDATE_NAME,
    refereeId,
    referenceId,
  } = JSON.parse(sessionStorage.getItem("refereeData")) || {};
  const FORMAT = REFERENCE_QUESTIONS?.format || null;
  const location = useLocation();
  const REFERENCE_ID = location.state?.referenceId || referenceId;
  const REFEREE_ID = location.state?.refereeId || refereeId;
  const [isOpen, setIsOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const QUESTIONS = REFERENCE_QUESTIONS?.questions || {};

  const getTranslatedQuestion = async (format, candidateName) => {
    const URL = `${API}/api/ai-referee/reference/get-translated-questions/${format}/${candidateName}`;

    const requestHeader = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    return await axios.get(URL, requestHeader);
  };

  const getReferenceQuestions = async (REFERENCE_ID, REFEREE_ID) => {
    const URL = `${API}/api/ai-referee/company-request-reference/get-reference-question-by-referenceId/${REFERENCE_ID}/${REFEREE_ID}`;
    const requestHeader = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    return await axios.get(URL, requestHeader);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setFetching(true);
        const response = await getReferenceQuestions(REFERENCE_ID, REFEREE_ID);
        if (response.status === 200) {
          sessionStorage.setItem(
            "referenceQuestions",
            JSON.stringify(response.data)
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    fetchQuestions();
  }, []);

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
    // const questions = replaceCandidateName(QUESTIONS, CANDIDATE_NAME);
    // const targetLanguage = getLanguageCode(language);
    // const response = await translateQuestion(questions, targetLanguage);
    const response = await getTranslatedQuestion(FORMAT, CANDIDATE_NAME);

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

  if (fetching) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="text-center">
          <Col>
            <Spinner
              animation="border"
              variant="primary"
              role="status"
              style={{ width: "5rem", height: "5rem" }}
            />
            <p className="mt-3">Fetching questions, please wait...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center flex-column justify-content-center">
      <div className="reference-progress-indicator">
        {STEPS.map((step, index) => (
          <div key={index} className="reference-step-container">
            <div
              className={`step ${CURRENT_STEP >= index + 1 ? "active" : ""}`} // Change here
            >
              <div className="bullet">{index + 1}</div>
              {index < STEPS.length - 1 && <div className="line" />}{" "}
              {/* Line between steps */}
            </div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
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
                <div
                  className={language === "English" ? "selected" : ""}
                  onClick={() => selectLanguage("English")}
                >
                  English
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
                  Japanese
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
          className="btn-continue-language mt-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            ></div>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}

export default ChooseLanguagePage;
