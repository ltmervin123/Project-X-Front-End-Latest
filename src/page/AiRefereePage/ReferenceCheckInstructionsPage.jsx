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
      English: "Answer Candidate Questions",
      Japanese: "候補者の質問に答える",
    },
  },
  {
    title: {
      English: "Step 2",
      Japanese: "ステップ 2",
    },
    description: {
      English:
        "Review all your answers and select your preferred answer whether Original Answer or AI Enhanced Answer.",
      Japanese:
        "すべての回答を確認し、元の回答またはAI強化回答のいずれかを選択してください。",
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
      English:
        "Sign using your mouse or touchpad, or upload a scanned signature along with your ID. Both must be clear and legible for verification purposes. Click submit and wait for confirmation.",
      Japanese:
        "マウスまたはタッチパッドを使用して署名するか、IDとともにスキャンした署名をアップロードしてください。両方とも確認のために明確で読みやすい必要があります。送信をクリックし、確認を待ってください。",
    },
    overlayLabel: {
      English: "Provide Signature and Valid ID",
      Japanese: "署名と有効なIDを提供する",
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
  const language = sessionStorage.getItem("preferred-language") || "English";

  const handleNextStep = () => {
    if (currentStep < INSTRUCTION_DATA.length) {
      setCurrentStep((preStep) => preStep + 1);
    }
  };

  const handleStartNow = () => {
    navigate("/reference-notification");
  };

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center flex-column position-relative">
      <div className="ReferenceCheckInstructions-container">
        <h2 className="mb-3">
          {language === "Japanese"
            ? "参照チェックの指示"
            : "Reference Check Instructions"}
        </h2>
        <div className="d-flex justify-content-center align-items-start w-100 gap-4 h-100 flex-wrap">
          {INSTRUCTION_DATA.map((step, index) => (
            <div
              key={index}
              className={`instruction-card ${
                index + 1 <= currentStep ? "active" : "inactive"
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
                <p>{step.description[language]}</p>
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
