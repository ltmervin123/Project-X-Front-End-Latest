import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/snappchecklanding/snappcheck-logo.svg";
import hrLogo from "../../assets/loginbg/hr-hatch-logo.svg";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hook/useLogin";
import { useSnappcheckTranslation } from "./hooks/loginFormTranslation";

const LoginForm = () => {
  const { t } = useSnappcheckTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  // Section visibility states for staged appearance
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsHeaderVisible(true), 450),
      setTimeout(() => setIsDetailsVisible(true), 650),
      setTimeout(() => setIsCardVisible(true), 850),
    ];
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLogin = await login(email, password, "AI_REFERENCE");
    if (isLogin) {
      if (
        isLogin?.service === "AI_REFERENCE" &&
        isLogin?.accountType === "company"
      ) {
        navigate("/ai-reference-dashboard");
      } else if (
        isLogin?.service === "AI_REFERENCE" &&
        isLogin?.accountType === "admin"
      ) {
        navigate("/analytics-dashboard");
      } else if (isLogin?.service === "MOCK_AI") {
        navigate("/maindashboard");
      }
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-row row w-100 m-0">
        {/* Left Side - Login Form */}
        <div className={`login-form-left col-md-6 d-flex flex-column justify-content-center pe-5 fade-in${isHeaderVisible ? " visible" : ""}`}>
          <div className="login-form-header position-relative">
            <h2 className="login-form-title mb-0">{t("LOG_IN")}</h2>
            <div className="login-form-welcome">{t("WELCOME_BACK")}</div>
            <a href="/">
            <img
              src={logo}
              alt="SnappCheck Logo"
              width="150"
              height="150"
              className="login-form-logo"
            />
            </a>
           
          </div>
          <div className={`login-form-details w-100 fade-in${isDetailsVisible ? " visible" : ""}`}>
            <div className="login-form-account-title">
              {t("ACCOUNT_DETAILS")}
            </div>
            <div className="login-form-account-desc">
              {t("ACCOUNT_DETAILS_DESC")}
            </div>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className={`login-form-input-group d-flex align-items-center mb-3 ${
                error === t("INCORRECT_EMAIL") ||
                error === t("ACCOUNT_NOT_ACTIVATED") ||
                error === t("TOO_MANY_ATTEMPTS")
                  ? "is-invalid"
                  : ""
              }`}>
                <span className="login-form-input-icon">
                  {/* Mail SVG */}
                  <svg
                    width="36"
                    height="28"
                    viewBox="0 0 50 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_7067_3367)">
                      <path
                        d="M41.8 0H8.2C5.89 0 4.021 1.85625 4.021 4.125L4 28.875C4 31.1437 5.89 33 8.2 33H41.8C44.11 33 46 31.1437 46 28.875V4.125C46 1.85625 44.11 0 41.8 0ZM40.96 8.76562L26.113 17.8819C25.441 18.2944 24.559 18.2944 23.887 17.8819L9.04 8.76562C8.82943 8.64953 8.64503 8.49268 8.49797 8.30456C8.3509 8.11645 8.24423 7.90098 8.18441 7.6712C8.12459 7.44143 8.11286 7.20212 8.14993 6.96776C8.187 6.7334 8.27211 6.50887 8.40009 6.30775C8.52808 6.10663 8.69628 5.9331 8.89452 5.79768C9.09277 5.66225 9.31693 5.56774 9.55344 5.51987C9.78995 5.47199 10.0339 5.47174 10.2705 5.51914C10.5071 5.56654 10.7315 5.6606 10.93 5.79562L25 14.4375L39.07 5.79562C39.2685 5.6606 39.4929 5.56654 39.7295 5.51914C39.9661 5.47174 40.21 5.47199 40.4466 5.51987C40.6831 5.56774 40.9072 5.66225 41.1055 5.79768C41.3037 5.9331 41.4719 6.10663 41.5999 6.30775C41.7279 6.50887 41.813 6.7334 41.8501 6.96776C41.8871 7.20212 41.8754 7.44143 41.8156 7.6712C41.7558 7.90098 41.6491 8.11645 41.502 8.30456C41.355 8.49268 41.1706 8.64953 40.96 8.76562Z"
                        fill="#686868"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_7067_3367"
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
                          result="effect1_dropShadow_7067_3367"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_7067_3367"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </span>
                <input
                  type="email"
                  className={`form-control login-form-input ${
                    error === t("INCORRECT_EMAIL") ||
                    error === t("ACCOUNT_NOT_ACTIVATED") ||
                    error === t("TOO_MANY_ATTEMPTS")
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder={t("EMAIL") + "*"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className={`login-form-input-group d-flex align-items-center mb-2 position-relative ${
                error === t("INCORRECT_PASSWORD") ||
                error === t("TOO_MANY_ATTEMPTS")
                  ? "is-invalid"
                  : ""
              }`}>
                <span className="login-form-input-icon">
                  {/* Lock SVG */}
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 50 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_7067_3364)">
                      <path
                        d="M34.7951 31.6164H31.9955V28.7422H34.7951V31.6164ZM26.3965 31.6164H29.196V28.7422H26.3965V31.6164ZM40.3941 31.6164H37.5946V28.7422H40.3941V31.6164Z"
                        fill="#686868"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.3986 17.2452V10.0597C12.3986 8.73866 12.652 7.43054 13.1445 6.21004C13.6369 4.98953 14.3586 3.88056 15.2685 2.94643C16.1783 2.01229 17.2585 1.2713 18.4473 0.765751C19.6361 0.260202 20.9102 0 22.197 0C23.4837 0 24.7578 0.260202 25.9466 0.765751C27.1354 1.2713 28.2156 2.01229 29.1254 2.94643C30.0353 3.88056 30.7571 4.98953 31.2495 6.21004C31.7419 7.43054 31.9953 8.73866 31.9953 10.0597V17.2452H36.1946C37.3083 17.2452 38.3765 17.6995 39.164 18.508C39.9515 19.3165 40.3939 20.4131 40.3939 21.5566V23.1374C41.9761 23.4672 43.3985 24.3485 44.4202 25.6318C45.4419 26.9152 46 28.5217 46 30.1792C46 31.8367 45.4419 33.4432 44.4202 34.7265C43.3985 36.0099 41.9761 36.8911 40.3939 37.221V38.8018C40.3939 39.9452 39.9515 41.0418 39.164 41.8504C38.3765 42.6589 37.3083 43.1131 36.1946 43.1131H8.1993C7.08558 43.1131 6.01747 42.6589 5.22995 41.8504C4.44242 41.0418 4 39.9452 4 38.8018V21.5566C4 20.4131 4.44242 19.3165 5.22995 18.508C6.01747 17.6995 7.08558 17.2452 8.1993 17.2452H12.3986ZM15.1981 10.0597C15.1981 8.15401 15.9355 6.32634 17.248 4.9788C18.5606 3.63125 20.3408 2.87421 22.197 2.87421C24.0532 2.87421 25.8333 3.63125 27.1459 4.9788C28.4584 6.32634 29.1958 8.15401 29.1958 10.0597V17.2452H15.1981V10.0597ZM27.796 25.8679C26.6823 25.8679 25.6142 26.3221 24.8267 27.1306C24.0392 27.9391 23.5967 29.0357 23.5967 30.1792C23.5967 31.3226 24.0392 32.4192 24.8267 33.2277C25.6142 34.0363 26.6823 34.4905 27.796 34.4905H38.9942C40.1079 34.4905 41.176 34.0363 41.9635 33.2277C42.751 32.4192 43.1935 31.3226 43.1935 30.1792C43.1935 29.0357 42.751 27.9391 41.9635 27.1306C41.176 26.3221 40.1079 25.8679 38.9942 25.8679H27.796Z"
                        fill="#686868"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_7067_3364"
                        x="0"
                        y="0"
                        width="50"
                        height="51.1133"
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
                          result="effect1_dropShadow_7067_3364"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_7067_3364"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control login-form-input ${
                    error === t("INCORRECT_PASSWORD") ||
                    error === t("TOO_MANY_ATTEMPTS")
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder={t("PASSWORD") + "*"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="login-form-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", zIndex: 10 }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {(error === t("INCORRECT_EMAIL") ||
              error === t("ACCOUNT_NOT_ACTIVATED") ||
                error === t("INCORRECT_PASSWORD") ||
                error === t("TOO_MANY_ATTEMPTS")) && (
                <div className="invalid-feedback">{error}</div>
              )}
              {/* Remember Me & Forgot Password */}
              <div className="login-form-remember-forgot d-flex align-items-center justify-content-between mb-3">
                <div className="forkm-check d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input m-0"
                    id="rememberMe"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="form-check-label login-form-remember-label"
                  >
                    {t("REMEMBER_ME")}
                  </label>
                </div>
                <div className="login-form-forgot">
                  {t("FORGOT_PASSWORD")}{" "}
                  <a href="/forgotpassword" className="login-form-forgot-link">
                    {t("CLICK_TO_RESET")}
                  </a>
                </div>
              </div>
              {/* Buttons */}
              <div className="login-form-buttons w-100 d-flex justify-content-center gap-5">
                <div>
                  <button type="submit" className="login-form-login-btn">
                    {t("LOGIN_BUTTON")}
                  </button>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <button
                    type="button"
                    className="login-form-signup-btn"
                    onClick={() => navigate("/company-registration")}
                  >
                    {t("SIGN_UP")}
                  </button>
                  <p className="login-form-join m-0">{t("NO_ACCOUNT")}</p>
                  <p className="login-form-join-link m-0">{t("JOIN_TODAY")}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Right Side - Card */}
        <div className={`login-form-right col-md-6 d-flex align-items-center justify-content-center position-relative fade-in${isCardVisible ? " visible" : ""}`}>
          <div className="login-card-parent">
            <div className="login-card">
              <div className="login-form-card-title">
                {t("PROFESSIONAL_CORPORATE")}
              </div>
              <ul className="login-form-card-list">
                <li>
                  {t("CHOOSE_PLAN")}
                </li>
                <li>
                  {t("SCALE_TOOLS")}
                </li>
              </ul>
              <div className="login-form-card-developed d-flex align-items-end">
                <span>{t("DEVELOPED_BY")}</span>
                <img
                  src={hrLogo}
                  alt="hr logo"
                  className="login-form-hr-logo"
                />
              </div>
            </div>
            <div className="login-button-controller d-flex gap-2">
              <button type="button" className="login-form-arrow-btn">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.11475 19.9997L13.7227 8.38902L15.6107 10.2743L7.21875 18.6664L37.3334 18.6663L37.3334 21.333L7.21875 21.333L15.6107 29.7224L13.7227 31.6104L2.11475 19.9997Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button type="button" className="login-form-arrow-btn">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M37.8853 20.0003L26.2773 31.611L24.3893 29.7257L32.7813 21.3336L2.66659 21.3336L2.66659 18.667L32.7813 18.667L24.3893 10.2776L26.2773 8.38965L37.8853 20.0003Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
