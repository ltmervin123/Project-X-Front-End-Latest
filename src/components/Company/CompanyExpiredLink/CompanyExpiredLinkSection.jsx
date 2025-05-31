import React from "react";

const CompanyExpiredLinkSection = () => {
  return (
    <div className="row main-login justify-content-center position-relative">
      <div className="d-flex align-items-center justify-content-center main-login-form">
        <div className="created-account-container">
          <div className="created-account-header">
            <svg
              width="70"
              height="70"
              viewBox="0 0 98 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42.6667 16C46.9985 16 51.153 17.7208 54.2161 20.7839C57.2792 23.847 59 28.0015 59 32.3333C59 36.6652 57.2792 40.8197 54.2161 43.8827C51.153 46.9458 46.9985 48.6667 42.6667 48.6667C38.3348 48.6667 34.1803 46.9458 31.1173 43.8827C28.0542 40.8197 26.3333 36.6652 26.3333 32.3333C26.3333 28.0015 28.0542 23.847 31.1173 20.7839C34.1803 17.7208 38.3348 16 42.6667 16ZM42.6667 56.8333C60.715 56.8333 75.3333 64.1425 75.3333 73.1667V81.3333H10V73.1667C10 64.1425 24.6183 56.8333 42.6667 56.8333Z"
                fill="white"
              />
            </svg>

            <h2 className="fs-4">Expired or Invalid Link</h2>
            <i className="expired-invalid-link-header-description">
              We're sorry, but this link is no longer active.
            </i>
          </div>

          <p className="mb-0">
            The activation link you've tried to access has expired or is
            invalid. This could be due to:
            <li className="my-3">The link has exceeded its validity period</li>
          </p>

          <button
            className="btn-bt-dashboard"
            onClick={() => (window.location.href = "/company-registration")}
          >
            Back to Registration{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyExpiredLinkSection;
