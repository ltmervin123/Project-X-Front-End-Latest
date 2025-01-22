import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckEmailForm = ({ email }) => {
  const [timeLeft, setTimeLeft] = useState(30); // Timer state
  const API = process.env.REACT_APP_API_URL;
  const URL = `${API}/api/user/auth/forgot-password`;
  const useremail = email;
  
  const navigate = useNavigate(); // Initialize navigate hook

  //Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [timeLeft]);

  const sendEmail = async () => {
    try {  
      const requestBody = { email };
      const response = await axios.post(URL, requestBody, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendLink = async () => {
    setTimeLeft(30);
    await sendEmail();
  };
  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="check-email-container">
      <svg
        width="66"
        height="77"
        viewBox="0 0 130 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_0_1)">
          <path
            d="M115.667 44.6667V11.1667C115.667 5.025 110.642 0 104.5 0H15.1667C9.025 0 4.05583 5.025 4.05583 11.1667L4 78.1667C4 84.3083 9.025 89.3333 15.1667 89.3333H76.5833V61.4167C76.5833 52.1483 84.065 44.6667 93.3333 44.6667H115.667ZM62.7925 48.4075C61.0058 49.5242 58.6608 49.5242 56.8742 48.4075L17.4 23.7292C16.8401 23.4149 16.3499 22.9903 15.9589 22.481C15.5679 21.9718 15.2843 21.3885 15.1252 20.7665C14.9662 20.1445 14.935 19.4966 15.0335 18.8622C15.1321 18.2278 15.3584 17.62 15.6987 17.0755C16.0389 16.5311 16.4861 16.0613 17.0132 15.6947C17.5403 15.3281 18.1363 15.0723 18.7651 14.9427C19.3939 14.8131 20.0425 14.8124 20.6716 14.9407C21.3007 15.069 21.8972 15.3236 22.425 15.6892L59.8333 39.0833L97.2417 15.6892C97.7695 15.3236 98.366 15.069 98.9951 14.9407C99.6242 14.8124 100.273 14.8131 100.902 14.9427C101.53 15.0723 102.126 15.3281 102.653 15.6947C103.181 16.0613 103.628 16.5311 103.968 17.0755C104.308 17.62 104.535 18.2278 104.633 18.8622C104.732 19.4966 104.701 20.1445 104.541 20.7665C104.382 21.3885 104.099 21.9718 103.708 22.481C103.317 22.9903 102.827 23.4149 102.267 23.7292L62.7925 48.4075Z"
            fill="white"
          />
        </g>
        <path
          d="M124.083 69.75C121.013 69.75 118.5 72.2625 118.5 75.3333V92.0833C118.5 98.225 113.475 103.25 107.333 103.25C101.192 103.25 96.1667 98.225 96.1667 92.0833V66.9583C96.1667 65.395 97.395 64.1667 98.9583 64.1667C100.522 64.1667 101.75 65.395 101.75 66.9583V86.5C101.75 89.5708 104.263 92.0833 107.333 92.0833C110.404 92.0833 112.917 89.5708 112.917 86.5V66.9583C112.917 63.2564 111.446 59.706 108.828 57.0883C106.211 54.4706 102.66 53 98.9583 53C95.2564 53 91.706 54.4706 89.0883 57.0883C86.4706 59.706 85 63.2564 85 66.9583V92.0833C85 104.423 94.9942 114.417 107.333 114.417C119.673 114.417 129.667 104.423 129.667 92.0833V75.3333C129.667 72.2625 127.154 69.75 124.083 69.75Z"
          fill="white"
        />
        <defs>
          <filter
            id="filter0_d_0_1"
            x="0"
            y="0"
            width="119.667"
            height="97.3335"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
              result="effect1_dropShadow_0_1"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_0_1"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <div className="forgot-header text-center">
        <h3>Check your email!</h3>
        <p>
          We sent an email to <b>{useremail}.</b>  Continue 
          password recovery using the link via email.
        </p>
      </div>
      {timeLeft > 0 ? (
        <p className="text-center">
          Please wait for {timeLeft} seconds
          <br />
          <p>
            Didn't receive the email?{" "}
            <button
              className={`resend-confirmation-link-disabled ${
                timeLeft > 0 ? "disabled" : ""
              }`}
              disabled={timeLeft > 0} // Disable the button based on the timer state
              onClick={handleResendLink}
            >
              Resend confirmation
            </button>
          </p>
        </p>
      ) : (
        <p className="text-center">
          <br />
          <p>
            Didn't receive the email?{" "}
            <button
              className="resend-confirmation-link"
              onClick={handleResendLink}
              disabled={timeLeft > 0} // Disable the button based on the timer state
            >
              Resend confirmation
            </button>
          </p>
        </p>
      )}
      <button
        className="redirect-to-login"
        onClick={handleRedirectToLogin}
      >
        Go to Login
      </button>
    </div>
  );
};

export default CheckEmailForm;
