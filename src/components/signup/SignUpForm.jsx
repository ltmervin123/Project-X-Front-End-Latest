import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import RegistrationSuccessPopUp from "./RegistrationSuccessPopUp";
import { useSignup } from "../../hook/useSignup";

function SignUpForm() {
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBoxChecked, setIsBoxChecked] = useState(false);
  const { signup, isLoading, error } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSignin = await signup(name, email, password); // Use name state

    if (isSignin) {
      setShowSuccessPopUp(true);
    }
  };

  const handleClosePopUp = () => {
    setShowSuccessPopUp(false);
  };

  const handleCheckboxChange = (e) => {
    setIsBoxChecked(e.target.checked);
  };

  return (
    <div className="signup-info-container">
      <div className="info-create-acc-container">


        <div>
        <img
              src={logo}
              alt="Logo"
              width="296"
              height="44"
            />  
        </div>
        <p>
          Our company offers comprehensive recruitment and talent support for
          both job seekers and employers. It includes an English mock interview
          platform which helps candidates build confidence and improve their
          interviewing skills. Our resume builder tailors resumes to specific
          job requirements. For employers, our job posting services attract top
          flexible candidates and full-cycle Recruitment Process Outsourcing
          (RPO) solutions. We are dedicated to streamlining the hiring process,
          ensuring the right talent connects with the right roles.
        </p>
        <div className="already-have-slash-login-container d-flex align-items-center justify-content-center flex-column position-relative">
        <svg width="36" height="50" viewBox="0 0 38 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.833984 1.12085V0.62085H0.333984V1.12085H0.833984ZM0.833984 50.2957H0.333984V50.7957H0.833984V50.2957ZM19.7718 50.6492C19.9671 50.4539 19.9671 50.1374 19.7718 49.9421L16.5898 46.7601C16.3946 46.5649 16.078 46.5649 15.8827 46.7601C15.6875 46.9554 15.6875 47.272 15.8827 47.4672L18.7111 50.2957L15.8827 53.1241C15.6875 53.3193 15.6875 53.6359 15.8827 53.8312C16.078 54.0265 16.3946 54.0265 16.5898 53.8312L19.7718 50.6492ZM38 0.62085H0.833984V1.62085H38V0.62085ZM0.333984 1.12085V50.2957H1.33398V1.12085H0.333984ZM0.833984 50.7957H19.4183V49.7957H0.833984V50.7957Z" fill="black"/>
        </svg>

          <p className="text-center already-have-acc d-flex flex-column align-items-center">
            Already have an account? 
            <small>Log in to access your dashboard.</small>
          </p>
          <Button
            href="/login"
            className="btn-login1 d-flex align-items-center justify-content-center"
          >
            Login
          </Button>
        </div>

      </div>
      <div className="singup-container">
        <div className="singup-header text-center">
          <h2>Create An Account</h2>
        </div>
        <div className="account-details">
          <h3>Personal Information</h3>
          <p>
            Please provide your details to create your account. All fields
            marked with an asterisk (*) are required.
          </p>
          <form className="singup-form" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="required-asterisk">*</span>
              <span className="input-group-text">
              <svg width="59" height="68" viewBox="0 0 59 68" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_1739_1418)">
              <path d="M37.5377 36.3323C37.1708 36.2123 34.8515 35.1669 36.3008 30.7615H36.28C40.0577 26.8708 42.9446 20.61 42.9446 14.4462C42.9446 4.96846 36.6423 0 29.3177 0C21.9885 0 15.7208 4.96615 15.7208 14.4462C15.7208 20.6354 18.5915 26.9215 22.3923 30.8031C23.8738 34.6892 21.2246 36.1315 20.6708 36.3346C13 39.1085 4 44.1646 4 49.1562V51.0277C4 57.8285 17.1862 59.3746 29.3892 59.3746C41.6108 59.3746 54.6308 57.8285 54.6308 51.0277V49.1562C54.6308 44.0146 45.5869 38.9977 37.5377 36.3323Z" fill="white"/>
              </g>
              <defs>
              <filter id="filter0_d_1739_1418" x="0" y="0" width="58.6309" height="67.3745" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1739_1418"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1739_1418" result="shape"/>
              </filter>
              </defs>
              </svg>

              </span>

              <div>
                <input
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  placeholder=""
                  required
                  onChange={(e) => {
                    setName(e.target.value); // Use setName
                  }}
                  value={name} // Use name state
                />
                <label className="input-label">Name</label>
              </div>
            </div>

            <div className="input-group mb-3">
              <span className="required-asterisk">*</span>
              <span className="input-group-text">
              <svg width="58" height="48" viewBox="0 0 58 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_1739_1419)">
              <path d="M49 0H9C6.25 0 4.025 2.25 4.025 5L4 35C4 37.75 6.25 40 9 40H49C51.75 40 54 37.75 54 35V5C54 2.25 51.75 0 49 0ZM48 10.625L30.325 21.675C29.525 22.175 28.475 22.175 27.675 21.675L10 10.625C9.74932 10.4843 9.5298 10.2942 9.35472 10.0661C9.17965 9.83812 9.05266 9.57695 8.98144 9.29843C8.91022 9.01991 8.89626 8.72984 8.94039 8.44577C8.98452 8.1617 9.08584 7.88953 9.2382 7.64575C9.39057 7.40197 9.59081 7.19164 9.82681 7.02749C10.0628 6.86334 10.3297 6.74878 10.6112 6.69075C10.8928 6.63271 11.1832 6.63242 11.4649 6.68987C11.7466 6.74732 12.0137 6.86133 12.25 7.025L29 17.5L45.75 7.025C45.9863 6.86133 46.2534 6.74732 46.5351 6.68987C46.8168 6.63242 47.1072 6.63271 47.3888 6.69075C47.6703 6.74878 47.9372 6.86334 48.1732 7.02749C48.4092 7.19164 48.6094 7.40197 48.7618 7.64575C48.9142 7.88953 49.0155 8.1617 49.0596 8.44577C49.1037 8.72984 49.0898 9.01991 49.0186 9.29843C48.9473 9.57695 48.8204 9.83812 48.6453 10.0661C48.4702 10.2942 48.2507 10.4843 48 10.625Z" fill="white"/>
              </g>
              <defs>
              <filter id="filter0_d_1739_1419" x="0" y="0" width="58" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1739_1419"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1739_1419" result="shape"/>
              </filter>
              </defs>
              </svg>

              </span>
              <div>
                <input
                  type="email"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  placeholder=""
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <label className="input-label">Email</label>
              </div>
            </div>

            <div className="input-group mb-3 position-relative">
              <span className="required-asterisk">*</span>
              <span className="input-group-text">
              <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_1739_1420)">
              <path d="M48 44H44V40H48V44ZM36 44H40V40H36V44ZM56 44H52V40H56V44Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 24V14C16 12.1615 16.3621 10.341 17.0657 8.64243C17.7693 6.94387 18.8005 5.40053 20.1005 4.10051C21.4005 2.80049 22.9439 1.76925 24.6424 1.06569C26.341 0.362121 28.1615 0 30 0C31.8385 0 33.659 0.362121 35.3576 1.06569C37.0561 1.76925 38.5995 2.80049 39.8995 4.10051C41.1995 5.40053 42.2307 6.94387 42.9343 8.64243C43.6379 10.341 44 12.1615 44 14V24H50C51.5913 24 53.1174 24.6321 54.2426 25.7574C55.3679 26.8826 56 28.4087 56 30V32.2C58.2606 32.659 60.2929 33.8855 61.7528 35.6715C63.2126 37.4575 64.01 39.6933 64.01 42C64.01 44.3067 63.2126 46.5425 61.7528 48.3285C60.2929 50.1145 58.2606 51.341 56 51.8V54C56 55.5913 55.3679 57.1174 54.2426 58.2426C53.1174 59.3679 51.5913 60 50 60H10C8.4087 60 6.88258 59.3679 5.75736 58.2426C4.63214 57.1174 4 55.5913 4 54V30C4 28.4087 4.63214 26.8826 5.75736 25.7574C6.88258 24.6321 8.4087 24 10 24H16ZM20 14C20 11.3478 21.0536 8.8043 22.9289 6.92893C24.8043 5.05357 27.3478 4 30 4C32.6522 4 35.1957 5.05357 37.0711 6.92893C38.9464 8.8043 40 11.3478 40 14V24H20V14ZM38 36C36.4087 36 34.8826 36.6321 33.7574 37.7574C32.6321 38.8826 32 40.4087 32 42C32 43.5913 32.6321 45.1174 33.7574 46.2426C34.8826 47.3679 36.4087 48 38 48H54C55.5913 48 57.1174 47.3679 58.2426 46.2426C59.3679 45.1174 60 43.5913 60 42C60 40.4087 59.3679 38.8826 58.2426 37.7574C57.1174 36.6321 55.5913 36 54 36H38Z" fill="white"/>
              </g>
              <defs>
              <filter id="filter0_d_1739_1420" x="0" y="0" width="68.0098" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1739_1420"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1739_1420" result="shape"/>
              </filter>
              </defs>
              </svg>

              </span>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  placeholder=""
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <label className="input-label">Password</label>

                <span
                  className="position-absolute end-0 top-50 translate-middle-y me-3 toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {error && (
                <div className="invalid-feedback-sign-up ">{error}</div>
              )}
            </div>
            <div className="note d-flex">
              Choose a strong password (at least 8 characters, including letters
              and numbers)
            </div>
            <div className="privacy form-check">
              <div className="checkbox-container d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={isBoxChecked}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="privacy-content">
                <p>Privacy Agreement</p>
                <p>
                  By registering, you agree to our Privacy Policy and Terms of
                  Service. We value your privacy. Your information will not be
                  shared with third parties.
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="singup-button"
              disabled={!isBoxChecked || isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>

      {showSuccessPopUp && (
        <RegistrationSuccessPopUp onClose={handleClosePopUp} />
      )}
    </div>
  );
}

export default SignUpForm;
