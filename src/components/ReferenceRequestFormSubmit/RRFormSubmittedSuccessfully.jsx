import React from "react";
import { useLocation } from "react-router-dom";

const TRANSLATIONS = {
  English: {
    title: "Request Submitted Successfully",
    message:
      "Thank you for completing the Reference Request Form. Your information has been successfully submitted. We appreciate your time and will begin processing your request shortly. If any further details are required, we will contact you directly.",
    exit: "Exit",
  },
  Japanese: {
    title: "リクエストが正常に送信されました",
    message:
      "推薦状リクエストフォームにご記入いただき、ありがとうございます。情報は正常に送信されました。ご協力いただき、ありがとうございます。リクエストの処理を開始いたします。追加の詳細が必要な場合は、直接ご連絡させていただきます。",
    exit: "終了",
  },
};

const RRFormSubmittedSuccessfully = () => {
  const { selectedLanguage = "English" } = useLocation().state || {};

  return (
    <div className="row main-login justify-content-center position-relative">
      <div className="d-flex align-items-center justify-content-center main-login-form">
        <div className="created-account-container" style={{ gap: "30px" }}>
          <div className="created-account-header">
            <svg
              width="68"
              height="50"
              viewBox="0 0 68 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M67.753 34C67.753 52.7773 52.5856 68 33.8765 68C15.1674 68 0 52.7773 0 34C0 15.2227 15.1674 0 33.8765 0C52.5856 0 67.753 15.2227 67.753 34ZM18.4781 37.0909L23.0976 32.4545L29.257 38.6364L44.6554 23.1818L49.2749 27.8182L29.257 47.9091L18.4781 37.0909Z"
                fill="white"
              />
            </svg>

            <h2 className="fs-4 mt-4">
              {TRANSLATIONS[selectedLanguage].title}
            </h2>
          </div>

          <p style={{ width: "100%" }}>
            {TRANSLATIONS[selectedLanguage].message}
          </p>

          <button
            className="btn-activate-now"
            onClick={() => (window.location.href = "/")}
          >
            {TRANSLATIONS[selectedLanguage].exit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RRFormSubmittedSuccessfully;
