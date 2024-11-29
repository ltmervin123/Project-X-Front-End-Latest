import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "../../hook/useLogin";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // Track combined error state
  const [loginSuccess, setLoginSuccess] = useState(null); // Track success state
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(""); // Clear previous errors
    setPasswordError(""); // Clear previous errors
    setLoginError(""); // Reset combined error state
    setLoginSuccess(null); // Reset success state

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Incorrect email address");
      isValid = false; // Mark as invalid
    }

    // Validate password
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false; // Mark as invalid
    }

    // If both fields are invalid
    if (!isValid) {
      setLoginError("Incorrect credentials provided.");
      return; // Prevent submission if there are errors
    }

    const isLogin = await login(email, password);


    // Log the error
  console.log("Login Error:", error); // Log the error here
    
    if (isLogin) {
      setLoginSuccess("Successfully logged in!");
      navigate("/maindashboard");
    } else {
      // Assuming that the login function can return specific errors
      if (error === "Incorrect Password") {
        setPasswordError("Incorrect Password");
      } else {
        setLoginError("Incorrect credentials provided."); // Set error if login fails
      }
    }

  };

  return (
    <div className="row main-login justify-content-end">
      <div className="col-md-6 d-flex align-items-center justify-content-center"></div>
      <div className="col-md-6 d-flex align-items-center justify-content-center main-login-form">
        <div className="login-container">
          <div className="login-header text-center">
            <h2>LOG IN</h2>
            <p>Welcome back, let’s dive in!</p>
          </div>
          <div className="account-details">
            <h3>Account Details</h3>
            <p>Please enter your credentials to access your account.</p>
            {/* {error && <div className="error-message">{error}</div> //eror butangi ni s part ra nga "Incorrect credentials provided."
            }   */}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <div>
                <input
                  type="email"
                  className={`form-control ${emailError || loginError ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div> //error email not found na error diri na part
                )}
                </div>
               
              </div>
              <div className="input-group mb-3 position-relative">
                  <span className="input-group-text">
                      <FaLock />
                  </span>
                  <div>
                  <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${passwordError || loginError ? "is-invalid" : ""}`} 
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
                  <span 
                      className="position-absolute end-0 top-50 translate-middle-y me-3 toggle-password" 
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ 
                          cursor: 'pointer', 
                          zIndex: 10,
  
                      }}
                  >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {error && (
                      <div className="invalid-feedback">{passwordError}</div>
                  )}
                  </div>

                 
              </div>
              <div className="forgot d-flex">
                Forgot your password?
                <a href="/forgot" className="forgot-password">
                  {" "}
                  Click here to reset
                </a>
              </div>
              <div className="remember-me form-check">
                <div className="remember-box">
                  <b className=" form-check-label">Remember me</b>
                  <div className="remeber-box-check d-flex align-items-center">
                    <input type="checkbox" className="form-check-input" />
                    <i className="form-text ">
                      Keep me logged in on this device.
                    </i>
                  </div>
                </div>
              </div>
              {loginError && (
                <div className="invalid-feedback">{loginError}</div>
              )} {/* Show combined error message */}
              {loginSuccess && (
                <div className="alert alert-success">{loginSuccess}</div>
              )} {/* Show success message */}
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                Login
              </button>
            </form>
          </div>

          <div className="signup-container text-center mt-3">
            <p>Or sign up using</p>
            <div className="social-icons">
              <FaGoogle className="social-icon" />
              <FaFacebook className="social-icon" />
            </div>
            <button
              className="guest-button"
              onClick={() => (window.location.href = "/maindashboard")}
            >
              Continue as Guest
            </button>
            <div>
              <p>Don't have an account?</p>
            </div>
            <button
              className="signup-button"
              onClick={() => (window.location.href = "/signup")}
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