import React from "react";
import { useNavigate } from "react-router-dom";

const ExpiredLink = () => {
  const navigate = useNavigate();

  const handleReturnToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="expired-link-container d-flex flex-column align-items-center justify-content-center">
      <svg
        width="66"
        height="66"
        viewBox="0 0 86 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M84 38.9002V47.1002C84 64.4965 84 73.1926 77.9935 78.5964C71.9952 84.0002 62.3274 84.0002 43 84.0002C23.6726 84.0002 14.0089 84.0002 8.0024 78.5964C1.9959 73.1926 2 64.4924 2 47.1002C2 29.708 2 21.0078 8.0024 15.604C14.013 10.2002 23.6726 10.2002 43 10.2002H47.1"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.3008 65.55C19.2536 54.9679 37.72 54.275 43.0008 65.55M59.4008 2L71.7008 14.3M71.7008 14.3L84.0008 26.6M71.7008 14.3L59.4008 26.6M71.7008 14.3L84.0008 2M36.8508 36.85C36.8508 39.0248 35.9869 41.1105 34.4491 42.6483C32.9113 44.1861 30.8256 45.05 28.6508 45.05C26.476 45.05 24.3903 44.1861 22.8525 42.6483C21.3147 41.1105 20.4508 39.0248 20.4508 36.85C20.4508 34.6752 21.3147 32.5895 22.8525 31.0517C24.3903 29.5139 26.476 28.65 28.6508 28.65C30.8256 28.65 32.9113 29.5139 34.4491 31.0517C35.9869 32.5895 36.8508 34.6752 36.8508 36.85Z"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <div className="forgot-header d-flex align-items-center justify-content-center flex-column">
        <h3>Link Expired</h3>
        <p className="text-center">
          Oops! It looks like the confirmation link has expired. For security
          reasons, these links are only valid for a limited time.
        </p>
      </div>
      <button
        className="btn-return-to-login  mt-3"
        onClick={handleReturnToLogin}
      >
        Return to Log in
      </button>
    </div>
  );
};

export default ExpiredLink;
