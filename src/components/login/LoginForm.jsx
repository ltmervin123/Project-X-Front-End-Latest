import { React, useState } from "react";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import { useLogin } from "../../hook/useLogin";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLogin = await login(email, password);

    if (isLogin) {
      window.location.href = "/maindashboard";
      // navigate("/maindashboard");
    }
  };
  return (
    <div className="row main-login">
      <div className="col-md-6 d-none d-md-block image-overlay"></div>
      <div className="col-md-6 d-flex align-items-center justify-content-center main-login-form">
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
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
                  <b className="form-check-label">Remember me</b>
                  <div className="remeber-box-check d-flex align-items-center">
                    <input type="checkbox" className="form-check-input" />
                    <i className="form-text ">
                      Keep me logged in on this device.
                    </i>
                  </div>
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
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
            <p>Don't have an account?</p>

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
