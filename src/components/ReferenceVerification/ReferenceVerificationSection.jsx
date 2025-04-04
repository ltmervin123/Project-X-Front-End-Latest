import React from "react";

const ReferenceVerificationSection = () => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      header: "Completed Reference Check",
      successMessage: "Your responses have been successfully saved. Thank you for completing the reference checking. We appreciate your time and input in this process. You may now download your responses or exit the page.",
      exit: "Exit",
    },
    Japanese: {
      header: "完了した参照チェック",
      successMessage: "あなたの回答は正常に保存されました。参照チェックを完了していただきありがとうございます。このプロセスにおけるあなたの時間と入力に感謝します。あなたは今、あなたの回答をダウンロードするか、ページを終了することができます。",
      exit: "終了",
    },
  };

  return (
    <div className="row main-login justify-content-center position-relative">
      <div className="d-flex align-items-center justify-content-center main-login-form">
        <div className="reference-verification-container">
          <div className="reference-verification-header">
            <svg
              width="50"
              height="50"
              viewBox="0 0 68 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M68 34C68 52.7773 52.7773 68 34 68C15.2227 68 0 52.7773 0 34C0 15.2227 15.2227 0 34 0C52.7773 0 68 15.2227 68 34ZM18.5455 37.0909L23.1818 32.4545L29.3636 38.6364L44.8182 23.1818L49.4545 27.8182L29.3636 47.9091L18.5455 37.0909Z"
                fill="white"
              />
            </svg>
            <h2 className="fs-4">{translations[language].header}</h2>
          </div>

          <p>
            {translations[language].successMessage}
          </p>
          <div className="d-flex gap-4">
            <button className="btn-download">
              Download
            </button>
            <button
              className="btn-exit"
              onClick={() => (window.location.href = "/")}
            >
              {translations[language].exit}
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ReferenceVerificationSection;