import React, { useState } from "react";
import PasswordResetSuccess from "./PasswordResetSuccess"; // Import the new component
import ExpireLink from "./ExpiredLink"; // Import the new component

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false); // State to toggle form
  const [error, setError] = useState(""); // State to handle error

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError(""); // Reset error message when input changes
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(""); // Reset error message when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match."); // Set error message
      return;
    }
    // Handle reset password logic here
    setPasswordChanged(true); // Set passwordChanged to true after form submission
  };

  return (
    <div className="row main-login justify-content-center position-relative">
      <div className="d-flex align-items-center justify-content-center main-login-form">

        <div className="reset-pass-container">
          {passwordChanged ? (
            <PasswordResetSuccess /> 
            // <ExpireLink />   render sa expired link
          ) : (
            <>
              <svg width="79" height="78" viewBox="0 0 89 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_2750_1806)">
                <path d="M62.5449 45.1434H57.2116V39.8101H62.5449V45.1434ZM46.5449 45.1434H51.8783V39.8101H46.5449V45.1434ZM73.2116 45.1434H67.8783V39.8101H73.2116V45.1434Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 32V18.6667C20 16.2153 20.4828 13.788 21.4209 11.5232C22.359 9.2585 23.734 7.2007 25.4673 5.46734C27.2007 3.73398 29.2585 2.359 31.5232 1.42092C33.788 0.482827 36.2153 0 38.6667 0C41.118 0 43.5453 0.482827 45.8101 1.42092C48.0748 2.359 50.1326 3.73398 51.866 5.46734C53.5994 7.2007 54.9743 9.2585 55.9124 11.5232C56.8505 13.788 57.3333 16.2153 57.3333 18.6667V32H65.3333C67.4551 32 69.4899 32.8429 70.9902 34.3431C72.4905 35.8434 73.3333 37.8783 73.3333 40V42.9333C76.3474 43.5454 79.0573 45.1806 81.0037 47.562C82.9501 49.9433 84.0134 52.9244 84.0134 56C84.0134 59.0756 82.9501 62.0567 81.0037 64.438C79.0573 66.8194 76.3474 68.4546 73.3333 69.0667V72C73.3333 74.1217 72.4905 76.1566 70.9902 77.6569C69.4899 79.1572 67.4551 80 65.3333 80H12C9.87827 80 7.84344 79.1572 6.34315 77.6569C4.84285 76.1566 4 74.1217 4 72L4 40C4 37.8783 4.84285 35.8434 6.34315 34.3431C7.84344 32.8429 9.87827 32 12 32H20ZM25.3333 18.6667C25.3333 15.1304 26.7381 11.7391 29.2386 9.23858C31.7391 6.73809 35.1304 5.33333 38.6667 5.33333C42.2029 5.33333 45.5943 6.73809 48.0948 9.23858C50.5952 11.7391 52 15.1304 52 18.6667V32H25.3333V18.6667ZM49.3333 48C47.2116 48 45.1768 48.8429 43.6765 50.3431C42.1762 51.8434 41.3333 53.8783 41.3333 56C41.3333 58.1217 42.1762 60.1566 43.6765 61.6569C45.1768 63.1571 47.2116 64 49.3333 64H70.6667C72.7884 64 74.8232 63.1571 76.3235 61.6569C77.8238 60.1566 78.6667 58.1217 78.6667 56C78.6667 53.8783 77.8238 51.8434 76.3235 50.3431C74.8232 48.8429 72.7884 48 70.6667 48H49.3333Z" fill="white"/>
                </g>
                <defs>
                <filter id="filter0_d_2750_1806" x="0" y="0" width="88.0137" height="88" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2750_1806"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2750_1806" result="shape"/>
                </filter>
                </defs>
                </svg>

              <div className="forgot-header text-center">
                <h3>Reset your password</h3>
                <p>Please kindly set your new password</p>
              </div>
              <form className="reset-pass-form d-flex align-items-center flex-column justify-content-center" onSubmit={handleSubmit}>
                <div className={`input-group mb-3 d-flex ${error ? 'error' : ''}`}>
                    <div className="input-container">
                    <input
                      type="password"
                      className={`form-control ${error ? "is-invalid" : ""}`}
                      onChange={handleNewPasswordChange}
                      required
                      placeholder=" "
                    />
                    <label className="input-label">New Password</label>
                  </div>
                </div>
                <div className={`input-group mb-3 d-flex ${error ? 'error' : ''}`}>
                  <div className="input-container">
                    <input
                      type="password"
                      className={`form-control ${error ? "is-invalid" : ""}`}
                      onChange={handleConfirmPasswordChange}
                      required
                      placeholder=" "
                    />
                    <label className="input-label">Re-enter Password</label>
                  </div>
                  {error && (
                        <div className="invalid-feedback1">{error}</div> // Ensure this is styled
                    )}
                </div>
                <button type="submit" className="btn-reset-password">
                  Reset Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
