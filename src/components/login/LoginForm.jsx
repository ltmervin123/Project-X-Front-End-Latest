import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../../assets/google-icon.png";
import fb from "../../assets/fb-icon.png";
import { useLogin } from "../../hook/useLogin";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
const LoginForm = () => {
  const API = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [service, setService] = useState(""); // State to track selected service

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLogin = await login(email, password);
    if (isLogin) {
      if (service === "Ai Reference Checker") {
        navigate("/AiReferenceMaindashboard");
      } else {
        navigate("/maindashboard");
      }
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${API}/api/user/auth/google`;
  };

  // const handleFacebookLogin = async () => {
  //   window.location.href = `${API}/api/user/auth/facebook`;
  // };

  return (
    <div className="row main-login justify-content-center position-relative">
      <div className="d-flex align-items-center justify-content-center main-login-form">
        <div className="login-container">
          <div className="login-header text-center">
            <h2>LOG IN</h2>
            <p>Welcome back, let’s dive in!</p>
          </div>
          <div className="account-details">
            <h3>Account Details</h3>
            <p>Please enter your credentials to access your account.</p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <svg
                    width="50"
                    height="41"
                    viewBox="0 0 50 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_1739_1497)">
                      <path
                        d="M41.8 0H8.2C5.89 0 4.021 1.85625 4.021 4.125L4 28.875C4 31.1437 5.89 33 8.2 33H41.8C44.11 33 46 31.1437 46 28.875V4.125C46 1.85625 44.11 0 41.8 0ZM40.96 8.76562L26.113 17.8819C25.441 18.2944 24.559 18.2944 23.887 17.8819L9.04 8.76562C8.82943 8.64953 8.64503 8.49268 8.49797 8.30456C8.3509 8.11645 8.24423 7.90098 8.18441 7.6712C8.12459 7.44143 8.11286 7.20212 8.14993 6.96776C8.187 6.7334 8.27211 6.50887 8.40009 6.30775C8.52808 6.10663 8.69628 5.9331 8.89452 5.79768C9.09277 5.66225 9.31693 5.56774 9.55344 5.51987C9.78995 5.47199 10.0339 5.47174 10.2705 5.51914C10.5071 5.56654 10.7315 5.6606 10.93 5.79562L25 14.4375L39.07 5.79562C39.2685 5.6606 39.4929 5.56654 39.7295 5.51914C39.9661 5.47174 40.21 5.47199 40.4466 5.51987C40.6831 5.56774 40.9072 5.66225 41.1055 5.79768C41.3037 5.9331 41.4719 6.10663 41.5999 6.30775C41.7279 6.50887 41.813 6.7334 41.8501 6.96776C41.8871 7.20212 41.8754 7.44143 41.8156 7.6712C41.7558 7.90098 41.6491 8.11645 41.502 8.30456C41.355 8.49268 41.1706 8.64953 40.96 8.76562Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_1739_1497"
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
                          result="effect1_dropShadow_1739_1497"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1739_1497"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </span>
                <div className="input-container">
                  <input
                    type="email"
                    className={`form-control ${
                      error === "Incorrect email address" ||
                      error ===
                        "This company account is not activated. Please check the registered email for activation."
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder=" "
                  />
                  <label
                    className={`input-label ${
                      error === "Incorrect email address" ||
                      error ===
                        "This company account is not activated. Please check the registered email for activation."
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    Email
                  </label>
                  {(error === "Incorrect email address" ||
                    error ===
                      "This company account is not activated. Please check the registered email for activation.") && (
                    <div className="invalid-feedback">{error}</div>
                  )}
                </div>
              </div>
              <div className="input-group mb-3 position-relative">
                <span className="input-group-text">
                  <svg
                    width="49"
                    height="49"
                    viewBox="0 0 59 59"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_1739_1494)">
                      <path
                        d="M41.0632 36.9146H37.7223V33.5737H41.0632V36.9146ZM31.0405 36.9146H34.3814V33.5737H31.0405V36.9146ZM47.7449 36.9146H44.404V33.5737H47.7449V36.9146Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.3361 20.2103V11.8581C14.3361 10.3225 14.6385 8.80203 15.2262 7.38336C15.8138 5.96469 16.6751 4.67566 17.7609 3.58986C18.8467 2.50406 20.1357 1.64275 21.5544 1.05512C22.9731 0.467489 24.4936 0.165039 26.0292 0.165039C27.5647 0.165039 29.0852 0.467489 30.5039 1.05512C31.9226 1.64275 33.2116 2.50406 34.2974 3.58986C35.3832 4.67566 36.2445 5.96469 36.8321 7.38336C37.4198 8.80203 37.7222 10.3225 37.7222 11.8581V20.2103H42.7335C44.0626 20.2103 45.3373 20.7383 46.2771 21.6781C47.2169 22.6179 47.7448 23.8925 47.7448 25.2216V27.0591C49.6329 27.4425 51.3304 28.4668 52.5496 29.9585C53.7689 31.4502 54.435 33.3176 54.435 35.2442C54.435 37.1708 53.7689 39.0382 52.5496 40.5299C51.3304 42.0216 49.6329 43.046 47.7448 43.4294V45.2668C47.7448 46.5959 47.2169 47.8706 46.2771 48.8104C45.3373 49.7502 44.0626 50.2781 42.7335 50.2781H9.32479C7.99571 50.2781 6.72106 49.7502 5.78126 48.8104C4.84145 47.8706 4.31348 46.5959 4.31348 45.2668V25.2216C4.31348 23.8925 4.84145 22.6179 5.78126 21.6781C6.72106 20.7383 7.99571 20.2103 9.32479 20.2103H14.3361ZM17.677 11.8581C17.677 9.64296 18.5569 7.51855 20.1233 5.95221C21.6896 4.38587 23.814 3.50591 26.0292 3.50591C28.2443 3.50591 30.3687 4.38587 31.935 5.95221C33.5014 7.51855 34.3813 9.64296 34.3813 11.8581V20.2103H17.677V11.8581ZM32.7109 30.2329C31.3818 30.2329 30.1072 30.7609 29.1674 31.7007C28.2276 32.6405 27.6996 33.9151 27.6996 35.2442C27.6996 36.5733 28.2276 37.8479 29.1674 38.7877C30.1072 39.7276 31.3818 40.2555 32.7109 40.2555H46.0744C47.4035 40.2555 48.6781 39.7276 49.6179 38.7877C50.5577 37.8479 51.0857 36.5733 51.0857 35.2442C51.0857 33.9151 50.5577 32.6405 49.6179 31.7007C48.6781 30.7609 47.4035 30.2329 46.0744 30.2329H32.7109Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_1739_1494"
                        x="0.313477"
                        y="0.165039"
                        width="58.1216"
                        height="58.1133"
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
                          result="effect1_dropShadow_1739_1494"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1739_1494"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </span>
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      error === "Incorrect password" ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder=" "
                  />
                  <label
                    className={`input-label ${
                      error === "Incorrect password" ? "is-invalid" : ""
                    }`}
                  >
                    Password
                  </label>
                  <span
                    className={`position-absolute end-0 top-50 translate-middle-y me-3 toggle-password ${
                      error === "Incorrect password" ? "is-invalid" : ""
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      cursor: "pointer",
                      zIndex: 10,
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>

                  {error === "Incorrect password" && (
                    <div className="invalid-feedback">{error}</div>
                  )}
                </div>
              </div>
              <div className="forgot-remember-container d-flex">
                <div className="remember-me form-check">
                  <div className="remember-box-check">
                    <input type="checkbox" className="form-check-input" />
                    <b className=" form-check-label">Remember me</b>
                  </div>
                </div>
                <div className="forgot d-flex">
                  Forgot your password?
                  <a href="/forgotpassword" className="forgot-password">
                    {" "}
                    Click here to reset
                  </a>
                </div>
              </div>
              <div className="mb-3 choose-services-container d-flex justify-content-center">
                <select
                  className="form-control"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                >
                  <option value="">Choose Your Service</option>
                  <option value="Mock AI">Mock AI</option>
                  <option value="Ai Reference Checker">
                    {" "}
                    Ai Reference Checker
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="login-button"
                disabled={!service || isLoading} // Disable if no service selected
              >
                {isLoading ? <LoadingScreen /> : "Log in"}
              </button>
            </form>
          </div>

          <div className="signup-container text-center">
            <p>Or sign up using</p>
            <div className="social-icons">
              <button
                className="social-icon-btn"
                onClick={handleGoogleLogin}
                disabled={service === "Ai Reference Checker"} // Disable when service is "Ai Reference Checker"
              >
                <img src={google} alt="Google" className="social-icon" />
              </button>
              <button
                className="social-icon-btn"
                disabled={service === "Ai Reference Checker"} // Disable when service is "Ai Reference Checker"
              >
                <img src={fb} alt="Facebook" className="social-icon" />
              </button>
            </div>

            <button
              className="guest-button"
              // onClick={() => (window.location.href = "/")} // not implemented yet
            >
              Continue as Guest
            </button>
            <div className="d-flex flex-column dont-have-acc-container">
              <p>Don't have an account?</p>
              <i>Join Us Today</i>
            </div>
            <button
              className="signup-button"
              onClick={() => {
                if (service === "Ai Reference Checker") {
                  window.location.href = "/CompanyRegistration";
                } else {
                  window.location.href = "/signup";
                }
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
