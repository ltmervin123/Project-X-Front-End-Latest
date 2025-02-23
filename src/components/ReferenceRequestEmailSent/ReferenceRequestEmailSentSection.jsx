import React from "react";
import { useLocation } from "react-router-dom";

const ReferenceRequestEmailSentPopup = () => {
  const location = useLocation();
  const refereeEmail = location.state?.refereeEmail || "Not Available";
  // Retry email handler (you can expand this logic as needed)
  const handleCustomerService = () => {
    alert("Retrying email send...");
    // Your retry logic would go here
  };
  return (
    <div className="row main-login justify-content-center position-relative">
      <div className="d-flex align-items-center justify-content-center main-login-form">
        <div className="created-account-container">
          <div className="created-account-header">
            <svg
              width="73"
              height="63"
              viewBox="0 0 73 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M66.6026 28.455C66.0768 28.49 65.5861 28.665 65.2355 29.05L61.7301 32.55L68.9162 39.55L72.4216 36.05C73.1928 35.315 73.1928 34.09 72.4216 33.355L68.0749 29.05C67.724 28.6881 67.247 28.4751 66.7429 28.455M59.7321 34.58L38.5594 55.79V63H45.7806L67.0233 41.755M63.0972 0H7.0108C5.15142 0 3.3682 0.737498 2.05342 2.05025C0.738636 3.36301 0 5.14348 0 7V49C0 50.8565 0.738636 52.637 2.05342 53.9497C3.3682 55.2625 5.15142 56 7.0108 56H31.5486V52.885L60.4331 24.115C62.0807 22.4 64.3592 21.455 66.7429 21.455C67.9347 21.455 69.1265 21.665 70.2483 22.12V7C70.2483 3.08 67.0233 0 63.0972 0ZM63.0972 14L35.054 31.5L7.0108 14V7L35.054 24.5L63.0972 7"
                fill="white"
              />
            </svg>

            <h2 className="fs-4">Email Sent</h2>
          </div>
          <p>
            {" "}
            We have sent an email to <strong>{refereeEmail}</strong> to confirm
            your reference request.
          </p>

          <p className="w-100">
            {" "}
            Not working? Contact{" "}
            <strong className="color-blue" onClick={handleCustomerService}>
              customersupport@hr-hatch.com
            </strong>
            .
          </p>
          <button
            className="btn-activate-now"
            onClick={() => (window.location.href = "/login")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferenceRequestEmailSentPopup;
