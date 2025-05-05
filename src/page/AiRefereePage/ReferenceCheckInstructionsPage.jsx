import React, { useState } from "react";
import "../../styles/AiRefereeStyles/ReferenceCheckInstructionsPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const INSTRUCTION_DATA = [
  {
    title: {
      English: "Step 1",
      Japanese: "ステップ 1",
    },
    description: {
      English:
        "You will be asked 10 or more questions regarding the candidate’s skills, work ethic, and overall performance. Please provide honest, detailed, and specific responses based on your firsthand experience working with them. Your insights will help us make a well-informed hiring decision.",
      Japanese:
        "候補者のスキル、労働倫理、全体的なパフォーマンスに関する10以上の質問がされます。彼らと一緒に働いた経験に基づいて、正直で詳細かつ具体的な回答を提供してください。あなたの洞察は、私たちが十分に情報に基づいた採用決定を下すのに役立ちます。",
    },
    overlayLabel: {
      English: "Answer Reference Questions",
      Japanese: "リファレンス質問に答える",
    },
  },
  {
    title: {
      English: "Step 2",
      Japanese: "ステップ 2",
    },
    description: {
      English:
        "Please review all the answers provided and select your preferred version either the original response or the AI-enhanced version. The AI-enhanced answer does not alter the meaning or content of the original response; it simply improves clarity by correcting spelling mistakes, grammatical errors, and removing unnecessary filler words.",
      Japanese:
        "すべての回答を確認し、元の回答またはAI強化版のいずれかを選択してください。AI強化版の回答は元の意味や内容を変更するものではなく、スペルミスや文法の誤りを修正し、不要な言葉を取り除くことで明瞭さを向上させるものです。",
    },
    overlayLabel: {
      English: "Review your Answer",
      Japanese: "回答を確認する",
    },
  },
  {
    title: {
      English: "Step 3",
      Japanese: "ステップ 3",
    },
    description: {
      English: {
        intro:
          "To complete the reference process, we require identity verification through two steps:",
        mandatory:
          "Mandatory: Upload a valid photo ID (e.g., driver’s license, passport, or national ID).",
        chooseOne: "Choose one of the following:",
        option1: "Upload a business card,",
        or: "OR",
        option2:
          "Use your computer’s camera to take a selfie while holding your photo ID clearly visible.",
        note: "This two-step verification helps ensure the legitimacy and integrity of the reference.",
      },
      Japanese: {
        intro:
          "リファレンスプロセスを完了するには、以下の2ステップで本人確認が必要です：",
        mandatory:
          "【必須】有効な写真付き身分証明書（運転免許証、パスポート、または国民IDなど）をアップロードしてください。",
        chooseOne: "以下のいずれかを選択してください：",
        option1: "名刺をアップロードする",
        or: "または",
        option2:
          "写真付き身分証明書を持った状態でセルフィーを撮影してください（カメラ使用）",
        note: "この2段階認証は、リファレンスの正当性と信頼性を確保するために行われます。",
      },
    },
    overlayLabel: {
      English: "Referee Identity Verification",
      Japanese: "リファレンス本人確認",
    },
  },
];

// Add button translations
const BUTTON_TRANSLATIONS = {
  StartNow: {
    English: "Start Now",
    Japanese: "今すぐ始める",
  },
  NextStep: {
    English: "Next Step",
    Japanese: "次のステップ",
  },
};

function ReferenceCheckInstructionsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const language = sessionStorage.getItem("selectedLanguage") || "English";

  const handleNextStep = () => {
    if (currentStep < INSTRUCTION_DATA.length) {
      setCurrentStep((preStep) => preStep + 1);
    }
  };

  const handleStartNow = () => {
    navigate("/reference-questionnaire");
  };

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center flex-column position-relative">
      <div className="ReferenceCheckInstructions-container">
        <h2 className="mb-3">
          {language === "Japanese"
            ? "参照チェックの指針"
            : "Reference Check Guidelines"}
        </h2>

        <div className="d-flex justify-content-center align-items-start w-100 gap-4 h-100 flex-wrap">
          {INSTRUCTION_DATA.map((step, index) => (
            <div
              key={index}
              className={`instruction-card ${
                index + 1 <= currentStep ? "active" : ""
              }`}
            >
              <h3 className="text-center">{step.title[language]}</h3>
              <svg
                width="49"
                height="58"
                viewBox="0 0 49 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.27341 0.0958109 L8.8357 0.454065L2.95883 27.1882L5.13194 25.6779L10.8122 0.9072L14.867 1.83701L10.2069 22.1588L22.6188 13.5508L23.1002 13.2191L23.7555 13.373L26.4266 14.0029L33.0012 40.3895L35.7249 41.0036L29.1561 14.6495L33.2768 15.6223L35.0599 16.0452L35.0157 16.1012L35.0961 16.1196L42.0019 42.4219L48.1401 43.8053L31.9283 57.5602L24.059 38.3737L30.0693 39.731L25.9503 24.0457L14.8399 31.6395L14.3593 31.9682L13.7006 31.81L12.6658 31.5625L12.6731 31.5885L0.710904 28.7165L7.27341 0.0958109ZM6.08156 27.8903L13.5334 29.6827L25.319 21.631L23.7433 15.6402L6.08156 27.8903Z"
                  fill="#686868"
                />
              </svg>

              <div className="position-relative">
                <div className="overlay-label-step">
                  {step.overlayLabel[language]}
                </div>
                {Array.isArray(step.description[language]) ? (
                  step.description[language].map((line, i) => (
                    <p key={i}>{line}</p>
                  ))
                ) : typeof step.description[language] === "object" ? (
                  <>
                    <p>{step.description[language].intro}</p>
                    <ul className="list-style1">
                      <li>{step.description[language].mandatory}</li>
                      <li>{step.description[language].chooseOne}</li>
                    </ul>
                    <ul>
                      <li>{step.description[language].option1}</li>
                      <p>{step.description[language].or}</p>
                      <li>{step.description[language].option2}</li>
                    </ul>
                    <p>{step.description[language].note}</p>
                  </>
                ) : (
                  <p>{step.description[language]}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="button-container d-flex justify-content-end w-100">
          <button
            className="next-step-button mx-5"
            onClick={
              currentStep === INSTRUCTION_DATA.length
                ? handleStartNow
                : handleNextStep
            }
          >
            {currentStep === INSTRUCTION_DATA.length
              ? BUTTON_TRANSLATIONS.StartNow[language]
              : BUTTON_TRANSLATIONS.NextStep[language]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReferenceCheckInstructionsPage;
