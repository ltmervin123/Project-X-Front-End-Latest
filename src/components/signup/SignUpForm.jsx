import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import RegistrationSuccessPopUp from "./RegistrationSuccessPopUp";
import { useSignup } from "../../hook/useSignup";

function SignUpForm() {
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isBoxChecked, setIsBoxChecked] = useState(false);
  const { signup, isLoading, error } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSignin = await signup(name, email, password);

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
        <img src={logo} alt="Logo" width="80" height="80" />
        <div>
          <div className="logoname">
            HR-<div className="logocolor">HATCH</div>
          </div>
          <small className="sublogoname">THE TECH BEHIND THE TALENT.</small>
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
        <p className="text-center already-have-acc">
          Already have an account? <br />
          <small>Log in to access your dashboard.</small>
        </p>
        <Button
          href="/login"
          className="btn-login1 d-flex align-items-center justify-content-center"
        >
          Login
        </Button>
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
                <FaUser />
              </span>

              <div>
                <input
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  placeholder=""
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
                <label className="input-label">Name</label>
              </div>
            </div>

            <div className="input-group mb-3">
              <span className="required-asterisk">*</span>
              <span className="input-group-text">
                <FaEnvelope />
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
                <FaLock />
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
