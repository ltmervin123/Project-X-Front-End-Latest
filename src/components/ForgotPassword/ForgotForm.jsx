import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckEmailForm from "./CheckEmailForm";
import { useForgotPasswordTranslation } from "./hooks/forgotPasswordTranslation";

import axios from "axios";

const ForgotForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { t } = useForgotPasswordTranslation();
  const API = process.env.REACT_APP_API_URL;
  const URL = `${API}/api/user/auth/forgot-password`;
  const [isSending, setIsSending] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(t('invalidEmailError')); // Set error if email is invalid
      return;
    }
    await sendEmail();
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const sendEmail = async () => {
    try {
      setError("");
      setIsSending(true);
      const requestBody = { email };
      const response = await axios.post(URL, requestBody, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setEmailSent(true);
      }
    } catch (error) {
      if (error.response.status === 500) {
        setError(error.response.data.error);
      } else {
        setError(error.response.data.message);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="row main-login justify-content-center position-relative mt-5">
      <div className="d-flex align-items-center justify-content-center main-login-form">
        {emailSent ? (
          <CheckEmailForm email={email} />
        ) : (
          <div className="forgot-password-container">
            <svg
              width="66"
              height="77"
              viewBox="0 0 66 87"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33 0C27.5299 0 22.2839 2.18239 18.4159 6.06707C14.548 9.95176 12.375 15.2205 12.375 20.7143V29H8.25C6.06196 29 3.96354 29.873 2.41637 31.4268C0.869194 32.9807 0 35.0882 0 37.2857V78.7143C0 80.9118 0.869194 83.0193 2.41637 84.5732C3.96354 86.127 6.06196 87 8.25 87H57.75C59.938 87 62.0365 86.127 63.5836 84.5732C65.1308 83.0193 66 80.9118 66 78.7143V37.2857C66 35.0882 65.1308 32.9807 63.5836 31.4268C62.0365 29.873 59.938 29 57.75 29H53.625V20.7143C53.625 17.994 53.0915 15.3004 52.055 12.7873C51.0185 10.2741 49.4993 7.99057 47.5841 6.06707C45.6689 4.14357 43.3952 2.61777 40.8928 1.57678C38.3905 0.535791 35.7085 0 33 0ZM33 7.87143C40.0538 7.87143 45.7875 13.63 45.7875 20.7143V29H20.2125V20.7143C20.2125 13.63 25.9462 7.87143 33 7.87143ZM33.7837 39.3571C37.6612 39.3571 40.755 40.2271 42.9825 41.9257C45.21 43.6657 46.3237 45.9857 46.3237 48.8857C46.3237 50.7086 45.705 52.3243 44.5088 53.8571C43.3125 55.3486 41.745 56.5086 39.8475 57.3786C38.775 58 38.0738 58.6214 37.7025 59.3257C37.3313 60.0714 37.125 60.9829 37.125 62.1429H28.875C28.875 60.0714 29.2875 58.6629 30.0712 57.6686C30.9375 56.6743 32.34 55.5143 34.485 54.1886C35.5575 53.6086 36.4237 52.8629 37.125 51.9514C37.7025 51.0814 38.0325 50.0457 38.0325 48.8857C38.0325 47.6429 37.6613 46.7314 36.9188 46.0271C36.1763 45.2814 35.0625 44.95 33.7837 44.95C32.67 44.95 31.7625 45.24 30.9375 45.82C30.2775 46.4 29.865 47.27 29.865 48.43H21.7388C21.5325 45.5714 22.6875 43.0857 24.9563 41.5943C27.1838 40.1029 30.1125 39.3571 33.7837 39.3571ZM28.875 66.2857H37.125V74.5714H28.875V66.2857Z"
                fill="white"
              />
            </svg>
            <div className="forgot-header d-flex align-items-center justify-content-center flex-column">
              <h3>{t('forgotPasswordTitle')}</h3>
              <p className="text-center">
                {t('forgotPasswordDescription')}
              </p>
            </div>
            <form
              className={`forgotpass-form d-flex align-items-center justify-content-center flex-column ${
                error ? "is-invalid" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <div
                className={`input-group mb-3 d-flex ${
                  error ? "is-invalid" : ""
                }`}
              >
                <span className="input-group-text">
                  <svg
                    width="50"
                    height="41"
                    viewBox="0 0 50 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_2750_1703)">
                      <path
                        d="M41.8 0H8.2C5.89 0 4.021 1.85625 4.021 4.125L4 28.875C4 31.1437 5.89 33 8.2 33H41.8C44.11 33 46 31.1437 46 28.875V4.125C46 1.85625 44.11 0 41.8 0ZM40.96 8.76562L26.113 17.8819C25.441 18.2944 24.559 18.2944 23.887 17.8819L9.04 8.76562C8.82943 8.64953 8.64503 8.49268 8.49797 8.30456C8.3509 8.11645 8.24423 7.90098 8.18441 7.6712C8.12459 7.44142 8.11286 7.20212 8.14993 6.96776C8.187 6.7334 8.27211 6.50887 8.40009 6.30775C8.52808 6.10663 8.69628 5.9331 8.89452 5.79768C9.09277 5.66225 9.31693 5.56774 9.55344 5.51987C9.78995 5.47199 10.0339 5.47174 10.2705 5.51914C10.5071 5.56654 10.7315 5.6606 10.93 5.79562L25 14.4375L39.07 5.79562C39.2685 5.6606 39.4929 5.56654 39.7295 5.51914C39.9661 5.47174 40.21 5.47199 40.4466 5.51987C40.6831 5.56774 40.9072 5.66225 41.1055 5.79768C41.3037 5.9331 41.4719 6.10663 41.5999 6.30775C41.7279 6.50887 41.813 6.7334 41.8501 6.96776C41.8871 7.20212 41.8754 7.44142 41.8156 7.6712C41.7558 7.90098 41.6491 8.11645 41.502 8.30456C41.355 8.49268 41.1706 8.64953 40.96 8.76562Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_2750_1703"
                        x="0"
                        y="0"
                        width="50"
                        height="41"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_2750_1703"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_2750_1703"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </span>
                <div className={`input-container ${error ? "is-invalid" : ""}`}>
                  <input
                    type="email"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder=" "
                  />
                  <label className={`input-label ${error ? "is-invalid" : ""}`}>
                    {t('emailPlaceholder')}
                  </label>
                </div>
                {error && (
                  <div className="invalid-feedback2">{error}</div> // Styled error message
                )}
              </div>

              <button type="submit" className="btn-send-email">
                {isSending ? t('sendingEmail') : t('sendEmail')}
              </button>
              <a
                className="d-flex align-items-center mt-3"
                href="/login"
                onClick={handleBackToLogin}
              >
                <svg
                  width="8"
                  height="13"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.427752 5.66135L6.19185 0.113508L7.57856 1.55428L2.53485 6.40876L7.38933 11.4525L5.94856 12.8392L0.400725 7.07509C0.216873 6.88401 0.116437 6.62774 0.121505 6.36262C0.126574 6.09751 0.236731 5.84526 0.427752 5.66135Z"
                    fill="white"
                  />
                </svg>
                {t('backToLogin')}
              </a>
            </form>

          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotForm;
